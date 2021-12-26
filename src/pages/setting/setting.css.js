import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    body:{
        backgroundColor:'#ab182a',
        flex:1,
    },
    settingContainer: {
        paddingRight: '5%',
        paddingLeft: '5%',
        width: '100%',
        marginTop:10,
        backgroundColor: 'white',
        justifyContent:'center',
    },
    settingItem:{
        justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'blue'
    },
    settingTitleText:{
        color:'black',
        paddingLeft:5,
        fontSize:15,
    },
    settingTitle:{
        flexDirection:'row',
        // backgroundColor:'red',
        padding:5,
        // width:'50%',
        justifyContent:'center',
        alignContent:'center'
    },
    resetButton:{
        margin:10,
    },
    showStyle:{
        flexDirection:'row',
        padding:15,
        justifyContent:'space-around'
    },
    storyButton:{
        // width:90,
        padding:5,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    storyText:{
        fontSize:15,
        textAlign:'center',
        // backgroundColor:'blue',
        justifyContent:'center'
    }
});
