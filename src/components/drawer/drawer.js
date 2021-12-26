import React, { Component } from 'react';
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {removeUser} from "../../redux/actions";
import MIcon from 'react-native-vector-icons/MaterialIcons';

class DrawerLayout extends Component{
    render(){
        return(<View style={styles.container}>
            <TouchableOpacity  style={styles.buttons} onPress={()=>{
                Actions.homep();
            }}>
                <MIcon name="home" size={25} color="white"/>
                <Text style={styles.buttonsText}>خانه</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.buttons} onPress={()=>{
                Actions.homep();
            }}
            >
                <MIcon name="person" size={25} color="white"/>
                <Text style={styles.buttonsText}>حساب کاربری</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.buttons} onPress={()=>{
                Actions.profilep();
            }}
            >
                <MIcon name="star" size={25} color="white"/>
                <Text style={styles.buttonsText}>برترین ها</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.buttons} onPress={()=>{
                Actions.searchp();
            }}
            >
                <MIcon name="search" size={25} color="white"/>
                <Text style={styles.buttonsText}>جست و جو</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.buttons} onPress={()=>{
                Actions.settingp();
            }}>
                <MIcon name="settings" size={25} color="white"/>
                <Text style={styles.buttonsText}>تنظیمات</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.buttons} onPress={()=>{
                Actions.helpp();
            }}
            >
                <MIcon name="help" size={25} color="white"/>
                <Text style={styles.buttonsText}>راهنما</Text>
            </TouchableOpacity>
        </View>);
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#818286',
        flex:1
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderBottomColor:'white',
        borderBottomWidth:1,
    },
    buttonsText:{
        color:'white',
        fontSize:17,
    }
});
const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
};
const mapDispatchToProps=(dispatch)=> {
    return{
        removeUser:(user)=>{
            dispatch(removeUser(user));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DrawerLayout);