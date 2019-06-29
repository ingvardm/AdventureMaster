import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default ScrollableContainer = props => <ScrollView {...props} style={[styles.wrapper, props.style]}/>

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
})