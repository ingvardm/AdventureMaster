import React, { PureComponent } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default class ScrollableContainer extends PureComponent {
    render(){
        return <ScrollView {...this.props} style={[styles.wrapper, this.props.style]} ref={this.props.onRef}/>
    }
}

// export default ScrollableContainer = props => <ScrollView {...props} style={[styles.wrapper, props.style]} ref={props.onRef}/>

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
})