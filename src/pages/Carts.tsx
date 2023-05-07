import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../utils/axios';
import {ProductProps} from '../types';
import {useNavigation} from '@react-navigation/native';

export default function Carts() {
  const {navigate} = useNavigation();

  const [carts, setCarts] = useState<ProductProps[] | []>([]);

  const fetchCarts = () => {
    axiosInstance.get('carts').then(response => {
      const {status, data} = response;

      if (status === 200) {
        setCarts(data);
      }
    });
  };

  const deleteCarts = (cartId: number) => {
    axiosInstance.delete(`carts/${cartId}`).then(response => {
      const {status} = response;

      if (status === 200) {
        fetchCarts();
        Alert.alert('Başarılı', 'Sepetten silindi!');
      }
    });
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const _renderCarts =
    carts && carts?.length > 0 ? (
      carts.map(cart => (
        <View
          key={cart.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // gap: 5,
          }}>
          <Image
            source={{uri: cart.thumbnail}}
            style={{width: 100, height: 100}}
          />
          <View>
            <Text>{cart.title}</Text>
            <Text>{cart.price}</Text>
          </View>
          <TouchableOpacity
            onPress={() => deleteCarts(cart?.id)}
            style={{
              backgroundColor: '#000',
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
            }}>
            <Text style={{color: '#fff'}}>Sepetten Sil</Text>
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          Sepetiniz Boştur Lütfen ürün sayfasına bakınız.
        </Text>
        <Button title="Ürünlere Git" onPress={() => navigate('Products')} />
      </View>
    );

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      {_renderCarts}
    </ScrollView>
  );
}
