import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

export const Label = props => <Text {...props} style={[styles.default, props.style]}/>

export const Link = props => <Label {...props} style={[styles.link, props.style]}/>

export const ScreenTitle = props => <Label {...props} style={styles.screenTitle}/>

const styles = StyleSheet.create({
    default: {
        color: '#eeeeee',
        fontSize: 16,
        fontWeight: '500',
    },
    bold: {
        fontWeight: '600',
    },
    link: {
        color: 'white',
    },
    screenTitle: {
        fontSize: 22,
    },

})