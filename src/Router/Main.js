import { createStackNavigator, createAppContainer } from "react-navigation"
import { Animated, Easing } from 'react-native'
import Title from '../Screens/Title'
import GamesList from '../Screens/GameList'
import Game from '../Screens/Game'

const fadeOut = (index, position) => {
    const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1]
    })
    const fadeOut = { opacity }
    return fadeOut
};

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 250,
            easing: Easing.out(Easing.poly(1)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (sceneProps) => {
            const { position, scene } = sceneProps
            const { index } = scene
            return fadeOut(index, position)
        },
    }
}

const routerOptions = {
    headerMode: 'none',
    transitionConfig,
    transparentCard: true,
}

const AppNavigator = createStackNavigator({
    Title,
    GamesList,
    Game
},routerOptions)

export default createAppContainer(AppNavigator)