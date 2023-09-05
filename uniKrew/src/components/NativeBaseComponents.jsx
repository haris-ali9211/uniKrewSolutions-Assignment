// import react
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from 'react-native';

// import nativeBase
import {
  AlertDialog,
  Button,
  Center,
  Badge,
  Box,
  Actionsheet,
} from 'native-base';

// colors
import COLORS from '../consts/colors';

// redux actions
import {useSelector} from 'react-redux';

const Alert = ({cancelRef, onClose, isOpen, navigation}) => {
  const handelFlow = () => {
    onClose;
    navigation.navigate('Checkout');
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height" enabled>
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            {/* <AlertDialog.Header>Checkout</AlertDialog.Header> */}
            <AlertDialog.Body>
              Are you sure you want to checkout
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}>
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={handelFlow}>
                  Yes
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </KeyboardAvoidingView>
  );
};

const BadgeIcon = () => {
  // redux
  const {totalQuantity} = useSelector(state => state.cart);

  return (
    <>
      {totalQuantity > 0 ? (
        <Badge // bg="red.400"
          colorScheme="danger"
          rounded="full"
          mb={-4}
          mr={-2}
          zIndex={1}
          variant="solid"
          alignSelf="flex-end"
          _text={{
            fontSize: 10,
          }}>
          {totalQuantity}
        </Badge>
      ) : null}
    </>
  );
};

const ActionsheetScreen = ({
  isOpen,
  onClose,
  setRecurveProductToCart,
  cartData,
}) => {
  // useState
  const [selectedDay, setSelectedDay] = useState('');
  const [time, setTime] = useState('');

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const {height: screenHeight} = Dimensions.get('window');
  const [actionsheetHeight, setActionsheetHeight] = useState(screenHeight / 3);
  const [recurringSchedules, setRecurringSchedules] = useState([]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setActionsheetHeight(screenHeight - event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setActionsheetHeight(screenHeight / 3);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const addDays = day => {
    if (recurringSchedules.includes(day)) {
      const updatedSchedules = recurringSchedules.filter(item => item !== day);
      setRecurringSchedules(updatedSchedules);
    } else {
      setRecurringSchedules([...recurringSchedules, day]);
    }
  };

  const addToCart = () => {
    const formattedSchedules = recurringSchedules.map(dayOfWeek => ({
      dayOfWeek,
      deliveryTime: time,
    }));

    const updatedCartData = {
      ...cartData, // Copy the existing cartData properties
      recurringOrder: true, // Set recurringOrder to true
      recurringSchedules: formattedSchedules,
    };

    setRecurveProductToCart(updatedCartData);
    // Now, you can use updatedCartData for your cart operations

    // if (time && recurringSchedules.length > 0) {
    //   const formattedInput = time.replace(/\s/g, '').toUpperCase();
    //   if (/^\d{0,2}:\d{0,2}(AM|PM)?$/.test(formattedInput)) {

    //   } else {
    //     Toast.show({
    //       text1: 'Wrong time entered',
    //       text2: `Please enter correct time 'HH:MM AM/PM'`,
    //       textStyle: {textAlign: 'center', fontSize: 22},
    //       type: 'error',
    //       visibilityTime: 5000,
    //     });
    //   }
    // } else if (!time || recurringSchedules.length > 0) {
    //   Toast.show({
    //     text1: 'Input field empty',
    //     text2: 'Please enter time and day',
    //     textStyle: {textAlign: 'center'},
    //     type: 'error',
    //     visibilityTime: 5000,
    //   });
    //   console.log('Input field empty');
    // } else {
    //   Toast.show({
    //     text1: 'Please enter time and day',
    //     textStyle: {textAlign: 'center'},
    //     type: 'error',
    //     visibilityTime: 5000,
    //   });
    // }
  };

  const renderDayButtons = () => {
    return daysOfWeek.map((day, index) => {
      const isSelected = recurringSchedules.includes(day);
      const buttonStyle = isSelected ? styles.circleSelected : styles.circle;
      const textStyle = isSelected ? styles.dayTextSelected : styles.dayText;

      return (
        <TouchableOpacity
          key={index}
          style={[buttonStyle]}
          onPress={() => {
            setSelectedDay(day);
            addDays(day);
          }}>
          <View style={buttonStyle}>
            <Text style={textStyle}>{day.charAt(0)}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay>
        <Actionsheet.Content>
          <Box w="100%" h={250} style={{height: actionsheetHeight}}>
            <View style={styles.container}>
              <Text>Select a day:</Text>
              <View style={styles.daysContainer}>{renderDayButtons()}</View>
              <Text>Enter a time:</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM AM/PM"
                onChangeText={setTime}
                value={time}
              />

              <TouchableOpacity
                onPress={addToCart}
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
                  Add to cart
                </Text>
              </TouchableOpacity>
            </View>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export {Alert, BadgeIcon, ActionsheetScreen};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dayButton: {
    flex: 1,
    alignItems: 'center',
    color: COLORS.white,
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.white,
  },
  dayText: {
    color: COLORS.green,
    fontSize: 18,
    fontWeight: 'bold',
  },
  circleSelected: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.white,
  },
  dayTextSelected: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 5,
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
};
