import React, { PureComponent } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'

export default class Button extends PureComponent{
    render(){
        const {
            title,
            style: additionalOuterStyle,
            titleStyle: additionalTitleStyle,
            onPress,
            ...otherProps
        } = this.props

        return <TouchableNativeFeedback
            {...otherProps}
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple('white', false)}>
            <View
                style={[
                    styles.buttonWrapper,
                    additionalOuterStyle && additionalOuterStyle
                ]}>
                <Text
                    pointerEvents="none"
                    style={[
                        styles.buttonTitle,
                        additionalTitleStyle && additionalTitleStyle
                    ]}>
                    {title}
                </Text>
            </View>
        </TouchableNativeFeedback>
    }
}

const styles = StyleSheet.create({
    buttonWrapper: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'white'
    },
    buttonTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})