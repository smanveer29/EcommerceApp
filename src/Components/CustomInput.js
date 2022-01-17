import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Colors } from './Colors';
const CustomInput = (props) => {
    return (
        <TextInput
            {...props}
            style={styles.input}
            theme={{ colors: { primary: '#fff', text: Colors.text, placeholder: '#fff' } }}
            dense
            underlineColor='white'
        />
    )
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        width:'90%',
        height:50,
        borderRadius:10,
        backgroundColor:'transparent',
        margin:10
    },
})
