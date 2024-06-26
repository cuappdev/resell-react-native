import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import RequestCard from "../components/RequestCard";
import { bottomTabsHeight } from "../constants/Layout";
import { fonts } from "../globalStyle/globalFont";

export const RequestRoute = ({
  navigation,
  isLoading,
  fetchFailed,
  requests,
  onRefresh,
}) => {
  let row: Array<any> = [];
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>(null);

  const renderItem = ({ item, index }) => {
    let length = 0;

    if (item.matches) {
      length = item.matches.length;
    }

    return (
      <View>
        <RequestCard
          title={item.title}
          description={item.description}
          numberReceived={length}
          requestId={item.id}
          index={index}
          row={row}
          prevOpenedRow={prevOpenedRow}
          setPrevOpenedRow={setPrevOpenedRow}
          navigation={navigation}
          updateScreen={onRefresh}
        />
        {index === requests.length - 1 && (
          <View style={{ height: bottomTabsHeight }} />
        )}
      </View>
    );
  };
  return (
    <TouchableOpacity
      style={{ height: "100%", width: "100%" }}
      activeOpacity={1}
      onPress={() => {
        if (prevOpenedRow) {
          prevOpenedRow.close();
          setPrevOpenedRow(null);
        }
      }}
    >
      <View style={{ height: "100%", paddingTop: 14 }}>
        {/* {isLoading ? ( <View style={[styles.textBox]}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={1} style={styles.description}>
            {description}
          </Text>
        </View>
       
        ) :  */}
        {fetchFailed || requests.length == 0 ? (
          <View
            style={[
              styles.noResultView,
              Platform.OS === "ios"
                ? { marginBottom: 60 }
                : { marginBottom: 90 },
            ]}
          >
            <Text style={[fonts.pageHeading2, { marginBottom: 8 }]}>
              No active requests
            </Text>
            <Text
              style={[
                fonts.body1,
                {
                  color: "#707070",
                  textAlign: "center",
                  paddingHorizontal: "10%",
                },
              ]}
            >
              Submit a request and get notified when someone lists something
              similar
            </Text>
          </View>
        ) : (
          <FlatList
            data={requests}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  noResultView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
