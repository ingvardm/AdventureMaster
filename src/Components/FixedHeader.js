import React, { PureComponent } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Row from './Row'

export default class FixedHeader extends PureComponent {
    render(){
        const {
            left: leftSectionChildren,
            children: centerSectionChildren,
            right: rightSectionChildren,
        } = this.props

        return <Row style={[styles.wrapper, this.props.style]}>
            <Row style={[styles.section, styles.sectionLeft]}>{leftSectionChildren}</Row>
            <Row style={[styles.section, styles.sectionCenter]}>{centerSectionChildren}</Row>
            <Row style={[styles.section, styles.sectionRight]}>{rightSectionChildren}</Row>
        </Row>
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 64,
    },
    section: {
        flex: 1,
        alignItems: 'center'
    },
    sectionLeft: {
        justifyContent: 'flex-start',
        paddingLeft: 16
    },
    sectionCenter: {
        justifyContent: 'center'
    },
    sectionRight: {
        justifyContent: 'flex-end',
        paddingRight: 16
    }
})

