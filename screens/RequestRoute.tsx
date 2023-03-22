import { platform } from "os";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import RequestCard from "../components/RequestCard";
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
  const [refreshing, setRefreshing] = React.useState(false);

  const renderItem = ({ item, index }) => {
    var length = 0;

    if (item.matches != undefined) {
      length = item.matches.length;
    }

    return (
      <RequestCard
        title={item.title}
        description={item.title}
        numberReceived={length}
        requestId={item.id}
        index={index}
        row={row}
        prevOpenedRow={prevOpenedRow}
        setPrevOpenedRow={setPrevOpenedRow}
        navigation={navigation}
      />
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
              Looking for something that isn't listed? Submit a request, and we
              will notify you when someone lists something similar.
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
