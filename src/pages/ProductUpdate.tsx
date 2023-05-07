import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import axiosInstance from '../utils/axios';

export default function ProductUpdate(props: any) {
  const [product, setProduct] = useState(props?.route?.params);

  const onChangeText = (key: string, value: string) => {
    setProduct({...product, [key]: value});
  };

  function productUpdate(): void {
    axiosInstance.put(`products/${product.id}`, product).then(response => {
      console.log(response);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={text => onChangeText('title', text)}
          value={product?.title}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={text => onChangeText('description', text)}
          value={product?.description}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          onChangeText={text => onChangeText('price', text)}
          value={String(product?.price)}
        />
        <TextInput
          style={styles.input}
          placeholder="Discount Percentage"
          onChangeText={text => onChangeText('discountPercentage', text)}
          value={String(product?.discountPercentage)}
        />
        <TextInput
          style={styles.input}
          placeholder="Rating"
          onChangeText={text => onChangeText('rating', text)}
          value={String(product?.rating)}
        />
        <TextInput
          style={styles.input}
          placeholder="Stock"
          onChangeText={text => onChangeText('stock', text)}
          value={String(product?.stock)}
        />
        <TextInput
          style={styles.input}
          placeholder="Brand"
          onChangeText={text => onChangeText('brand', text)}
          value={product?.brand}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          defaultValue="Smartphones"
          onChangeText={text => onChangeText('category', text)}
          value={product?.category}
        />

        <Button title="Ürün Güncelle" onPress={() => productUpdate()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 10,
  },
  inputContainer: {
    gap: 15,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 10,
  },
});
