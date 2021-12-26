import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, TextInput, ImageBackground, ScrollView,
    BackHandler,Linking
} from "react-native";
import {removeUser, saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import Discount from "../../components/discount/discount";
import styles from './offinfo.css'
import {Avatar, Button, ButtonGroup, FormInput, Input, SearchBar} from 'react-native-elements'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'react-native-elements'
import Http from "../../services/http";
import * as geolocation from "react-native/Libraries/Geolocation/Geolocation";
import Location from "../../services/location";
import StarRating from "react-native-star-rating";
import Gallery from "react-native-image-gallery";

import FIcon from 'react-native-vector-icons/FontAwesome5';
import {Actions} from "react-native-router-flux";
import {DeviceEventEmitter} from 'react-native'
import AlertMessage from "../../services/alertmessage";
import MapView,{Marker, PROVIDER_GOOGLE} from "react-native-maps";
import CountDown from 'react-native-countdown-component';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class OffInfo extends Component {
    componentWillUnmount(){
        clearInterval(this.interval)  ;
        DeviceEventEmitter.emit('backToPage',  {showOnMap:this.props.showOnMap})

    }
    componentWillMount(){
        this._getComments()
    }
    offers=[];
    state= {
        page: 0,
        count: 6,
        refreshing:false,
        update:1,
        selectedIndex:2,
        rate:0,
        comment:"",
        showFooter:false,
        selectedImage:-1
    };
    updateTab=(selectedIndex) => {
        this.setState({selectedIndex})
    }
    buttons = ['نظرات', 'عکس ها', 'اطلاعات']
    interval=null;
    comments=[];
    render() {
        // console.log(this.props)
        const { selectedIndex } = this.state
        const { discount } = this.props
        // console.log(discount)
        discount.gallery=[];
        if(discount&&discount.pictures){
            discount.pictures.map(pic=>discount.gallery.push({ source: { uri: pic } }))
        }
        // if(discount.gallery.length>0) {
        //     if (this.state.selectedImage !== -1) {
        //         this.interval = setInterval(() => {
        //             console.log("setInterval",this.state.selectedImage + 1 <discount.gallery.length,this.state.selectedImage + 1,discount.gallery.length)
        //
        //             if (this.state.selectedImage + 1 <discount.gallery.length){
        //                 this.setState({selectedImage:this.state.selectedImage + 1 })
        //             }else {
        //                 this.setState({selectedImage: 0})
        //             }
        //     }, 2000)
        //     }else{
        //         console.log("clearInterval")
        //         clearInterval(this.interval)
        //     }
        // }
        console.log()
        return (
            <ScrollView style={styles.body} >
                {this.state.selectedImage !== -1 &&
                <View style={{backgroundColor: 'red', height:hp(100), width: '100%',justifyContent:'center',alignItems:'center'}}>
                    <FIcon onPress={() => this.setState({selectedImage: -1})} name="times" size={25} color="#fff"
                           style={{position: 'absolute', left: 0, top: 0, zIndex: 101}}/>
                    <Gallery
                        initialPage={this.state.selectedImage}
                        style={{
                            width: wp(100),
                            height: 500,
                            backgroundColor: 'black',
                            // position: 'absolute',
                            // left: 0,
                            // top: 0,
                            zIndex: 100
                        }}
                        images={discount.gallery}
                        flatListProps={{
                            keyExtractor: (item, index) => {
                                return index.toString()
                            }

                        }}
                    />
                </View>
                }
                {this.state.selectedImage === -1 &&
                <View>
                    <ImageBackground source={{uri: discount.image}} style={styles.mainImage}>
                        <Text style={[styles.informationText,
                            {fontSize: hp(2.5), flexWrap: 'wrap', fontFamily: 'byekanbold', fontWeight: 'bold'},
                            {
                                backgroundColor: '#ffffffaa',
                                borderRadius: 5,
                                marginTop: hp(8),
                                marginLeft: 20,
                                marginRight: 20,
                            }]}>{discount.title}</Text>
                        {/*<TouchableOpacity style={styles.gotoSite}>
                            <Text style={styles.gotoSiteText}>برو به سایت</Text>
                        </TouchableOpacity>*/}
                    </ImageBackground>
                    <ButtonGroup
                        onPress={this.updateTab}
                        selectedIndex={selectedIndex}
                        buttons={this.buttons}
                        textStyle={styles.tabText}
                        selectedTextStyle={styles.selectedText}
                        containerStyle={styles.tabs}
                        selectedButtonStyle={styles.selectedTab}
                    />
                    {this.state.selectedIndex === 2 &&
                    (
                        <View style={styles.information}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: hp(1)}}>
                                <ImageBackground source={require('../../assets/images/off-circle.png')} style={{
                                    // position: 'absolute',
                                    // zIndex: 50,
                                    // top: 0,
                                    // left: 0,
                                    width: hp(10),
                                    height: hp(10),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={styles.offText}>{discount.discount}%</Text>
                                    <Text style={styles.offText}>تخفیف</Text>
                                </ImageBackground>
                                <View>
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <Text style={[styles.informationText, {
                                            color: 'red',
                                            fontSize: hp(2.5),
                                            fontWeight: 'bold',
                                            fontFamily: 'byekanbold',
                                            margin: 0,
                                            // marginTop: 3,
                                            // marginBottom: 3,
                                        }, {
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                            color: 'red',
                                            textDecorationColor: 'red'
                                        }]}>قیمت:</Text>
                                        <Text style={[styles.informationText, {
                                            color: 'red',
                                            fontSize: hp(3),
                                            fontWeight: 'bold',
                                            fontFamily: 'byekanbold',
                                            margin: 0,
                                            // marginTop: 3,
                                            // marginBottom: 3,
                                        }, {
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                            color: 'red',
                                            textDecorationColor: 'red'
                                        }]}>{discount.real_price}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <Text style={[styles.informationText, {
                                            color: 'green',
                                            fontSize: hp(2.5),
                                            fontWeight: 'bold',
                                            fontFamily: 'byekanbold',
                                            margin: 0,

                                            // marginTop: 3,
                                            // marginBottom: 3
                                        }]}>قیمت بعد از تخفیف:</Text>
                                        <Text style={[styles.informationText, {
                                            color: 'green',
                                            fontSize: hp(3),
                                            fontWeight: 'bold',
                                            fontFamily: 'byekanbold',
                                            margin: 0,
                                            // marginTop: 3,
                                            // marginBottom: 3
                                        }]}>{discount.discount_price}</Text>
                                    </View>
                                </View>

                            </View>

                            <View
                                style={styles.boldLine}
                            />
                            {discount.remain &&
                            <CountDown
                                style={{justifyContent: 'center', alignItems: 'center', margin: 10,}}
                                until={discount.remain}
                                // onFinish={() => alert('finished')}
                                // onPress={() => alert('hello')}
                                size={hp(3)}
                                timeLabels={{d: 'روز', h: 'ساعت', m: 'دقیقه', s: 'ثانیه'}}
                            />
                            }
                            {/*<Text style={[styles.informationText,{marginLeft:60,flexWrap:'wrap',fontFamily:'byekanbold',fontWeight:'bold'}]}>عنوان:{discount.title}</Text>*/}

                            {/*<Text style={[styles.informationText, {*/}
                            {/*color: 'green',*/}
                            {/*fontSize: 22,*/}
                            {/*fontWeight: 'bold',*/}
                            {/*fontFamily: 'byekanbold',*/}
                            {/*marginTop: 3,*/}
                            {/*marginBottom: 3*/}
                            {/*}]}>قیمت بعد از تخفیف:{discount.discount_price}</Text>*/}
                            {/*<Text style={styles.informationText}>تاریخ اتمام تخفیف:97-12-28</Text>*/}
                            <Text style={[styles.informationText, styles.titleText]}>آدرس</Text>
                            <Text style={[styles.informationText, {
                                flexWrap: 'wrap',
                                margin: 0
                            }]}>{discount.full_address || discount.address}</Text>
                            <View style={{height: hp(25), width: '100%', margin: 5}}>
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    style={styles.map}
                                    region={{
                                        latitude: parseFloat(discount.location.latitude),
                                        longitude: parseFloat(discount.location.longitude),
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: parseFloat(discount.latitude),
                                            longitude: parseFloat(discount.longitude)
                                        }}
                                        title={discount.title}
                                        // image={require('../../assets/images/pin.png')}
                                        pinColor={"#940004"}
                                        description={discount.full_address || discount.address}
                                    />
                                    <Marker
                                        coordinate={{
                                            latitude: parseFloat(discount.location.latitude),
                                            longitude: parseFloat(discount.location.longitude)
                                        }}
                                        pinColor={"#0071bc"}
                                    />
                                </MapView>
                            </View>
                            <View
                                style={styles.line}
                            />

                            {discount.conditions && discount.conditions.length > 0 &&
                            <Text style={[styles.informationText, styles.titleText]}>شرایط</Text>
                            }
                            {discount.conditions && discount.conditions.length > 0 &&
                            <Text style={[styles.informationText, {
                                flexWrap: 'wrap',
                                margin: 0
                            }]}>{Array.isArray(discount.conditions) ? "✓ " + discount.conditions.join("\r\n✓ ") : "✓ " + discount.conditions}</Text>
                            }
                            {discount.conditions && discount.conditions.length > 0 &&
                            <View
                                style={styles.line}
                            />
                            }
                            {discount.description &&
                            <Text style={[styles.informationText, styles.titleText]}>توضیحات</Text>
                            }
                            {discount.description &&
                            <Text style={[styles.informationText, {
                                flexWrap: 'wrap',
                                margin: 0
                            }]}>{discount.description}</Text>
                            }
                            {discount.description &&
                            <View
                                style={styles.line}
                            />
                            }
                            <Button

                                buttonStyle={{height: hp(6), width: '100%', backgroundColor: '#00172f'}}
                                titleStyle={{fontSize: hp('2.5%'), fontFamily: 'byekan'}}
                                title="برو به سایت"
                                loading={this.state.loading}
                                onPress={() => {
                                    Linking.openURL(discount.link);
                                }}
                            />
                        </View>
                    )
                    }
                    {this.state.selectedIndex === 1 &&
                    (
                        <View style={styles.information}>
                            <View style={{
                                // width:100,
                                // height:100,
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }}>
                                <FlatList
                                    style={{
                                        // width:100,
                                        // height:100,
                                        flexDirection: 'row-reverse',
                                        flexWrap: 'wrap',
                                        // alignItems:'space-around'
                                    }}
                                    ListEmptyComponent={() => {
                                        return (<Text>تصویری موجود نیست</Text>)
                                    }}
                                    numColumns={3}
                                    data={discount.pictures}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item, index}) => {
                                        return (<TouchableOpacity onPress={() => this.setState({selectedImage: index})}><Image
                                            source={{uri: item}}

                                            style={{
                                                width: wp(32),
                                                height: wp(32),
                                                // backgroundColor:'red',
                                                margin: wp(1),
                                                // flexDirection:'row',
                                                // flexWrap:'wrap'
                                            }}/></TouchableOpacity>)
                                    }}
                                />

                            </View>
                        </View>
                    )
                    }
                    {this.state.selectedIndex === 0 &&
                    (
                        <View style={styles.information}>
                            <View style={styles.commentInput}>
                                <TextInput
                                    placeholder='نظر خود را وارد کنید'
                                    multiline={true}
                                    onChangeText={(comment) => this.setState({comment})}
                                    style={{width: '100%', fontSize: hp(2), fontFamily: 'byekan'}}
                                    maxLength={200}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <StarRating
                                    maxStars={5}
                                    containerStyle={{width: '40%', marginTop: 10,}}
                                    fullStarColor={'#ffff00'}
                                    starSize={hp(3)}
                                    halfStarEnabled={true}
                                    emptyStarColor={'#666666'}
                                    emptyStar="star"
                                    halfStarColor={'#ffff00'}
                                    halfStar="star"
                                    rating={this.state.rate}
                                    selectedStar={(rate) => this.setState({
                                        rate
                                    })}
                                />
                                <Button
                                    buttonStyle={styles.buttonComment}
                                    title="ثبت نظر"
                                    titleStyle={{fontSize: hp('2.5%'), fontFamily: 'byekan'}}
                                    loading={this.state.loading}
                                    onPress={() => {
                                        this._sendComment();
                                    }}
                                />
                            </View>
                            {/*<View style={styles.buttonContainer}>*/}
                            {/**/}
                            {/*</View>*/}
                            {
                                // this._renderComment()
                                <FlatList
                                    data={this.comments}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item, index}) => {
                                        return this._renderComment(item, index);
                                    }}
                                    refreshControl={
                                        <RefreshControl
                                            onRefresh={() => {
                                                this._getComments();
                                            }}
                                            refreshing={this.state.refreshing}
                                            colors={["#16a085", "#16a085"]}
                                        />
                                    }
                                    ListEmptyComponent={() => {
                                        if (this.state.showFooter) {
                                            return (
                                                <Text style={{fontSize: hp(2.5), fontFamily: 'byekan'}}>نظری یافت
                                                    نشد</Text>
                                            );
                                        } else {
                                            return (
                                                <ProgressBarAndroid styleAttr="Horizontal" color="#00172f"/>
                                            );
                                        }
                                    }}
                                />
                            }

                        </View>
                    )
                    }
                </View>
                }


            </ScrollView>
        );
    }
    _sendComment=async()=> {
        this.setState({loading:!this.state.loading});
        let data = {
            // "username": "ali.mhv",
            "type": this.props.discount.type||"services",
            "rate":this.state.rate,
            "token":this.props.user.token,
            "comment":this.state.comment
        }
       // console.log(data)
        let response = await Http._postAsyncData(data,'api/addcomment/'+this.props.discount._id);
        if(response&&response.error){
            new AlertMessage().error('error')
        }else{
            new AlertMessage().error('commentDone')
        }
        this.setState({loading:!this.state.loading});
    }
    _getComments=async()=> {
        // this.setState({loading:!this.state.loading});
        let data = {
            "type": this.props.discount.type||"services",
            "token":this.props.user.token,
        }
       // console.log(data)
        let response = await Http._postAsyncData(data,'api/getcomment/'+this.props.discount._id);
        if(response&&response.comments&&Array.isArray(response.comments)){
            this.comments=response.comments;
        }
        this.setState({showFooter:true});
        // this.setState({loading:!this.state.loading});
    }
    _renderComment=(comment,index)=> {
        return(
            <View key={index} style={styles.commentInput}>
                <View style={{width:'20%',flexDirection:'row-reverse',justifyContent:'center',alignItems:'center',}}>
                    {!comment.avatar&&
                    < Avatar
                        rounded
                        icon={{name: 'user',color:'#940004',type:'font-awesome'}}
                        containerStyle={{borderColor:'#00b6df',borderWidth:3,backgroundColor:'white'}}
                        overlayContainerStyle={{backgroundColor:'white'}}
                        size={hp(8)}
                        />
                    }
                    {comment.avatar&&
                    < Avatar
                        rounded
                        source={{
                            uri:
                            comment.avatar,
                        }}
                        containerStyle={{borderColor:'#00b6df',borderWidth:3,backgroundColor:'white'}}
                        overlayContainerStyle={{backgroundColor:'white'}}
                        size={hp(8)}
                        />
                    }
                </View>
                <View style={{width:'80%'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.informationText}>{comment.date}</Text><Text style={styles.informationText}>{comment.name}</Text></View>
                    <Text style={styles.informationText}>{comment.comment}</Text>
                    {/*<StarRating
                        maxStars={5}
                        disabled={true}
                        containerStyle={{width:'40%',margin:10,}}
                        fullStarColor={'#ffff00'}
                        starSize={15}
                        halfStarEnabled={true}
                        emptyStarColor={'#666666'}
                        emptyStar="star"
                        halfStarColor={'#ffff00'}
                        halfStar="star"
                        rating={comment.rate||3}
                        // selectedStar={comment.rate||3}
                    />*/}
                </View>
            </View>
        )
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
        removeUser:(user)=>{
            dispatch(removeUser(user));
        },saveUser:(user)=>{
            dispatch(saveUser(user));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(OffInfo);