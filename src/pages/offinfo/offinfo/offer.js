import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, TextInput
} from "react-native";
import {removeUser, saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import Discount from "../../components/discount/discount";
import styles from './offer.css'
import {Button, FormInput, SearchBar} from 'react-native-elements'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'react-native-elements'
import Http from "../../services/http";
import * as geolocation from "react-native/Libraries/Geolocation/Geolocation";
import Location from "../../services/location";


class Offer extends Component {
    componentWillMount(){
        this._getOffers();
    }
    _getOffers=async()=>{
        let loc=new Location();
        loc._getLocation(async(loc)=>{
            // console.log(loc)
            let data={
                token:this.props.user.token,
                latitude:loc.latitude,
                longitude:loc.longitude,
            }
            // console.log(data)
            let response = await Http._postAsyncData(data,'api/getnearest/'+this.props.category||'health');
            if(Array.isArray(response)){
                this.offers=response;
            }
            this.setState({update:this.state.update+1})
        })
    }
    showFooter=false;
    offers=[];
    state= {
        page: 0,
        count: 6,
        refreshing:false,
        update:1
    };

    render() {

        return (
            <View style={styles.body} >
                <FlatList
                data={this.offers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) =>{
                    return <Discount index={index+1} dsc={item}/>
                }}
                // refreshControl={
                //     <RefreshControl
                //         onRefresh={this._pullRefresh}
                //         refreshing={this.state.refreshing}
                //         colors={["#16a085", "#16a085"]}
                //     />
                // }
                // onEndReached={()=>{
                //     if(this.offers.length>=this.state.count)
                //     {
                //         this.setState({page:this.state.page+1},()=>{
                //             // this._setStories();
                //         })
                //     }
                // }}
                // ListFooterComponent={() => { return     this.showFooter?<ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />:null;
                // }}
                // onEndReachedThreshold={0.1}
            />
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
export default connect(mapStateToProps,mapDispatchToProps)(Offer);