import * as React from 'react';
import BackButton from '../assets/svg-components/back_button';
import BookMarkButton from '../assets/svg-components/bookmark_button';
import ExportButton from '../assets/svg-components/export_button';
import { Item, DetailPullUpHeader, DetailPullUpBody } from "../components/DetailPullup";
import Gallery from '../components/Gallery'
import { View, TouchableOpacity, Text, SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { useEffect } from 'react';
import GreyButton from '../components/GreyButton';

const menuBarTop = Platform.OS === 'android' ? 47 : 67

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: menuBarTop,
    left: 20,
    zIndex: 1,
    width: 20,
    height: 30,
  },
  bookmarkButton: {
    position: 'absolute',
    top: menuBarTop,
    right: 65,
    zIndex: 1,
    width: 20,
    height: 30,
  },
  exportButton: {
    position: 'absolute',
    top: menuBarTop,
    right: 20,
    zIndex: 1,
    width: 20,
    height: 30,
  },
  slideUp: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  greyButton: {
    position: 'absolute',
    bottom: 100,
    alignItems: "center",
    width: '100 %',
    zIndex: 10,
    height: 170,
    backgroundColor: 'white',

  },
});

export default function ProductDetailsScreen({ navigation }) {
  const item: Item = {
    images: [require('../assets/images/bluepants.png')],
    title: 'Blue Pants',
    price: 25,
    sellerName: 'ravina patel',
    sellerProfile: '../assets/images/profile-pic-test.png',
    description: 'Vintage blue pants that are super comfy and cool!',

    similarItems: [require('../assets/images/similar-items-test.png')]
  }
  useEffect(() => {
    this._panel.show(400);
  })
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { }}
        style={styles.bookmarkButton}
      >
        <BookMarkButton />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { }}
        style={styles.exportButton}
      >
        <ExportButton />
      </TouchableOpacity>



      <Gallery imagePaths={item.images} />
      <SlidingUpPanel ref={c => this._panel = c} draggableRange={{ top: 720, bottom: 300 }}>
        <View style={styles.slideUp}>
          <DetailPullUpHeader item={item} />
          <DetailPullUpBody item={item} />

          <View style={styles.greyButton}>
            <GreyButton text={'Contact Seller'} />
          </View>




        </View>
      </SlidingUpPanel>
    </View>
  )
}
