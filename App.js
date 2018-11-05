/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Button, View } from "react-native";

import OpenTok, { Publisher, Subscriber } from "react-native-opentok"; // eslint-disable-line

import type { Ref } from "react";

const sessionId = SESSION_ID;
const token = SESSION_TOKEN;

type Props = {};
export default class App extends Component<Props> {
  componentWillMount() {
    OpenTok.connect(
      sessionId,
      token
    )
      .then(success => console.log("open tok connected successfully", success))
      .catch(error => console.log("error in connecting open tok ", error));
    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
  }

  ref: Ref<typeof Publisher>;
  ref: Ref<typeof Viewer>;

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={async () => {
            const isSent = await OpenTok.sendSignal(sessionId, "message", "a");
            console.log(isSent, "isSentisSent");
          }}
          title="Send signal"
        />

        <Button
          onPress={() => {
            if (typeof this.ref !== "string") this.ref.switchCamera();
          }}
          title="Switch camera"
        />
        <Publisher
          sessionId={sessionId}
          onPublishStart={() => {
            console.log("Streaming Started");
          }}
          onPublishStop={() => {
            console.log("Streaming Stopped");
          }}
          onPublishError={() => {
            console.log("Streaming Error");
          }}
          style={{ backgroundColor: "black", height: 200, width: 200 }}
          ref={ref => {
            this.ref = ref;
          }}
        />
        <Subscriber
          sessionId={sessionId}
          onSubscribeStart={() => {
            console.log("Watching started");
          }}
          onSubscribeStop={() => {
            console.log("Watching started");
          }}
          onSubscribeError={() => {
            console.log("Watching started");
          }}
          style={{ backgroundColor: "black", height: 200, width: 200 }}
          ref={ref => {
            this.ref = ref;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
