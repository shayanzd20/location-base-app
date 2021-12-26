import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, ScrollView, TextInput, Modal, TouchableHighlight
} from "react-native";
import {removeUser, resetSetting, saveUser, suggestionUpdate, updateSetting} from "../../redux/actions";
import {connect} from "react-redux";
import styles from './profile.css'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Avatar, Button} from "react-native-elements";
import FIcon from 'react-native-vector-icons/FontAwesome5';
import Http from "../../services/http";
import {Actions} from "react-native-router-flux";
import ImageCropPicker from 'react-native-image-crop-picker';
import AlertMessage from "../../services/alertmessage";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Popup from "../../components/popup/popup";

class Profile extends Component {
    componentWillUnmount() {
        if(this.state.isModalVisible)
            this._toggleModal();
    }
    componentWillMount() {
        // this.props.saveUser({
        //     "fullName":"ali",
        //     "username":"alimhv",
        //     "mobile": "09396675507",
        //     "password":"g0nzales",
        // });
        this.userInfo=this.props.user;
    }
    userInfo={};
    passwords={};
    categories=[
        {
            text:'زیبایی',
            catId:1,
            icon:'cut',
            type:'beauty'
        },
        {
            text:'سلامتی و پزشکی',
            catId:2,
            icon:'heartbeat',
            type:'health'
        },{
            text:'سینما و تئاتر',
            catId:3,
            icon:'theater-masks',
            type:'art'
        },{
            text:'رستوران و کافی شاپ',
            catId:4,
            icon:'concierge-bell',
            type:'restaurant'
        },{
            text:'خدماتی',
            catId:5,
            icon:'wrench',
            type:'services'
        },{
            text:'تفریحی ورزشی',
            catId:6,
            icon:'swimmer',
            type:'entertainment'
        },{
            text:'آموزش',
            catId:7,
            icon:'chalkboard-teacher',
            type:'education'
        }
    ]

    state={
        isModalVisible:false,
        currentValue:"",
        updateui:0,
    }

