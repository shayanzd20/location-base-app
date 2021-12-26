import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    body:{
        backgroundColor:'#fff',
        flex:1,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    mapIcon:{
        justifyContent:'center',
        alignContent:'center',
        height:hp(6),
    },
    searchContainer:{
        flexDirection:'row',
        // flex:1,
        // width:'80%',
        justifyContent:'space-around',
        alignContent:'center',
        marginTop:10,
        marginBottom:10,
        height:hp(6),


        // backgroundColor:'white'
    },
    offerContainer:{
        flexDirection:'row',
        // flex:1,
        // width:'80%',
        justifyContent:'space-between',
        alignContent:'center',
        margin:15,
        height:hp(6),


        // backgroundColor:'white'
    },
    searchItems:{
        flexDirection:'row',
        flex:.80,
        height:hp(6),
        // padding:3,
        borderWidth:hp(0.3),
        backgroundColor:'white',
        borderColor:'#0071bc'
        // backgroundColor:'blue'
    },
    searchIcon:{
        // height:hp(6),
        // flex:0.08,
        marginRight:wp(0.2),
        marginLeft:wp(0.1),
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
    searchBar: {
        flexDirection: 'row',
        paddingRight: '5%',
        paddingLeft: '5%',
        width: '100%',
        marginTop:10,
        marginBottom:10,
        // backgroundColor: 'blue',
    },
    buttonSearch:{
      padding:5,
        margin:0,
        backgroundColor:'white',
        justifyContent:'center',
        alignContent:'center',
    },
    inputText:{
        padding:5,
        margin:0,
        width:'90%',
        backgroundColor:'white',
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
    offerTitle:{
        justifyContent:'center',
        // padding:5,
        alignContent:'center',
        // marginRight:'15%',
        // backgroundColor:'white',
        // marginLeft: 60,
        // flexWrap: 'wrap',
        // fontFamily: 'byekanbold',
        // fontWeight: 'bold',
        // color:'#0096bf',
        // margin: 0,
        // fontSize:16
    },
    offerTitleText:{
        fontFamily: 'byekanbold',
        fontWeight: 'bold',
        color:'#00172f',
        margin: 0,
        fontSize:hp(2)
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
    },
    line:{
        borderBottomColor: '#93939355',
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom:15
    },
});
