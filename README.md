# WalletSDK for React Native

## Installation

```sh
npm install ethos-walletsdk
```

Also make sure to change the `minSdkVersion` to `27` in `android/build.gradle` in your react native project.

## Usage

### How to import SDK

```js
import { isEthOS, getAddress, SignMessageParams, signMessage, TransactionParams, sendTransaction } from 'walletsdk-ethos';
```

### How to know if you're on ethOS

```js
isEthOS().then((isEthOS) => {
    if (isEthOS) {
        setResult("It's EthOS");
    } else {
        setResult("It's not EthOS");
    }
});
```

### How to sign a message

```js
// How to sign Message
var params: SignMessageParams = {
    message: 'Hello World',
};
signMessage(params).then((signature) => {
    console.log("signature: " + signature)
});
```

### How to send a Transaction

```js
// How to send send Transactions
var params: TransactionParams = {
    to: "",
    value: "1000000000000000000", // 1 eth in wei
    data: ""
}
sendTransaction(params).then((txHash) => {
    console.log("txHash: " + txHash)
});
```
## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
