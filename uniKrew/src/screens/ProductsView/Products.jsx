//react import
import React, { useEffect, useState, useContext } from 'react';
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
import AnimationLogo from '../../components/AnimationLogo';

// context
import { OpulentSips } from '../../context/OpulentSipsContext';

// redux actions
import { useSelector } from 'react-redux';

const Products = ({ navigation }) => {

  // redux function
  const { favorites } = useSelector(state => state.favorites);

  //useState hooks
  const [product, setProduct] = useState([]);
  const [temp, setTemp] = useState([]);
  const [error, setError] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(0);

  // context
  const { getProductsFromStore, setProductToCart, unSetFavorite, setFavorite } =
    useContext(OpulentSips);


  //category list
  const categories = ['all', 'coffee', 'juice', 'green tea', 'regular tea', 'favorites'];



  const handleCategory = (index) => {
    setCategoryIndex(index);
    if (index === 5) {
      setProduct(favorites);
    } else if (index === 0) {
      getProductData();
    } else {
      const selectedCategory = categories[index];
      const filteredProducts = temp.filter((item) => item.category === selectedCategory);
      setProduct(filteredProducts);
    }
  };


  // redux
  const { isLoading } = useSelector(state => state.loader);

  const getProductData = async () => {
    let data = await getProductsFromStore();
    if (data) {
      setTemp(data)
      setProduct(data);
      setError(false);
    } else {
      setError(true);
      console.log('nope');
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

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
          <BadgeIcon />

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
      {isLoading ? (
        <AnimationLogo cartItems={product} message='Loading for server.' />
      ) : (
        <>
          <CategoryList style={style} categories={categories} categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} handleCategory={handleCategory} />
          {favorites.length <= 0 && categoryIndex === 5 ? <AnimationLogo cartItems={product} message='No favorites products.' /> : null}

          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 50,
            }}
            numColumns={2}
            data={product}
            renderItem={({ item }) => {
              const randomIndex = Math.floor(Math.random() * plants.length);
              const randomPlant = plants[randomIndex]?.img;
              return (
                <Card
                  product={item}
                  style={style}
                  COLORS={COLORS}
                  navigation={navigation}
                  setProductToCart={setProductToCart}
                  img={randomPlant}
                  unSetFavorite={unSetFavorite}
                  setFavorite={setFavorite}
                  categoryIndex={categoryIndex}
                />
              );
            }}
          />
          {error && (
            <AnimationLogo cartItems={product} message='SomeThing went Wrong.' />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Products;
