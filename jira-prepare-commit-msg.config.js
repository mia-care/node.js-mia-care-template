// jira-prepare-commit-msg.config.js
'use strict'

module.exports = {
  'jira-prepare-commit-msg': {
    'messagePattern': '[$J] $M',
    'jiraTicketPattern': '([A-Z]+-\\d+)',
    'commentChar': '#',
    'isConventionalCommit': false,
    'conventionalCommitPattern': '^([a-z]+)(\\([a-z0-9.,-_ ]+\\))?!?: ([\\w \\S]+)$',
    'allowEmptyCommitMessage': false,
    'gitRoot': '',
    'allowReplaceAllOccurrences': true,
    'ignoredBranchesPattern': '^(master|main|dev|develop|development|release)$',
    'ignoreBranchesMissingTickets': false,
  },
}
