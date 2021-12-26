import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text, View,
} from 'react-native';
import {Actions} from "react-native-router-flux";
import MIcon from 'react-native-vector-icons/MaterialIcons';

export default class HeaderLayout extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row-reverse',
        backgroundColor:'#414143'
    }
});
