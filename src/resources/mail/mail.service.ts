import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ISendMail } from './interfaces/mail.interface';
import { User } from '../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async sendMail(options: ISendMail): Promise<void> {
    await this.mailerService.sendMail({
      to: options.to,
      from: options.subject,
      template: `./${options.template}`,
      context: {
        ...options.params,
      },
      attachments: options.attachments,
    });
  }

  public async sendWelcomeEmail(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'Onboarding Team <onboarding@nestjsblog.com>',
      template: './welcome',
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: 'http://localhost:3000',
      },
    });
  }
}
