import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import axios from '../Assets/axios'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux'
import { Colors } from '../Components/Colors'
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSelector } from 'react-redux';
const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([])
    const [tap, setTap] = useState(false)
    const [counter, setCounter] = useState(0)
    const items = useSelector((state) => state.cartReducer.selectedItems.items)
    const total = items.map(item => Number(item.productPrice)).reduce((prev, curr) => prev + curr, 0)
    console.log(total)
    const dispatch = useDispatch();
    const selectedItem = (item, productValue) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...item, productValue: productValue }
        })
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <Text {...props} style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                    Products
                </Text>
            ),
            headerRight: () => (
                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                <TouchableOpacity
                onPress={()=>navigation.navigate('Orders')}
                        style={{ marginRight: 20 }}>
                        <Icon3 name="shopping-bag" size={25} color="#fff" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ position: 'absolute', top: -10, left: 10, fontWeight: 'bold', marginBottom: 5,color:'#fff' }}>{items.length}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cart')}
                            style={{ marginRight: 20 }}>
                            <Icon name="cart-outline" size={25} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            ),
            headerStyle: {
                backgroundColor: Colors.primary, //Set Header color
            },
        });
    }, [navigation,items])
    useEffect(() => {
        axios.get('/products/list-products')
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => { console.log(err) })
    }, [navigation])
    return (
        <View style={styles.cont}>
            {data?.length > 0 ?
                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} vertical={true}>
                    {
                        data.map(item =>
                            <View key={item.id} style={styles.card} >
                                <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                    <Image style={{ width: "90%", height: 140, borderRadius: 20 }} source={{ uri: item.productImage }} />
                                </View>
                                <View style={{ flex: 0.7, marginRight: 6 }}>
                                    <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 20, textTransform: 'uppercase', letterSpacing: -1 }}>{item.productName}</Text>
                                    <Text style={{ ...styles.text, }}>{item.productDetails}</Text>
                                    <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 16 }}>Price:- Rs. {item.productPrice}</Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={styles.btn} onPress={() => selectedItem(item, true)}>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>ADD TO CART</Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity style={styles.btn} onPress={() => selectedItem(item, false)}>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>REMOVE</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                            </View>)
                    }
                </ScrollView>
                :
                <Text style={{ color: 'black' }}>No Products found</Text>
            }
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#fff',
        postion: 'relative'
    },
    card: {
        padding: 20,
        elevation: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 1
    },
    text: {
        textAlign: 'justify',
        color: 'black',
        margin: 5
    },
    btn: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#FF6363',
        margin: 4,
        borderRadius: 4
    }
})
