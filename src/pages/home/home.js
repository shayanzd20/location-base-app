import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, ImageBackground, TextInput,PermissionsAndroid
} from "react-native";
import {removeUser, saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import styles from './home.css'
import FIcon from 'react-native-vector-icons/FontAwesome5';
import * as geolocation from "react-native/Libraries/Geolocation/Geolocation";
import {Actions} from "react-native-router-flux";
import MapView,{ PROVIDER_GOOGLE} from "react-native-maps";
import Location from "../../services/location";
// import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class Home extends Component {
    componentWillMount() {
        // let loc = new Location();
        // loc.startWatcher();
        // BackgroundGeolocation.configure({
        //     desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        //     stationaryRadius: 50,
        //     distanceFilter: 50,
        //     notificationTitle: 'Background tracking',
        //     notificationText: 'disammbled',
        //     notificationsEnabled:false,
        //     debug: false,
        //     startOnBoot: true,
        //     stopOnTerminate: false,
        //     locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
        //     interval: 5*60*1000,
        //     fastestInterval:  5*60*1000,
        //     activitiesInterval:  5*60*1000,
        //     stopOnStillActivity: false,
        //     url: 'http://velgardi-game.ir:3031/api/updatepos/',
        //     httpHeaders: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization':'Bearer '+this.props.user.token
        //     },
        //     // customize post properties
        //     postTemplate: {
        //         latitude: '@latitude',
        //         longitude: '@longitude',
        //     }
        // });
        // BackgroundGeolocation.start();
    }
    state= {
        search:""
    };
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
        },{
            text:'همه دسته ها',
            catId:8,
            icon:'award',
            type:'all'
        },
    ]
    render() {
        return (
            <View style={styles.body} >
                <ImageBackground source={require('../../assets/images/home-pic.jpg')} style={styles.mainImage}>
                    <View style={styles.searchContainer}>
                    <View style={styles.searchItems}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="جستجو کن..."
                            underlineColorAndroid="transparent"
                            onChangeText={(search)=> this.setState({search})}
                        />
                        <TouchableOpacity style={styles.searchIcon} onPress={()=>{
                            if(this.state.search)
                            Actions.catp({search:this.state.search})
                        }}>
                            <FIcon  name="search" size={hp(4)} color="#00b6df"/>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ImageBackground>
                <View style={styles.catsContainer}>
                    {
                        this.categories.map((cat,index)=>{
                            return this._renderCats(cat,index);
                        })
                    }
                </View>


            </View>
        );
    }
    _renderCats=(cat,index)=>{
        return(
            <TouchableOpacity key={index} style={styles.catButton} onPress={()=>{
               // cat.bgImage=require('../../assets/images/category/'+cat.type+'.png')
                Actions.catp({category:cat});
            }}>
                <FIcon  name={cat.icon} size={hp(4)} color="#00b6df"  />
                <Text style={styles.catText}> {cat.text}</Text>
            </TouchableOpacity>
        )
    };


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
export default connect(mapStateToProps,mapDispatchToProps)(Home);