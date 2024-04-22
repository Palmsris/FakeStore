import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import ProductList from './ProductList';
import CategoryButton from './CategoryButton';
import { useState } from 'react';

export default function CategoryScreen() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {

    async function fetchCategories(category) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/categories`);
            const products = await response.json();
            const result = products.map(product => {
                if (product.includes(" ")) {
                  let id = product.toLowerCase();
                  // 1st letter after 1st word to be capitalized for id
                  const idArray = id.split(" ");
                  for (let i = 1; i < idArray.length; i++) {
                    idArray[i] = idArray[i].charAt(0).toUpperCase() + idArray[i].slice(1);
                  }
                  id = idArray.join("");
                  // id remove the non alphanumeric characters
                  id = id.replace(/[^0-9a-z]/gi, '');
                  const title = product.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                  // const title = product.replace(/\b[a-z]/g, (char) => char.toUpperCase());
                  return { id, title };
                } else {
                  const id = product.toLowerCase();
                  const title = product.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
            
                  return { id, title };
                }
                });

              setCategories(result);
        } catch (error) {
            console.error(error);
        }

    }
    fetchCategories();
    }, 
    []
    
    );





    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            {categories.map((category) => (
                <CategoryButton key={category.id} category={category.title} onPress={() => {}} />
            ))}
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});


