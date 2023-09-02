// react import
import React, { useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';

//import style
import styles from './style';

const LogoScreen = () => {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/images/logo.png')}
                style={[styles.logo, { opacity: fadeAnim }]}
            />
        </View>
    );
};



export default LogoScreen;
