import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage';
import { Colors } from '../Components/Colors';
const SplashScreen = ({navigation}) => {
    useEffect(() => {
        async function fetchUser(){
            let data=await EncryptedStorage.getItem('user')
            if(data!==null)
            {
                navigation.replace('Home')
            }
            else{
                navigation.replace('Login')
            }
        }
        fetchUser()
    }, [])
    return (
        <View style={{flex:1,alignItems: 'center',justifyContent:'center',backgroundColor:Colors.primary}}>
            <Text style={{color:'white',fontSize:34,textTransform:'uppercase'}}>E commerce app</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})
