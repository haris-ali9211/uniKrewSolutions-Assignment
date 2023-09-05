// react import
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,

} from 'react-native';

//icons
import { MaterialIcons } from '../../assets/icons/icon';

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

// redux actions
import { useSelector } from 'react-redux';

// import component
import AnimationLogo from '../../components/AnimationLogo';

export default function Cart({ navigation }) {
  // redux
  const { totalPrice, cartItems } = useSelector(state => state.cart);

  // for alert
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MaterialIcons name="arrow-back-ios" size={28} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 40 }}
        data={cartItems}
        renderItem={({ item }) => (
          <CartCard item={item} style={style} COLORS={COLORS} />
        )}
      // ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 50}}
      />
      {cartItems.length <= 0 ? (
        <AnimationLogo cartItems={cartItems} message='Your cart is empty.' />
      ) : null}
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
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.white }}>
            Total Price
          </Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.white }}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>

        <View style={{ marginHorizontal: 50, paddingBottom: 20 }}>
          <PrimaryButton
            title="CHECKOUT"
            style={style}
            onPress={() => navigation.navigate('Checkout')}
          />
        </View>

        <Alert
          cancelRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
}
