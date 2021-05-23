import new_api from '~/services/api'

const defaultHeaders = {
  Accept: "application/vnd.github.v3+json",
  Authorization: 'token '
}

describe('build_api/2', () => {
  it('returns an axios object', () => {
    const api = new_api('http://localhost', 'token')
    expect(api).not.toBeNull()
  })

  it('configures baseURL correctly', () => {
    const api = new_api('http://localhost', 'token')
    const baseURL = api.defaults.baseURL

    expect(baseURL).not.toBeNull()
    expect(baseURL).toBe('http://localhost')
  })

  it('configures Authorization token correctly', () => {
    const api = new_api('http://localhost', '123456789')
    const config = {headers: defaultHeaders}
    const handler = api.interceptors.request.handlers[0]

    const expectedHeaders = {
      headers: {...defaultHeaders, Authorization: 'token 123456789'}
    }
    return expect(handler.fulfilled(config)).resolves.toEqual(expectedHeaders)
  })
})
