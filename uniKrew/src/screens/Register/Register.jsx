//react import
import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert, ScrollView } from 'react-native';

// colors import
import COLORS from '../../consts/colors';

// component imports
import { Button } from '../../components/Buttons';
import Input from '../../components/Inputs';
import Loader from '../../components/Loader';

// style
import style from './style';

// context
import { OpulentSips } from '../../context/OpulentSipsContext'

// toast
import Toast from 'react-native-toast-message';

const Register = ({ navigation }) => {

    // context
    const { registerUser } = useContext(OpulentSips);


    const [inputs, setInputs] = useState({
        email: '',
        userName: '',
        phone: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }

        if (!inputs.userName) {
            handleError('Please input userName', 'userName');
            isValid = false;
        }

        if (!inputs.phone) {
            handleError('Please input phone number', 'phone');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('Min password length of 5', 'password');
            isValid = false;
        }

        if (isValid) {
            register();
        }
    };

    const register = async () => {
        let credentials = {
            username: inputs.userName,
            email: inputs.email,
            password: inputs.password
        }
        setLoading(true);
        let registerUserFun = await registerUser(credentials);
        console.log("🚀 ~ file: Register.jsx:82 ~ register ~ registerUser:", registerUser)
        if (registerUserFun.message) {
            Toast.show({
                text1: 'Success',
                text2: 'User registered Successfully',
                textStyle: { textAlign: 'center' },
                type: 'success',
                visibilityTime: 5000,
            });
            setLoading(false);
            navigation.navigate('Login');
        } else {
            setLoading(false);
            // Alert.alert('Error', 'Something went wrong');
        }
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
                    Register
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
                    Enter Your Details to Register
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'userName')}
                        onFocus={() => handleError(null, 'userName')}
                        iconName="account-outline"
                        label="User Name"
                        placeholder="Enter your user name"
                        error={errors.userName}
                    />

                    <Input
                        keyboardType="numeric"
                        onChangeText={text => handleOnchange(text, 'phone')}
                        onFocus={() => handleError(null, 'phone')}
                        iconName="phone-outline"
                        label="Phone Number"
                        placeholder="Enter your phone no"
                        error={errors.phone}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                    />
                    <Button title="Register" onPress={validate} />
                    <Text
                        onPress={() => navigation.navigate('Login')}
                        style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Already have account?
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register