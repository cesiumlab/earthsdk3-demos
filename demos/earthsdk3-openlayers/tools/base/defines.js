const packageJson = require('../../package.json');
const child_process = require('child_process');

function git(command) {
  return child_process.execSync(`git ${command}`, { encoding: 'utf8' }).trim();
}
const commitId = git('rev-parse HEAD');
const dateJs = new Date(git('log -1 --format=%aI'));
const timestamp = dateJs.getTime();
const date = dateJs.toISOString();
const { version, author, owner, ownerlink, name, homepage, description } = packageJson;

const defines = Object.entries({ version, author, owner, ownerlink, name, homepage, date, timestamp, commitId, description }).map(([k, v]) => [k.toUpperCase() + '_', JSON.stringify(v)]).reduce((o, c) => (o[c[0]] = c[1], o), {});
module.exports = { defines, info: { version, author, owner, ownerlink, name, homepage, description, timestamp, commitId, date } };
