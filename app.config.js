module.exports = {
    apps: [
      {
        name: 'LMS',
        script: './index.js',
        instances: "1",
        exec_mode: 'cluster',
        watch: true,
        watch_delay: 1000,
        ignore_watch : ["node_modules", "public"],
        env: {
  
          PORT: '3000'
        }
      }
    ]
  };
  