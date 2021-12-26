import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, ScrollView, TextInput
} from "react-native";
import {removeUser, resetSetting, saveUser, updateSetting} from "../../redux/actions";
import {connect} from "react-redux";
import HeaderLayout from "../../components/header/header";
import Story from "../../components/story/story";
import styles from './book.css'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Button, Slider} from "react-native-elements";

import Stars from 'react-native-stars'

class Book extends Component {
    componentWillMount() {
    }
    comment={
        text:'',
        rate:0,
    }
    render() {
        const {book}=this.props;
        // console.log(this.props)
        book['text']=`
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با است
فاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده
شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجو
د در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد
نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته
اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            `;
        // book.text+=book.text;
        let containerStyle={
            backgroundColor:this.props.setting.backgroundColor,
            padding:10

        }
        let textStyle={
            lineHeight:this.props.setting.lineHeight,
            color:this.props.setting.color,
            fontSize:this.props.setting.fontSize,
        }
        return (
            <View style={styles.body}>
                <HeaderLayout back={true}/>
                <ScrollView>
                    <View style={styles.bookContainer}>
                        <View style={styles.infoBar}>
                            <View style={styles.infoRows}>
                            <View style={styles.infoDetail}>
                                <Text>{book.writer}</Text>
                                <MIcon name={'person'} size={15} color={'black'}/>
                            </View>
                                <View style={styles.infoDetail}>
                                    <Text>{book.title}</Text>

                                    <MIcon name={'book'} size={15} color={'black'}/>
                            </View>
                            </View>
                            <Image source={require('./../../assets/images/icons/arrow-down.png')}
                                   style={{width: 25, height: 12}}/>
                        </View>
                        <View style={[styles.bookContent,containerStyle]}>
                            <Text style={[textStyle]}> {book.text} </Text>
                        </View>
                        <View style={styles.commentContainer}>
                            <TextInput
                                numberOfLines={2}
                                maxLength={150}
                                multiline={true}
                                onChangeText={(text)=>{this.comment.text=text;}}
                                style={styles.inputText}
                                placeholder={' نظر خود را وارد کنید'}/>
                            <View style={styles.rateContainer}>
                                <Stars
                                    default={3}
                                    update={(val)=>{this.comment.rate=val}}
                                    starSize={20}
                                    count={5}
                                    fullStar={<MIcon name={'lens'} size={15} color='rgb(64, 196, 255)'/>}
                                    emptyStar={<MIcon name={'radio-button-unchecked'} size={15} color='rgb(64, 196, 255)'/>}
                                />
                            </View>
                            <Button
                                raised
                                containerViewStyle={styles.resetButton}
                                backgroundColor={'#ab182a'}
                                icon={{name: 'comment'}}
                                onPress={() => {console.log(this.comment)}}
                                title='ثبت نظر'/>

                        </View>
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
export default connect(mapStateToProps,mapDispatchToProps)(Book);