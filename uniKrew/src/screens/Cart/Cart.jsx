// react import
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

//icons
import {
  MaterialIcons,
} from '../../assets/icons/icon';

// colors import
import COLORS from '../../consts/colors';

// temp product
import foods from '../../consts/food';

//components import
import CartCard from '../../components/CartCard';
import { PrimaryButton } from '../../components/Buttons';
import { Alert } from '../../components/NativeBaseComponents';

//style
import style from './style';

export default function Cart({ navigation }) {

  // for alert
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <TouchableOpacity onPress={navigation.goBack}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>


      </View>

      <FlatList
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 40 }}
        data={foods}
        renderItem={({ item }) => <CartCard item={item} style={style} COLORS={COLORS} />}
      // ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 50}}
      />
      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: COLORS.green,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
            paddingHorizontal: 20,
          }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.white }}>Total Price</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.white }}>$50</Text>
        </View>

        <View style={{ marginHorizontal: 50, paddingBottom: 20 }}>
          <PrimaryButton title="CHECKOUT" style={style} onPress={() => setIsOpen(!isOpen)} />
        </View>

        <Alert cancelRef={cancelRef} onClose={onClose} isOpen={isOpen} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
