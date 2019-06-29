import React from 'react'
import { View, StyleSheet } from 'react-native'

export default Container = props =>
    <View {...props} style={[styles.container, props.style && props.style]}/>

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222222',
        flex: 1
    }
})