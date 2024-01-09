const TOKEN_KEY = 'token '

export function auth (req, res, next) {
  const auth = req.headers.authorization?.replace(TOKEN_KEY, '')
  if (!auth) {
    res.sendStatus(401)
  }
}
