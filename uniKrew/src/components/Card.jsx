// react import
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// icons
import { MaterialIcons, EntypoIcon } from '../assets/icons/icon';

const Card = ({ product, style, COLORS, navigation, plants }) => {
  // console.log("🚀 ~ file: Card.jsx:9 ~ Card ~ product:", product?._id)

  // const randomIndex = Math.floor(Math.random() * plants.length);
  // const randomPlant = plants[randomIndex]?.img;

  const flow = () => {
    // const updatedProduct = { ...product, img: randomPlant };
    navigation.navigate('Details', product?._id);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={flow}>
      <View style={style.card}>
        <View style={{ alignItems: 'flex-end' }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: product.like
              //   ? 'rgba(245, 42, 42,0.2)'
              //   : 'rgba(0,0,0,0.2) ',
            }}>
            <MaterialIcons
              name="favorite"
              size={18}
            // color={product.like ? COLORS.red : COLORS.black}
            />
          </View>
        </View>

        <View
          style={{
            height: 100,
            alignItems: 'center',
          }}>
          {/* <Image source={randomPlant} style={{ flex: 1, resizeMode: 'contain' }} /> */}
        </View>

        <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
          {product.beverageName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{ fontSize: 19, fontWeight: 'bold' }}>${product.availableSizes[0].price}</Text>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.green,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>

            <EntypoIcon name="plus" size={18} color={COLORS.white} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
