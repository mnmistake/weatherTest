/**
 * Created by MnMistake on 12/26/2017.
 */
import {StyleSheet} from 'react-native';

import Style from '../../../../styles/Stylesheet';

const LocalStyles = StyleSheet.create({
    containerMain: {
        backgroundColor: '#4A8DDD',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '25%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3%',
    },
    degreeRow: {
        flex:1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    reloadButton: {
        width: 42,
        height: 42,
    },
    button: {
        width: 32,
        height: 32,
    },
    city: {
        marginLeft: '3%',
        fontSize: Style.FONT_18,
        color: '#fff',
        fontWeight: 'bold'
    },
    state: {
        fontSize: Style.FONT_18,
        color: '#fff',
        fontWeight: 'bold'
    },
    degrees: {
        fontSize: 120,
        color: '#fff',
        fontWeight: 'bold'
    },
    humidity: {
        fontSize: Style.FONT_18,
        color: '#fff',
        fontWeight: 'bold',
        marginRight: '3%',
    },
    humidityLabel: {
        fontSize: Style.FONT_18,
        color: '#fff',
    },
    rain: {
        fontSize: Style.FONT_18,
        color: '#fff',
        fontWeight: 'bold'
    },
    rainLabel: {
        fontSize: Style.FONT_18,
        color: '#fff',
    },
});

export default LocalStyles;