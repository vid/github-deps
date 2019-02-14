const fs = require('fs');
const Octokit = require('@octokit/rest')

const octokit = new Octokit({});

const { owner, repo, dependsOn } = require('./config.js');
const dependsOnRegEx = new RegExp(`${dependsOn}: #(\\d+)`, 'm');
const per_page = 100;

(async () => {
  const { data: issues } = await octokit.issues.listForRepo({ owner, repo, per_page }); //, milestone, state, assignee, creator, mentioned, labels, sort, direction, since, per_page, page})
  const edges = [];
  const deps = issues.filter(i => i.body.match(dependsOnRegEx) !== null).reduce((all, i) => {
    const match = dependsOnRegEx.exec(i.body);
    if (match && match[1]) {
      const upper = match[1];
      edges.push({ from: i.number, to: upper });
      return { ...all, [upper]: all[upper] ? [...all[upper], i.number] : [i.number] };
    }
    return all;
  }, {});

  const ganttIssues = issues.map(i => ({ id: i.number, name: i.title, dependencies: deps[i.number] }), []);
  const nodes = issues.map(i => ({ id: i.number, label: i.title }));

  fs.writeFileSync('src/issues.json', JSON.stringify(ganttIssues, null, 2));
  fs.writeFileSync('src/vis.json', JSON.stringify({ nodes, edges }, null, 2));
})();

