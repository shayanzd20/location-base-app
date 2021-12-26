

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {connect, Provider} from "react-redux";
import {Drawer, Router, Scene, Stack, Tabs} from "react-native-router-flux";
import Home from './pages/home/home'
import Splash from './pages/splash/splash'
import Login from './pages/login/login'
import Verify from './pages/verify/verify'
import Offer from './pages/offer/offer'
import OffInfo from './pages/offinfo/offinfo'
import Profile from './pages/profile/profile'
import DrawerLayout from './components/drawer/drawer'
import PStorage from "./redux/store";
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {};
export default class App extends Component<Props> {
    render() {
        const RouterRedux = connect()(Router);
        return (
            <Provider store={PStorage}>
                <RouterRedux>
                    <Scene key="root" hideNavBar initial>
                        <Drawer
                            key="drawer"
                            drawerPosition="right"
                            contentComponent={DrawerLayout}
                            hideNavBar={true}
                            drawerWidth={200}
                        >
                            <Tabs
                                hideNavBar
                                tabBarStyle={{height:hp(8),justifyContent:'center'}}
                                labelStyle={{fontFamily:'byekan',fontSize:hp(2)}}
                                key="tabbar"
                                swipeEnabled
                                tabBarPosition="bottom"
                                showLabel={true}
                                activeTintColor="#940004"
                                inactiveTintColor="#00172f"
                            >
                            <Stack icon={({focused}) => (<FIcon  name="user" size={hp(3)} color={focused?"#940004":"#00172f"}  />)} key={'پروفایل'}>
                                <Scene initial key="profilep" hideNavBar component={Profile} title="پیشنهادات ما">
                                </Scene>
                            </Stack>
                                <Stack icon={({focused}) => (<FIcon  name="gift" size={hp(3)} color={focused?"#940004":"#00172f"}  />)} key={'پیشنهادات من'}>
                                <Scene  key="offerp" hideNavBar component={Offer} title="پیشنهادات ما">
                                </Scene>
                                <Scene key="offinfooffer" hideNavBar component={OffInfo} title="خانه">
                                </Scene>
                            </Stack>
                            <Stack initial   icon={({focused}) => (<FIcon  name="home" size={hp(3)} color={focused?"#940004":"#00172f"}  />)} key={'خانه'}>
                                <Scene initial key="homep" hideNavBar component={Home} title="خانه">
                                </Scene>
                                <Scene key="offinfohome" hideNavBar component={OffInfo} title="خانه">
                                </Scene>
                                <Scene key="catp" hideNavBar component={Offer} title="پیشنهادات ما">
                                </Scene>
                            </Stack>
                            </Tabs>
                        </Drawer>
                        <Scene key="auth" hideNavBar initial>
                            <Scene key="splashp" hideNavBar component={Splash} initial title="خانه">
                            </Scene>
                            <Scene key="loginp" hideNavBar component={Login}  title="خانه">
                            </Scene>
                            <Scene key="verifyp" hideNavBar component={Verify} title="خانه">
                            </Scene>
                    </Scene>

                </Scene>
                </RouterRedux>
            </Provider>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
