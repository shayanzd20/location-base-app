// import * as geolocation from "react-native/Libraries/Geolocation/Geolocation";
import {PermissionsAndroid} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import {removeUser, saveUser} from "../redux/actions";
import {connect} from "react-redux";
import Http from "./http";
import PStorage from "../redux/store";
// PStorage.dispatch();
export default class Location {
    watcher=null;
    _getLocation = async (cb) => {
        console.log("_getLocation")
        let defaultLocation={
            accuracy: 20,
            altitude: 0,
            heading: 0,
            latitude: '35.74522352',
            longitude:'51.3339293',
            speed: 0
        }
        try {
            if(await this._getLocationPermission()) {
               Geolocation.getCurrentPosition((loc)=>{
                   // cb(defaultLocation);
                   // console.log(loc);
                   loc.coords.latitude=loc.coords.latitude.toString();
                   loc.coords.longitude=loc.coords.longitude.toString();
                   cb(loc.coords)
               },(err)=>{
                   console.log(err)
                   cb(defaultLocation);
               }/*,{
                   //enableHighAccuracy: true,
/!*
                   timeout: 5000,
                   maximumAge: 10000
*!/
               }*/);
            }
        }
        catch (err) {
            cb(defaultLocation);
            console.log(err)
        }

    }
    startWatcher=async()=>{
        // console.log("startWtcher",PStorage.getState())
        // return;

        if(!this.watcher)
        {
            console.log("startWtcher2")
            try {
                if (await this._getLocationPermission()) {
                    console.log("startWtcher3")
                    this.watcher = Geolocation.watchPosition((loc) => {

                            let data = {
                                token: PStorage.getState().user.token,
                                latitude: loc.coords.latitude.toString(),
                                longitude: loc.coords.longitude.toString(),
                            }
                            let response = Http._postDataPromise(data, "api/updatepos/").then(response=>{
                                console.log(response)
                            }).catch(error=>{
                                console.log(error)
                            })
                            console.log(loc)
                        }, error => {
                            console.log(error)

                        },
                        {
                            enableHighAccuracy: true,
                            distanceFilter: 0,
                            interval: 2000,
                            fastestInterval: 2000
                        }
                    )
                    console.log(this.watcher)
                }
            }catch (err){
                console.log(err)
            }
        }

    };
    clearWatcher=()=>{
        if(this.watcher)
        Geolocation.clearWatch(this.watcher);
        this.watcher=null;
    };
    _getLocationPermission=async()=>{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }
        return false;
    }
    _requestLocationPermission=()=>{

    }
}