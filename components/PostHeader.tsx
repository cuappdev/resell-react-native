import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function PostHeader() {

    const _close = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');
  
    const _handleMore = () => console.log('Shown more');

    return(
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon="close" onPress={_close} />
            <Text>New Listing</Text>
            <Appbar.Action icon="pencil-plus" onPress={_handleMore} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },


})