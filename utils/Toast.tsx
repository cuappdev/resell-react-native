import Toast from "react-native-root-toast";
export const makeToast = ({
  message,
  type = "INFO",
}: {
  message: string;
  type?: "INFO" | "ERROR";
}) => {
  return Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    backgroundColor: type === "ERROR" ? "#FEE6E6" : "#F6F1FF",
    textColor: type === "ERROR" ? "#F20000" : "#9E70F6",
    textStyle: { fontWeight: "500" },
    shadow: false,
    animation: true,
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
