import path from 'path'

export default {
  port: 8888,
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 8888,
    logger: false,
  },
  orm: {
    logging: false,
  },
  plugins: ["../src"],
  entryPoint: path.resolve(__dirname,"./test.index.ts"),
  connectionURI: "sqlite::memory"
};
