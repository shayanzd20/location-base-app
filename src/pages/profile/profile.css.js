import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    body:{
        backgroundColor:'#00172f',
        flex:1,
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    infoText:{
        color:'white',
        flexWrap:'wrap',
        textAlign:'right',
        fontWeight:'normal',
        fontSize:hp(3),
        fontFamily:'byekan'
    },
    modalText:{
        color:'#00172f',
        flexWrap:'wrap',
        textAlign:'right',
        fontWeight:'normal',
        fontSize:hp(3),
        fontFamily:'byekan'
    },
    catsContainer:{
        paddingLeft:wp(1.5),
        paddingRight:wp(1.5),
        justifyContent:'center',
        alignItems:'center',
        flexWrap:'wrap',flexDirection:'row'
    },
    catButton:{
        width:wp(20),
        height:hp(5),
        borderRadius:wp(3),
        margin:wp(0.5),
        backgroundColor:'#00172f',justifyContent:'center',alignItems:'center',borderColor:'#fff',borderWidth:1,},
    catText:{
        color:'#fff',
        fontSize:hp(1.8),
        fontFamily:'byekan',
        fontWeight:"normal",
        textAlign:'center'
    },

});
