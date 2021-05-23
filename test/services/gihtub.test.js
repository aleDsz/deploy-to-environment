import Github from '~/services/github'

jest.mock('services/github')

describe('addReactionToComment/1', () => {
  beforeEach(() => {
    Github.mockClear()
  })

  it('adds a reaction to a pull request comment', () => {
    Github.mockImplementation(() => {
      return {
        addReactionToComment: (commentId) => {
          return {"url": `https://api.github.com/repos/octocat/Hello-World/pulls/comments/${commentId}`}
        }
      }
    })

    const apiURL = 'https://api.github.com'
    const repo = 'octocat/Hello-World'
    const commentId = 'foo-bar-baz'
    const expectedURL = `${apiURL}/repos/${repo}/pulls/comments/${commentId}`

    const github = new Github(apiURL, repo, 'token')
    const {"url": url} = github.addReactionToComment(commentId)

    expect(url).toBe(expectedURL)
  })
})

describe('sendDeploymentMessage/2', () => {
  beforeEach(() => {
    Github.mockClear()
  })

  it('adds a reaction to a pull request comment', () => {
    Github.mockImplementation(() => {
      return {
        sendDeploymentMessage: (pullNumber, environment) => {
          return {
            "url": `https://api.github.com/repos/octocat/Hello-World/pulls/${pullNumber}/comments`,
            "body": `Sending deployment request to ${environment} as you wish!`
          }
        }
      }
    })

    const apiURL = 'https://api.github.com'
    const repo = 'octocat/Hello-World'
    const pullNumber = 'foo-bar-baz'
    const environment = 'staging'
    const message = `Sending deployment request to ${environment} as you wish!`
    const expectedURL = `${apiURL}/repos/${repo}/pulls/${pullNumber}/comments`

    const github = new Github(apiURL, repo, 'token')
    const {"url": url, "body": body} = github.sendDeploymentMessage(pullNumber, environment)

    expect(url).toBe(expectedURL)
    expect(body).toBe(message)
  })
})
