import AntDesign from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export const AntDesignIcon = ({name, size, color}) => {
  return <AntDesign name={name} size={size} color={color} />;
};

export const MaterialIconsIcon = ({name, size, color}) => {
  return <Material name={name} size={size} color={color} />;
};

export const EntypoIcon = ({name, size, color}) => {
  return <Entypo name={name} size={size} color={color} />;
};
