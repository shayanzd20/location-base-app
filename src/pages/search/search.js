import React, { Component } from 'react';
import {
    Image, Text, View, Dimensions, StyleSheet, TouchableOpacity, FlatList, RefreshControl,
    ProgressBarAndroid, TextInput
} from "react-native";
import {removeUser, saveUser} from "../../redux/actions";
import {connect} from "react-redux";
import HeaderLayout from "../../components/header/header";
import Story from "../../components/story/story";
import styles from './search.css'
import {Button, FormInput, SearchBar} from 'react-native-elements'

import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'react-native-elements'


class Search extends Component {
    componentWillMount(){
        // this.props.saveUser({
        //     "fullName":"ali",
        //     "username":"alimhv",
        //     "mobile": "09396675507",
        //     "password":"g0nzales",
        // });
        // this._setStories();
    }
    _setStories=()=>{
            let stories = [
                {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                }, {
                    title: "راهای رسیدن بخدا ",
                    writer: "پاعولو کوعلو",
                    image: "https://raaz.co/images/raaz/thumbnails/1505235514014.png",
                    rate: 4.5,
                },
            ]
            let start = this.state.page * this.state.count;
            let end = start + this.state.count;
            this.showFooter = true;
            setTimeout(() => {
                let tmp = stories.slice(start, end < stories.length ? end : stories.length);
                if (tmp.length < this.state.count) {
                    this.showFooter = false;
                }
                this.setState({
                    stories: this.state.stories.concat(tmp),
                    refreshing: false
                })
            }, 200)

    };
    showFooter=false;
    search="";
    state= {
        menuItems: [
            'جدیدترین',
            'داستان من'
        ],
        page: 0,
        count: 6,
        refreshing:false,
        stories:[],
        selected: 'جدیدترین'
    };

    render() {

        return (
            <View style={styles.body} >
                <HeaderLayout/>
            <View style={styles.searchBar} >
                <TouchableOpacity style={styles.buttonSearch} onPress={()=>{
                    if(this.search.trim()) {
                        this.showFooter=true;
                    this.setState({page:0,stories:[]},()=>{
                        this._setStories();
                    })
                    }else{
                        alert("عبارتی وارد نشده است")
                    }
                }}>
                    <MIcon name={'search'} size={25} color={'black'}/>
                </TouchableOpacity>
                <TextInput
                    onChangeText={(text)=>{this.search=text;}}
                    style={styles.inputText}
                    placeholder={'داستان مورد نظر را وارد کنید'}/>
            </View>
                <FlatList
                data={this.state.stories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) =>{
                    return <Story index={index+1} story={item}/>
                }}
                refreshControl={
                    <RefreshControl
                        onRefresh={this._pullRefresh}
                        refreshing={this.state.refreshing}
                        colors={["#16a085", "#16a085"]}
                    />
                }
                onEndReached={()=>{
                    if(this.state.stories.length>=this.state.count)
                    {
                        this.setState({page:this.state.page+1},()=>{
                            this._setStories();
                        })
                    }
                }}
                ListFooterComponent={() => { return     this.showFooter?<ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />:null;
                }}
                onEndReachedThreshold={0.1}
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
            this._setStories();
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
export default connect(mapStateToProps,mapDispatchToProps)(Search);