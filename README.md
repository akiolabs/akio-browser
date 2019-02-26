# Akio JavaScript SDK

The Akio JavaScript SDK is used to collect web analytics for decentralized applications.

## Installation

This library is available as a [package on NPM](https://www.npmjs.com/package/akio-browser). To add to your project, run:

```sh
yarn add akio-browser
```

## Usage

Once the package is installed, import it like a normal Node.js module.

```js
import Akio from 'akio-browser';
```

The `Akio` object contains 3 main methods:

### Init

Initialize the `Akio` instance by providing your token. You can get a token by creating an account on [Akio Insights](https://insights.akiolabs.com).

```js
const akio = Akio.init({
  token: 'your-token-here',
});
```

Other `init` options:

### Identify

To identify a specific user on your application, provide a unique `userId` for each user. You may also pass a user's wallet address as `userAddress` to automatically join with on-chain data on Akio Insights.

Additional properties supplied to the `identify` method will be saved on the user object and viewable on a user's profile.

```js
akio.identify({
  userId: 'user@example.com',
  userAddress: '0xdf215d5794bd2fb6eab88d05aabcbc8766ef4480',
});
```

### Track

To track an event, simply provide an `event` name to the `track` call. Browser information is automatically logged with each event so the only required argument is the event name.

Additional properties supplied to the `track` method will be saved and associated with this event. All event properties are viewable on the live view for your app on Akio Insights.

```js
akio.track({
  event: 'Viewed Home Page',
});
```

## Contact

If you have any questions or would like to get early-access to the SDK, contact us at [team@akiolabs.com](team@akiolabs.com).
