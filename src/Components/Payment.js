import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import LottieView from 'lottie-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { TextInput } from 'react-native-paper';
import { Colors } from './Colors';
import { useDispatch, useSelector } from 'react-redux'
const Payment = (props) => {
    const items = []
    const [show, setShow] = useState(false)
    const [pay, setPay] = useState(false)
    const [method, setMethod] = useState('')
    const item = useSelector((state) => state.cartReducer.selectedItems.items)
    const total = item.map(item => Number(item.productPrice)).reduce((prev, curr) => prev + curr, 0)
    useEffect(() => {
        fetchUser()
    }, [])
    const fetchUser = async () => {
        let user = await EncryptedStorage.getItem('user')
        console.log(user)
        user = JSON.parse(user)
        items.push(user.userData.address)
    }
    const storeOrder = async (flag,orderId,total) => {
        let data = await EncryptedStorage.getItem('orders')
        data = JSON.parse(data)
        if (data != null) {
            flag.push(orderId,total)
            data.push(flag[0])
            await EncryptedStorage.setItem('orders', JSON.stringify(data))
        }
        else {
            let order = []
            flag.push(orderId,total)
            order=flag
            await EncryptedStorage.setItem('orders', JSON.stringify(order))
        }

    }

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            {pay ? <LottieView source={require('../Assets/Animation/payment.json')} autoPlay loop={false} onAnimationFinish={() => props.tap(false)} />
                :
                <>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff' }}>Pick Delivery address:</Text>
                    <SelectDropdown
                        data={items}
                        defaultButtonText='Pick Address'
                        buttonStyle={{ borderRadius: 5, margin: 10, width: '80%' }
                        }
                        buttonTextStyle={{ fontWeight: 'bold' }}
                        onSelect={(selectedItem, index) => {
                            // setShow(true)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                    <TextInput
                        label="Any Custom Information?"
                        theme={{ colors: { primary: '#000', placeholder: '#000', text: '#000' } }}
                        multiline
                        numberOfLines={10}
                        style={{ width: '80%' }}
                    />
                    <SelectDropdown
                        data={['Cash On Delivery']}
                        defaultButtonText='Payment Method'
                        buttonStyle={{ borderRadius: 5, margin: 10, width: '80%' }
                        }
                        buttonTextStyle={{ fontWeight: 'bold' }}
                        onSelect={(selectedItem, index) => {
                            setShow(true)
                            setMethod(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                    {show && <TouchableOpacity style={styles.btn} onPress={() => {
                        let orderId=Math.random()
                        let order=[]
                        order.push({orderId:orderId})
                        setPay(true)
                        storeOrder(item)
                    }
                    }>
                        <Text style={{ color: '#fff', fontSize: 23, fontWeight: 'bold' }}>Pay  Rs.{total}</Text>
                    </TouchableOpacity>}
                </>
            }


        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    btn: {
        width: '80%',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5
    }
})
