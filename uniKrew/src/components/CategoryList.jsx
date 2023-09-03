import { FavouriteIcon } from 'native-base';
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const CategoryList = ({ style }) => {
  // useState
  const [categoryIndex, setCategoryIndex] = useState(0);

  const categories = ['coffee', 'juice', 'green tea', 'regular tea', 'favorite'];

  return (
    <View style={style.categoryContainer}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setCategoryIndex(index)}>
          <Text
            style={[
              style.categoryText,
              categoryIndex === index && style.categoryTextSelected,
            ]}>
            {item.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryList;
