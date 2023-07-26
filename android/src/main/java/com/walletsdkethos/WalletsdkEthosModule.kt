package com.walletsdkethos

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.content.Context 
import android.annotation.SuppressLint
import java.util.concurrent.CompletableFuture
import com.walletsdkethos.WalletSDK

class WalletsdkEthosModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  val reactContext: ReactApplicationContext = reactContext
  

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun isEthOS(promise: Promise) {
    promise.resolve(reactContext.getSystemService("wallet") != null)
  }

  @ReactMethod
  fun signMessage(message: String, type: String = "personal_sign", promise: Promise) {
    val wallet = WalletSDK(reactContext)
    promise.resolve(wallet.signMessage(message, type).get())
  }

  @ReactMethod
  fun getAddress(promise: Promise) {
    val wallet = WalletSDK(reactContext)
    promise.resolve(wallet.getAddress())
  }

  companion object {
    const val NAME = "WalletsdkEthos"
  }
}
