// Config
import {DEFAULT_CONFIG} from 'config';

class Akio {
  async init({key, ...config} = {}) {
    this.key = key;
    this.config = {...DEFAULT_CONFIG, ...config};
  }

  async identify({userId} = {}) {
    this.userId = userId;
  }

  async track({event} = {}) {
    // TODO
  }

  async post() {
    // TODO
  }
}

export default Akio;
