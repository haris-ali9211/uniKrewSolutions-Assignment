// react import
import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

//icons
import { MaterialIcons } from '../../assets/icons/icon';

// colors import
import COLORS from '../../consts/colors';

// context
import { OpulentSips } from '../../context/OpulentSipsContext'

//style
import style from './style';

// redux actions
import { useSelector } from 'react-redux';


const ProductDetails = ({ navigation, route }) => {

  //navigation
  const navigationData = route.params;
  const { _id, img } = navigationData

  // redux 
  const { isLoading } = useSelector(state => state.loader);

  // context
  const { getOneProductFromStore } = useContext(OpulentSips)

  // useState
  const [product, setProduct] = useState([])
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState();
  console.log("🚀 ~ file: ProductDetails.jsx:35 ~ selectedSize:", product?.availableSizes[1])

  const getProductData = async () => {
    let data = await getOneProductFromStore(_id)
    if (data) {
      setProduct(data)
      setError(false)
      // setSelectedSize()
    }
    else {
      setError(true)
      console.log("nope")
    }
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (

    <>
      {
        isLoading || error ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.green} />
          </View>
        ) :
          (
            <>
              <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: COLORS.white,
                }}>
                <View style={style.header}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>

                    <MaterialIcons name="arrow-back" size={28} />
                  </TouchableOpacity>
                  <TouchableOpacity>

                    <MaterialIcons name="shopping-cart" size={28} />
                  </TouchableOpacity>
                </View>
                <View style={style.imageContainer}>
                  <Image source={img} style={{ resizeMode: 'contain', flex: 1 }} />
                </View>

                <View style={style.detailsContainer}>
                  <View
                    style={{
                      marginLeft: 20,
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <View style={style.line} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Best choice</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 20,
                      marginTop: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{product.beverageName}</Text>
                    <View style={style.priceTag}>
                      <Text
                        style={{
                          marginLeft: 15,
                          color: COLORS.white,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        ${product.price}
                      </Text>
                    </View>
                  </View>

                  <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>About</Text>
                    <Text
                      style={{
                        color: 'grey',
                        fontSize: 16,
                        lineHeight: 22,
                        marginTop: 10,
                      }}>
                      {product.description}
                    </Text>

                    <View style={{ marginTop: 20 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Select Size</Text>
                      <View style={style.sizeButtons}>
                        {product?.availableSizes?.map((data, index) => {
                          return (
                            <>
                              <TouchableOpacity
                                key={index}
                                style={[style.sizeButton, selectedSize === data?.cupCapacity && style.selectedSize]}
                                onPress={() => handleSizeChange(data?.cupCapacity)}>
                                <Text style={style.sizeButtonText}>{data?.cupCapacity?.charAt(0)?.toUpperCase() + data?.cupCapacity?.slice(1)}</Text>
                              </TouchableOpacity>
                            </>
                          )
                        })}
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={style.borderBtn}>
                          <Text style={style.borderBtnText}>-</Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 20,
                            marginHorizontal: 10,
                            fontWeight: 'bold',
                          }}>
                          1
                        </Text>
                        <View style={style.borderBtn}>
                          <Text style={style.borderBtnText}>+</Text>
                        </View>
                      </View>

                      <View style={style.buyBtn}>
                        <Text
                          style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
                          Buy
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </>)}
      {error && (<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}><Text>SomeThing went Wrong</Text></View>)}

    </>

  );
};

export default ProductDetails;
