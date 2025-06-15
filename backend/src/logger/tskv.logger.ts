import { LoggerService } from '@nestjs/common';

export class TSKVLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: string,
    context: string,
    trace?: string,
  ): string {
    const ctx = context || 'App';
    const log = [
      `tskv`,
      `timestamp=${new Date().toISOString()}`,
      `level=${level}`,
      `context=${ctx}`,
      `message=${message}`,
    ];
    if (trace) log.push(`trace=${trace}`);
    return log.join('\t');
  }

  log(message: string, context?: string) {
    console.log(this.formatMessage('log', message, context));
  }

  error(message: string, trace?: string, context?: string) {
    console.error(this.formatMessage('error', message, context, trace));
  }

  warn(message: string, context?: string) {
    console.warn(this.formatMessage('warn', message, context));
  }

  debug(message: string, context?: string) {
    console.debug(this.formatMessage('debug', message, context));
  }

  verbose(message: string, context?: string) {
    console.info(this.formatMessage('verbose', message, context));
  }
}
