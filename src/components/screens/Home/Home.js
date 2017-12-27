/**
 * Created by MnMistake on 12/26/2017.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableHighlight,
    AsyncStorage,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';

import MainStyles from '../../../styles/main';
import LocalStyles from './styles/local';

import BaseModel from '../../../core/BaseModel';

export default class Home extends Component {
    state = {
        city:'',
        state:'',
        currentDegrees:'',
        humidity:'',
        rain:''
    };

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.alertIfRemoteNotificationsDisabledAsync().then(() => console.log("permissionssss"))

        let weatherData = {};
        BaseModel.get(`-0.180653,-78.467838`).then((data) => console.log(data));
        return {weatherData}
    }

    alertIfRemoteNotificationsDisabledAsync = async () =>{
        const { Permissions } = Expo;
        const { status } = await Permissions.getAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Hey! You might want to enable notifications for my app, they are good.');
        }
    };




_onPressReload = async () => {
        let weatherData = {};
        let response = await BaseModel.get(`-0.180653,-78.467838`);
        if (response){
            weatherData = response.data
        }
        return {weatherData}
    };

    static async getInitialProps(){
        let weatherData = {};
        let response = await BaseModel.get(`${-0},${-0}`);
        if (response){
            weatherData = response.data
        }

        return {weatherData}
    }

    render(){

        return(
            <View style={LocalStyles.containerMain}>
                <View style={LocalStyles.row}>
                    <TouchableOpacity onPress={this._onPressReload} style={LocalStyles.reloadButton}>
                        <Image
                            style={LocalStyles.button}
                            source={require('../../../../resources/Home/reload.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={LocalStyles.row}>
                    <Image
                        style={LocalStyles.button}
                        source={require('../../../../resources/Home/circle.png')}
                    />
                    <Text style={LocalStyles.city}> Alcatraz Island,</Text>
                    <Text style={LocalStyles.state}> CA </Text>

                </View>

                <View style={LocalStyles.degreeRow}>
                    <Text style={LocalStyles.degrees}> 90 </Text>
                </View>

                <View style={LocalStyles.row}>
                    <View style={LocalStyles.column}>
                        <Text style={LocalStyles.humidity}> HUMIDITY </Text>
                        <Text style={LocalStyles.humidityLabel}> 100% </Text>
                    </View>
                    <View style={LocalStyles.column}>
                        <Text style={LocalStyles.rain}> RAIN </Text>
                        <Text style={LocalStyles.rainLabel}> 100% </Text>
                    </View>
                </View>
            </View>
        )
    }
}