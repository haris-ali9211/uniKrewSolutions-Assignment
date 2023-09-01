import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FF5F00',
  },
  dot1: {
    backgroundColor: '#f5ae62',
    opacity: 0.7,
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    top: '-5%',
    right: '8%',
  },
  dot2: {
    borderWidth: 4,
    borderColor: 'rgba(158, 150, 150, .3)',
    width: 18,
    height: 18,
    borderRadius: 1000,
    position: 'absolute',
    top: '2%',
    left: '25%',
  },
  e_container: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
  },
  e_container2: {
    width: '70%',
    alignSelf: 'center',
  },
  e_container2_text1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    letterSpacing: 1,
  },
  e_container2_text2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    lineHeight: 35,
    letterSpacing: 2,
  },
  dot3: {
    borderWidth: 4,
    borderColor: 'rgba(158, 150, 150, .3)',
    width: 25,
    height: 25,
    borderRadius: 1000,
    position: 'absolute',
    top: '18%',

    right: '15%',
  },
  log_container: {
    width: '100%',
    height: '75%',
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: 'center',
  },
  log_container2: {
    // backgroundColor:'red',

    // marginBottom: 90,
    width: '80%',
    height: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  log_container2_text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: -10,
  },
  email_view: {
    marginVertical: 25,
  },
  email_view_text: {
    color: 'gray',
    fontSize: 20,
  },
  email_view_textinput: {
    height: 30,
    padding: 5,
    borderBottomWidth: 1,
    color: 'black',
  },
  forgot_btn: {
    width: '40%',
    marginVertical: 10,
  },
  forgot_btn_text: {
    color: '#FF5F00',
    fontWeight: 'bold',
  },
  login_btn: {
    width: '80%',
    height: 50,
    backgroundColor: '#FF5F00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 5,
  },
  login_btn_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  create_account_btn: {
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 3,
  },
  create_account_btn_text: {
    color: '#FF5F00',
    fontWeight: 'bold',
  },
  auth_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: '25%',
    alignSelf: 'center',
  },
  auth_icon: {
    fontSize: 30,
    color: '#FF5F00',
  },
});
export default style;
