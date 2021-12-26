import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, TextInput, ImageBackground, BackHandler, Modal
} from "react-native";
import {removeUser, saveUser, suggestionUpdate} from "../../redux/actions";
import {connect} from "react-redux";
import Discount from "../../components/discount/discount";
import styles from './offer.css'
import {Button, FormInput, SearchBar} from 'react-native-elements'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'react-native-elements'
import Http from "../../services/http";
import * as geolocation from "react-native/Libraries/Geolocation/Geolocation";
import Location from "../../services/location";
import FIcon from 'react-native-vector-icons/FontAwesome5';
import MapView , { PROVIDER_GOOGLE,Marker } from "react-native-maps";
// import MapView from "react-native-maps";

import {Actions} from "react-native-router-flux";
import {DeviceEventEmitter} from 'react-native'
import AlertMessage from "../../services/alertmessage";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Popup from "../../components/popup/popup";

class Offer extends Component {
    componentWillUnmount(){

    }
    componentWillMount(){
        // console.log("componentWillMount")
        this._init();
    }
    // componentDidUpdate(){
    //     console.log("componentDidUpdate")
    // }
    // componentDidMount(){
    //     console.log("componentDidMount")
    // }
    // componentWillReceiveProps(){
    //     console.log("componentWillReceiveProps")
    // }
    _init=()=>{
        this.state.search=this.props.search;
        DeviceEventEmitter.addListener('backToPage', (e)=>{
            if(e.showOnMap){
                this._showMap();
            }
        })

        this._getOffers();
    }
    _showMap=()=>{
        this.setState({showOnMap:true})
    }
    location=null;
    _getOffers=async()=> {
        let loc = new Location();
        loc._getLocation(async (loc) => {
            console.log(loc)
            let data = {
                token: this.props.user.token,
                latitude: loc.latitude,
                longitude: loc.longitude,
            }
            this.location = loc;
            // console.log(data)
            let url = 'api/' + (this.props.category ? "getnearest/" + this.props.category.type : 'suggestion');
            if (this.state.search) {
                // data = {}
                data.search = this.state.search
                data.token = this.props.user.token
                url = 'api/search';
            }
            // console.log(url,data)
            let response = await Http._postAsyncData(data, url);
            if (Array.isArray(response)) {
                this.offers = response;
             }
             //else {
            //     new AlertMessage().error('error')
            // }
            this.setState({showFooter: true})

        })
    }
    offers=[];
    state= {
        search: "",
        page: 0,
        count: 6,
        refreshing:false,
        update:1,
        showFooter:false,
        showOnMap:false
    };
    render() {
        // console.log("render")
        const {category=null,search=null}=this.props
        let bgImage=null;
        if(this.props.category/*&&this.props.category.bgImage*/){
            if(this.props.category.type==='beauty')
                bgImage=require('../../assets/images/category/beauty.png')
            else if(this.props.category.type==='art')
                bgImage=require('../../assets/images/category/art.png')
            else if(this.props.category.type==='education')
                bgImage=require('../../assets/images/category/education.png')
            else if(this.props.category.type==='entertainment')
                bgImage=require('../../assets/images/category/entertainment.png')
            else if(this.props.category.type==='health')
                bgImage=require('../../assets/images/category/health.png')
            else if(this.props.category.type==='restaurant')
                bgImage=require('../../assets/images/category/restaurant.png')
            else if(this.props.category.type==='services')
                bgImage=require('../../assets/images/category/services.png')
            else if(this.props.category.type==='all')
                bgImage=require('../../assets/images/category/all.png')
        }else{
            bgImage=require('../../assets/images/category/all.png')

        }
        // console.log(this.props)
        // const imageTitle=require('../../assets/images/category/'+this.props.category.type+'.png')
        const  suggestion=this.props.setting.suggestion;
        return (
            <View style={styles.body} >
                {!this.state.showOnMap && search &&
                <View style={styles.searchContainer}>
                    <TouchableOpacity  onPress={() => this.setState({showOnMap:this.offers.length!==0})}  style={styles.mapIcon}><FIcon  name="map" size={hp(4)} color="#00b6df"/></TouchableOpacity>
                    <View style={styles.searchItems}>
                        <TextInput
                            defaultValue={this.state.search}
                            style={styles.searchInput}
                            placeholder="جستجو کن..."
                            underlineColorAndroid="transparent"
                            onChangeText={(search)=> this.setState({search})}
                        />
                        <TouchableOpacity style={styles.searchIcon} onPress={()=>{
                            if(this.state.search){
                                this.offers=[];
                                this.setState({showFooter:false})
                                this._getOffers();

                            }
                        }}>
                            <FIcon  name="search" size={hp(4)} color="#00b6df"/>
                        </TouchableOpacity>
                    </View>
                    </View>
                }
                {!this.state.showOnMap &&category &&
                <ImageBackground source={bgImage}
                                 style={{width: '100%', height:hp(25) }}>
                    <ImageBackground source={require('../../assets/images/cat-cover.png')}
                                     style={{paddingLeft:10, height: hp(25), width: '100%'}}>
                        <FIcon style={{marginTop: hp(5)}} name={category.icon} size={hp(8)} color="#00b6df"/>
                        <Text style={{
                            fontFamily:'byekanbold',
                            fontWeight:'bold',
                            marginTop: 5,
                            textAlign: 'left',
                            color: 'black',
                            // fontWeight: 'bold',
                            fontSize: hp(3)
                        }}> {category.text}</Text>
                        <View style={{marginTop: hp(1), alignItems: 'center', justifyContent: 'center',}}>
                            <TouchableOpacity onPress={() => this.setState({showOnMap:this.offers.length!==0})}
                                style={{
                                backgroundColor: 'white',
                                borderRadius: 5,
                                justifyContent: 'center',
                                flexDirection: 'row',
                                padding: hp(1)
                            }}>
                                <Text style={{color: 'black', fontSize: hp(2), margin: 1,fontFamily:'byekan',}}>نمایش روی نقشه</Text>
                                <FIcon name="map-marker-alt" size={hp(3)} color="#940004"/>

                            </TouchableOpacity>
                        </View>

                    </ImageBackground>
                </ImageBackground>
                }
                {!this.state.showOnMap && !category && !search &&

                    <View style={styles.offerContainer}>
                        {suggestion&&
                        <Popup
                            message={
                                "میتونی نزدیک ترین تخفیف و پیشنهادات مشابه اون تخفیفو بر اساس موقعیتت تو این صفحه ببینی و اولین نفری باشی که خرید میکنی"
                            } isPopupVisible={suggestion} />
                        }
                    <TouchableOpacity  onPress={() => this.setState({showOnMap:this.offers.length!==0})}  style={styles.mapIcon}><FIcon  name="map" size={hp(4)} color="#00b6df"/></TouchableOpacity>
                    <View style={styles.offerTitle}>
                    <Text  style={styles.offerTitleText}>پیشنهادات من</Text>
                    </View>
                        {/*<View
                            style={styles.line}
                        />*/}
                    </View>
                }

                {!this.state.showOnMap &&

                <FlatList
                    data={this.offers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        item.location=this.location;
                        return <Discount source={this.props.category||this.props.search?"home":"offer"} index={index + 1} dsc={item}/>
                    }}
                    refreshControl={
                        <RefreshControl
                            onRefresh={()=>{
                                this._getOffers();
                            }}
                            refreshing={this.state.refreshing}
                            colors={["#16a085", "#16a085"]}
                        />
                    }
                    ListEmptyComponent={()=>{
                        if(this.state.showFooter){
                            return(
                                <Text style={{fontSize:hp(2.5),fontFamily:'byekan'}}>موردی یافت نشد</Text>
                            );
                        }else{
                            return(
                                <ProgressBarAndroid styleAttr="Horizontal" color="#00172f" />
                            );
                        }
                    }}
                    />
                }
                {this.state.showOnMap &&
                <Modal
                    animationType="slide"
                    // presentationStyle={'formSheet'}
                    transparent={true}
                    visible={this.state.showOnMap}
                    onRequestClose={() => {
                        this.setState({showOnMap:false})
                    }}>
                    <View style={{flex:1}}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                region={{
                                    latitude: parseFloat(this.location.latitude),
                                    longitude: parseFloat(this.location.longitude),
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                {this.offers.slice(0, 20).map((offer, index) => {
                                    if(!offer.latitude||!offer.longitude)
                                        return;
                                    offer.location=this.location;
                                    // console.log({latitude:parseFloat(offer.latitude),longitude:parseFloat(offer.longitude)},index)
                                    return (<Marker
                                        key={index}
                                        coordinate={{
                                            latitude: parseFloat(offer.latitude),
                                            longitude: parseFloat(offer.longitude)
                                        }}
                                        title={offer.title}
                                        onCalloutPress={(data) => {
                                            this.setState({showOnMap:false},()=>{
                                            if (this.props.category || this.props.search) {
                                                Actions.offinfohome({discount: offer,showOnMap:true});
                                            } else {
                                                Actions.offinfooffer({discount: offer,showOnMap:true});
                                            }
                                            })
                                        }}
                                        // image={require('../../assets/images/pin.png')}
                                        pinColor={"#940004"}
                                        description={offer.full_address || offer.address}
                                    />)
                                })
                                }
                                <Marker
                                    coordinate={{
                                        latitude: parseFloat(this.location.latitude),
                                        longitude: parseFloat(this.location.longitude)
                                    }}
                                    pinColor={"#0071bc"}
                                />
                            </MapView>
                    </View>
                </Modal>
                }
            </View>
        );
    }
    _pullRefresh=()=>{
        console.log(this.state.refreshing)
        this.setState({
            page:0,
            stories:[],
            refreshing:true
        },()=>{
            // this._setStories();
        });

    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user,
        setting:state.setting,
        stories:state.stories,
    }
};
const mapDispatchToProps=(dispatch)=> {
    return{
        removeUser:(user)=>{
            dispatch(removeUser(user));
        },saveUser:(user)=>{
            dispatch(saveUser(user));
        },suggestionUpdate:(setting)=>{
            dispatch(suggestionUpdate(setting));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Offer);