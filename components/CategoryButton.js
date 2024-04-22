// create a touchable opacity button for each category

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryButton({ category, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{category}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'pink',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    },
});