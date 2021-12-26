import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    body: {
        // backgroundColor: 'pink',
        height:hp(25),
        borderColor:'#80808000',borderWidth:0.1,elevation:12,
        margin:10,
    },
    backgroundImage:{
        width:'100%',
        height:'100%',
        position:'absolute',
    },
    info:{
        // backgroundColor:'#afff0002',
        // height:50,
        // position:'relative'
        flexDirection:'row',
        justifyContent:'space-between'
    },
    otherInfo:{
        flexDirection:'column-reverse',
        width:'35%',
        // backgroundColor:'red'
    },
    mainInfo:{
        flexWrap:'wrap',
        width:wp(60)
    },
    coverImage:{
        width:'100%',
        height:'100%',
        flexDirection:'column-reverse',
        position:'absolute',
        right:0,
        zIndex:100,
        bottom:0,
        // backgroundColor:'red'
        // justifyContent:'center',
        // alignItems:'center',
    },discountImage:{
        width:hp(10),
        height:hp(10),
        position:'absolute',
        left:0,
        zIndex:100,
        top:0
    },
    offContainer:{
        height:hp(6),
        // backgroundColor: 'pink',
    },
    infoContainer:{
        height:hp(20),
        // backgroundColor: 'yellow',
    },
    locationButton:{
        backgroundColor:'#ffffff55',
        borderRadius:5,
        paddingRight:15,
        paddingLeft:15,
        paddingTop:2,
        paddingBottom:2,
        borderColor:'#808080',
        borderWidth:1,
        marginLeft:5
    },
    locationIcon:{
      justifyContent:'center',
      alignItems:'center',
    },
    locationText:{
        fontFamily:'byekan',
        color:'#000',
      fontSize:hp(2),
    },
    discountValue:{
        fontFamily:'byekan',
        transform: [{ rotate: '-45deg'}],
        color:'white',
        // fontWeight:'bold',
        position:'absolute',
        left:0,
        zIndex:100,
        top:0,
        margin:5,
        fontSize:hp(2.2)
    },
    discountText:{
        fontSize:hp(2.2),
        fontFamily:'byekan',
        transform: [{ rotate: '-45deg'}],
        color:'white',
        fontWeight:'bold',
        position:'absolute',
        left:wp(1.5),
        zIndex:100,
        top:hp(3.2)
    },
    infoText:{
        fontFamily:'byekan',
        color:'black',
        marginRight:5,
        // backgroundColor:'pink',
        // textAlign:'right',
        flexWrap:'wrap',

    },
    otherDetails:{
        padding:5,
        flexDirection:'row'
    },
    details:{
        padding:5,
        flexDirection:'row-reverse',
        flexWrap:'wrap'
    }
});