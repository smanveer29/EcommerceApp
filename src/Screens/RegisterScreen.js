import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import createPerformanceLogger from 'react-native/Libraries/Utilities/createPerformanceLogger'
import axios from '../Assets/axios'
import { Colors } from '../Components/Colors'
import CustomInput from '../Components/CustomInput'

const SignUpScreen = ({ navigation }) => 
{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)



    const register=()=>{
        let data={
            name:name,
            email:email,
            password:password,
            address:address,
        }
        axios.post('/users/register',data)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    }
    const check = () => {
        if (confirmPassword === password) {
            setLoading(true)
            register()
            navigation.replace('Home')
        }
        else {
            alert('Incorrect password')
        }
    }
    return (
        <SafeAreaView style={styles.cont}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: Colors.text, textTransform: 'uppercase', letterSpacing: 2, alignSelf: 'center', margin: 20 }}>Register here</Text>
            <ScrollView>
                <View style={styles.inputs}>
                    <CustomInput
                        label='Name'
                        autoFocus
                        onChangeText={(e) => setName(e)}
                    />
                    <CustomInput
                        label='Your Address'
                        onChangeText={(e) => setAddress(e)}
                    />
                    <CustomInput
                        label='Email'
                        onChangeText={(e) => setEmail(e)}
                    />
                    <CustomInput
                        label='Password'
                        onChangeText={(e) => setPassword(e)}
                    />
                    <CustomInput
                        label='Confirm Password'
                        onChangeText={(e) => setConfirmPassword(e)}
                    />
                    <Button style={styles.button} mode="contained" color={Colors.text}
                        disabled={!confirmPassword || !password || !email || !name || !address}
                        loading={loading}
                        onPress={check}>
                        Register
                    </Button>
                </View>
                <View style={styles.register}>
                    <Text style={{ fontSize: 18, color: '#fff', letterSpacing: 1 }}>Already Have Account? </Text>
                    <Button mode="text" style={{ marginLeft: '-14%' }} uppercase={false} labelStyle={{ fontSize: 18, color: Colors.text, fontWeight: 'bold' }}
                        onPress={() => navigation.navigate('Login')}>
                        Login
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#92A9BD'
    },
    inputs: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderRadius: 10,
        margin: 30,
        width: '60%',
        height: 40
    },
    register: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center'
    }
})
