import { View, Text,  TouchableOpacity } from 'react-native'
import React from 'react'

const customButton = () => {
  return (
<TouchableOpacity className={`w-full bg-red rounded-md py-3 mb-4 flex-row justify-center items-center`}>
<Text>
    CustomButton
</Text>
</TouchableOpacity>
  )
}

export default customButton