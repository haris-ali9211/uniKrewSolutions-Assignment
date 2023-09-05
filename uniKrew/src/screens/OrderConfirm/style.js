import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  image: {
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%', // Adjust as needed
  },
  heading: {
    color: '#172B4D',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  paragraph: {
    color: '#7A869A',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    width: '90%',
    backgroundColor: '#2a6552',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
