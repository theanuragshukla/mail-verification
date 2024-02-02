const mailer = require("nodemailer");
class Mailer {
  constructor({ service, email, password }) {
    if (!service || !email || !password) {
      throw new Error("Invalid mailer configuration");
    }
    this.mailer = mailer;
    this.sender = mailer.createTransport({
      service: service,
      auth: {
        user: email,
        pass: password,
      },
    });
  }

  async sendMail({ email, subject, html }) {
    const options = {
      from: this.mailer.email,
      to: email,
      subject: subject,
      html: `${html}`,
    };
    const data = await this.sender.sendMail(options);
    return data.accepted.length === 1;
  }
}

module.exports = Mailer;
