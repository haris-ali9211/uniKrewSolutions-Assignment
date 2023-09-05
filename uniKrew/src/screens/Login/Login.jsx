
//react import
import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert } from 'react-native';

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


const Login = ({ navigation }) => {

    // context
    const { loginUser } = useContext(OpulentSips);

    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }
        if (isValid) {
            login();
        }
    };

    const login = async () => {
        setLoading(true);
        let credentials = { email: inputs.email, password: inputs.password };
        let userData = await loginUser(credentials);
        if (userData) {
            if (
                inputs.email == userData.email
            ) {
                Toast.show({
                    text1: 'Success',
                    text2: 'Login Successfully',
                    textStyle: { textAlign: 'center' },
                    type: 'success',
                    visibilityTime: 5000,
                });
                setLoading(false);
                navigation.replace('Products');
            } else {
                setLoading(false);
                Alert.alert('Error', 'Invalid Details');
            }
        } else {
            setLoading(false);
            Alert.alert('Error', 'User does not exist');
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
            <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
                    Log In
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
                    Enter Your Details to Login
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
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                    />
                    <Button title="Log In" onPress={validate} />
                    <Text
                        onPress={() => navigation.navigate('Register')}
                        style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Don't have account ?
                    </Text>
                    <Text
                        style={{
                            color: COLORS.grey,
                            textAlign: 'center',
                            fontSize: 12,
                        }}>
                        tempEmail: test@gmail.com
                    </Text>
                    <Text
                        style={{
                            color: COLORS.grey,
                            textAlign: 'center',
                            fontSize: 12,
                        }}>
                        tempPassword: test
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login