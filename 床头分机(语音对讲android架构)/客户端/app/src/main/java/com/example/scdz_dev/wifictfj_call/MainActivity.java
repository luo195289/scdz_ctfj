package com.example.scdz_dev.wifictfj_call;

import android.app.Activity;
import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.example.scdz_dev.wifictfj_call.ext.SocketHan;

public class MainActivity extends AppCompatActivity {
    public static WebView main_web;
    private Activity mContext;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //##############################################
        mContext = MainActivity.this;
        setWebSetting("file:///mnt/sdcard/ctfj/test.html");
    }
    private void setWebSetting (String va) {
        getSupportActionBar().hide();//去除标题栏
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);//去除状态栏
        main_web = (WebView) findViewById(R.id.main_web);
        main_web.clearCache(true);//是否清除缓存
        main_web.setInitialScale(100);//最小缩放等级(100为不缩放)
        WebSettings mywebSettings = main_web.getSettings();
        mywebSettings.setJavaScriptEnabled(true);//是否支持JS
        mywebSettings.setJavaScriptCanOpenWindowsAutomatically(true);//是否自动打开窗口
        mywebSettings.setDomStorageEnabled(true);
        mywebSettings.setAppCacheEnabled(false);//设置H5的缓存是否打开
        mywebSettings.setSupportZoom(false);//是否支持缩放
        mywebSettings.setBuiltInZoomControls(false);//触摸屏幕时是否出现缩放控制图标
        mywebSettings.setPluginState(WebSettings.PluginState.ON);//支持插件
        //设置适应屏幕
        mywebSettings.setUseWideViewPort(true);
        mywebSettings.setLoadWithOverviewMode(true);
        //设置头部信息
        mywebSettings.setUserAgentString("Mozilla/5.0 (Macintosh; "
                + "U; Intel Mac OS X 10_5_7; en-us) AppleWebKit/530.17 (KHTML, "
                + "like Gecko) Version/4.0 Safari/530.17");
        main_web.setWebChromeClient(new WebChromeClient());
        //main_web.addJavascriptInterface(new WardJavaScript(mContext), "androidVoice");
        main_web.addJavascriptInterface(new SocketHan(mContext), "android");
        main_web.post(new Runnable() {
            @Override
            public void run() {
                //new Thread(new JavatoJs()).start();
                //new Thread(new JstoJava()).start();
                //main_web.loadUrl("javascript:window.android.handle()");
                //main_web.loadUrl("javascript:alert('hello')");
            }
        });
        main_web.loadUrl(va);
    }
}
