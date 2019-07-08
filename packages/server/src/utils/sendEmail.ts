import nodemailer from 'nodemailer';

export async function sendEmail (email: string, url: string) {
  let transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: 'apikey',
      pass: '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'
    }
  });

  const mailOptions = {
    from: '<noreply@example.com>', // sender address
    to: email, // list of receivers
    subject: "Confirm Account", // Subject line
    text: "Click the link below to get started.", // plain text body
    html: `<a href="${url}">Verify your account!</a>` // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}