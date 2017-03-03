import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CustomButton extends Component {
  render() {
    return (
      <View
        style={{
          borderRadius: 4,
          width: 100,
          height: 30,
          backgroundColor: "green",
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          Hello world
        </Text>
      </View>
    )
  }
}
