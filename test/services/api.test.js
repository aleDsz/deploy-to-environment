import new_api from '~/services/api'

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
    const config = {headers: {Authorization: undefined}}
    const handler = api.interceptors.request.handlers[0]

    const expectedHeaders = {
      headers: {
        Authorization: 'token 123456789'
      }
    }
    return expect(handler.fulfilled(config)).resolves.toEqual(expectedHeaders)
  })
})
