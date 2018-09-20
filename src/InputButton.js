import React, { Component,} from 'react';
import {
    View,
    Text, TouchableHighlight
} from 'react-native';
import styles from './Style';


export default class InputButton extends Component {
    
    render() {
        return (
            <TouchableHighlight style={[styles.inputButton, this.props.highlight ? Style.inputButtonHighlighted : null]} underlayColor="#193441" onPress={this.props.onPress}>
                <Text style={styles.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }
    
}

