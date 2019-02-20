// Libraries
import cookies from 'browser-cookies';

export const cookie = {
  isSupported() {
    return true;
  },
  get({key}) {
    return cookies.get(key);
  },
  set({key, value}) {
    return cookies.set(key, value);
  },
  remove({key}) {
    return cookies.erase(key);
  },
};

export const localStorage = {
  isSupported() {
    try {
      const key = 'hasLocalStorage';
      localStorage.set({key, value: true});
      localStorage.get({key});
      return true;
    } catch (error) {
      return false;
    }
  },
  get({key}) {
    return window.localStorage.getItem(key);
  },
  set({key, value}) {
    return window.localStorage.setItem(key, value);
  },
  remove({key}) {
    return window.localStorage.removeItem(key);
  },
};

export const noStorage = {
  isSupported() {
    return true;
  },
  get({key}) {
    // noop
  },
  set({key, value}) {
    // noop
  },
  remove({key}) {
    // noop
  },
};
