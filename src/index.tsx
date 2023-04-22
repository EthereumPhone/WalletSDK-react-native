import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'walletsdk-ethos' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const isAndroid = () => {
  if (Platform.OS !== 'android') {
    throw new Error('This package is only supported on Android');
  }
};
  

const WalletsdkEthos = NativeModules.WalletsdkEthos
  ? NativeModules.WalletsdkEthos
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function isEthOS(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return new Promise<boolean>((resolve, _) => {
      resolve(false);
    });
  }
  return WalletsdkEthos.isEthOS();
}

export interface TransactionParams {
  to: string;
  value: string;
  data: string;
  gasPrice?: string | null;
  gasAmount?: string;
  chainId?: number;
}

export function sendTransaction(params: TransactionParams): Promise<String> {
  isAndroid();
  const { to, value, data, gasPrice = null, gasAmount = "21000", chainId = 1 } = params;
  return WalletsdkEthos.sendTransaction(to, value, data, gasPrice, gasAmount, chainId);
}

export interface SignMessageParams {
  message: string;
  type?: string;
}

export function signMessage(params: SignMessageParams): Promise<any> {
  const { message, type = "personal_sign" } = params;
  return WalletsdkEthos.signMessage(message, type);
}

export function getAddress(): Promise<String> {
  isAndroid();
  return WalletsdkEthos.getAddress();
}