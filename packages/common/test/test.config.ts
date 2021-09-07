import path from 'path'

export default {
  port: 8888,
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 8888,
    logger: false
  },
  orm: {
    type: "sqlite",
    database: ":memory:",
    synchronize : true,
    entities: [path.resolve(__dirname,"./test.index.ts")]
  },
  plugins: [path.resolve(__dirname,"../src")],
  connectionURI: "sqlite::memory"
};
