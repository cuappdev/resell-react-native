import React from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import Button from "../components/Button";

export function ButtonBanner(props) {
  /**
   *
   * @param {state} count - state passed in representing which button is getting clicked, should be less than equal to len(data) -1
   * @param {setState} setCount - setState method passed in to change the current count when new button get clicked
   * @param {list} data - a list of button names
   * @returns a horizontally scrollable button banner
   */
  const renderButton = ({ item, index }: { item: any; index: number }) => (
    <>
      {index === 0 && <View style={{ width: 8 }} />}
      <Button
        title={item.title}
        id={item.id}
        count={props.count}
        setCount={props.setCount}
        modalVisible={props.modalVisible}
        setModalVisible={props.setModalVisible}
        availabilityVisible={props.availabilityVisible}
        setAvailabilityVisible={props.setAvailabilityVisible}
        setIsBubble={props.setIsBubble}
        alwaysColor={props.alwaysColor}
        otherEmail={props.otherEmail}
      />
      {index === props.data.length - 1 && <View style={{ width: 8 }} />}
    </>
  );

  return (
    <SafeAreaView style={styles.filter}>
      <FlatList
        data={props.data}
        renderItem={renderButton}
        keyExtractor={(item) => item.id.toString(10)}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        horizontal={true}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  filter: { paddingHorizontal: 0, marginTop: 9, marginBottom: 6 },
});

export default ButtonBanner;
