import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import ProductDetailScreen from './ProductDetailScreen';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProductList({ navigation, route, onPress }) {
    // Extract the category from the route parameters
    const { categoryName } = route.params;

    // Use state to store the filtered products
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // Simulate a loading screen
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // Fetch products based on the selected category
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products`);
                const products = await response.json();
                
                products.forEach(product => {
                    product.category = product.category.toLowerCase().replace(/[']/g, "").replace(/(?<=\s+)[a-z]/gi, 
                    (char) => char.toUpperCase()).replace(/\s/g, "");
                    product.categoryName = product.category.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                });

                setProducts(products);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, [categoryName]);

    const filteredProducts = products.filter((product) => product.category === categoryName);
    

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#592B1B" />
            ) : (
                <>
                    <ScrollView>
                        <View style={styles.ScreenContainer}>
                            <Text style={styles.ScreenText}>{categoryName.toUpperCase()}</Text>
                        </View>
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
                    <View style={styles.ControlButton}>
                        <Pressable 
                            onPress={() => navigation.navigate('Categories')}
                            style={styles.button}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome name="arrow-left" size={24} color="black" />
                                <Text style={styles.buttonText}>Back</Text>
                            </View>
                        </Pressable>    
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    ScreenContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9C39A',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        width: 370,
        padding: 5,
        marginBottom: 10,
    },
    ScreenText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
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
    ControlButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold',
    },
});
