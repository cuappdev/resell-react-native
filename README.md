# Resell for iOS & Android

<p align="center"><img src="https://github.com/cuappdev/assets/blob/master/app-icons/resell-icon.png" width=210 /></p>

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

### Steps for Android:

We are currently facing build issues for Android. Unfortunately we cannot just use Expo Go since this project uses React Native Google Sign In. We are going to prioritize iOS for now but when we get Android to consistently build this file will be updated.

## Troubleshooting

If you are having issues after following the above steps, try checking the following:

1. You have a `.env` in the root folder with all necessary environment variables, and you have the `GoogleService-Info.plist` file in the config folder.
2. Make sure your `yarn.lock` is synced with version control, delete `node_modules` and run `yarn` in the root folder.
3. Ensure that you have the pods installed by the following the provided steps.
