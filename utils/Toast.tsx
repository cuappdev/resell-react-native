import Toast from "react-native-root-toast";
export const makeToast = (message: string) => {
  return Toast.show(message, {
    // TODO add animation
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    backgroundColor: "#FEE6E6",
    textColor: "#F20000",
    shadow: false,
    animation: false,
    hideOnPress: true,
    containerStyle: {
      borderRadius: 8,
    },
    opacity: 1,
    delay: 0,

    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });
};
export const hideToast = (toast) => {
  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function () {
    Toast.hide(toast);
  }, 500);
};
