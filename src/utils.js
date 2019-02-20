// Libraries
import {detect} from 'detect-browser';
import locale2 from 'locale2'

// SDK
import packageJSON from '../package.json';

// Ex. https://www.google.com/some-path --> www.google.com
export const getReferringDomain = (referrer) => {
  const parts = referrer.split('/');
  return parts.length >= 3 ? parts[2] : '';
};

export const getReferrerInfo = () => {
  const referrer = document.referrer || '$direct';
  const referringDomain = getReferringDomain(referrer) || '$direct';

  return {
    initialReferrer: referrer,
    initialReferringDomain: referringDomain,
  };
};

export const getBrowserInfo = () => {
  const browser = detect() || {};

  return {
    currentUrl: window.location.href,
    browser: browser.name,
    browserVersion: browser.version,
    os: browser.os,
  };
};

export const getDeviceInfo = () => {
  return {
    screenHeight: window.screen.height,
    screenWidth: window.screen.width,
  };
};

export const getLibraryInfo = () => {
  return {
    platform: 'web',
    library: 'web',
    libraryVersion: packageJSON.version,
  };
};

export const getLocaleInfo = () => {
  return {
    locale: locale2,
  };
};

export const getSourceInfo = () => ({
  ...getReferrerInfo(),
  ...getBrowserInfo(),
  ...getDeviceInfo(),
  ...getLibraryInfo(),
  ...getLocaleInfo(),
});

export const getTimestamp = () => {
  const now = new Date();
  return Math.floor(now.valueOf() / 1000);
};
