import { DevLogger } from './dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;
  const mockFn = jest.fn();

  beforeEach(() => {
    logger = new DevLogger();

    logger.log = mockFn;
    logger.error = mockFn;
    logger.warn = mockFn;
    logger.debug = mockFn;
    logger.verbose = mockFn;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call log()', () => {
    logger.log('Test log', 'TestContext');
    expect(mockFn).toHaveBeenCalledWith('Test log', 'TestContext');
  });

  it('should call error()', () => {
    logger.error('Error message', 'stack trace', 'ErrorContext');
    expect(mockFn).toHaveBeenCalledWith(
      'Error message',
      'stack trace',
      'ErrorContext',
    );
  });

  it('should call warn()', () => {
    logger.warn('Warning!', 'WarnContext');
    expect(mockFn).toHaveBeenCalledWith('Warning!', 'WarnContext');
  });

  it('should call debug()', () => {
    logger.debug('Debug message', 'DebugContext');
    expect(mockFn).toHaveBeenCalledWith('Debug message', 'DebugContext');
  });

  it('should call verbose()', () => {
    logger.verbose('Verbose message', 'VerboseContext');
    expect(mockFn).toHaveBeenCalledWith('Verbose message', 'VerboseContext');
  });
});
