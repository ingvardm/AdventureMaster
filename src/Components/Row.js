import React from 'react'
import { StyleSheet, View } from 'react-native'

export default Row = props => <View {...props} style={[styles.row, props.style]}/>

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    }
})

