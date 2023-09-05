// react import
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

//styles
import styles from './style';

//get width
const windowWidth = Dimensions.get('window').width;

import logo from '../../assets/images/orderconfirm.png'

const OrderConfirm = ({ navigation, route }) => {
    //navigation
    const navigationData = route.params;

    // for responsive size import
    const imageWidth = windowWidth * 1; // Adjust as needed
    const imageHeight = (imageWidth * 272.31) / 305;



    //useState
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
    const [clickCounter, setClickCounter] = useState(0);

    //functions
    const changeIntroduction = () => {
        const newIndex = (currentLogoIndex + 1) % logos.length;

        if (clickCounter >= 2) {
            storeData()
            navigation.replace('Login');
            setClickCounter(0);
        } else {
            setCurrentLogoIndex(newIndex);
            setClickCounter(clickCounter + 1);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={logo}
                style={{ ...styles.image, width: imageWidth, height: imageHeight }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Your Order has been placed</Text>
                <Text style={styles.paragraph}>Your Order ID</Text>
                {navigationData?.map((data, index) => {
                    return (
                        <Text key={index} style={styles.paragraph}>#{data}</Text>
                    )
                })}
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.replace('Products')}
                >
                    <Text style={styles.buttonText}>Back to products</Text>
                </TouchableOpacity>


            </View>
        </View>
    );
};

export default OrderConfirm;
