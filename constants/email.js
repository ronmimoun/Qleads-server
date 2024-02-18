function getOTPEmail(OTP) {
  const ENTITY_NAME = 'Qleads'

  return `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${ENTITY_NAME}</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing ${ENTITY_NAME}. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />${ENTITY_NAME}</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>${ENTITY_NAME} Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`
}

function getContactDetailsEmailHtml(contact) {
  const title = 'Contact Details'
  const body = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
  <p>Name: ${contact.name}</p>
  <p>Last name: ${contact.familyName}</p>
  <p>Category: ${contact.category}</p>
  <p>Company: ${contact.company}</p>
  <p>Job Title: ${contact.jobTitle}</p>
  <p>Region: ${contact.country}</p>
  <p>Linked In link: ${contact.linkedinLink}</p>
  </div>
</div>`
  return _baseHtmlEmail(title, body)
}

function _baseHtmlEmail(title, body) {
  return `<!DOCTYPE html>
  <html lang="en" >
  ${_baseHeadHtml(title)}
  ${body}
  </html>`
}

function _baseHeadHtml(title) {
  return `<head>
  <meta charset="UTF-8">
  <title>${title}</title>
</head>`
}

module.exports = {
  getOTPEmail,
  getContactDetailsEmailHtml
}