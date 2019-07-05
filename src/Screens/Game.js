import React, { PureComponent } from 'react'
import Screen from '../Components/Screen'
import FixedHeader from '../Components/FixedHeader'
import { ScreenTitle, Label, Link, Info } from '../Components/Labels'
import ScrollContainer from '../Components/ScrollContainer'
import HeaderBackButton from '../Components/HeaderBackButton'
import { fetchGame } from '../services/api'
import Spinner from '../Components/Spinner'
import { StyleSheet, View, FlatList } from 'react-native'

class GameEntry extends PureComponent {
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
    gameViewport = null

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
        this.loadGameState(state)
        this.loadGameActors(actors)
        this.loadGameScenes(scenes)
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
        if(!state) return
    }

    loadGameItems = items => {
        if(!items) return
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

    buildGameScriptMessage = (script, customKey) => {
        const [scriptId, text] = script.substring(1).split(':')
        return <Link
            key={customKey || scriptId}
            onPress={this.gameScripts[scriptId]}>
            {text}
        </Link>
    }

    buildGameItemMessage = (item, customKey) => {
        const itemId = item.substring(1)
        const { name, description, interactionScriptId} = this.gameItems[itemId]
        const { userKnownKeywords } = this.state

        if(!userKnownKeywords.includes(itemId))
            this.setState({userKnownKeywords: [...userKnownKeywords, itemId]})

        return <Link
            key={customKey || itemId}
            onPress={() => {
                this.addGameMessage([`{{!${description}}}`])
                    .then(this.gameScripts[interactionScriptId])
            }}>
            {name}
        </Link>
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
                            parts.push(this.buildGameScriptMessage(part))
                            break;
                        
                        case '#': // item
                            parts.push(this.buildGameItemMessage(part))
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
        return new Promise(res => this.setState({ gameMessages: newMessagesArray }, () => {
            requestAnimationFrame(() => {
                this.gameViewport.scrollToEnd()
            })
            res()
        }))
    }

    render() {
        const { title, loading, error, gameMessages, userKnownKeywords } = this.state

        return (
        <Screen>
            <FixedHeader
                left={<HeaderBackButton onPress={this.goBack}/>}
                right={loading ? <Spinner/> : null}
                >
                <ScreenTitle>{title}</ScreenTitle>
            </FixedHeader>
            <ScrollContainer
                onRef={ref => this.gameViewport = ref}
                contentContainerStyle={styles.scrollviewContainer}
                style={[styles.content]}>
                {error && <Label>error: {error.message}</Label>}
                {gameMessages}
            </ScrollContainer>
            <View>
                <FlatList
                    style={[styles.content, styles.keywords]}
                    data={userKnownKeywords}
                    keyExtractor={item => item}
                    renderItem={({item,index}) => {
                        console.log('knownkeywords',this.gameItems, item)
                        return this.buildGameItemMessage(`#${item}`, index)
                    }}
                />
            </View>
        </Screen>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 24,
        paddingVertical: 8
    },
    scrollviewContainer: {
        paddingBottom: 24
    },
    errorMessage: {
        marginTop: 64,
        alignSelf: 'center'
    },
    entry: {
        width: '100%',
        paddingVertical: 8
    },
    keywords: {
        backgroundColor: '#ffffff08',
        height: 'auto',
        maxHeight: 140
    }
})