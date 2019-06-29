import React from 'react'
import { StyleSheet } from 'react-native'
import Container from './Container'

export default Screen = props =>
    <Container {...props} style={[styles.screen, props.style && props.style]}/>

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
})