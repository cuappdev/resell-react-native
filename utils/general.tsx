import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const itemsAsString = (items: DocumentData[]): string => {
  let shownItems: string[] = [];
  let numItems = 0;
  while (
    // offset by 2 so imagine if the comma is already there
    shownItems.toString().replace(/,/g, ", ").length + 2 < 20 &&
    items.length > numItems
  ) {
    shownItems.push(items[numItems].title);
    numItems++;
  }
  let commaSeparatedItems = shownItems.toString().replace(/,/g, ", ");
  if (commaSeparatedItems.length > 20) {
    commaSeparatedItems =
      commaSeparatedItems.substring(0, 20) +
      `... +${Math.max(items.length - shownItems.length, 1)} more`;
  }

  return commaSeparatedItems;
};

export const useKeyboardVisible = (): boolean => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return keyboardVisible;
};
