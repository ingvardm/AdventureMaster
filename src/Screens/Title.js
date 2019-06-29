import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { displayName } from '../../app.json'
import Button from '../Components/Buttons'
import Screen from '../Components/Screen'

export default class Title extends PureComponent {
    navigateToGamesList = () => {
        this.props.navigation.navigate('GamesList')
    }

    render() {
        return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.welcome}>{displayName}</Text>
            </View>
            <View style={styles.bottomButtonsContainer}>
                <Button title='Play' onPress={this.navigateToGamesList} style={styles.button}/>
                <Button title='Create' style={styles.button}/>
                <Button title='Settings' style={styles.button}/>
            </View>
        </Screen>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 36,
        textAlign: 'center',
        color: 'white',
    },
    button: {
        marginVertical: 16,
        width: '100%'
    },
    bottomButtonsContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 64
    }
})