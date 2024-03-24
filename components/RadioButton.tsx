import React from "react";
import { TouchableOpacity } from "react-native";
import FilledCircle from "./svg/FilledCircle";
import OutlinedCircle from "./svg/OutlinedCircle";

export default function RadioButton({
  isToggled,
  setIsToggled,
}: {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        setIsToggled((toggled) => !toggled);
      }}
    >
      {isToggled ? <FilledCircle /> : <OutlinedCircle />}
    </TouchableOpacity>
  );
}
