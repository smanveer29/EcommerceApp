import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native';;
import { Colors } from '../Components/Colors';
import Payment from '../Components/Payment';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import EncryptedStorage from 'react-native-encrypted-storage';
const CartScreen = ({ navigation }) => {
    const logout = async () => {
        await EncryptedStorage.clear();
        navigation.replace('Login')
    }
    // useEffect(() => {
    //     // <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', backgroundColor: '#fff', height: 100 }}>
    //     //     <Text>HEll</Text>
    //     // </View>
    //     <Payment/>
    // }, [tap])
    const [tap, setTap] = useState(false)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: '#fff',
            headerRight: () => (
                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Orders')}
                        style={{ marginRight: 20 }}>
                        <Icon3 name="shopping-bag" size={25} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={logout}
                        style={{ marginRight: 20 }}>
                        <Icon2 name="logout" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation,tap])
    const items = useSelector((state) => state.cartReducer.selectedItems.items)
    const total = items.map(item => Number(item.productPrice)).reduce((prev, curr) => prev + curr, 0)
    const dispatch = useDispatch();
    const selectedItem = (item, productValue) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...item, productValue: productValue }
        })
    }
    const clearCart=(item,val)=>{
        dispatch({
            type:'REMOVE',
            payload:{ item,productValue:val}
        })
    }
    const toggleTap=(flag)=>{
        setTap(flag)
        clearCart(null,false)
        navigation.replace('Home')
    }
    return (
        <View style={styles.cont}>
        {tap && <View style={styles.paymentCard}>
            <Payment tap={toggleTap}/>
        </View>}
            {items.length > 0 ?
                <ScrollView style={{ width: '100%' }}>
                    {
                        items.map(item =>
                            <View key={item.id} style={styles.card}>
                                <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                    <Image style={{ width: "90%", height: 140, borderRadius: 20 }} source={{ uri: item.productImage }} />
                                </View>

                                <View style={{ flex: 0.7, marginRight: 6 }}>
                                    <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 20, textTransform: 'uppercase', letterSpacing: -1 }}>{item.productName}</Text>
                                    <Text style={{ ...styles.text, }}>{item.productDetails}</Text>
                                    <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 16 }}>Price:- Rs. {item.productPrice}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={styles.remove} onPress={() => selectedItem(item, false)}>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>REMOVE</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </ScrollView>
                : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 34, textTransform: 'uppercase', letterSpacing: -1 }}>No item found</Text>
                </View>
            }
            {total > 0 &&
                <TouchableOpacity style={styles.btn} onPress={() => setTap(true)}>
                    <Text style={{ color: '#fff', fontSize: 23, fontWeight: 'bold', textTransform: 'uppercase' }}>proceed to pay</Text>
                    <Text style={{ color: '#fff', fontSize: 20, marginLeft: 20 }}>{total}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    btn: {
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6363',
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: 20
    },
    remove: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#FF6363',
        margin: 4,
        borderRadius: 4
    }
    , card: {
        padding: 20,
        // elevation: 10,
        // backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 1
    },
    text: {
        textAlign: 'justify',
        color: 'white',
        margin: 5
    },
    paymentCard:{
        width:'100%',
        height:'100%',
        position:'absolute', 
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.7)',
        zIndex:100
    }
})
