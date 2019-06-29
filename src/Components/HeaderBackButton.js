import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Link } from './Labels'

export default HeaderBackButton = props => <TouchableOpacity {...props}>
    <Link>{'<'}BACK</Link>
</TouchableOpacity>