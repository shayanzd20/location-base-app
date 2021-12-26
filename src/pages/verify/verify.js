import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, ImageBackground, TextInput
} from "react-native";
import {removeUser, saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import HeaderLayout from "../../components/header/header";
import styles from './verify.css'
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {Button, Input} from 'react-native-elements';
import Http from "../../services/http";
// import DeviceInfo from 'react-native-device-info';
import {Actions} from "react-native-router-flux";
import AlertMessage from "../../services/alertmessage";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Pushe from "react-native-pushe";

class Verify extends Component {
    componentWillMount(){
        Pushe.initialize(false);
        Pushe.getPusheId((pusheId) => {
            console.log(pusheId)
            this.pusheId=pusheId;
        })
    }
    pusheId=null;
    state= {
        code:"",
        loading:false
    };
    render() {

        return (
            <View style={styles.body}>
                <Image source={require('../../assets/images/login.png')} style={styles.backgroundImage}/>
                <View style={styles.loginContainer}>
                    <View style={{flexDirection:'row'/*,backgroundColor:'#fff'*/}}>
                        <Input
                            placeholder='کد ورود'
                            rightIcon={
                                <FIcon
                                    name='calculator'
                                    size={wp(5)}
                                    color='#808080'
                                />
                            }
                            keyboardType='numeric'
                            maxLength={5}
                            // inputContainerStyle={{justifyContent:'center'}}
                            inputStyle={{fontSize:hp('2.5%'),fontFamily:'byekan',height:hp(8)}}
                            onChangeText={(code)=> this.setState({code})}
                            containerStyle={{backgroundColor:'#fff',borderColor:'#808080',borderWidth:2}}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
                        <Button
                            buttonStyle={{height:hp(6),margin:10,width:wp(22),backgroundColor:'#00172f'}}
                            titleStyle={{fontSize:hp('2.5%'),fontFamily:'byekan'}}
                            title="ادامه"
                            loading={this.state.loading}
                            onPress={()=>{
                                this._verificationCode();

                            }}
                        />
                    </View>
                </View>

            </View>
        );
    }

    _verificationCode=async()=> {
        let regex=/[0-9]{5}/
        if(regex.test(this.state.code)) {
            this.setState({loading:!this.state.loading});
            let data = {
                number: this.props.number,
                code: this.state.code,
                notificationId:this.pusheId
            };
            let response = await Http._postAsyncData(data, 'api/verification');
            this.setState({loading: !this.state.loading});

            // console.log(response,response.token)
            if (response.token) {
                data.token = response.token;
                this.props.saveUser(data)
                new AlertMessage().error(null, 'خوش آمدید')
                Actions.reset('drawer');
            } else {
                new AlertMessage().error('invalidCode')
            }
        }
        else {
            new AlertMessage().error('shortVerify')
        }
    }
}

const mapStateToProps=(state)=>{
    return{
    }
};
const mapDispatchToProps=(dispatch)=> {
    return {
        saveUser: (user) => {
            dispatch(saveUser(user));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Verify);