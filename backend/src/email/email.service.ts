import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    const user = this.configService.get('nodemailer_auth_user');
    const pass = this.configService.get('nodemailer_auth_pass');
    const host = this.configService.get('nodemailer_host');
    const port = this.configService.get('nodemailer_port');

    this.transporter = createTransport({
      host,
      port,
      secure: false,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendMail({ to, subject, html }) {
    const address = this.configService.get('nodemailer_auth_user');
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address,
      },
      to,
      subject,
      html,
    });
    return '';
  }
}
