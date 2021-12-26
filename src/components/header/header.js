import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text, View,
} from 'react-native';
import {Actions} from "react-native-router-flux";
import FIcon from 'react-native-vector-icons/FontAwesome5';

export default class HeaderLayout extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FIcon name="bars" size={25} color="white" onPress={()=>{
                    Actions.drawerOpen()
                }}/>
                {this.props.back&&
                    <FIcon name="chevron-left" size={35} color="white" onPress={()=>{
                        Actions.pop()
                    }}/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
   container:{
       padding:5,
       flexDirection:'row-reverse',
       justifyContent:'space-between',
       backgroundColor:'#00172f'
   },

});
