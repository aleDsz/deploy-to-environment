//import Github from '~/services/github'
import core from '@actions/core'

// const github = new Github('api_url', 'token')

async function run() {
  try {
    const json = process.env['GITHUB_MESSAGE']
    const body = JSON.parse(json)

    core.debug(body)
  } catch (error) {
    core.setFailed(error)
  }
}

run()
