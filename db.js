const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dataDir = process.env.DATA_DIR || path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'verdure.sqlite'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL UNIQUE,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    arrival TEXT,
    departure TEXT,
    guests INTEGER,
    total_amount_cents INTEGER NOT NULL DEFAULT 0,
    deposit_amount_cents INTEGER NOT NULL DEFAULT 0,
    swikly_url TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'created',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS signatures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    document_type TEXT NOT NULL,
    signer_name TEXT NOT NULL,
    signer_email TEXT NOT NULL,
    accepted_text TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    signed_at TEXT NOT NULL,
    UNIQUE(client_id, document_type),
    FOREIGN KEY(client_id) REFERENCES clients(id)
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    provider TEXT NOT NULL,
    provider_session_id TEXT,
    amount_cents INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'eur',
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(client_id) REFERENCES clients(id)
  );
`);

// Migrate: add signature_data column if missing
try { db.exec('ALTER TABLE signatures ADD COLUMN signature_data TEXT'); } catch {}
// Auth & upload migrations
try { db.exec('ALTER TABLE clients ADD COLUMN login TEXT'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN password_hash TEXT'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 1'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN session_token TEXT'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN session_expires TEXT'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN id_doc_filename TEXT'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN id_doc_uploaded_at TEXT'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN payment_confirmed INTEGER NOT NULL DEFAULT 0'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN payment_confirmed_at TEXT'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN payment_paid INTEGER NOT NULL DEFAULT 0'); } catch {}
try { db.exec('ALTER TABLE clients ADD COLUMN payment_paid_at TEXT'); } catch {}
// Migrate: add posts table
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT NOT NULL DEFAULT 'both',
    content TEXT NOT NULL,
    image_hint TEXT,
    scheduled_at TEXT,
    published_at TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    meta_post_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

const now = () => new Date().toISOString();

function createClient(input) {
  const stmt = db.prepare(`
    INSERT INTO clients (
      token, guest_name, guest_email, guest_phone, arrival, departure, guests,
      total_amount_cents, deposit_amount_cents, swikly_url, notes, created_at, updated_at
    ) VALUES (
      @token, @guestName, @guestEmail, @guestPhone, @arrival, @departure, @guests,
      @totalAmountCents, @depositAmountCents, @swiklyUrl, @notes, @createdAt, @updatedAt
    )
  `);

  const createdAt = now();
  const result = stmt.run({
    token: input.token,
    guestName: input.guestName,
    guestEmail: input.guestEmail,
    guestPhone: input.guestPhone || '',
    arrival: input.arrival || '',
    departure: input.departure || '',
    guests: Number(input.guests || 0),
    totalAmountCents: Number(input.totalAmountCents || 0),
    depositAmountCents: Number(input.depositAmountCents || 0),
    swiklyUrl: input.swiklyUrl || '',
    notes: input.notes || '',
    createdAt,
    updatedAt: createdAt,
  });

  return getClientById(result.lastInsertRowid);
}

function getClientById(id) {
  return db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
}

function getClientByToken(token) {
  return db.prepare('SELECT * FROM clients WHERE token = ?').get(token);
}

function listClients() {
  return db.prepare('SELECT * FROM clients ORDER BY created_at DESC LIMIT 100').all();
}

function listSignatures(clientId) {
  return db.prepare('SELECT * FROM signatures WHERE client_id = ? ORDER BY signed_at ASC').all(clientId);
}

function upsertSignature(client, input, requestMeta) {
  const signedAt = now();
  db.prepare(`
    INSERT INTO signatures (
      client_id, document_type, signer_name, signer_email, accepted_text,
      signature_data, ip_address, user_agent, signed_at
    ) VALUES (
      @clientId, @documentType, @signerName, @signerEmail, @acceptedText,
      @signatureData, @ipAddress, @userAgent, @signedAt
    )
    ON CONFLICT(client_id, document_type) DO UPDATE SET
      signer_name = excluded.signer_name,
      signer_email = excluded.signer_email,
      accepted_text = excluded.accepted_text,
      signature_data = excluded.signature_data,
      ip_address = excluded.ip_address,
      user_agent = excluded.user_agent,
      signed_at = excluded.signed_at
  `).run({
    clientId: client.id,
    documentType: input.documentType,
    signerName: input.signerName,
    signerEmail: input.signerEmail,
    acceptedText: input.acceptedText,
    signatureData: input.signatureData || null,
    ipAddress: requestMeta.ipAddress,
    userAgent: requestMeta.userAgent,
    signedAt,
  });

  db.prepare('UPDATE clients SET updated_at = ? WHERE id = ?').run(signedAt, client.id);
  return listSignatures(client.id);
}

function recordPayment(input) {
  db.prepare(`
    INSERT INTO payments (client_id, provider, provider_session_id, amount_cents, currency, status, created_at)
    VALUES (@clientId, @provider, @providerSessionId, @amountCents, @currency, @status, @createdAt)
  `).run({
    clientId: input.clientId,
    provider: input.provider,
    providerSessionId: input.providerSessionId || '',
    amountCents: Number(input.amountCents || 0),
    currency: input.currency || 'eur',
    status: input.status || 'created',
    createdAt: now(),
  });
}

function createPost(input) {
  const createdAt = now();
  const result = db.prepare(`
    INSERT INTO posts (platform, content, image_hint, scheduled_at, status, created_at, updated_at)
    VALUES (@platform, @content, @imageHint, @scheduledAt, 'draft', @createdAt, @createdAt)
  `).run({
    platform: input.platform || 'both',
    content: input.content,
    imageHint: input.imageHint || '',
    scheduledAt: input.scheduledAt || null,
    createdAt,
  });
  return db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
}

function listPosts(limit = 50) {
  return db.prepare('SELECT * FROM posts ORDER BY created_at DESC LIMIT ?').all(limit);
}

function updatePostStatus(id, status, metaPostId) {
  const updatedAt = now();
  db.prepare('UPDATE posts SET status = ?, meta_post_id = ?, published_at = ?, updated_at = ? WHERE id = ?')
    .run(status, metaPostId || null, status === 'published' ? updatedAt : null, updatedAt, id);
  return db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
}


function setClientLogin(id, login) {
  db.prepare('UPDATE clients SET login = ?, updated_at = ? WHERE id = ?').run(login, now(), id);
}

function setClientPassword(id, hash, mustChange) {
  db.prepare('UPDATE clients SET password_hash = ?, must_change_password = ?, updated_at = ? WHERE id = ?')
    .run(hash, mustChange ? 1 : 0, now(), id);
}

function setClientSession(id, sessionToken, expiresAt) {
  db.prepare('UPDATE clients SET session_token = ?, session_expires = ?, updated_at = ? WHERE id = ?')
    .run(sessionToken, expiresAt, now(), id);
}

function clearClientSession(id) {
  db.prepare('UPDATE clients SET session_token = NULL, session_expires = NULL WHERE id = ?').run(id);
}

function getClientBySession(sessionToken) {
  if (!sessionToken) return null;
  return db.prepare('SELECT * FROM clients WHERE session_token = ?').get(sessionToken);
}

function getClientByLogin(login) {
  if (!login) return null;
  return db.prepare('SELECT * FROM clients WHERE login = ?').get(login.toLowerCase());
}

function setClientIdDoc(id, filename) {
  db.prepare('UPDATE clients SET id_doc_filename = ?, id_doc_uploaded_at = ?, updated_at = ? WHERE id = ?')
    .run(filename, now(), now(), id);
}

function setClientPaymentConfirmed(id) {
  db.prepare('UPDATE clients SET payment_confirmed = 1, payment_confirmed_at = ?, updated_at = ? WHERE id = ?')
    .run(now(), now(), id);
}

function setClientPaymentPaid(id) {
  db.prepare('UPDATE clients SET payment_paid = 1, payment_paid_at = ?, status = ?, updated_at = ? WHERE id = ?')
    .run(now(), 'active', now(), id);
}

function updateClientStatus(id, status) {
  db.prepare('UPDATE clients SET status = ?, updated_at = ? WHERE id = ?').run(status, now(), id);
}

module.exports = {
  createClient,
  getClientByToken,
  listClients,
  listSignatures,
  upsertSignature,
  recordPayment,
  createPost,
  listPosts,
  updatePostStatus,
  setClientLogin,
  setClientPassword,
  setClientSession,
  clearClientSession,
  getClientBySession,
  getClientByLogin,
  setClientIdDoc,
  setClientPaymentConfirmed,
  setClientPaymentPaid,
  updateClientStatus,
};
