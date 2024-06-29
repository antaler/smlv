export function generateOTP () {
  return new Array(5).fill(0).map(() => Math.floor(Math.random() * 9)).join('')
}

const MAX_TIME_OTP = 24 * 60 * 60 * 1000

export function requireOTP (lastOtp) {
  if (lastOtp === undefined) {
    return true
  }
  const diff = new Date().getTime() - lastOtp.getTime()
  return diff > MAX_TIME_OTP
}
