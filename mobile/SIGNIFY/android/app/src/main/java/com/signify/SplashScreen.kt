package com.signify

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.ReactFragment

class SplashScreen : AppCompatActivity() {
class SplashScreen : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.splash_screen_activity.xml)

        findViewById<Button>(R.id.sample_button).setOnClickListener {
            val reactNativeFragment = ReactFragment.Builder()
               .setComponentName("HelloWorld")
               .setLaunchOptions(Bundle().apply { putString("message", "my value") })
               .build()
            supportFragmentManager
               .beginTransaction()
               .add(R.id.react_native_fragment, reactNativeFragment)
               .commit()
        }
    }

    override fun invokeDefaultOnBackPressed() {
       super.onBackPressed()
    }
}