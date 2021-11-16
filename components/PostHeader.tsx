import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function PostHeader() {

    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');
  
    const _handleMore = () => console.log('Shown more');

    return(
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({

    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },


})