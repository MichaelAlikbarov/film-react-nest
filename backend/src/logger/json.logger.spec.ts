import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log as JSON (log)', () => {
    logger.log('Test message', 'TestContext');

    const call = (console.log as jest.Mock).mock.calls[0][0];
    const parsed = JSON.parse(call);

    expect(parsed).toEqual({
      level: 'log',
      message: 'Test message',
      context: 'TestContext',
    });
  });

  it('should format error with trace', () => {
    logger.error('Oops', 'stack trace', 'ErrorContext');

    const call = (console.error as jest.Mock).mock.calls[0][0];
    const parsed = JSON.parse(call);

    expect(parsed).toEqual({
      level: 'error',
      message: 'Oops',
      context: 'ErrorContext',
      trace: 'stack trace',
    });
  });

  it('should format warn', () => {
    logger.warn('Warning', 'WarnContext');

    const call = (console.warn as jest.Mock).mock.calls[0][0];
    const parsed = JSON.parse(call);

    expect(parsed).toEqual({
      level: 'warn',
      message: 'Warning',
      context: 'WarnContext',
    });
  });

  it('should format debug', () => {
    logger.debug('Debug msg', 'DebugContext');

    const call = (console.debug as jest.Mock).mock.calls[0][0];
    const parsed = JSON.parse(call);

    expect(parsed).toEqual({
      level: 'debug',
      message: 'Debug msg',
      context: 'DebugContext',
    });
  });

  it('should format verbose', () => {
    logger.verbose('Verbose msg', 'VerboseContext');

    const call = (console.info as jest.Mock).mock.calls[0][0];
    const parsed = JSON.parse(call);

    expect(parsed).toEqual({
      level: 'verbose',
      message: 'Verbose msg',
      context: 'VerboseContext',
    });
  });
});
