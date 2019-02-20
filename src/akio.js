// Libraries
import API from 'handy-api';
import snakecaseKeys from 'snakecase-keys';

// Config
import {DEFAULT_CONFIG} from './config';

const AKIO_SESSION_ID_KEY = 'akio_session_id';

class Akio {
  static async init({token, ...config} = {}) {
    const akio = new Akio({token, config});
    await akio.init();
    return akio;
  }

  constructor({token, config} = {}) {
    this.token = token;
    this.sessionId = this.getCookie({key: AKIO_SESSION_ID_KEY});
    this.userId = null;
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

  getCookie({key}) {
    // TODO
  }

  saveCookie({key, value}) {
    // TODO
  }

  async init() {
    const {token, sessionId} = this;

    this.log(`init with token: ${token}.`);
    try {
      const response = await this.post({
        path: '/init',
        params: {
          token,
          sessionId,
        },
      });

      // Parse the response as JSON.
      const json = await response.json();

      // If we get a valid response, save the session_id.
      this.sessionId = json.session_id;
      this.saveCookie({key: AKIO_SESSION_ID_KEY, value: this.sessionId});
    } catch (error) {
      this.log(`Failed to init: ${error.message}`);
    }
  }

  async identify({userId, userAddress, ...properties} = {}) {
    const {token, sessionId} = this;
    this.userId = userId;

    this.log(`identify with userId: ${userId}.`);
    return this.post({
      path: '/identify',
      params: {
        token,
        sessionId,
        userId,
        userAddress,
        source: {
          // TODO
        },
        properties,
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
    return this.api.request({
      method: 'POST',
      path,
      headers: {
        'Content-Type': 'application/json',
      },

      // Convert the keys of the params to snakecase. We want to allow nested
      // keys to be user-defined - camelCase or with spaces are both valid.
      params: snakecaseKeys(params, {deep: false}),
    });
  }
}

export default Akio;
