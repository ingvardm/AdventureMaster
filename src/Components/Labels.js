import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export const Label = ({style: additionalStyles, ...props}) =>
    <Text {...props} style={[styles.default, additionalStyles]}/>

export const Info = ({style: additionalStyles, ...props}) =>
    <Label {...props} style={[styles.italic,styles.thin,additionalStyles]}/>

export const Link = ({onPress, style: additionalStyles, ...props}) =>
<TouchableOpacity
    hitSlop={{top: 4, bottom: 4, left: 4, right: 4}}
    onPress={onPress}>
    <Label {...props} style={[styles.link, styles.bold, additionalStyles]}/>
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
    italic: {
        fontStyle: 'italic'
    },
    link: {
        color: 'white',
    },
    screenTitle: {
        fontSize: 32,
        lineHeight: 64
    },
    thin: {
        fontWeight: '200',
    }

})