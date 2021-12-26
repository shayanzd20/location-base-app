import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, ScrollView
} from "react-native";
import {removeUser, resetSetting, saveUser, updateSetting} from "../../redux/actions";
import {connect} from "react-redux";
import HeaderLayout from "../../components/header/header";
import Story from "../../components/story/story";
import styles from './setting.css'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Button, Slider} from "react-native-elements";


class Setting extends Component {
    componentWillMount() {
        this.setState({setting: this.props.setting})
    }

    componentWillUnmount() {
        // console.log(setting)
        this.props.updateSetting(this.state.setting)
    }

    state = {
        setting: {}
    }
    storyStyles = [
        {
            color: 'white',
            backgroundColor: 'black',
        },
        {
            color: 'black',
            backgroundColor: 'gray',
        }, {
            color: 'black',
            backgroundColor: 'whitesmoke',
        }, {
            color: 'white',
            backgroundColor: '#ab182a',
        },
    ];

    render() {
        return (
            <View style={styles.body}>
                <HeaderLayout/>
                <ScrollView>
                    <View style={styles.settingContainer}>
                        <View style={styles.settingItem}>
                            <View style={styles.settingTitle}>
                                <MIcon name={'wb-sunny'} size={20} color={'yellow'}/>
                                <Text style={styles.settingTitleText}>روشنایی</Text>
                            </View>
                            <Slider
                                step={1}
thumbTintColor={'#ab182a'}
                                maximumValue={10}
                                minimumValue={0}
                                animateTransitions={true}
                                value={this.state.setting.brightness}
                                onValueChange={(value) => {
                                    this._update({'brightness': value})
                                }}/>
                            <Text> </Text>
                        </View>
                        <View style={styles.settingItem}>
                            <View style={styles.settingTitle}>
                                <MIcon name={'font-download'} size={20} color={'gray'}/>
                                <Text style={styles.settingTitleText}>سایز متن</Text>
                            </View>
                            <Slider
                                step={1}
thumbTintColor={'#ab182a'}
                                maximumValue={20}
                                minimumValue={10}
                                animateTransitions={true}
                                value={this.state.setting.fontSize}
                                onValueChange={(value) => {
                                    this._update({'fontSize': value})
                                }}/>
                            <Text style={{fontSize: this.state.setting.fontSize}}>سایز متن</Text>
                        </View>
                        <View style={styles.settingItem}>
                            <View style={styles.settingTitle}>
                                <MIcon name={'view-headline'} size={20} color={'black'}/>
                                <Text style={styles.settingTitleText}>فاصله خطوط</Text>
                            </View>
                            <Slider
                                step={1}
thumbTintColor={'#ab182a'}
                                maximumValue={40}
                                minimumValue={15}
                                animateTransitions={true}
                                value={this.state.setting.lineHeight}
                                onValueChange={(value) => {
                                    this._update({'lineHeight': value})
                                }}/>
                            <Text style={{lineHeight: this.state.setting.lineHeight}}>{`فاصله
خطوط`}</Text>
                        </View>
                        <View style={styles.settingItem}>
                            <View style={styles.settingTitle}>
                                <MIcon name={'desktop-windows'} size={20} color={'red'}/>
                                <Text style={styles.settingTitleText}>نحوه نمایش</Text>
                            </View>
                            <View style={styles.showStyle}>
                                {
                                    this.storyStyles.map((style, index) => {
                                        let btnStyle = {
                                            backgroundColor: style.backgroundColor,
                                            borderWidth:2,
                                            borderColor:
                                                style.color === this.state.setting.color &&
                                                style.backgroundColor === this.state.setting.backgroundColor ?
                                                     'rgb(64, 196, 255)' : 'transparent',
                                        }
                                        let txtStyle = {
                                            color: style.color,
                                            // backgroundColor:'green'
                                        }
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                this._update(style)
                                            }} key={index} style={[styles.storyButton, btnStyle]}>
                                                <Text style={[style.storyText, txtStyle]}>متن داستان</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <Button
                            raised
                            containerViewStyle={styles.resetButton}
                            backgroundColor={'#ab182a'}
                            icon={{name: 'cached'}}
                            onPress={() => this._reset()}
                            title='بازگشت به تنظیمات کارخانه'/>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _reset = () => {
        const initSetting = {
            lineHeight: 20,
            fontSize: 14,
            brightness: 3,
            color: 'black',
            backgroundColor: 'white'
        };
        this.setState({setting: initSetting}, () => {
            // console.log(this.state.setting)
        })
    }
    _update = (items) => {
        let curSetting = this.state.setting;
        let keys=Object.keys(items);
        keys.map((key)=>{
            let value=items[key];
            if (curSetting[key] !== value) {
                curSetting[key] = value;
                // console.log(curSetting)
            }
        })
        console.log(this.state.setting,curSetting,items,keys)
        this.setState({setting: curSetting});
    };
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
export default connect(mapStateToProps,mapDispatchToProps)(Setting);