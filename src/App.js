import React, { PureComponent } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import Container from './Components/Container'
import MainRouter from './Router'


export default class App extends PureComponent {
    render(){
        return <Container style={styles.appWrapper}>
            <StatusBar backgroundColor="#00000000" barStyle="light-content" translucent/>
            <MainRouter/>
        </Container>
    }
}

const styles = StyleSheet.create({
    appWrapper: {
        paddingTop: StatusBar.currentHeight,
    }
})