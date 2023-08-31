// react import
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

// icons
import {MaterialIconsIcon, EntypoIcon} from '../assets/icons/icon';

const Card = ({plant, style, COLORS, navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', plant)}>
      <View style={style.card}>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: plant.like
                ? 'rgba(245, 42, 42,0.2)'
                : 'rgba(0,0,0,0.2) ',
            }}>
            <MaterialIconsIcon
              name="favorite"
              size={18}
              color={plant.like ? COLORS.red : COLORS.black}
            />
          </View>
        </View>

        <View
          style={{
            height: 100,
            alignItems: 'center',
          }}>
          <Image source={plant.img} style={{flex: 1, resizeMode: 'contain'}} />
        </View>

        <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
          {plant.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{fontSize: 19, fontWeight: 'bold'}}>${plant.price}</Text>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.green,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <Text
                style={{fontSize: 22, color: COLORS.white, fontWeight: 'bold'}}>
                +
              </Text> */}

            <EntypoIcon name="plus" size={18} color={COLORS.white} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
