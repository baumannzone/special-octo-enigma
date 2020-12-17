const repositories = require('./github_repos.json')
const {writeFileSync} = require('fs')

const languages = new Set();
const totals = {
    public_repos: repositories.length,
    stars: 0,
    watchers: 0,
    has_issues: 0,
    forks: 0,
    open_issues_count: 0,
}

repositories.forEach(repo => {
    totals.stars += repo.stargazers_count;
    totals.watchers += repo.watchers_count
    totals.has_issues += repo.has_issues;
    totals.forks += repo.forks_count;
    totals.open_issues_count += repo.open_issues_count;
    languages.add(repo.language)
})

writeFileSync('./github_totals.json', JSON.stringify({...totals, langs: [...languages]}, null, 4))