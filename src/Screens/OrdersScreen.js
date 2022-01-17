import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../Components/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Button } from 'react-native-paper';
const OrdersScreen = ({ navigation }) => {
    let orders=[]
    const logout = async () => {
        await EncryptedStorage.clear();
        navigation.replace('Login')
    }
    useEffect(() => {
        async function fetchOrder() {
            let data = await EncryptedStorage.getItem('orders')
            orders=JSON.parse(data)
            console.log(orders)
        }
        fetchOrder()
    }, [navigation])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <Text {...props} style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                    Orders
                </Text>
            ),
            headerTintColor: '#fff',
            headerRight: () => (
                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Cart')}
                        style={{ marginRight: 20 }}>
                        <Icon3 name="shopping-cart" size={25} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={logout}
                        style={{ marginRight: 20 }}>
                        <Icon2 name="logout" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            ),
            headerStyle: {
                backgroundColor: Colors.primary, //Set Header color
            },
        });
    }, [navigation])
    return (
        <View style={styles.cont}>
            {orders.length > 0 ?
                <>
                    {orders.map(item =>
                        <View key={item.id} style={styles.card}>
                            <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                <Image style={{ width: "90%", height: 140, borderRadius: 20 }} source={{ uri: item.productImage }} />
                            </View>

                            <View style={{ flex: 0.7, marginRight: 6 }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 20, textTransform: 'uppercase', letterSpacing: -1 }}>{item.productName}</Text>

                                <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 16 }}>Price:- Rs. {item.productPrice}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.remove} onPress={() => selectedItem(item, false)}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>REMOVE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </>
                : <>
                    <Text>Order Something</Text>
                    <TouchableOpacity style={styles.remove} onPress={() => navigation.navigate('Home')}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Go to Home</Text>
                    </TouchableOpacity>
                </>
            }
                    <Button mode="contained" onPress={async () => await EncryptedStorage.removeItem('orders')}>
                        Press me
                    </Button>
        </View>
    )
}

export default OrdersScreen

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
    paymentCard: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 100
    }
})
