package com.devlinetech.adsdashbord

import android.annotation.SuppressLint
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.os.StrictMode
import android.webkit.WebView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.select.Elements
import java.io.*
import java.net.URL
import java.nio.ByteBuffer

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    lateinit var dbManager : DbManager
    lateinit var WebUI : WebAppInterface
    @SuppressLint("SetJavaScriptEnabled", "JavascriptInterface")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webview)
        webView.settings.javaScriptEnabled = true

        val SDK_INT = Build.VERSION.SDK_INT
        if (SDK_INT > 8) {
            val policy = StrictMode.ThreadPolicy.Builder()
                .permitAll().build()
            StrictMode.setThreadPolicy(policy)
            dbManager =  DbManager(this)
            WebUI = WebAppInterface(this,webView,dbManager)
            webView.addJavascriptInterface(WebUI, "Android")
            webView.loadUrl("file:///android_asset/index.html")
        }
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowFileAccess(true);



    }

}