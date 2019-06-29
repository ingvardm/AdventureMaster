import React, { PureComponent } from 'react'
import Screen from '../Components/Screen'
import FixedHeader from '../Components/FixedHeader'
import { ScreenTitle, Label } from '../Components/Labels'
import ScrollContainer from '../Components/ScrollContainer'
import HeaderBackButton from '../Components/HeaderBackButton'
import { fetchGame } from '../services/api'
import {xml2objAsync} from '../utils/xml-utils'
import Spinner from '../Components/Spinner'

export default class Game extends PureComponent {
    state = {
        loading: true,
        title: '',
        error: null
    }

    componentDidMount(){
        const {url, title} = this.props.navigation.getParam('game');
        this.fetchGame(url)
        this.setState({
            title
        })
    }

    goBack = () => this.props.navigation.goBack()

    fetchGame = async url => {
        try {
            const gameXML = await fetchGame(url)
            const parsedGame = await xml2objAsync(gameXML)
            this.loadGame(parsedGame)
        } catch(error){
            console.warn(error)
            this.setState({
                error,
                loading: false
            })
        }
    }

    loadGame = (game) => {
        console.log(game)
        this.setState({
            loading: false
        })
    }

    render() {
        const { title, loading, error } = this.state

        return (
        <Screen>
            <FixedHeader
                left={<HeaderBackButton onPress={this.goBack}/>}
                right={loading ? <Spinner/> : null}
                >
                <ScreenTitle>{title}</ScreenTitle>
            </FixedHeader>
            <ScrollContainer>
                {error && <Label>Tere was an error</Label>}

            </ScrollContainer>
        </Screen>
        )
    }
}