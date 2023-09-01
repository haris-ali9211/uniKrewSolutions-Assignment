import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

const PrimaryButton = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={style.btnContainer}>
                <Text style={style.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export { PrimaryButton };