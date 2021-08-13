import path from 'path'

export default {
  port: 8888,
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 8888,
    logger: {
      prettyPrint: {
        translateTime: "SYS:HH:MM:ss",
        ignore: "pid,hostname,reqId,responseTime,req,res",
        messageFormat: "[{req.method} {req.url}] {msg}",
      },
    },
  },
  orm: {
    logging: false,
  },
  plugins: ["@ezbackend/common"],
  entryPoint: path.resolve(__dirname,"./test.index.ts"),
  connectionURI: "sqlite::memory"
};
