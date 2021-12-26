import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    body:{
        backgroundColor:'#f5f5f5',
        flex:1,
    },
    mainImage:{
        width:'100%',
        height:hp(20),
        justifyContent:'center',

    },
    gotoSite:{
        position:'absolute',
        bottom:0,
        left:0,
        backgroundColor:'#ffffff',
        borderRadius:5,
        paddingRight:15,
        paddingLeft:15,
        // paddingTop:2,
        // paddingBottom:2,
        borderColor:'#808080',
        borderWidth:1,
        marginLeft:5
    },
    gotoSiteText:{
        fontFamily:'byekan',
        color:'#00172f',
        fontSize:13
    },
    title:{
        textAlign:'right',
        color:'#000',
        fontSize:35,
        fontWeight:'bold',
        margin:'10%'
    },
    tabs:{
        height:hp(6),
        backgroundColor:'#fff',
    },
    tabText:{
        fontFamily:'byekan',
        color:'#00172f',
        fontSize:hp(2)
    },
    selectedText:{
        color:'#fff',
    },
    selectedTab:{

        backgroundColor:'#00172f',
    },
    information:{
        margin:15,
    },
    informationText:{
        fontFamily:'byekan',
        textAlign:'right',
        flexWrap:'wrap',
        color:'black',
        margin:5,
        fontSize:hp(2)

    },
    titleText: {
        marginLeft: 60,
        flexWrap: 'wrap',
        fontFamily: 'byekanbold',
        fontWeight: 'bold',
        color:'#0096bf',
        margin: 0,
        fontSize:hp(2.5)
    },
    line:{
        borderBottomColor: '#93939355',
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom:15
    },
    boldLine:{
        borderBottomColor: '#93939355',
        borderBottomWidth: hp(0.5),
        marginLeft: 20,
        marginRight: 20,
        marginBottom:15
    },
    offText:{
        fontFamily:'byekan',
        textAlign:'center',
        flexWrap:'wrap',
        color:'white',
        fontSize:hp(2)
        // margin:5
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    commentInput:{borderColor:'#808080',borderWidth:1,elevation:12,backgroundColor:'white',flexDirection:'row-reverse',margin:5,minHeight:hp(10)},
    buttonContainer:{flexDirection:'row',justifyContent:'flex-end',alignContent:'center'},
    buttonComment:{height:hp(6),width:hp(22),backgroundColor:'#00172f',marginTop:10,marginBottom:10,},

});
