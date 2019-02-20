export const getReferringDomain = (referrer) => {
  // TODO
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
  return {
    currentUrl: window.location.href,
    browser: 'Chrome',
    browserVersion: 71,
  };
};

export const getComputerInfo = () => {
  return {
    os: 'Mac OS X',
    screenHeight: window.screen.height,
    screenWidth: window.screen.width,
  };
};

export const getLibraryInfo = () => {
  return {
    platform: 'web',
    library: 'web',
    libraryVersion: '2.22.4',
  };
};

export const getLanguageInfo = () => {
  return {
    language: 'EN_US',
  };
};

export const getSourceInfo = () => ({
  ...getReferrerInfo(),
  ...getBrowserInfo(),
  ...getComputerInfo(),
  ...getLibraryInfo(),
  ...getLanguageInfo(),
});

export const getTimestamp = () => {
  const now = new Date();
  return Math.floor(now.valueOf() / 1000);
};
