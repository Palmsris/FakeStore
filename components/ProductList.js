// create a touchable opacity button for each list

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ProductList({ product, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{product.title}</Text>
        </TouchableOpacity>
    );
}
