import React, { PureComponent } from 'react'
import Screen from '../Components/Screen'
import FixedHeader from '../Components/FixedHeader'
import { ScreenTitle, Label, Link, Info } from '../Components/Labels'
import ScrollContainer from '../Components/ScrollContainer'
import HeaderBackButton from '../Components/HeaderBackButton'
import { fetchGame } from '../services/api'
import {xml2objAsync} from '../utils/xml-utils'
import Spinner from '../Components/Spinner'
import { StyleSheet, View } from 'react-native'
import { XML_KEYS } from '../utils/xml-utils'

class GameEntry extends PureComponent {
    _renderPart(part, index){
        const { type } = part

        switch (part.type) {
            case XML_KEYS.CHILDREN:
                
                break;
            case XML_KEYS.TEXT:
            
                break;

            case XML_KEYS.ATTRIBUTES:
        
                break;
        
            default: throw `${type} is not a valid type must be one of [${Object.values(XML_KEYS)}]`
        }
    }

    render(){
        const { content } = this.props
        return <View style={styles.entry}>
            {content.map(_renderPart)}
        </View>
    }
}

export default class Game extends PureComponent {
    state = {
        loading: true,
        title: '',
        error: null,
        gameMessages: [],
        gameInventory: [],
        userKnownKeywords: [],
        gameOver: false,
        gameWon: false,
    }

    gameItems = {}
    gameScripts = {}
    gameStartingScriptId = null
    gameLastMessageId = 0

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
            const gameJson = await fetchGame(url)
            this.loadGame(gameJson)
        } catch(error){
            console.warn(error)
            this.setState({
                error,
                loading: false
            })
        }
    }

    loadGame = (game) => {
        const { items, info, scripts, actors, scenes, state, start } = game
        console.log(game)
        this.loadGameScripts(scripts, start)
        this.loadGameItems(items)
        // this.loadGameState(state[XML_KEYS.CHILDREN])
        // this.loadGameActors(actors[XML_KEYS.CHILDREN])
        // this.loadGameScenes(scenes[XML_KEYS.CHILDREN])
        this.finalizeGameLoading()
    }

    loadGameScripts = (scripts, startingScriptId) => {
        this.gameStartingScriptId = startingScriptId

        for(const scriptId in scripts){
            const { type, message } = scripts[scriptId]

            switch (type) {
                case 'message':
                    this.gameScripts[scriptId] = () => this.addGameMessage(message)
                    break;
            
                default:
                    break;
            }
        }

        console.log('scripts loaded ', this.gameScripts)
    }

    loadGameState = state => {

    }

    loadGameItems = items => {
        this.gameItems = items
        console.log('loading items ', items)
    }

    loadGameActors = actors => {

    }

    loadGameScenes = scenes => {

    }

    finalizeGameLoading = () => {
        this.setState({
            loading: false
        })
        this.runStartScript()
    }

    runStartScript = () => {
        this.gameScripts[this.gameStartingScriptId]()
    }

    renderMessageParts = items => {
        let parts = []

        items.forEach((item, index) => {
            const key = String(index)
    
            const splitLine = item.split(/{{|}}/)
            splitLine.forEach((part, index) => {
                if(part.length){
                    const combinedKey = `${key}-${index}`
                    switch (part.charAt(0)) {
                        case '$': // script
                            const [scriptId, text] = part.substring(1).split(':')
                            parts.push(<Link
                                key={combinedKey}
                                onPress={this.gameScripts[scriptId]}>
                                    {text}
                                </Link>
                                )
                            break;
                        
                        case '#': // item
                            const itemId = part.substring(1)
                            parts.push(<Link
                                key={combinedKey}
                                onPress={() => {
                                    this.addGameMessage([`{{!${this.gameItems[itemId].description}}}`])
                                        .then(this.gameScripts[this.gameItems[itemId].interactionScriptId])
                                }}>
                                    {this.gameItems[itemId].name}
                                </Link>
                                )
                            break;

                        case "!": // info
                            const infoMessage = part.substring(1)
                            parts.push(<Info key={combinedKey}>{infoMessage}</Info>)
                            break;
                    
                        default:  parts.push(<Label key={combinedKey}>{part}</Label>)
                    }
                } 
            })
        })

        return parts
    }

    addGameMessage = message => {
        const { gameMessages } = this.state
        const newMessagesArray = [...gameMessages]

        newMessagesArray.push(<View key={String(this.gameLastMessageId++)} style={styles.entry}>
            {this.renderMessageParts(message)}
        </View>)

        return new Promise(res => this.setState({ gameMessages: newMessagesArray }, res))
    }

    render() {
        const { title, loading, error, gameMessages } = this.state

        return (
        <Screen>
            <FixedHeader
                left={<HeaderBackButton onPress={this.goBack}/>}
                right={loading ? <Spinner/> : null}
                >
                <ScreenTitle>{title}</ScreenTitle>
            </FixedHeader>
            <ScrollContainer style={styles.content}>
                {error && <Label>error: {error.message}</Label>}
                {gameMessages}
            </ScrollContainer>
        </Screen>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 24,
        paddingVertical: 8
    },
    errorMessage: {
        marginTop: 64,
        alignSelf: 'center'
    },
    entry: {
        width: '100%',
        marginTop: 16
    }
})