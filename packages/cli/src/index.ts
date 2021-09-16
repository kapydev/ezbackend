import { Command } from "commander";
import { sync as readPackageUpSync } from "read-pkg-up";
import initiate from "./initiate";

//URGENT TODO: Make it possible to create project by name rather than in current folder

const pkg = readPackageUpSync({ cwd: __dirname })?.packageJson;

const program = new Command();

program
  .command("init <dir>")
  .description("Initialize ezbackend into your project in the specified directory.")
  .option("-f --force", "Force add ezbackend")
  .action((dir,options) => initiate(dir, options, pkg));

program.parse(process.argv);

