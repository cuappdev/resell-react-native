import Toast from "react-native-root-toast";
import Colors from "../constants/Colors";
export const makeToast = ({
  message,
  type = "INFO",
  duration = Toast.durations.SHORT,
}: {
  message: string;
  type?: "INFO" | "ERROR";
  duration?: number;
}) => {
  return Toast.show(message, {
    duration: duration,
    position: Toast.positions.TOP,
    backgroundColor: type === "ERROR" ? Colors.errorBg : Colors.toastBg,
    textColor: type === "ERROR" ? Colors.errorState : Colors.resellPurple,
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
export const hideToast = (toast: any) => {
  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function () {
    Toast.hide(toast);
  }, 500);
};
