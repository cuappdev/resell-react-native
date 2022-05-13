import "dotenv/config";
export default {
  expo: {
    name: "resell-typescript",
    slug: "resell-typescript",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
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
    ],
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.cornellappdev.resell",
      // config: {
      //   googleSignIn: {
      //     reservedClientId:
      //       "com.googleusercontent.apps.603386649315-1b2o2gole94qc6h4prj6lvoiueq83se4",
      //   },
      // },
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },

      package: "com.cornellappdev.resell",
      googleServicesFile: "./config/google-services.json",

      softwareKeyboardLayoutMode: "pan",
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
    },
  },
};
