import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    const user = this.configService.get('email_user');
    const pass = this.configService.get('email_password');

    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendMail({ to, subject, html }) {
    const user = this.configService.get('email_user');
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: user,
      },
      to,
      subject,
      html,
    });
    return '';
  }
}