    map={
        "number": "شماره ",
        "name": "نام ",
        "email": "ایمیل ",
        "city": "شهر ",
        "password": "رمزعبور ",
    };
    currentItem=null;
    _renderCats=(cat,index)=>{
        let activeStyle={};
        let isFav=(this.props.user.favorites&&this.props.user.favorites.indexOf(cat.type)!==-1);
        if(isFav) {
            activeStyle.backgroundColor = "#00254b"
            // cat.text = ;
        }
        return(
            <TouchableOpacity key={index} style={[styles.catButton,activeStyle]} onPress={()=>{
                let tmp=this.props.user.favorites?this.props.user.favorites:[];
                if(isFav){
                    tmp.splice(tmp.indexOf(cat.type),1)
                }else{
                    tmp.push(cat.type)
                }
                this._favoritesUser(tmp)
                // cat.bgImage=require('../../assets/images/category/'+cat.type+'.png')
                // Actions.catp({category:cat});
            }}>
                <Text style={styles.catText}>{(isFav?" ✓ ":"") + cat.text}</Text>
            </TouchableOpacity>
        )
    };
    _toggleModal = () =>{
        this.setState({isModalVisible: !this.state.isModalVisible});
        // alert("is visiable"+this.state.isModalVisible.toString())
    }
    render() {
        this.userInfo=this.props.user;
        return <ScrollView style={styles.body}>
            <Popup
                message={
                "دسته بندی که دوست داری انتخاب کن تا موقع نزدیک شدن به تخفیف مورد نظرت بهت خبر بدیم"
            } isPopupVisible={!this.props.user.favorites||this.props.user.favorites.length===0} />
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                <TouchableOpacity
                    style={{
                        width: '20%',
                        flexDirection: 'row-reverse',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        let token=this.props.user.token;
                        ImageCropPicker.openPicker({
                            width: 300,
                            height: 300,
                            cropping: true
                        }).then(image => {
                            let path = image.path.split('/');
                            image.type = image.mime;
                            image.uri = image.path;
                            image.fileName = path[path.length - 1];
                            this.setState({loading: true});
                            Http._postFilePromise({
                                token: token,
                            }, [image], 'api/upload')
                                .then((response) => {
                                    return response.json()
                                }).then(response => {
                                    if(response&&response.status){
                                        response.status.token=token;
                                        this.props.saveUser(response.status)
                                    }
                            }).catch(err => {
                                console.log(err)
                            })

                            // console.log(image);
                        });
                    }}
                >
                    {this.props.user.avatar &&

                <Avatar
                        rounded
                        source={{
                            uri:
                                this.props.user.avatar,
                        }}
                        showEditButton
                        containerStyle={{borderColor: '#00b6df', borderWidth: 3, backgroundColor: 'white', margin: 20}}
                        overlayContainerStyle={{backgroundColor: 'white'}}
                        size={hp(20)}/>
                    }
                      {!this.props.user.avatar &&

                      <Avatar
                        rounded
                        icon = {{name: 'user', color: '#940004', type: 'font-awesome'}}
                        showEditButton
                        containerStyle={{borderColor: '#00b6df', borderWidth: 3, backgroundColor: 'white', margin: 20}}
                        overlayContainerStyle={{backgroundColor: 'white'}}
                        size={hp(20)}/>
                    }

                </TouchableOpacity>
            </View>
            <Text style={styles.infoText}>{"دسته مورد علاقتو انتخاب کن :"}</Text>
            <View style={styles.catsContainer}>
                {
                    this.categories.map((cat,index)=>{
                        return this._renderCats(cat,index);
                    })
                }
            </View>
            {
                Object.keys(this.map).map((en, fa) => {
                    return (
                        <TouchableOpacity
                            disabled={en === 'number'}
                            activeOpacity={en === 'number' ? .5 : 1}
                            key={fa} onPress={() => {
                            this.currentItem = en;
                            this._toggleModal();
                        }} style={{flexDirection: 'row-reverse', justifyContent: 'space-between', margin: 10}}>
                            <View style={{flexDirection: 'row-reverse'}}>
                                <Text style={styles.infoText}>{this.map[en]}</Text>
                                <Text style={styles.infoText}> : </Text>
                                <Text
                                    style={styles.infoText}>{en === "password"?"******":(this.userInfo[en] ? this.userInfo[en] : this.map[en] + ' وارد نشده است')}</Text>
                            </View>
                            <View>
                                <FIcon name="chevron-left" size={hp(3)} color="#fff"/>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            <TouchableOpacity onPress={() => {
                Actions.reset('auth');
                this.props.removeUser(this.props.user)
                this.props.suggestionUpdate({suggestion:true})
                new AlertMessage().error(null,"با موفقیت خارج شدید")

            }} style={{flexDirection: 'row-reverse', justifyContent: 'space-between', margin: 10, marginTop: 15}}>
                <View style={{flexDirection: 'row-reverse'}}>
                    <Text style={styles.infoText}>خروج</Text>
                </View>
                <View>
                    <FIcon name="power-off" size={hp(3)} color="#fff"/>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                // presentationStyle={'formSheet'}
                transparent={true}
                visible={this.state.isModalVisible}
                onRequestClose={() => {
                    this.currentItem = null;
                    this._toggleModal()
                }}>
                <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
                    <View style={{backgroundColor: '#ffffff'}}>
                        <View style={{
                            flexDirection: 'row-reverse',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: hp(2)
                        }}>
                            <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                                <Text style={styles.modalText}>{this.map[this.currentItem]}</Text>
                                <Text style={styles.modalText}> : </Text>
                                <TextInput
                                    secureTextEntry={this.currentItem === "password"}
                                    onChangeText={(currentValue) => this.setState({currentValue})}
                                    style={{alignItems: 'center', width: '60%',fontSize:hp(2.5),fontFamily:'byekan',height:hp(8),textAlign:'right'}}
                                    autoFocus={true}
                                    placeholder={this.map[this.currentItem] + ' وارد کنید'}
                                    defaultValue={this.userInfo[this.currentItem]}
                                />
                            </View>
                            <View style={{
                                flexDirection: 'row-reverse',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                width: '20%'
                            }}>
                                <TouchableOpacity onPress={() => {
                                    this.currentItem = null;
                                    this._toggleModal();
                                }}><FIcon name="times" size={hp(3.5)} color="red"/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.currentValue) {
                                        this.userInfo[this.currentItem] = this.state.currentValue;
                                        this._updateUser(this.userInfo);
                                        this._toggleModal();
                                    }
                                }}><FIcon name="check" size={hp(3.5)} color="green"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>;
    }
    _favoritesUser=async(favorites)=>{
        let data={};
        data.token=this.props.user.token;
        data.favorites=favorites;
        let response = await Http._postAsyncData(data,'api/favorite');
        if(response&&response.error){
            new AlertMessage().error('error')
        }else{
            let tmp=this.props.user;
            tmp.favorites=favorites
            this.props.saveUser(tmp);
            this.setState({updateui:this.state.updateui})
        }
    }
    _updateUser=async(userinfo)=>{
        let token=userinfo.token;
        let response = await Http._postAsyncData(userinfo,'api/update');
        if(response&&response.error){
            new AlertMessage().error('error')
        }else{
            new AlertMessage().error('updateUser')
            response.token=token;
            this.props.saveUser(response);
        }
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user,
        stories:state.stories,
    }
};
const mapDispatchToProps=(dispatch)=> {
    return{
        resetSetting:()=>{
            dispatch(resetSetting());
        },
        saveUser:(user)=>{
            dispatch(saveUser(user));
        },
        removeUser:(user)=>{
            dispatch(removeUser(user));
        },suggestionUpdate:(setting)=>{
            dispatch(suggestionUpdate(setting));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);