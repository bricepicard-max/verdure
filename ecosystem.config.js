module.exports = {
  apps: [{
    name: 'verdure',
    cwd: '/opt/verdure',
    script: 'server.js',
    interpreter: 'node',
    watch: false,
    autorestart: true,
    max_restarts: 10,
    restart_delay: 3000,
    env: {
      NODE_ENV: 'production',
      PORT: 3010
    }
  }]
};
