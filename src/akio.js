// Libraries
import API from 'handy-api';

// Config
import {DEFAULT_CONFIG} from './config';

class Akio {
  async static init({token, ...config} = {}) {
    return new Akio({token, config}).init();
  }

  constructor({token, config} = {}) {
    this.token = token;
    this.config = {...DEFAULT_CONFIG, ...config};
    this.api = new API({
      baseUrl: this.config.apiHost,
    });
  }

  log(message) {
    if (this.config.verbose) {
      console.log(`[Akio]: ${message}`);
    }
  }

  async async init() {
    const {token} = this;

    this.log(`init with token: ${token}.`);
    return this.post({
      path: '/init',
      params: {
        token,
      },
    });
  }

  async identify({userId} = {}) {
    this.userId = userId;

    this.log(`identify with userId: ${userId}.`);
    return this.post({
      path: '/identify',
      params: {
        // TODO
      },
    })
  }

  async track({event} = {}) {
    // TODO
    this.log(`track with event: ${event}.`);
    return this.post({
      path: '/track',
      params: {
        // TODO
      },
    });
  }

  async post({path, params} = {}) {
    this.api.request({
      method: 'POST',
      path,
      headers: {},
      params,
    });
  }
}

export default Akio;
