import { Container } from 'typedi';
import MailerService from '../services/mailer';

export default class EmailSequenceJob {
  public async handler(job, done): Promise<void> {
    const Logger = Container.get('logger');
    try {
      Logger.debug('✌️ Email Sequence Job triggered!');
      const { email, name }: { [key: string]: string } = job.data;
      const mailerServiceInstance = Container.get(MailerService);
      await mailerServiceInstance.StartEmailSequence('WelcomeSequence', { email, name });
      done();
    } catch (e) {
      Logger.error('🔥 Error with Email Sequence Job: %o', e);
      done(e);
    }
  }
}
