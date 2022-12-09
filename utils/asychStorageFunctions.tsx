import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeSignedIn = async (signedIn) => {
  try {
    await AsyncStorage.setItem("signedIn", signedIn);
  } catch (e) {
    console.log(e);
  }
};
export const storeOnboarded = async (onboard) => {
  try {
    await AsyncStorage.setItem("onboard", onboard);
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

export const storeUserId = async (userid) => {
  try {
    await AsyncStorage.setItem("userId", userid);
  } catch (e) {
    console.log(e);
  }
};

export const storeAccessToken = async (accessToken) => {
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

export const getOnboard = async (setOnBoarded) => {
  AsyncStorage.getItem("onboard", async (errs, result) => {
    if (!errs && result !== null) {
      setOnBoarded(true);
    }
  });
};
export const getSignedIn = async (setSigned) => {
  AsyncStorage.getItem("signedIn", async (errs, result) => {
    if (!errs && result !== null) {
      if (result == "true") {
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
export const getUserId = async (setUserId) => {
  AsyncStorage.getItem("userId", async (errs, result) => {
    if (!errs && result !== null) {
      setUserId(result);
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

export const getRefreshToken = async (setRefreshToken) => {
  AsyncStorage.getItem("refreshToken", async (errs, result) => {
    if (!errs && result !== null) {
      setRefreshToken(result);
    }
  });
};
export const getExpiredAt = async (setExpiredAt) => {
  AsyncStorage.getItem("expireAt", async (errs, result) => {
    if (!errs && result !== null) {
      setExpiredAt(result);
    }
  });
};
