// Libraries
import API from 'handy-api';

// Config
import {DEFAULT_CONFIG} from './config';

class Akio {
  async init({token, ...config} = {}) {
    this.token = token;
    this.config = {...DEFAULT_CONFIG, ...config};
    this.api = new API({
      baseUrl: this.config.apiHost,
    });

    return this.post({
      path: '/init',
      params: {
        token,
      },
    });
  }

  async identify({userId} = {}) {
    this.userId = userId;

    return this.post({
      path: '/identify',
      params: {
        // TODO
      },
    })
  }

  async track({event} = {}) {
    // TODO
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
