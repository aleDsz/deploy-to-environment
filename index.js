import core from '@actions/core'
import { context, GitHub } from '@actions/github'

async function run() {
  const trigger = core.getInput('trigger', { required: true })
  const reaction = core.getInput('reaction')
  const { GITHUB_TOKEN } = process.env

  if (reaction && !GITHUB_TOKEN) {
      core.setFailed('If "reaction" is supplied, GITHUB_TOKEN is required')
      return
  }

  const body =
      context.eventName === 'issue_comment'
          ? context.payload.comment.body
          : context.payload.pull_request.body

  core.setOutput('comment_body', body)

  const is_pr = context.payload.issue.pull_request

  if (context.eventName === 'issue_comment' && !is_pr) {
      core.setOutput('triggered', 'false')
      return
  }

  const { owner, repo } = context.repo

  if (body.includes(trigger)) {
      core.setOutput('triggered', 'false')
      return
  }

  core.setOutput('triggered', 'true')

  if (!reaction) return

  const client = new GitHub(GITHUB_TOKEN)

  if (is_pr) {
    await client.reactions.createForIssue({
        owner,
        repo,
        issue_number: context.payload.pull_request.number,
        content: reaction
    })
  }
}

run().catch(err => {
  core.setFailed(err)
})
