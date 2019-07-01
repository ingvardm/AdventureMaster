import React, { PureComponent } from 'react'
import Screen from '../Components/Screen'
import FixedHeader from '../Components/FixedHeader'
import { ScreenTitle } from '../Components/Labels'
import StaticList from '../Components/StaticList'
import HeaderBackButton from '../Components/HeaderBackButton'
import Button from '../Components/Buttons'
import { StyleSheet } from 'react-native'
import Spinner from '../Components/Spinner'
import { fetchGamesList } from '../services/api'

export default class GamesList extends PureComponent {
    state = {
        loading: true
    }

    _gameList = []

    componentDidMount(){
        fetchGamesList()
            .then(this.onGotGames)
    }

    onGotGames = games => {
        console.log('got games', games)
        this._gameList = [...games]
        this.setState({
            loading: false
        })
    }

    goBack = () => this.props.navigation.goBack()

    _gameListKeyExtractor = (_, index) => String(index)

    _renderListItem = ({item}) => <Button title={item.title} onPress={() => this.onGameSelect(item)}/>

    onGameSelect = game => {
        this.props.navigation.navigate('Game', {game})
    }

    render() {
        const { loading } = this.state

        return (
        <Screen>
            <FixedHeader
                left={<HeaderBackButton onPress={this.goBack}/>}
                right={loading ? <Spinner/> : null}>
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