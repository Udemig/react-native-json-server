import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Touchable,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import axiosInstance from '../utils/axios';

interface RouteProps {
  id: number;
}

export default function Product() {
  const dimension = Dimensions.get('window');

  const {navigate} = useNavigation();

  const [product, setProduct] = useState({
    id: 2,
    title: 'iPhone X',
    description:
      'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/2/1.jpg',
      'https://i.dummyjson.com/data/products/2/2.jpg',
      'https://i.dummyjson.com/data/products/2/3.jpg',
      'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    ],
  });

  //Object Descructing
  const {params} = useRoute<RouteProp<RouteProps>>();

  // console.log('first', params, product);

  const fetchProduct = () => {
    axiosInstance.get(`products/${params?.id}`).then(response => {
      setProduct(response.data);
    });
  };

  const addCarts = () => {
    axiosInstance
      .post('carts', product)
      .then(response => {
        if (response.status === 201 && response.data) {
          Alert.alert('Başarılı', 'Sepete Eklendi!');
        }
      })
      .catch(error => {
        Alert.alert('Hata', 'Sepete Eklenemedi!');
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [params]);

  const _renderItem = ({item}: {item: []}) => (
    <View>
      <Image
        source={{uri: item}}
        style={styles.thumbnail}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{uri: product?.thumbnail}}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.brandText}>
        {product?.brand} {product.title}
      </Text>
      <Text style={styles.descriptionText}>{product?.description}</Text>
      <Text>
        {product?.price} TL % {product?.discountPercentage}
      </Text>
      <View>
        <FlatList
          data={product?.images}
          renderItem={_renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Button title="Sepete Ekle" onPress={() => addCarts()} />
      <Button
        title="Ürünü Güncelle"
        onPress={() => navigate('ProductUpdate', product)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#FFF',
    gap: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
  thumbnail: {
    width: Dimensions.get('window').width,
    height: 500,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
});
