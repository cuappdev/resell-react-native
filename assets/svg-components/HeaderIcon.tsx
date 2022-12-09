import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";

export function HeaderIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size: number;
}) {
  return <Feather {...props} />;
}
