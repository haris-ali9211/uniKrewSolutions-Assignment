//react import
import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// colors import
import COLORS from '../../consts/colors';

// temp product
import plants from '../../consts/plants';

//style
import style from './style';

//icons
import { MaterialIcons } from '../../assets/icons/icon';

//components import
import CategoryList from '../../components/CategoryList';
import Card from '../../components/Card';
import { BadgeIcon } from '../../components/NativeBaseComponents';

const Products = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to</Text>
          <Text style={{ fontSize: 38, color: COLORS.green, fontWeight: 'bold' }}>
            Opulent Sips
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CartDetails')}>
          <BadgeIcon number={92} />

          <MaterialIcons name="shopping-cart" size={28} color={COLORS.green} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30, flexDirection: 'row' }}>
        <View style={style.searchContainer}>
          <MaterialIcons name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={style.input} />
        </View>
        <View style={style.sortBtn}>
          <MaterialIcons name="sort" size={30} color={COLORS.white} />
        </View>
      </View>
      <CategoryList style={style} />
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={plants}
        renderItem={({ item }) => {
          return (
            <Card
              plant={item}
              style={style}
              COLORS={COLORS}
              navigation={navigation}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Products;
