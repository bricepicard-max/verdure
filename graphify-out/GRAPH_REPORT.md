# Graph Report - verdure  (2026-09-06)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 126 nodes · 158 edges · 12 communities (6 shown, 4 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79fa08be`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.js
- db.js
- app.js
- package.json
- dependencies
- initBookingCalendar
- generateGedPdf
- imageUpload
- parseIcal
- setup.sh

## God Nodes (most connected - your core abstractions)
1. `now()` - 13 edges
2. `initBookingCalendar()` - 7 edges
3. `renderClientPortal()` - 6 edges
4. `render()` - 5 edges
5. `renderMonth()` - 4 edges
6. `createClient()` - 3 edges
7. `upsertSignature()` - 3 edges
8. `euro()` - 3 edges
9. `initClientPortal()` - 3 edges
10. `openLightbox()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `openLightbox()` --calls--> `render()`  [EXTRACTED]
  public/app.js → public/app.js  _Bridges community 2 → community 5_

## Import Cycles
- None detected.

## Communities (12 total, 4 thin omitted)

### Community 0 - "server.js"
Cohesion: 0.06
Nodes (20): app, crypto, db, { execFile }, express, fs, gedDir, helmet (+12 more)

### Community 1 - "db.js"
Cohesion: 0.12
Nodes (19): createClient(), createPost(), Database, db, fs, getClientById(), listSignatures(), now() (+11 more)

### Community 2 - "app.js"
Cohesion: 0.13
Nodes (14): documentCard(), euro(), galleryGroups, initAdminClientForm(), initClientPortal(), initGallery(), initHeroReel(), initVideoBar() (+6 more)

### Community 3 - "package.json"
Cohesion: 0.11
Nodes (18): description, engines, node, main, name, scripts, dev, start (+10 more)

### Community 4 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, @anthropic-ai/sdk, better-sqlite3, dotenv, express, helmet, multer, nodemailer (+2 more)

### Community 5 - "initBookingCalendar"
Cohesion: 0.52
Nodes (7): initBookingCalendar(), hasBookedInRange(), isBooked(), render(), renderMonth(), todayCompact(), toISO()

## Knowledge Gaps
- **45 isolated node(s):** `app`, `crypto`, `db`, `{ execFile }`, `express` (+40 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 72 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `better-sqlite3` connect `package.json` to `db.js`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **What connects `app`, `crypto`, `db` to the rest of the system?**
  _45 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `server.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Should `db.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12554112554112554 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._