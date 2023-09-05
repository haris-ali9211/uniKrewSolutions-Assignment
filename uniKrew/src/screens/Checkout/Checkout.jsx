// react import
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

//icons
import {
    EntypoIcon,
    MaterialIcons,
} from '../../assets/icons/icon';

// colors import
import COLORS from '../../consts/colors';

// style
import style from './style';

const foods = [
    {
        id: '1',
        name: 'Product 1',
        price: 10,
    },
    {
        id: '2',
        name: 'Product 2',
        price: 20,
    },
    {
        id: '3',
        name: 'Product 3',
        price: 30,
    },
];

// redux actions
import { useSelector } from 'react-redux';

export default Checkout = ({ navigation }) => {

    // redux
    const { totalPrice, cartItems } = useSelector(state => state.cart);


    // const [cartItems, setCartItems] = useState(foods);
    // const [totalPrice, setTotalPrice] = useState(
    //     cartItems.reduce((total, item) => total + item.price, 0),
    // );

    const updateCartItemQuantity = (itemId, quantity) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity } : item,
        );
        setCartItems(updatedCartItems);
        const updatedTotalPrice = updatedCartItems.reduce(
            (total, item) => total + item.price,
            0,
        );
        setTotalPrice(updatedTotalPrice);
    };

    return (
        <SafeAreaView style={style.container}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={28} />
                </TouchableOpacity>
                <Text style={style.headerText}>Checkout</Text>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                            <Text style={style.paymentDetailValue}>${totalPrice.toFixed(2)}</Text>
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
                        <View style={style.orderItem} key={index}>
                            <Text style={style.orderItemName}>{`${item.quantity}x ${item.beverageName}, ${item.cupCapacity} with ${item.sugarLevel === 'none' ? 'no' : item.sugarLevel} sugar`}</Text>
                            <Text style={style.orderItemPrice}>${item.price.toFixed(2)}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={style.bottomContainer}>
                <Text style={style.totalPriceText}>Total Price: ${totalPrice.toFixed(2)}</Text>

                <TouchableOpacity style={style.checkoutButton} >
                    <Text style={style.checkoutButtonText}>Buy now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


