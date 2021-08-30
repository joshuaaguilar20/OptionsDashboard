module.exports = {
  apps : [{
    name   : "Options_server",
    script : "./index.js",
    out_log: "/Users/jaguilar/out.log",
    error_log: "/Users/jaguilar/err.log",
    combine_logs: true,
    watch: true,
    autorestart:true
  }]
}
