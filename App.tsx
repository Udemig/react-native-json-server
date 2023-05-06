import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

function App(): JSX.Element {
  // const fetchProducts = () => {
  //   fetch('http://localhost:3000/products', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(respone => respone.json())
  //     .then(data => console.log('DATa', data));

  //   // console.log('Response ', JSON.stringify(response, null, 4));
  // };

  const [products, setProducts] = useState<ProductProps | null>();

  // Product Listesini çeker!
  const axiosProducts = async () => {
    const axiosResponse = await axiosInstance.get('products');

    setProducts(axiosResponse.data);
  };

  const addedProducts = () => {
    axiosInstance
      .post('products', {
        title: 'Furkanın Ürünüüüüüüüüüüüüüü',
        description: 'Ürünün Açıklama',
        price: 100,
        discountPercentage: 10,
        rating: 5,
        stock: 10,
        brand: 'Ürün',
        category: 'Ürün',
        thumbnail:
          'https://cdn.pharoskc.com/wp-content/uploads/finance-guides/235/kv935j6yvx.jpg',
        images: [
          'https://cdn.pharoskc.com/wp-content/uploads/finance-guides/235/kv935j6yvx.jpg',
          'https://cdn.pharoskc.com/wp-content/uploads/finance-guides/235/kv935j6yvx.jpg',
          'https://i.dummyjson.com/data/products/1/2.jpg',
          'https://i.dummyjson.com/data/products/1/3.jpg',
        ],
      })
      .then(response => {
        console.log(response.status);

        if (response.status === 201) {
          axiosProducts();
        }
      });
  };

  const updateProduct = (id?: number) => {
    axios
      .put('http://localhost:3000/products/3', {
        id: 5435345,
        title: 'Samsung',
        description:
          "Samsung's new variant which goes beyond Galaxy to the Universe",
        price: 45000,
        discountPercentage: 15.46,
        rating: 4.09,
        stock: 36,
        brand: 'Samsung',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
      })
      .then(response => {
        // console.log('Response: ', response.status, response.data);

        if (response.status === 200) {
          axiosProducts();
        }
      });
  };

  const deleteProduct = async (productId: number) => {
    try {
      await axiosInstance.delete(`products/${productId}`);
      // .then(response => {
      //   console.log('Response: ', response.status, response);
      //   if (response.status === 200) {
      //     axiosProducts();
      //   } else {
      //     Alert.alert('Bir Hata Oldu!', 'Bu ürün elimizde mevcut değildir.');
      //   }
      // })
    } catch (error) {
      Alert.alert('Bir Hata Oldu!', 'Bu ürün elimizde mevcut değildir.');
    }

    axiosInstance
      .delete(`products/${productId}`)
      .then(response => {
        console.log('Response: ', response.status, response);
        if (response.status === 200) {
          axiosProducts();
        } else {
          Alert.alert('Bir Hata Oldu!', 'Bu ürün elimizde mevcut değildir.');
        }
      })
      .catch(error => {
        Alert.alert('Bir Hata Oldu!', 'Bu ürün elimizde mevcut değildir.');
      });
  };

  useEffect(() => {
    axiosProducts();
  }, []);

  return (
    <SafeAreaView>
      {/* <ScrollView> */}
      <View style={{gap: 15}}>
        {/* {products.map((item: any) => {
            return <Text>{item.title}</Text>;
          })} */}

        <FlatList
          ListHeaderComponent={() => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Button title="Ürün Ekle" onPress={() => addedProducts()} />
                {/* <Button title="DATAYI Doldur" onPress={() => axiosProducts()} />

                <Button title="Datayı Boşalt" onPress={() => setProducts([])} /> */}

                <Button title="Ürün Güncelle" onPress={() => updateProduct()} />

                <Button title="Ürün Sil" onPress={() => deleteProduct(3)} />
              </View>
            );
          }}
          data={products}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text>DATAM YOK</Text>
              </View>
            );
          }}
          renderItem={props => {
            return (
              <View style={{paddingVertical: 10}}>
                <Text>
                  {props.item.title} {props.item.price}
                </Text>
              </View>
            );
          }}
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
