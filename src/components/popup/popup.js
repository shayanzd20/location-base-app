import React, { Component } from 'react';
import styles from "./popup.css";
import {Image, ImageBackground, Modal, Text, TouchableOpacity, View} from "react-native";
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {Rating} from "react-native-elements";

import StarRating from 'react-native-star-rating';
import {Actions} from "react-native-router-flux";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from "react-redux";
import {removeUser, saveUser, suggestionUpdate} from "../../redux/actions";

class Popup extends Component {
    componentWillUnmount() {
        if(this.state.isPopupVisible)
            this._togglePopup();
    }
    componentWillMount() {
        const {isPopupVisible}=this.props;
        this.setState({isPopupVisible})
    }
    state={
        isPopupVisible:false
    }
    _togglePopup = () =>
        this.setState({isPopupVisible: !this.state.isPopupVisible});
    render() {
        const {message}=this.props;
        return (
            <Modal
                // onBackButtonPress={this._togglePopup}
                // onBackdropPress={this._togglePopup}
                animationType="slide"
                transparent={true}
                visible={this.state.isPopupVisible}
                onRequestClose={() => {
                    if(this.props.setting.suggestion){
                        this.props.suggestionUpdate({suggestion:false})
                    }
                    this._togglePopup();
                }}>
                <View style={{flex:1,backgroundColor:"#000000aa",justifyContent:'center',alignItems:"center",}}>
                    <View style={{backgroundColor:'white',padding:wp(10),borderRadius:wp(3),margin:wp(5),width:wp(90)}}>
                        <TouchableOpacity
                            style={{position:'absolute',top:hp(1),left:hp(1)}}
                            onPress={() => {
                                if(this.props.setting.suggestion){
                                    this.props.suggestionUpdate({suggestion:false})
                                }
                                this._togglePopup();
                            }}><FIcon name="times" size={hp(3.5)} color="red"/>
                        </TouchableOpacity>
                        <Text>
                            {message}
                        </Text>
                    </View>
                </View>
            </Modal>
        )
    }
}



const mapStateToProps=(state)=>{
    return{
        setting:state.setting,
    }
};
const mapDispatchToProps=(dispatch)=> {
    return{
        suggestionUpdate:(setting)=>{
            dispatch(suggestionUpdate(setting));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Popup);