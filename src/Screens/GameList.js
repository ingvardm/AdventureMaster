import React, { PureComponent } from 'react'
import Screen from '../Components/Screen'
import FixedHeader from '../Components/FixedHeader'
import { ScreenTitle } from '../Components/Labels'
import StaticList from '../Components/StaticList'
import HeaderBackButton from '../Components/HeaderBackButton'
import gamesList from '../built-in-games.json'
import Button from '../Components/Buttons'
import { StyleSheet } from 'react-native'

export default class GamesList extends PureComponent {
    goBack = () => this.props.navigation.goBack()

    _gameList = [...gamesList]

    _gameListKeyExtractor = (_, index) => String(index)

    _renderListItem = ({item}) => <Button title={item.title} onPress={() => this.onGameSelect(item)}/>

    onGameSelect = game => {
        this.props.navigation.navigate('Game', {game})
    }

    render() {
        return (
        <Screen>
            <FixedHeader
                left={<HeaderBackButton onPress={this.goBack}/>}>
                <ScreenTitle>Games</ScreenTitle>
            </FixedHeader>
            <StaticList
                style={styles.list}
                keyExtractor={this._gameListKeyExtractor}
                data={this._gameList}
                renderItem={this._renderListItem}
                />
        </Screen>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        padding: 64,
    }
})