import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, ImageBackground, TextInput
} from "react-native";
import {removeUser, saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import HeaderLayout from "../../components/header/header";
import styles from './login.css'
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {Button, Input} from 'react-native-elements';
import Http from "../../services/http";
import {Actions} from "react-native-router-flux";
import AlertMessage from "../../services/alertmessage";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Login extends Component {
    componentWillMount(){
    }
    state= {
        number:"",
        loading:false
    };
    render() {

        return (
            <View style={styles.body}>
                <Image source={require('../../assets/images/login.png')} style={styles.backgroundImage}/>
                <View style={styles.loginContainer}>
                    <View style={{flexDirection:'row'/*,backgroundColor:'#fff'*/}}>
                        <Input
                            placeholder='تلفن'
                            rightIcon={
                                <FIcon
                                    name='phone'
                                    size={wp(5)}
                                    color='#808080'
                                />
                            }
                            keyboardType='numeric'
                            maxLength={11}
                            inputStyle={{fontSize:hp('2.5%'),fontFamily:'byekan',height:hp(8)}}
                            onChangeText={(number)=> this.setState({number})}
                            containerStyle={{backgroundColor:'#fff',borderColor:'#808080',borderWidth:2}}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
                        <Button
                            buttonStyle={{height:hp(6),margin:10,width:wp(22),backgroundColor:'#00172f'}}
                            titleStyle={{fontSize:hp('2.5%'),fontFamily:'byekan'}}
                            title="ورود"
                            loading={this.state.loading}
                            onPress={()=>{
                                this._sendVerificationCode();

                            }}
                        />
                    </View>
                </View>

            </View>
        );
    }

    _sendVerificationCode=async()=> {
        let regex=/09(0[0-9]|9[0-9]|1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/
        if(regex.test(this.state.number)) {
            this.setState({loading:!this.state.loading});

            let data = {
                number: this.state.number
            };
            let response = await Http._postAsyncData(data, 'api/register');
            if (response && response.error) {
                new AlertMessage().error('error')
            } else {
                new AlertMessage().error('sendCode')
                Actions.verifyp(data);
            }
            this.setState({loading:!this.state.loading});
        }else{
            new AlertMessage().error('phoneInvalid')

        }
        // this.setState({loading:!this.state.loading});
    }
}

const mapStateToProps=(state)=>{
    return{
    }
};
const mapDispatchToProps=(dispatch)=> {
    return{
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);