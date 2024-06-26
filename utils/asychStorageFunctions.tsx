import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeSignedIn = async (signedIn) => {
  try {
    await AsyncStorage.setItem("signedIn", signedIn);
  } catch (e) {
    console.log(e);
  }
};

export const storeOnboarded = async (onboard: boolean) => {
  try {
    await AsyncStorage.setItem("onboard", onboard.toString());
  } catch (e) {
    console.log(e);
  }
};

export const storeEmail = async (email) => {
  try {
    await AsyncStorage.setItem("email", email);
  } catch (e) {
    console.log(e);
  }
};

export const storeDeviceToken = async (token) => {
  try {
    await AsyncStorage.setItem("fcmToken", token);
  } catch (e) {
    console.log(e);
  }
};

export const storeUserId = async (userid: string) => {
  try {
    await AsyncStorage.setItem("userId", userid);
  } catch (e) {
    console.log(e);
  }
};

export const storeUsername = async (username: string) => {
  try {
    await AsyncStorage.setItem("username", username);
  } catch (e) {
    console.log(e);
  }
};

export const storeAccessToken = async (accessToken: string) => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
  } catch (e) {
    console.log(e);
  }
};

export const storeRefreshToken = async (refreshToken) => {
  try {
    await AsyncStorage.setItem("refreshToken", refreshToken);
  } catch (e) {
    console.log(e);
  }
};

export const storeExpireAt = async (expiresAt) => {
  try {
    await AsyncStorage.setItem("expireAt", expiresAt);
  } catch (e) {
    console.log(e);
  }
};

export const storeCalendarID = async (calendarID) => {
  try {
    await AsyncStorage.setItem("calendarID", calendarID);
  } catch (e) {
    console.log(e);
  }
};

export const storeGoogleSignInData = async (signInData) => {
  try {
    await AsyncStorage.setItem("googleSignInData", signInData);
  } catch (e) {
    console.log(e);
  }
};

export const getOnboard = async (setOnBoarded) => {
  AsyncStorage.getItem("onboard", async (errs, result) => {
    if (!errs && result !== null && result !== "false") {
      setOnBoarded(true);
    }
  });
};

export const getSignedIn = async (setSigned) => {
  AsyncStorage.getItem("signedIn", async (errs, result) => {
    if (!errs && result !== null) {
      if (result === "true") {
        setSigned(true);
      } else {
        setSigned(false);
      }
    }
  });
};

export const getEmail = async (setEmail) => {
  AsyncStorage.getItem("email", async (errs, result) => {
    if (!errs && result !== null) {
      setEmail(result);
    }
  });
};

export const getDeviceToken = async (setDeviceToken) => {
  AsyncStorage.getItem("fcmToken", async (errs, result) => {
    if (!errs && result !== null) {
      setDeviceToken(result);
    }
  });
};

export const getUserId = async (setUserId) => {
  AsyncStorage.getItem("userId", async (errs, result) => {
    if (!errs && result !== null) {
      setUserId(result);
    }
  });
};

export const getUsername = async (setUsername) => {
  AsyncStorage.getItem("username", async (errs, result) => {
    if (!errs && result !== null) {
      setUsername(result);
    }
  });
};

export const getAccessToken = async (setAccessToken) => {
  AsyncStorage.getItem("accessToken", async (errs, result) => {
    if (!errs && result !== null) {
      setAccessToken(result);
    }
  });
};

export const getCalendarID = async (
  setCalendarID: React.Dispatch<React.SetStateAction<string>>
) => {
  AsyncStorage.getItem("calendarID", async (errs, result) => {
    if (!errs && result !== null) {
      setCalendarID(result);
    }
  });
};

export const getGoogleSignInData = async (setGoogleSignInData) => {
  AsyncStorage.getItem("googleSignInData", async (errs, result) => {
    if (!errs && result !== null) {
      setGoogleSignInData(JSON.parse(result));
    }
  });
};

export const returnAccessToken = () => AsyncStorage.getItem("accessToken");
