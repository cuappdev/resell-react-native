import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Feather } from "@expo/vector-icons";

const OptionsMenu = ({ items }) => {

  const renderMenuItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.item} onPress={item.onPress}>
      <Text style={[styles.text, (item.label == "Delete") && { color: "#D85454" }]}>{item.label}</Text>
      <Feather style={styles.icon} name={item.iconName} size={20} color={item.label == "Delete" ? "#D85454" : "black"} />
    </TouchableOpacity>
  );

  const renderDivider = (key) => (
    <View key={key} style={styles.divider} />
  );

  const menuItems = items.reduce((acc, item, index) => {
    if (item) {
      acc.push(renderMenuItem(item, index));

      if (index !== items.length - 1) {
        acc.push(renderDivider(index));
      }
    }

    return acc;
  }, []);

  return <View style={styles.container}>{menuItems}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    marginLeft: 16,
    marginVertical: 12,
    fontSize: 18,
    fontFamily: "SF Pro Text"
  },
  icon: {
    position: "absolute",
    right: 16,
    width: 20,
    height: 20
  },
  divider: {
    height: 1,
    backgroundColor: '#3C3C4344',
  },
});

export default OptionsMenu;
