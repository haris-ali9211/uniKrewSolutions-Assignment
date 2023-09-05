// react import
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// icons
import { MaterialIcons, EntypoIcon } from '../assets/icons/icon';

//images
import plants from '../consts/plants';

// redux actions
import { useSelector } from 'react-redux';

const Card = ({
  product,
  style,
  COLORS,
  navigation,
  setProductToCart,
  img,
  unSetFavorite,
  setFavorite,
  categoryIndex
}) => {

  // redux
  const { favorites } = useSelector(state => state.favorites);

  const flow = () => {
    let imageData = {
      _id: product?._id,
      img: img,
    };
    navigation.navigate('Details', imageData);
  };

  let cartData = {
    _id: product._id,
    img: img,
    beverageName: product.beverageName,
    sugarLevel: 'none',
    cupCapacity: 'small',
    price: product.availableSizes[0].price,
    quantity: 1,
    recurringOrder: false,
  };

  // check  
  const isFavorite = favorites.some(item => item._id === product._id);

  const handelOrder = () => {
    setProductToCart(cartData);
  };

  const handelFavorite = () => {
    if (isFavorite) {
      unSetFavorite(product._id);
    } else {
      setFavorite(product);

    }
  };

  return (
    <View style={style.card}>
      <View style={{ alignItems: 'flex-end' }}>
        {categoryIndex === 5 ? <><TouchableOpacity
          onPress={handelFavorite}
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: isFavorite
            //   ? 'rgba(245, 42, 42,0.2)'
            //   : 'rgba(0,0,0,0.2) ',
          }}>
          {/* <MaterialIcons
            name="favorite"
            size={18}
            color={isFavorite ? COLORS.red : COLORS.black}
          /> */}
        </TouchableOpacity></> : <TouchableOpacity
          onPress={handelFavorite}
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isFavorite
              ? 'rgba(245, 42, 42,0.2)'
              : 'rgba(0,0,0,0.2) ',
          }}>
          <MaterialIcons
            name="favorite"
            size={18}
            color={isFavorite ? COLORS.red : COLORS.black}
          />
        </TouchableOpacity>}
      </View>

      <View
        style={{
          height: 100,
          alignItems: 'center',
        }}>
        <Image
          source={img}
          style={{ flex: 1, resizeMode: 'contain', zIndex: -10 }}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={flow}>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
          {product.beverageName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
            ${product.availableSizes[0].price}
          </Text>
          <TouchableOpacity
            onPress={handelOrder}
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.green,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <EntypoIcon name="plus" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
