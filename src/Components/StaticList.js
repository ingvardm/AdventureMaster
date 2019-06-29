import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

export default StaticList = props => <FlatList {...props} style={[styles.wrapper, props.style]}/>

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
})