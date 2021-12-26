import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    body:{
        backgroundColor:'#fff',
        flex:1,
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
