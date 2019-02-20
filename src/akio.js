// Libraries
import API from 'handy-api';
import snakecaseKeys from 'snakecase-keys';

// SDK
import {DEFAULT_CONFIG} from './config';
import {cookie, localStorage, noStorage} from './storage';
import {Logger, getReferringDomain} from './utils';

// Constants
const AKIO_SESSION_ID_KEY = 'akio_session_id';

class Akio {
  static async init({token, ...config} = {}) {
    const akio = new Akio({token, config});
    await akio.init();
    return akio;
  }

  constructor({token, config} = {}) {
    // Configure the SDK with user-defined config and also initialize the
    // API connection.
    this.config = {...DEFAULT_CONFIG, ...config};
    this.logger = new Logger({debug: this.config.debug, verbose: this.config.verbose});
    this.storage = this.getStorage();
    this.api = new API({
      baseUrl: this.config.apiHost,
    });

    // Load up the user and source information from the browser / storage.
    this.token = token;
    this.sessionId = this.storage.get({key: AKIO_SESSION_ID_KEY});
    this.userId = null;
  }

  getStorageType() {
    const {persistence} = this.config;
    switch (persistence) {
      case 'cookie':
      case 'localStorage':
        return persistence;
      default:
        this.logger.error(`Unknown persistence type: ${persistence}. Falling back to 'cookie'.`);
        return 'cookie';
    }
  }

  /**
   * Returns the storage medium based on developer preference. Either cookies
   * or localStorage.
   */
  getStorage() {
    const storageType = this.getStorageType();

    switch (storageType) {
      case 'cookie':
        return cookie;
      case 'localStorage':
        return localStorage;
      default:
        return noStorage;
    }
  }

  getReferrerInfo() {
    const referrer = document.referrer || '$direct';
    const referringDomain = getReferringDomain(referrer) || '$direct';

    return {
      initialReferrer: referrer,
      initialReferringDomain: referringDomain,
    };
  }

  getBrowserInfo() {
    return {
      currentUrl: window.location.href,
      browser: 'Chrome',
      browserVersion: 71,
    };
  }

  getComputerInfo() {
    return {
      os: 'Mac OS X',
      screenHeight: 1200,
      screenWidth: 1920,
    };
  }

  getLibraryInfo() {
    return {
      platform: 'web',
      library: 'web',
      libraryVersion: '2.22.4',
    };
  }

  getLanguageInfo() {
    return {
      language: 'EN_US',
    };
  }

  /**
   * Returns the browser info for the current session which we add to each
   * user and event object.
   */
  getSource() {
    return snakecaseKeys({
      ...getReferrerInfo(),
      ...getBrowserInfo(),
      ...getComputerInfo(),
      ...getLibraryInfo(),
      ...getLanguageInfo(),
    });
  }

  getTimestamp() {
    const now = new Date();
    return Math.floor(now.valueOf() / 1000);
  }

  async init() {
    const {token, sessionId} = this;

    if (!token) {
      return this.logger.error(`'init' missing required parameter 'token'.`)
    }

    this.logger.verbose(`'init' with token: ${token}.`);
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
      this.storage.update({key: AKIO_SESSION_ID_KEY, value: this.sessionId});
    } catch (error) {
      this.logger.error(`Failed to init: ${error.message}`);
    }
  }

  async identify({userId, userAddress, ...properties} = {}) {
    const {token, sessionId} = this;
    this.userId = userId;
    this.userAddress = userAddress;

    if (!token || !sessionId) {
      return this.logger.error(`Called 'identify' before successful 'init'.`);
    }

    if (!userId) {
      return this.logger.error(`'identify' missing required parameter 'userId'.`)
    }

    this.logger.verbose(`'identify' with userId: ${userId}.`);
    return this.post({
      path: '/identify',
      params: {
        token,
        sessionId,
        userId,
        userAddress,
        source: this.getSource(),
        properties,
      },
    })
  }

  async track({event, ...properties} = {}) {
    const {token, sessionId, userId, userAddress} = this;

    if (!token || !sessionId) {
      return this.logger.error(`Called 'track' before successful 'init'.`);
    }

    if (!event) {
      return this.logger.error(`'track' missing required parameter 'event'.`)
    }

    this.logger.verbose(`'track' with event: ${event}.`);
    return this.post({
      path: '/track',
      params: {
        timestamp: this.getTimestamp(),
        trackerToken: token,
        sessionId,
        userId,
        userAddress,
        event,
        source: this.getSource(),
        properties,
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
