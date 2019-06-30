import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export const Label = props => <Text {...props} style={[styles.default, props.style]}/>

export const Link = ({onPress, ...props}) => <TouchableOpacity
    hitSlop={{top: 4, bottom: 4, left: 4, right: 4}}
    onPress={onPress}>
    <Label {...props} style={[styles.link, styles.bold, props.style]}/>
</TouchableOpacity>

export const ScreenTitle = props => <Label {...props} style={styles.screenTitle}/>

const styles = StyleSheet.create({
    default: {
        color: '#cccccc',
        fontSize: 18,
        lineHeight: 28,
        fontWeight: '400',
    },
    bold: {
        fontWeight: '600',
    },
    link: {
        color: 'white',
    },
    screenTitle: {
        fontSize: 32,
        lineHeight: 64
    },

})