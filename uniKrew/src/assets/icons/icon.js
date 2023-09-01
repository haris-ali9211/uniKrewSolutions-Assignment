import AntDesign from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const AntDesignIcon = ({name, size, color}) => {
  return <AntDesign name={name} size={size} color={color} />;
};

export const MaterialIcons = ({name, size, color}) => {
  return <Material name={name} size={size} color={color} />;
};

export const EntypoIcon = ({name, size, color}) => {
  return <Entypo name={name} size={size} color={color} />;
};

export const FontAwesome5Icon = ({name, size, color}) => {
  return <FontAwesome5 name={name} size={size} color={color} />;
};
