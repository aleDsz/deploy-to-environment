import new_api from './api'

class Github {
  constructor(apiURL, repo, token) {
    const baseURL = `${apiURL}/repos/${repo}`
    this.api = new_api(baseURL, token)
  }

  async addReactionToComment(commentId) {
    const uri = `/pulls/comments/${commentId}/reactions`
    const data = { content: 'rocket' }

    return await this.api.post(uri, data)
  }

  async sendDeploymentMessage(pullNumber, environment) {
    const uri = `/pulls/${pullNumber}/comments`
    const message = `Sending deployment request to ${environment} as you wish!`
    const data = { body: message }

    return await this.api.post(uri, data)
  }
}

export default Github
