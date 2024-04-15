import { DocumentData } from "firebase/firestore";

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

export const formatSingleItem = (item: string): string => {
  if (item.length > 10) {
    return item.slice(0, -3) + "...";
  }
  return item;
};
