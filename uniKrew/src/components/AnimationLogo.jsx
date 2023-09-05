import React, { useRef, useEffect } from 'react';
import {

    View,
    Text,
    Image,
    Animated,
    Easing,
} from 'react-native';


import logo from '../assets/images/logo.png'

const AnimationLogo = ({ cartItems, message }) => {

    //animation
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Configure the animation
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    }, [cartItems ? cartItems?.length <= 0 : null]);

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.View
                style={{
                    transform: [{ rotate }],
                }}>
                <Image source={logo} style={{ width: 100, height: 100 }} />
            </Animated.View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {message}
            </Text>
        </View>
    )
}

export default AnimationLogo