import "dotenv/config";
export default {
  expo: {
    name: "Resell",
    slug: "Resell",
    version: "1.0.5",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    notification: {
      icon: "./assets/images/icon.png",
      color: "#000000",
    },
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    androidStatusBar: {
      backgroundColor: "#ffffff",
      translucent: false,
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "Allow Resell to access your photos to let you share them.",
          cameraPermission: "Allow Resell to access your camera.",
        },
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/images/icon.png",
          color: "#ffffff",
          sounds: [
            // "./local/assets/notification-sound.wav",
            // "./local/assets/notification-sound-other.wav"
          ],
        },
      ],
      "@react-native-google-signin/google-signin",
      "@react-native-firebase/crashlytics",
    ],
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.cornellappdev.resell",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_INFO_PLIST ||
        "./config/GoogleService-Info.plist",
      buildNumber: "16",
      infoPlist: {
        NSCalendarsUsageDescription: "Allow Resell to access your calendar",
        NSRemindersUsageDescription: "Allow Resell to access your reminders",
      },
      config: {
        usesNonExemptEncryption: false,
      },
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: ["READ_CALENDAR", "WRITE_CALENDAR"],

      package: "com.cornellappdev.resell.android",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON || "./config/google-services.json",
      versionCode: 2,
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "https",
              host: "*.myapp.io",
              pathPrefix: "/records",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    packagerOpts: {
      config: "metro.config.js",
      sourceExts: [
        "expo.ts",
        "expo.tsx",
        "expo.js",
        "expo.jsx",
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "wasm",
        "svg",
      ],
    },

    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      eas: {
        projectId: "22e60432-5ecd-4672-a160-0a0c72395237",
      },
    },
  },
};
