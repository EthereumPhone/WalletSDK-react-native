import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { isEthOS, getAddress, SignMessageParams, signMessage, TransactionParams, sendTransaction } from 'walletsdk-ethos';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    
    isEthOS().then((isEthOS) => {
      if (isEthOS) {
        setResult("It's EthOS ");
      } else {
        setResult("It's not EthOS ");
      }
    });
    
    getAddress().then((address) => {
      console.log("address: " + address)
    });
  }, []);

  function signTestMessage() {
    var params: SignMessageParams = {
      message: 'Hello World',
    };
    signMessage(params).then((signature) => {
      console.log("signature: " + signature)
    });
  }

  function signTestTransaction() {
    var params: TransactionParams = {
      to: "",
      value: "1000000000000000000", // 1 eth in wei
      data: ""
    }
    sendTransaction(params).then((txHash) => {
      console.log("txHash: " + txHash)
    });
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button onPress={signTestMessage} title="Test Sign" />
      <Button onPress={signTestTransaction} title="Test Transaction" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

