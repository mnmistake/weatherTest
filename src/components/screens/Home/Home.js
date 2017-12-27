/**
 * Created by MnMistake on 12/26/2017.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';

import {ApiHost} from '../../../config/variables';
import {Location, Permissions} from 'expo';
import LocalStyles from './styles/local';

export default class Home extends Component {
    state = {
        timeZone: '',
        state: '',
        temperature: '',
        currentDegrees: '',
        humidity: '',
        rain: '',
        locationResult: null,
    };

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._getLocationAndWeatherAsync().then(() => console.log("_getLocationAsync done!"))
    }

    _getLocationAndWeatherAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'no location permition',
            });
            Alert.alert(
                'Alert',
                'No hay acceso a la locacion',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressessd')},
                ],
                {cancelable: false}
            )
        }
        let location = await Location.getCurrentPositionAsync({});
        let response = await fetch(ApiHost + `${location.coords.latitude},${location.coords.longitude}`);
        if (response) {
            let json = await response.json()
            this.setState({
                humidity: json.currently.humidity,
                rain: json.currently.precipProbability,
                temperature: json.currently.temperature,
                timeZone: json.timezone
            });
        }
        this.setState({locationResult: JSON.stringify(location)});
    };

    render() {
        const {temperature, humidity, rain, timeZone, locationResult} = this.state;

        if (locationResult) {
            return (
                <View style={LocalStyles.containerMain}>
                    <View style={LocalStyles.row}>
                        <TouchableOpacity onPress={this._getLocationAndWeatherAsync()} style={LocalStyles.reloadButton}>
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
                        <Text style={LocalStyles.city}> {timeZone}</Text>
                        <Text style={LocalStyles.state}/>

                    </View>

                    <View style={LocalStyles.degreeRow}>
                        <Text style={LocalStyles.degrees}> {Math.round(parseInt(temperature) * 10) / 10} °</Text>
                    </View>

                    <View style={LocalStyles.row}>
                        <View style={LocalStyles.column}>
                            <Text style={LocalStyles.humidity}> HUMIDITY </Text>
                            <Text style={LocalStyles.humidityLabel}> {humidity} % </Text>
                        </View>
                        <View style={LocalStyles.column}>
                            <Text style={LocalStyles.rain}> RAIN </Text>
                            <Text style={LocalStyles.rainLabel}> {rain} % </Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{width: '100%', height: '100%', backgroundColor: '#4A8DDD',justifyContent: 'center',
                        alignItems: 'center',}}>
                        <Text style={{fontSize: 20, color: '#fff' , fontWeight: 'bold'}}> CARGANDO </Text>
                    </View>
                </View>
            )
        }
    }
}