// react import
import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

// icons
import {MaterialIcons, FontAwesome5Icon} from '../assets/icons/icon';

// context
import {OpulentSips} from '../context/OpulentSipsContext';

// image
import foods from '../consts/food';

const CartCard = ({item, style, COLORS}) => {
  const {removeProduct, increasesQuantityProduct, decreasesQuantityProduct} =
    useContext(OpulentSips);

  return (
    <View style={style.cartCard}>
      <TouchableOpacity
        style={style.closeButton}
        onPress={() => {
          removeProduct(item._id);
        }}>
        <MaterialIcons name="close" size={20} color={COLORS.red} />
      </TouchableOpacity>
      <Image source={item.img} style={{height: 80, width: 80}} />
      <View
        style={{
          height: 100,
          marginLeft: 10,
          paddingVertical: 20,
          flex: 1,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {item.beverageName}
        </Text>
        <Text style={{fontSize: 13, color: COLORS.green}}>
          {item.cupCapacity?.charAt(0).toUpperCase() +
            item.cupCapacity?.slice(1)}
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
      </View>
      <View style={{marginRight: 20, alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.quantity}</Text>
        <View style={style.actionBtn}>
          <TouchableOpacity
            onPress={() => {
              decreasesQuantityProduct(item._id);
            }}
            disabled={item.quantity <= 1}>
            <FontAwesome5Icon name="minus" size={15} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              increasesQuantityProduct(item._id);
            }}>
            <FontAwesome5Icon name="plus" size={15} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
