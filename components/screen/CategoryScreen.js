import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import CategoryButton from '../CategoryButton';
import ProductList from './ProductListScreen';

export default function CategoryScreen( { navigation }) {
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // Simulate a loading screen
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
    async function fetchCategories(category) {
        try {
            //Fetch the categories from the API
            const response = await fetch(`https://fakestoreapi.com/products/categories`);
            const products = await response.json();
            //Process the categories
            const result = products.map(product => {
                //Tranform the category name
                const id = product.toLowerCase().replace(/[']/g, "").replace(/(?<=\s+)[a-z]/gi, 
                (char) => char.toUpperCase()).replace(/\s/g, "");
                //Capitalize the first letter of each word
                const title = product.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                //Return the transformed category
                return { id, title};
                });
            //Set the categories state
            setCategories(result);
        } catch (error) {
            console.error(error);
        }
    }
    //Call the fetchCategories function
    fetchCategories();
    }, []);

    return (             
            <View style={styles.container}>
                {/* <Text style={styles.title}>Categories</Text> */}
                {isLoading ? (
                    <ActivityIndicator size="large" color="#592B1B" />
                ) : (
                <ScrollView>
                    {categories.map((item) => (
                        <CategoryButton
                            key={item.id}
                            category={item.title}
                            onPress={() =>
                                navigation.navigate('Products', { categoryName: item.id })
                                }          
                        />
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    // title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     marginBottom: 20,
    // },
});


