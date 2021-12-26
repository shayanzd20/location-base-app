import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    body: {
        backgroundColor: '#ab182a',
        flex: 1,
    },
    bookContainer: {
        paddingRight: '5%',
        paddingLeft: '5%',
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoBar: {
        // paddingRight: '5%',
        // paddingLeft: '5%',
        width: '100%',
        // backgroundColor:'blue',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop:10,
    },
    infoRows: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    infoDetail: {
        flexDirection: 'row',
        padding: 5,
    },
    bookText: {
        color: 'black',
        fontSize: 18,
        padding: 10,
    },
    bookContent: {},
    inputText: {
        padding: 5,
        margin: 0,
        width: '100%',
        backgroundColor: 'white',
    },
    resetButton:{
        width:'100%',
        margin:10,
    },
    commentContainer: {
        padding: 10,
        // marginTop:10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    rateContainer:{
        margin:5,
        width:'95%',
        alignItems:'flex-end',

    }
});
