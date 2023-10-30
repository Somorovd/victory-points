import { exec } from "child_process";
import * as process from "process";

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("Usage: node start.js <inputFile>");
  process.exit(1);
}

const inputFile = args[0];

const command = `rm -rf dist && parcel src/${inputFile}/index.html -p 8000`;

exec(command, (error, stdout) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
  console.log(stdout);
});
