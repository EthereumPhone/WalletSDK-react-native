package com.walletsdkethos

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.content.Context 
import android.annotation.SuppressLint
import org.web3j.protocol.Web3j
import org.web3j.protocol.core.DefaultBlockParameterName
import org.web3j.protocol.http.HttpService
import java.util.concurrent.CompletableFuture
import org.ethereumphone.walletsdk.WalletSDK

class WalletsdkEthosModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  val reactContext: ReactApplicationContext = reactContext
  val wallet = WalletSDK(reactContext)

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun isEthOS(promise: Promise) {
    promise.resolve(wallet.isEthOS())
  }

  @ReactMethod
  fun sendTransaction(to: String, value: String, data: String, gasPrice: String? = null, gasAmount: String = "21000", chainId: Int = 1, promise: Promise) {
    promise.resolve(wallet.sendTransaction(to, value, data, gasPrice, gasAmount, chainId).get())
  }

  @ReactMethod
  fun signMessage(message: String, type: String = "personal_sign", promise: Promise) {
    promise.resolve(wallet.signMessage(message, type).get())
  }

  @ReactMethod
  fun getAddress(promise: Promise) {
    promise.resolve(wallet.getAddress())
  }

  companion object {
    const val NAME = "WalletsdkEthos"
  }
}
