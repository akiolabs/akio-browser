class Logger {
  constructor({debug, verbose}) {
    this.debug = debug;
    this.verbose = verbose;
  }

  log(message) {
    console.log(`[Akio] ${message}`);
  }

  error(message) {
    this.log(message);
  }

  verbose(message) {
    if (this.verbose) {
      this.log(message);
    }
  }

  debug(message) {
    if (this.debug) {
      this.log(message);
    }
  }

  info(message) {
    this.log(message);
  }
}

export {
  Logger,
};
