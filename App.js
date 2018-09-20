import React from 'react';
import InputButton from './src/InputButton'
import styles from './src/Style';
import { StyleSheet, Text, View, AppRegistry,Component } from 'react-native';

const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+']
];
export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      inputValue: 0,
      previousInputValue: 0,
      selectedSymbol: null
    }
  }
  _renderInputButtons() {
    let views = [];

    for (var r = 0; r < inputButtons.length; r ++) {
        let row = inputButtons[r];

        let inputRow = [];
        for (var i = 0; i < row.length; i ++) {
            let input = row[i];

            inputRow.push(
                <InputButton value={input} key={r + "-" + i} onPress={this._onInputButtonPressed.bind(this, input)} key={r + "-" +i}
                />
            );
        }

        views.push(<View style={styles.inputRow} key={"row-" + r}>{inputRow}</View>)
    }


    return views;
}

  _onInputButtonPressed(input) {
    switch (typeof input) {
        case 'number':
            return this._handleNumberInput(input)
            case 'string':
            return this._handleStringInput(input)
    }
}
_handleNumberInput(num) {
  let inputValue = (this.state.inputValue * 10) + num;

  this.setState({
      inputValue: inputValue
  })
}

_handleStringInput(str) {
  switch (str) {
    case '/':
    case '*':
    case '+':
    case '-':
        this.setState({
            selectedSymbol: str,
            previousInputValue: this.state.inputValue,
            inputValue: this.state.selectedSymbol
            

        });
        break;
    case '=':
    let symbol = this.state.selectedSymbol,
    inputValue = this.state.inputValue,
    previousInputValue = this.state.previousInputValue;

    if(!symbol){
      return;
    }
    this.setState({
      previousInputValue: 0,
      inputValue: eval(previousInputValue + symbol + inputValue),
      selectedSymbol: null
    });
  
        break;
}
    
}
  render() {
    
    return (
      <View style={styles.rootContainer}>
            <View style={styles.display}>
            <Text style={styles.displayText}>{this.state.inputValue}</Text>
            </View>
            <View style={styles.inputContainer}>
            {this._renderInputButtons()}
            </View>
        </View>
    );
  }
}



