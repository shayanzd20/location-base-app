import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    body:{
        backgroundColor:'#00172f',
        flex:1,
    },
    mainImage:{
      width:'100%',
      height:hp(65),
        justifyContent:'center',
        alignContent:'center',
    },
    searchContainer:{
        flexDirection:'row',
        // flex:1,
        // width:'80%',
        justifyContent:'center',
        alignContent:'center',
        // marginTop:'20%',
        height:40,

        // backgroundColor:'white'
    },
    searchItems:{
        flexDirection:'row',
        flex:.68,
        height:hp(6),
        // padding:3,
        borderWidth:hp(0.3),
        backgroundColor:'white',
        borderColor:'#0071bc'
        // backgroundColor:'blue'
    },
    searchIcon:{
        height:hp(5),
        // flex:0.08,
        marginRight:5,
        marginLeft:3,
        justifyContent:'center',
        alignContent:'center',
    },
    searchInput:{
        height:hp(7),
        // flex:0.6,
        width:'86%',
        fontSize:hp(2.4),
        fontFamily:'byekan'
        // backgroundColor:'white'
    },
    catsContainer:{
        flexWrap:'wrap',flexDirection:'row'
    },
    catButton:{
        width:wp(25),
        height:hp(11),
        backgroundColor:'#00172f',justifyContent:'center',alignItems:'center',borderColor:'#00173F',borderWidth:1,},
    catText:{
        color:'#00b6df',
        fontSize:hp(1.8),
        fontFamily:'byekan',
        fontWeight:"normal",
        textAlign:'center'
    },
    menuBar: {
        flexDirection: 'row',
        paddingRight: '5%',
        paddingLeft: '5%',
        width: '100%',
        marginTop:10,
        // backgroundColor: 'blue',
    },

    menuItem:{
        // backgroundColor:'white',
        // flex:0.5,
        width:'100%',
        justifyContent:'center',
        padding:5,
        alignContent:'center',
        backgroundColor:'white',
    },
    menuItemsText:{
        fontSize:14,
        color:'black',
        textAlign:'center',
        // paddingTop:5,
        // paddingBottom:5,
    },
    itemContainer:{
        flex:0.5,
        overflow:'hidden',
        justifyContent:'center',
        alignContent:'center',
        // backgroundColor:'red',
        flexDirection:'column'
    },
    itemIcon:{
        width:'100%',
        height:12,
        flexDirection:'row',
        // backgroundColor:'blue',
        // height:10,
        justifyContent:'center',
        alignContent:'center',
    }
});
