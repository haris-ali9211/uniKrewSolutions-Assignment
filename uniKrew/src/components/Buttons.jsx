//react import
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

// colors import
import COLORS from '../consts/colors';


const PrimaryButton = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={style.btnContainer}>
                <Text style={style.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const Button = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: COLORS.green,
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15
            }}>
            <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18 }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};


export { PrimaryButton, Button };