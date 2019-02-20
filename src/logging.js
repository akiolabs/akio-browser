class Logger {
  constructor({debug, verbose}) {
    this._debug = debug;
    this._verbose = verbose;
  }

  log(message) {
    console.log(`[Akio] ${message}`);
  }

  error(message) {
    this.log(message);
  }

  verbose(message) {
    if (this._verbose) {
      this.log(message);
    }
  }

  debug(message) {
    if (this._debug) {
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
