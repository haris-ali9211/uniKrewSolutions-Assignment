// react import
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

//icons
import {MaterialIcons} from '../../assets/icons/icon';

// colors import
import COLORS from '../../consts/colors';

// context
import {OpulentSips} from '../../context/OpulentSipsContext';

//style
import style from './style';

// component
import {ActionsheetScreen} from '../../components/NativeBaseComponents';

// redux actions
import {useSelector} from 'react-redux';

// import native-base
import {useDisclose} from 'native-base';

const ProductDetails = ({navigation, route}) => {
  //navigation
  const navigationData = route.params;
  const {_id, img} = navigationData;

  // redux
  const {isLoading} = useSelector(state => state.loader);

  // context
  const {getOneProductFromStore} = useContext(OpulentSips);

  // native function
  const {isOpen, onOpen, onClose} = useDisclose();

  // useState
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSugar, setSelectedSugar] = useState('none');
  const [price, setPrice] = useState('');
  const [counter, setCounter] = useState(1);

  const getProductData = async () => {
    let data = await getOneProductFromStore(_id);
    if (data) {
      setProduct(data);
      setError(false);
      setSelectedSize(data?.availableSizes[0].cupCapacity);
      setPrice(data?.availableSizes[0].price);
    } else {
      setError(true);
      console.log('nope');
    }
  };

  const handleSizeChange = (size, price) => {
    setSelectedSize(size);
    setPrice(price);
  };

  const handleSugarChange = packet => {
    setSelectedSugar(packet);
  };

  const handleCounter = type => {
    if (type === 'increment') {
      setCounter(counter + 1);
    } else if (type === 'decrement' && counter > 1) {
      setCounter(counter - 1);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const sugarArray = ['none', 'low', 'medium', 'high'];

  const handelOrder = () => {
    let cartData = {
      beverageName: product.beverageName,
      sugarLevel: selectedSugar,
      cupCapacity: selectedSize,
      quantity: counter,
      deliveryTime: Date(),
      recurringOrder: false,
    };
    console.log('🚀():', cartData);
  };

  return (
    <>
      {isLoading || error ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLORS.green} />
        </View>
      ) : (
        <>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
            }}>
            {/* <ScrollView> */}
            <View style={style.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={28} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="shopping-cart" size={28} />
              </TouchableOpacity>
            </View>
            <View style={style.imageContainer}>
              <Image source={img} style={{resizeMode: 'contain', flex: 1}} />
            </View>

            <View style={style.detailsContainer}>
              <View
                style={{
                  marginLeft: 20,
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 28, fontWeight: 'bold'}}>
                  {product.beverageName}
                </Text>
                <View style={style.priceTag}>
                  <Text
                    style={{
                      marginLeft: 15,
                      color: COLORS.white,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    $ {price}
                  </Text>
                </View>
              </View>
              <View style={{paddingHorizontal: 20, marginTop: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Description
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 16,
                    lineHeight: 22,
                    marginTop: 10,
                  }}>
                  {product.description}
                </Text>

                <View style={{marginTop: 20}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Select Size
                  </Text>
                  <View style={style.sizeButtons}>
                    {product?.availableSizes?.map(data => {
                      return (
                        <TouchableOpacity
                          key={data._id}
                          style={[
                            style.sizeButton,
                            selectedSize === data?.cupCapacity &&
                              style.selectedSize,
                          ]}
                          onPress={() =>
                            handleSizeChange(data?.cupCapacity, data?.price)
                          }>
                          <Text style={style.sizeButtonText}>
                            {data?.cupCapacity?.charAt(0)?.toUpperCase() +
                              data?.cupCapacity?.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View style={{marginTop: 5}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Select Sugar
                  </Text>
                  <View style={style.sizeButtons}>
                    {sugarArray.map((data, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            style.sizeButton,
                            selectedSugar === data && style.selectedSize,
                          ]}
                          onPress={() => handleSugarChange(data)}>
                          <Text style={style.sizeButtonText}>{data}</Text>
                        </TouchableOpacity>
                      );
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
                    <TouchableOpacity
                      disabled={counter <= 1}
                      onPress={() => handleCounter('decrement')}>
                      <View style={style.borderBtn}>
                        <Text style={style.borderBtnText}>-</Text>
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 20,
                        marginHorizontal: 10,
                        fontWeight: 'bold',
                      }}>
                      {counter}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleCounter('increment')}>
                      <View style={style.borderBtn}>
                        <Text style={style.borderBtnText}>+</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={style.buyBtn} onPress={handelOrder}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      At to cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={onOpen}
                style={{
                  marginVertical: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  width: '90%',
                  backgroundColor: COLORS.green,
                  borderRadius: 30,
                  alignSelf: 'center',
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  Schedule a Order
                </Text>
              </TouchableOpacity>
              <ActionsheetScreen isOpen={isOpen} onClose={onClose} />
            </View>
            {/* </ScrollView> */}
          </SafeAreaView>
        </>
      )}
      {error && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Text>SomeThing went Wrong</Text>
        </View>
      )}
    </>
  );
};

export default ProductDetails;
