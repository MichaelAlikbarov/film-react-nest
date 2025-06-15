import { LoggerService, LogLevel } from '@nestjs/common';

export class MultiLogger implements LoggerService {
  constructor(private readonly loggers: LoggerService[]) {}

  log(message: any, context?: string) {
    this.loggers.forEach((logger) => logger.log?.(message, context));
  }

  error(message: any, trace?: string, context?: string) {
    this.loggers.forEach((logger) => logger.error?.(message, trace, context));
  }

  warn(message: any, context?: string) {
    this.loggers.forEach((logger) => logger.warn?.(message, context));
  }

  debug?(message: any, context?: string) {
    this.loggers.forEach((logger) => logger.debug?.(message, context));
  }

  verbose?(message: any, context?: string) {
    this.loggers.forEach((logger) => logger.verbose?.(message, context));
  }

  setLogLevels?(levels: LogLevel[]) {
    this.loggers.forEach((logger) => logger.setLogLevels?.(levels));
  }
}
