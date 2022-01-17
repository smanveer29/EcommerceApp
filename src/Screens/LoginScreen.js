import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Colors } from '../Components/Colors'
import CustomInput from '../Components/CustomInput'
import axios from '../Assets/axios'
import EncryptedStorage from 'react-native-encrypted-storage';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const store= async (user,flag)=>{
        await EncryptedStorage.setItem('user',JSON.stringify({
            userData:user,
            user:flag
        }))
    }
    const login=()=>
    {
        setLoading(true)
        let data={
            email:email,
            password:password
        }
        axios.post('users/login',data)
        .then((res)=>{
            const userData=res.data.data
            console.log(res.data)
            if(res.data.status){
                store(userData,res.data.status)
                navigation.replace('Home')
            }
            else{
                alert(res.data.error)
            }
        })
    }
    return (
        <View style={styles.cont}>
        <Text style={{fontSize:28,fontWeight:'bold',color:Colors.text,textTransform:'uppercase',letterSpacing:2,alignSelf:'center',margin:20}}>Login here</Text>
            <View style={styles.inputs}>
                <CustomInput
                    label='Email'
                    autoFocus
                    onChangeText={(e) => setEmail(e)}
                />
                <CustomInput
                    label='Password'
                    onChangeText={(e) => setPassword(e)}
                    // onSubmitEditing={login()}
                />
                <Button style={styles.button} mode="contained" color="#eee"
                    disabled={!email || !password}
                    loading={loading}
                    onPress={login}>
                    Login
                </Button>
            </View>
            <View style={styles.register}>
            <Text style={{fontSize:18,color:'#fff',letterSpacing:1}}>Do Not Have Account? </Text>
            <Button mode="text" style={{marginLeft:'-14%'}} color={Colors.text} uppercase={false} labelStyle={{fontSize:18}}
                    onPress={() =>navigation.navigate('SignUp')}>
                    Register
                </Button>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.primary
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
    register:{
        justifyContent:'space-evenly',
        flexDirection:'row',
        alignItems: 'center'
    }
})
