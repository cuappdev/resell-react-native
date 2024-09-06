# Resell - Cornell Marketplace

<p align="center"><img src="https://github.com/cuappdev/assets/blob/master/app-icons/resell-icon.png" width=210 /></p>

Resell is an app that collects, filters, and compares different items that people want to resell in order to connect sellers with buyers and to facilitate resource utilization. Resell is one of the latest apps by [Cornell AppDev](http://cornellappdev.com), an engineering project team at Cornell University focused on mobile app development. It is Cornell AppDev's first app built using React Native to support both iOS and Android platforms simultaneoulsy, reduce code duplication, and ensure consistency across platforms. Download the current release on the [App Store](https://apps.apple.com/us/app/resell-cornell-marketplace/id1622452299)!

<br />

## System Requirements

You do not need a MacOS device to work on this application. However, you will not be able to run the iOS simulator without a MacOS device. As of 4/19/24, NodeJS version v21.6.1 and yarn version 1.22.22 are compatible.

## Using Firebase

Resell uses two databases per environment. We have a PostgreSQL database that is associated with our Digital Ocean backend server. We also have a Firebase Firestore database (a NoSQL database) under the Resell Firebase project in our Cornell AppDev Google acount.

For Firestore, the `(default)` database corresponds to our development environment and `resell-prod` corresponds to production. **Please be aware of which database to use since frontend is responsible for managing data in Firestore.**

## Getting Started

This app uses native application code, requiring a development build for iOS and Android instead of Expo Go. In order to run the application during development, an Android emulator and iOS simulator will be needed.

### Install an Android Studio Emulator

Set up instructions vary depending on whether or not the operating system is MacOS or Windows. If you don't have an Android device available to test with, use the default emulator that comes with Android Studio. Follow the instructions in [this guide](https://docs.expo.dev/workflow/android-studio-emulator/).

### Install an iOS Simulator

Note that the iOS Simulator can only be installed on macOS.

1. Install Xcode through the Mac App Store.
2. Open Xcode, choose **Settings…** from the Xcode menu. Go to **Locations** and install the tools by selecting the most recent version in the **Command Line Tools** dropdown.

If you are developing an iOS app from a Windows or a Linux machine, you will need a physical iOS device.

## Importing Environment Variables and Secrets

For AppDev members, you can find the files from the `#resell-frontend` Slack channel.

1. Create a `.env` file in the **root directory** and copy/paste the values from the pinned message.
   1. Note that there are two different `.env` files: development and production.
2. Download `GoogleService-Info.plist` and `google-services.json` and place both files in the `/config` folder.
3. Also, drag `GoogleService-Info.plist` into `ios/Resell` folder. DO NOT do this through Xcode.

## Installing Dependencies

This codebase uses Node packages for dependencies. Android packages are managed through Gradle, and iOS packages are managed using CocoaPods.

It is highly recommended to use yarn instead of npm. If you do not have yarn installed, you can do it with `npm install --global yarn`. Note that you will need to have NodeJS and npm installed in order to install yarn. Then, run `yarn install` in the root directory to install dependencies.

You will also need to install CocoaPods dependencies: `cd ios` then `pod install`. If you don't have CocoaPods installed, you can install it with `sudo gem install cocoapods`.

## Creating and Running the Development Build

### Additional steps for Android:

If you plan to run the app on the Android simulator, you need to specify the location of your Android SDK. To do this, follow the steps [here](https://stackoverflow.com/a/48155800).

If you are still having issues building, make sure your Java version is compatible with the Gradle version. As of when this was written we were using Gradle version 8.0.1, so you need to have Java 19 or below to build the app. We recommend Java 17 since this is what we have been using.

### General instructions

If this is your first time running the application, you must first create the development build.

- For Android, run `yarn android`.
- For iOS, run `yarn ios`.

If you already have a development build created, you can just start the development server.

- `yarn start`

Once the development server is up, you can press `i` to open the iOS simulator, `a` to open the Android emulator, and `r` to hot reload the app. Make sure that the top says “Using development build.” Press `CTRL + C` on your keyboard to stop the server at any time.

### Switching Environments

If you need to switch between environments, make sure that you are using the correct environment variables in the `.env` file. Then, run `yarn start --reset-cache`. Make sure you include the flag to reset the cache!

## Deployment

1. In `app.config.ts`, change `expo.version` to the next version and increment `ios.buildNumber` by 1.
2. Create a PR to merge `main` to `release`.
3. A GitHub Actions workflow should automatically run. Note that EAS Build and EAS Submit can be quite buggy sometimes so manual deployment may need to be done. If that's the case, make sure that you update the versions properly through the native files (such as Xcode).

## Troubleshooting

- The Classic Fix — Delete `node_modules` and run `yarn install`.
- If iOS dependencies are not working, try `cd ios` and then `pod install`. You may also need to delete `Podfile.lock`.
