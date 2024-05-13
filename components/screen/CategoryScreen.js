import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import CategoryButton from '../CategoryButton';
import ProductList from './ProductListScreen';
import { fetchCategories } from '../slice/categorySlice';

export default function CategoryScreen( { navigation }) {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    
    useEffect(() => {
        dispatch(fetchCategories()); 
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (             
            <View style={styles.container}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#592B1B" />
                ) : (
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CategoryButton
                            key={item.id}
                            category={item.title}
                            onPress={() =>
                                navigation.navigate('Products', { categoryName: item.id, categoryTitle: item.title  })
                                }          
                        />
                    )}
                />
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
});


