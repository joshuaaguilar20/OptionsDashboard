module.exports = {
  apps : [{
    name   : "Options_server",
    script : "./index.js",
    out_log: "/Users/tommy/out.log",
    error_log: "/Users/tommy/err.log",
    combine_logs: true,
    watch: true,
    autorestart:true
  }]
}
