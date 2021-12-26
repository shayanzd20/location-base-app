import React, { Component } from 'react';
import styles from "./discount.css";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {Rating} from "react-native-elements";

import StarRating from 'react-native-star-rating';
import {Actions} from "react-native-router-flux";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Discount extends Component {
    render() {
    const {dsc,source}=this.props;
        return (
            <TouchableOpacity style={styles.body} onPress={()=>{
                if(source==="home"){
                    Actions.offinfohome({discount:dsc});
                }else{
                    Actions.offinfooffer({discount:dsc});
                }
            }}>
                <Image source={{uri:dsc.image}} style={styles.backgroundImage}/>
                <View  style={styles.offContainer}>
                    <ImageBackground source={require('../../assets/images/discount-container.png')} style={styles.discountImage}>
                        <Text style={styles.discountValue}>{dsc.discount}٪</Text>
                        <Text style={styles.discountText}>تخفیف</Text>
                    </ImageBackground>
                </View>
                <View  style={styles.infoContainer}>
                    <ImageBackground source={require('../../assets/images/discount-cover.png')} style={styles.coverImage}>
                        <View style={styles.info}>
                        <View style={styles.otherInfo}>
                            <View style={styles.otherDetails}>
                                <View style={styles.locationIcon}>
                                    <FIcon  name="map-marker-alt" size={hp(3)} color="#940004"/>
                            </View>
                                <TouchableOpacity style={styles.locationButton}>
                                    <Text style={styles.locationText}>{dsc.address}</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.otherDetails}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    reversed={true}
                                    rating={dsc.rate||2}
                                    fullStarColor={'#ffff00'}
                                    starSize={hp(3)}
                                    halfStarEnabled={true}
                                    emptyStarColor={'#eeeeee'}
                                    emptyStar="star"
                                    halfStarColor={'#eeeeee'}
                                    halfStar="star"
                                />
                        </View>
                        </View>
                        <View style={styles.mainInfo}>
                            <View style={[styles.details,{backgroundColor:'#ffffff99',borderRadius:5}]}>
                                {/*<FIcon  name="pen-square" size={18} color="#940004"/>*/}
                                <Text style={[styles.infoText,{fontSize:hp(2.2)}]}>{dsc.title}</Text>
                            </View>
                            <View style={styles.details}>
                                <FIcon  name="gift" size={hp(3)} color="#940004"/>
                                <Text style={[styles.infoText,{color:'green',fontSize:hp(2.7),fontWeight:'bold',fontFamily:'byekanbold'}]}>{dsc.discount_price}</Text>
                            </View>
                            <View style={styles.details}>
                                <FIcon  name="money-bill" size={hp(3)} color="#940004"/>
                                <Text style={[styles.infoText,{color:'red',fontSize:hp(2.7),fontWeight:'bold',fontFamily:'byekanbold'},{textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'red', textDecorationColor: 'red'}]}>
                                    {dsc.real_price}</Text>
                            </View>
                        </View>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        )
    }
}