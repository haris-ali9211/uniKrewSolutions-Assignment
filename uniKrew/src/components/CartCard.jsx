// react import
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

// icons
import { MaterialIcons, FontAwesome5Icon } from '../assets/icons/icon';


const CartCard = ({ item, style, COLORS }) => {
    return (
        <View style={style.cartCard}>
            <TouchableOpacity style={style.closeButton}>
                <MaterialIcons name="close" size={20} color={COLORS.red} />
            </TouchableOpacity>
            <Image source={item.image} style={{ height: 80, width: 80 }} />
            <View
                style={{
                    height: 100,
                    marginLeft: 10,
                    paddingVertical: 20,
                    flex: 1,
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                <Text style={{ fontSize: 13, color: COLORS.green }}>
                    {item.ingredients}
                </Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.price}</Text>
            </View>
            <View style={{ marginRight: 20, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>3</Text>
                <View style={style.actionBtn}>
                    <TouchableOpacity>
                        <FontAwesome5Icon name="minus" size={15} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome5Icon name="plus" size={15} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CartCard