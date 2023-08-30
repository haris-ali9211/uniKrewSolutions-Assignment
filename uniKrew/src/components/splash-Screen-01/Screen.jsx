import React, {useState, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

//styles
import styles from './style';

//get width
const windowWidth = Dimensions.get('window').width;

//context Opulent Sips
import {OpulentSips} from '../../context/OpulentSips';

const splashScreen = () => {
  //context action
  const {currentAccount} = useContext(OpulentSips);

  const imageWidth = windowWidth * 1; // Adjust as needed
  const imageHeight = (imageWidth * 272.31) / 305;

  const logos = [
    require('../../assets/images/logo.png'),
    require('../../assets/images/flashImage2.png'),
    require('../../assets/images/flashImage1.png'),
  ];

  //useState
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  //functions
  const changeIntroduction = () => {
    const newIndex = (currentLogoIndex + 1) % logos.length;
    setCurrentLogoIndex(newIndex);
  };

  let info = [
    {
      heading: 'Welcome to Opulent Sips',
      paragraph: `Discover refined flavors at 'Opulent Sips' where every sip embodies
          elegance and taste.`,
    },
    {
      heading: 'Free shipping on all orders',
      paragraph:
        'Free shipping on the primary order whilst the usage of CaPay fee method.',
    },
    {
      heading: '+24K Restaurants',
      paragraph:
        'Easily find your favorite food and have it delivered in record time.',
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={logos[currentLogoIndex]}
        style={{...styles.image, width: imageWidth, height: imageHeight}}
      />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{info[currentLogoIndex].heading}</Text>
        <Text style={styles.paragraph}>{info[currentLogoIndex].paragraph}</Text>
        <TouchableOpacity style={styles.button} onPress={changeIntroduction}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default splashScreen;
