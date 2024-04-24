import { Text, View } from "react-native";

export default function UnreadBubble({
  numberUnread,
}: {
  numberUnread: number;
}) {
  return (
    <View
      style={{
        backgroundColor: "#FF0000",
        borderRadius: 8,
        width: 20,
        marginLeft: 8,
        paddingHorizontal: 6,
        // paddingVertical: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#FFFFFF" }}>{numberUnread}</Text>
    </View>
  );
}
