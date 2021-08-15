import { Command } from "commander";
import { sync as readPackageUpSync } from "read-pkg-up";
import initiate from "./initiate";

//URGENT TODO: Make dependencies core dependencies not dev dependencies during installation
//URGENT TODO: Add @ezbackend/core to dependencies

const pkg = readPackageUpSync({ cwd: __dirname })?.packageJson;

const program = new Command();

program
  .command("init")
  .description("Initialize ezbackend into your project.")
  .option("-f --force", "Force add ezbackend")
  .action((options) => initiate(options, pkg));

program.parse(process.argv);

