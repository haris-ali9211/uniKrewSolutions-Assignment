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

const CategoryList = ({ style, categories, categoryIndex, setCategoryIndex, handleCategory }) => {

  return (
    <View style={style.categoryContainer}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => handleCategory(index)}>
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
