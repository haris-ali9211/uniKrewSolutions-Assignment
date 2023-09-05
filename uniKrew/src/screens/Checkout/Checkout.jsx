// react import
import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

//icons
import {EntypoIcon, MaterialIcons} from '../../assets/icons/icon';

// colors import
import COLORS from '../../consts/colors';

// style
import style from './style';

// context
import {OpulentSips} from '../../context/OpulentSipsContext';

// redux actions
import {useSelector} from 'react-redux';

// component imports
import Loader from '../../components/Loader';

// toast
import Toast from 'react-native-toast-message';

export default Checkout = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  // context
  const {addOrder, resetProductCart} = useContext(OpulentSips);

  // redux
  const {totalPrice, cartItems} = useSelector(state => state.cart);
  const {currentUser} = useSelector(state => state.user);

  const orderProduct = async () => {
    setLoading(true);
    let array = [];
    for (const element of cartItems) {
      let orderData;

      if (element.recurringOrder) {
        orderData = {
          userId: currentUser._id,
          beverageName: element.beverageName,
          sugarLevel: element.sugarLevel,
          cupCapacity: element.cupCapacity,
          price: element.price,
          quantity: element.quantity,
          deliveryTime: Date(),
          recurringOrder: true,
          recurringSchedules: element.recurringSchedules,
        };
      } else {
        orderData = {
          userId: currentUser._id,
          beverageName: element.beverageName,
          sugarLevel: element.sugarLevel,
          cupCapacity: element.cupCapacity,
          price: element.price,
          quantity: element.quantity,
          deliveryTime: Date(),
          recurringOrder: false,
        };
      }
      try {
        const placeOrder = await addOrder(orderData);
        array.push(placeOrder.savedOrder._id);
      } catch (error) {
        setLoading(false);
        console.error('Error placing order:', error);
      }
    }

    resetProductCart();
    Toast.show({
      text1: 'Success',
      text2: 'Your order has been placed',
      textStyle: {textAlign: 'center'},
      type: 'success',
      visibilityTime: 5000,
    });
    setLoading(false);
    navigation.navigate('OrderConfirm', array);
  };

  return (
    <SafeAreaView style={style.container}>
      <Loader visible={loading} />
      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={28} />
        </TouchableOpacity>
        <Text style={style.headerText}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={style.paymentContainer}>
          <View style={style.paymentHeader}>
            <View style={style.paymentHeaderIcon}>
              <EntypoIcon name="wallet" size={28} color={COLORS.green} />
            </View>
            <Text style={style.paymentHeaderText}>Payment</Text>
          </View>

          <View style={style.paymentDetails}>
            <View style={style.paymentDetailRow}>
              <Text style={style.paymentDetailLabel}>Payment Method:</Text>
              <Text style={style.paymentDetailValue}>Cash</Text>
            </View>
            <View style={style.paymentDetailRow}>
              <Text style={style.paymentDetailLabel}>Total Amount:</Text>
              <Text style={style.paymentDetailValue}>
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={style.orderSummaryContainer}>
          <View style={style.orderSummaryHeader}>
            <View style={style.orderSummaryHeaderIcon}>
              <EntypoIcon name="text-document" size={28} color={COLORS.green} />
            </View>
            <Text style={style.orderSummaryHeaderText}>Order Summary</Text>
          </View>

          {cartItems.map((item, index) => (
            <React.Fragment key={item._id + index}>
              <View style={style.orderItem}>
                <Text style={style.orderItemName}>{`${item.quantity}x ${
                  item.beverageName
                }, ${item.cupCapacity} with ${
                  item.sugarLevel === 'none' ? 'no' : item.sugarLevel
                } sugar`}</Text>
                <Text style={style.orderItemPrice}>
                  ${item.price.toFixed(2)}
                </Text>
              </View>
              <View>
                {item.recurringOrder &&
                  item.recurringSchedules.map((subItem, subIndex) => (
                    <View
                      key={subIndex + index}
                      style={{flexDirection: 'column'}}>
                      <Text
                        style={
                          style.orderItemName
                        }>{`     ● Day Of Week: ${subItem.dayOfWeek} at ${subItem.deliveryTime}`}</Text>
                    </View>
                  ))}
              </View>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      <View style={style.bottomContainer}>
        <Text style={style.totalPriceText}>
          Total Price: ${totalPrice.toFixed(2)}
        </Text>

        <TouchableOpacity style={style.checkoutButton} onPress={orderProduct}>
          <Text style={style.checkoutButtonText}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
