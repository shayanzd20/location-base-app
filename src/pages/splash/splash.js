import React, { Component } from 'react';

import {Image, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import  {Animated,Easing}from "react-native";
import {removeUser, saveUser} from "../../redux/actions";
import Http from "../../services/http";
import Pushe from 'react-native-pushe'

class Splash extends Component {
    state = {
        offsetX: new Animated.Value(0),
    }

    componentWillMount() {
        // Pushe.initialize(false);
        // Pushe.getPusheId((pusheId) => {
        //     console.log(pusheId)
        // })
    };
    render() {

        if (this.props.rehydrated) {
           //setTimeout(()=>{
               if (this.props.user && this.props.user.token) {
                   this._getUserData();
               } else {
                   Actions.loginp();
               }
          // },2000)
        }
                return (
                    <View style={styles.container}>
                        <Image style={styles.bgimage} source={require('../../assets/images/bg.png' )}/>
                        <View style={styles.content}>
                            <Animated.View
                                style={[styles.logo, {flexDirection: 'row'}, {transform: [{translateX: this.state.offsetX}]}]}>
                                <Image source={require("./../../assets/images/logo.png")} style={styles.logo}/>
                            </Animated.View>
                        </View>
                    </View>
                );
    }

    _getUserData=async()=> {
        let res=await Http._postAsyncData({token:this.props.user.token},"api/status")
        let user=res.status;
        user.token=this.props.user.token;
        Actions.reset('drawer');
        this.props.saveUser(user);
    }
}
const styles=StyleSheet.create({
    bgimage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    logo:{
        width:150,
        height:150,

        // flex:1,
        // // height:75,
        // // backgroundColor:'blue'
    },
    container:{
        flex:1,backgroundColor:'rgba(0,0,0,0)'
    },
    content:{flex:1,backgroundColor:'rgba(0,0,0,0)',justifyContent:'center',alignItems:'center',flexWrap:'wrap',flexDirection:'row'}
})


const mapStateToProps=state=>{
    return{
        user:state.user,
        rehydrated:state.rehydrated
    }
}
const mapDispatchToProps=(dispatch)=> {
    return{
        saveUser:(messages)=>{
            dispatch(saveUser(messages))
        },
        removeUser:()=>{
            dispatch(removeUser())
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Splash)