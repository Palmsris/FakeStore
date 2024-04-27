// create a touchable opacity button for each list

import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { FlatList, Image, View } from 'react-native';
import ProductDetailScreen from './ProductDetailScreen';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProductList({ navigation, route, onPress }) {
    // Extract the category from the route parameters
    const { categoryName } = route.params;

    // Use state to store the filtered products
    const [products, setProducts] = useState([]);

    // Fetch products based on the selected category
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products`);
                const products = await response.json();
                
                products.forEach(product => {
                    product.category = product.category.toLowerCase().replace(/[']/g, "").replace(/(?<=\s+)[a-z]/gi, (char) => char.toUpperCase()).replace(/\s/g, "");
                });

                setProducts(products);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, [categoryName]); // Trigger fetchProducts whenever the category changes

    const filteredProducts = products.filter((product) => product.category === categoryName);

    return (
        <View style={styles.container}>
            {products.length === 0 ? (
                <ActivityIndicator size="large" color="#592B1B" />
            ) : (
            <ScrollView>
                {filteredProducts.map((item) => (
                    <Pressable 
                        key={item.id.toString()}
                        style={styles.button} 
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}>

                            <View style={styles.itemContainer}>
                                {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.price}>Price: ${item.price}</Text>
                                </View>
                            </View>
                    </Pressable>
                ))}
            </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2DCC9',
        padding: 10,
    },
    button: {
        backgroundColor: '#D9C39A',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 10,
        flexShrink: 1,
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        maxWidth: 290, 
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
