import nodemailer from 'nodemailer'
import fs from 'node:fs/promises'

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

const transporter = nodemailer.createTransport({
  pool: true,
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
})

transporter.verify(function (error, success) {
  if (error) {
    console.log(error)
    process.exit(1)
  } else {
    console.log('Server is ready to take our messages')
  }
})

const { REDIRECTION_LINK_VERIFICATION, REDIRECTION_LINK_INVITE } = process.env

async function loadTemplate (templateName) {
  const path = (await import('node:path')).join('templates', templateName)
  const template = await fs.readFile(path).then(f => f.toString('utf-8'))
  console.log(`LOAD TEMAPLATE ${templateName}: ${template}`)
  return template
}

const generatorInvitedUserEmail = await loadTemplate('invite.email.html')
  .then(template => urlInvite => template.replace('__URL_INVITATION__', urlInvite))

const generatorConfirmationEmail = await loadTemplate('verification.email.html')
  .then(template => urlRedirection => template.replace('__REDIRECT_URL__', urlRedirection))

const generatorOtpEmail = await loadTemplate('otp.email.html')
  .then(template => otp => template.replace('__OTP_VALUE__', otp))

function sendEmail ({ content, to, subject, from }) {
  console.log({
    content, to, subject
  })
  const message = {
    from,
    to,
    subject,
    html: content
  }
  transporter.sendMail(message)
}

export function sendConfirmationEmail ({ email, confirmationToken }) {
  const content = generatorConfirmationEmail(`${REDIRECTION_LINK_VERIFICATION}?confirmationToken=${confirmationToken}`)
  sendEmail({
    from: 'security@smlv.xyz',
    content,
    to: email,
    subject: 'Email Confirmation'
  })
}

export function sendOTPEmail ({ email, otp }) {
  const content = generatorOtpEmail(otp)
  sendEmail({
    from: 'security@smlv.xyz',
    content,
    to: email,
    subject: 'OTP to sign up'
  })
}

export function sendInviteUser ({ tokenInvite, email }) {
  const content = generatorInvitedUserEmail(`${REDIRECTION_LINK_INVITE}?invitedToken=${tokenInvite}`)
  sendEmail({
    from: 'invite@smlv.xyz',
    content,
    to: email,
    subject: 'SMLV Invitation'
  })
}
