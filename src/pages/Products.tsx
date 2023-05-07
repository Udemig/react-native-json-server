import {
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../utils/axios';
import {ProductProps} from '../types';

export default function Products() {
  const [products, setProducts] = useState<ProductProps[] | []>([]);

  const {navigate, setOptions} = useNavigation();

  const fetchProducts = () => {
    axiosInstance.get('products').then(response => {
      setProducts(response.data);
    });
  };

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return <Button title="Sepet" onPress={() => navigate('Carts')} />;
      },
      headerLeft: () => {
        return (
          <Button title="Ürün Ekle" onPress={() => navigate('ProductCreate')} />
        );
      },
    });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}: {item: ProductProps}) => {
          return (
            <TouchableOpacity
              onPress={() => navigate('Product', {id: item?.id})}>
              <View style={styles.productContainer}>
                <Image
                  source={{uri: item?.thumbnail}}
                  style={{width: 100, height: 100}}
                />
                <Text>{item?.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* <Button
        title="Detaya Gir"
        onPress={() => navigation.navigate('Product')}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  productContainer: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
});
