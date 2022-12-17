//process
const proc = [
    "work_directory: " + process.cwd(),
    "process_id: " + process.pid,
    "node_version: " + process.version,
    "process_title: " + process.title,
    "OS: " + process.platform,
    "memory_usage(rss): " + process.memoryUsage().rss,
    "path: " + process.execPath
]

module.exports = proc;