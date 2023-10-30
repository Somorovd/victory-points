import { exec } from "child_process";
import * as process from "process";

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("Usage: node build.js <inputFile>");
  process.exit(1);
}

const inputFile = args[0];
const outputPathPrefix = "../public/";
const outputFile = outputPathPrefix + inputFile;

const buildCommand = `
npx parcel build src/${inputFile}/index.html --out-dir ${outputFile} &&
mv ${outputFile}/main.*.js ${outputFile}/main.js &&
rm -rf ${outputFile}/index.html &&
mv ${outputFile}/${inputFile}/* ${outputFile}/ &&
rm -rf ${outputFile}/${inputFile} 
`;

exec(buildCommand, (error, stdout) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
  console.log(stdout);
});
