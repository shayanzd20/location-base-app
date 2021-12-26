import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, ScrollView
} from "react-native";
import {removeUser, resetSetting, saveUser, updateSetting} from "../../redux/actions";
import {connect} from "react-redux";
import HeaderLayout from "../../components/header/header";
import Story from "../../components/story/story";
import styles from './help.css'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Button, Slider} from "react-native-elements";

import WebView from 'react-native-android-fullscreen-webview-video';

class Help extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <View style={styles.body}>
                <HeaderLayout/>
                <ScrollView>
                    <View style={styles.helpContainer}>
                        <WebView
                            style={styles.helpVideo}
                            source={{ uri: 'http://5.152.223.139/help.html' }}
                        />
                        <Text style={styles.helpText}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user,
        stories:state.stories,
        setting:state.setting,
    }
};
const mapDispatchToProps=(dispatch)=> {
    return{
        updateSetting:(setting)=>{
            dispatch(updateSetting(setting));
        },
        resetSetting:()=>{
            dispatch(resetSetting());
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Help);