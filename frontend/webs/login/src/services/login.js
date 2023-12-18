export async function login (urlLogin, { username, password }) {
  const body = JSON.stringify({ username, password })
  return await fetch(urlLogin, {
    method: 'POST',
    body
  }).then(res => {
    if (res.status === 200) {
      return {
        isOk: true,
        token: res.headers.get('Authorization')
      }
    } else {
      throw new Error('Login KO')
    }
  }).catch(() => {
    return {
      isOk: false,
      token: ''
    }
  })
}
