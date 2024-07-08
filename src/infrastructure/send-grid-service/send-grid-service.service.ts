import { Injectable } from '@nestjs/common';
import * as sendGrid from '@sendgrid/mail';

@Injectable()
export class SendGridServiceService {
  constructor() {
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }
  
  async sendEmail(to: string, subject: string, text: string, html: string) {
    const msg = {
      to,
      from: 'matamau96@gmail.com',
      subject,
      text,
      html,
    };
    try {
      const a = await sendGrid.send(msg)
    } catch (error) {
      console.error("Errored", error);
      
    } 
  }
}
