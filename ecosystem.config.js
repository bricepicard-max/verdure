module.exports = {
  apps: [{
    name: 'verdure',
    cwd: '/opt/verdure',
    script: 'python3',
    args: '-m http.server 3010',
    interpreter: 'none',
    watch: false,
    autorestart: true,
    max_restarts: 10,
    restart_delay: 3000,
    env: {
      NODE_ENV: 'production'
    }
  }]
};
