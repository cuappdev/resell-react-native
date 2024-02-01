# Resell for iOS & Android

> Resell is an app that collects, filters, and compares different items that people want to resell in order to connect sellers with buyers and to facilitate resource utilization.

Resell is AppDev's first app built using React Native to support both iOS and Android platforms simultaneoulsy, reduce code duplication, and ensure consistency across platforms.

## Initializing the project

```
git clone https://github.com/cuappdev/resell-react-native.git
cd resell-react-native
```

## Starting the development server

For sign in, we are using React Native Google Sign In, which requires custom native code.
Therefore you must build for Android or iOS.

### Steps for iOS:

1. Add necessary environment varibles in `.env`, and add your `GoogleService-Info.plist` file to the `config` folder.
2. Execute the following terminal commands:
3. `yarn`
4. `cd ios`
5. `pod install`
6. `cd ../`
7. `npx expo run:ios`

## Reference and next steps

For next steps on how to open the app on iOS or Android devices, please refer to [Expo's official documentation on the topic](https://docs.expo.dev/get-started/create-a-new-app/).

## Troubleshooting

If you get errors in running `expo start`, try the following:

1. remove node_modules: `rm -rf node_modules`
2. remove yarn.lock: `rm yarn.lock`
3. install dependencies: `yarn install` or `npm install`

After installing dependencies, if you are still getting errors like `zsh: command not found: expo`, try the following:

1. npm install -g expo-cli
2. expo --version
