import path from 'path'

//URGENT TODO: Make this export strict type checked for ease of use
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
    type: "sqlite",
    database: ":memory:",
    synchronize : true,
    // logging: true,
    entities: [path.resolve(__dirname,"**/*.ts")]
  },
  //TODO: Make the cors every variation of localhost
  cors: {
    origin: (origin, cb) => {
      cb(null, true)
    }
  },
  plugins: [
    "@ezbackend/common",
    "@ezbackend/cors",
    "@ezbackend/openapi",
    "@ezbackend/db-ui"
  ],
  entryPoint: path.resolve(__dirname,"./index.ts"),
};
