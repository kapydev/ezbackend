import chalk from "chalk";

function lineFactory(prefix: string, msg: string | undefined) {
  if (msg === undefined) {
    return "";
  } else
    return (
      chalk.bgRed(" " + prefix.padEnd(5, " ")) + chalk.gray(": ") + msg + "\n"
    );
}

export class EzError extends Error {
  summary: string;
  description: string;
  code?: string;
  link?: string;

  constructor(msg: string, desc: string, oneLiner?: string, docs?: string) {
    const errMsg =
      "\n\n" +
      lineFactory("Err", msg) +
      lineFactory("Desc", desc) +
      lineFactory("Fix", oneLiner) +
      lineFactory("Docs", docs);
    super(errMsg);

    this.summary = msg;
    this.description = desc;
    this.code = oneLiner;
    this.link = docs;
  }
}
