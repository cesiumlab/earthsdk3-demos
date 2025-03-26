const packageJson = require('../../package.json');
const child_process = require('child_process');

function git(command) {
  return child_process.execSync(`git ${command}`, { encoding: 'utf8' }).trim();
}

let commitId = '00000000'
try {
  commitId = git('rev-parse HEAD');
} catch (error) {
  console.warn(`未能获取git版本号，但不影响使用。`);
}
console.log(`commitId: ${commitId}`);


let dateJs;
try {
  dateJs = new Date(git('log -1 --format=%aI'));
} catch (error) {
  dateJs = new Date();
}

const timestamp = dateJs.getTime();
const date = dateJs.toISOString();
const { version, author, owner, ownerlink, name, homepage, description, gituri } = packageJson;

const defines = Object.entries({ version, author, owner, ownerlink, name, homepage, date, timestamp, commitId, description, gituri }).map(([k, v]) => [k.toUpperCase() + '_', JSON.stringify(v)]).reduce((o, c) => (o[c[0]] = c[1], o), {});
module.exports = { defines, info: { version, author, owner, ownerlink, name, homepage, description, timestamp, commitId, date, gituri } };