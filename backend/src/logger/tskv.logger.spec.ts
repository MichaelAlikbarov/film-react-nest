import { TSKVLogger } from './tskv.logger';

describe('TSKVLogger', () => {
  let logger: TSKVLogger;

  beforeEach(() => {
    logger = new TSKVLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log messages in TSKV format and call console.log', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const message = 'Test log message';
    const context = 'TestContext';

    logger.log(message, context);

    expect(console.log).toHaveBeenCalledTimes(1);

    const loggedStr = (console.log as jest.Mock).mock.calls[0][0];

    expect(loggedStr).toContain('tskv');
    expect(loggedStr).toContain(`level=log`);
    expect(loggedStr).toContain(`context=${context}`);
    expect(loggedStr).toContain(`message=${message}`);
    expect(loggedStr).toMatch(/timestamp=\d{4}-\d{2}-\d{2}T/);
  });

  it('should format error messages and call console.error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const message = 'Error message';
    const trace = 'Stack trace';
    const context = 'ErrorContext';

    logger.error(message, trace, context);

    expect(console.error).toHaveBeenCalledTimes(1);

    const loggedStr = (console.error as jest.Mock).mock.calls[0][0];

    expect(loggedStr).toContain('tskv');
    expect(loggedStr).toContain('level=error');
    expect(loggedStr).toContain(`context=${context}`);
    expect(loggedStr).toContain(`message=${message}`);
    expect(loggedStr).toContain(`trace=${trace}`);
  });
});
