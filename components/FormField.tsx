import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row items-center border-2 border-black-200 w-full h-10 px-4 bg-black-100 rounded focus:border-green-950">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props} // Spread any additional props to the TextInput
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyehide : icons.eye}
              className="w-6 h-6 ml-3"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;