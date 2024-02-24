import ejs from "ejs";
import { google } from "googleapis";
import OAuthService from "./oAuth.service";
const MailComposer = require('nodemailer/lib/mail-composer');

export class MailService {

    public sendAccountCreatedEmail(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let email = await ejs.renderFile("./templates/MailTemplate/accountCreated.ejs", {
                    userName: data.username,
                    link: `${process.env.APP_HOST}`
                });
                const options = {
                    to: data?.email,
                    subject: "Account Created Successfully",
                    template: "index",
                    html: email,
                    textEncoding: "base64",
                };
                this.sendMail(options).then((e) => {
                    return resolve(e);
                });
            } catch (err) {
                return reject(err);
            }
        })
    }

    private encodeMessage(message) {
        return Buffer.from(message)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    };

    private async createMail(options) {
        const mailComposer = new MailComposer(options);
        const message = await mailComposer.compile().build();
        return this.encodeMessage(message);
    };

    private sendMail(options) {
        return new Promise(async (resolve, reject) => {
            try {
                const gmail = google.gmail({ version: 'v1', auth: await OAuthService.getOAuthClient() });
                const rawMessage = await this.createMail(options);
                const { data: { id } = {} } = await gmail.users.messages.send({
                    userId: 'me',
                    requestBody: {
                        raw: rawMessage
                    }
                })
                return resolve(id);
            } catch (err) {
                return reject(err);
            }
        })
    }

}

export default new MailService();