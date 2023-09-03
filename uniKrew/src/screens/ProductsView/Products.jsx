//react import
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
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

// context
import { OpulentSips } from '../../context/OpulentSipsContext';

// redux actions
import { useSelector } from 'react-redux';


const Products = ({ navigation }) => {

  //useState hooks
  const [product, setProduct] = useState([])
  const [error, setError] = useState(null)

  // context
  const { getProductsFromStore } = useContext(OpulentSips)

  // redux 
  const { isLoading } = useSelector(state => state.loader);

  const getProductData = async () => {
    let data = await getProductsFromStore()
    if (data) {
      setProduct(data)
      setError(false)
    }
    else {
      setError(true)
      console.log("nope")
    }
  }


  useEffect(() => {
    getProductData();
  }, []);

  // if (loading) return <Spinner />;
  // if (error) return <p>Something went wrong</p>;
  // if (data?.clients.length < 1) return <p>No data found</p>;


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


      {
        isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.green} />
          </View>
        ) :
          (
            <>
              <CategoryList style={style} />
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
                  return (
                    <Card
                      product={item}
                      style={style}
                      COLORS={COLORS}
                      navigation={navigation}
                    />
                  );
                }}
              />
              {error && (<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}><Text>SomeThing went Wrong</Text></View>)}
            </>
          )

      }
    </SafeAreaView>
  );
};

export default Products;
