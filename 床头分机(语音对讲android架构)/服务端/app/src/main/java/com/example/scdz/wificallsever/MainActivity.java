package com.example.scdz.wificallsever;

import android.annotation.TargetApi;
import android.app.ActivityManager;
import android.content.Context;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.example.scdz.wificallsever.ext.WebInt;

public class MainActivity extends AppCompatActivity {
    public static WebView main_web;
    public static Context __MEMORYSTATE__;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //##############################################
        __MEMORYSTATE__ = this;
        setWebSetting("file:///storage/sdcard0/Download/server/server.html");
    }
    @Override
    protected void onDestroy () {//退出事件
        super.onDestroy();
        /*Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        this.startActivity(intent);
        System.exit(0);*/
        Log.e("程序","程序已经退出");
        System.exit(0);
        //android.os.Process.killProcess(android.os.Process.myPid());
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
        //main_web.addJavascriptInterface(new WebInt(), "android");
        main_web.post(new Runnable () {
            @Override
            public void run() {
                //new Thread(new JavatoJs()).start();
                //new Thread(new JstoJava()).start();
            }
        });
        main_web.loadUrl(va);
        new Thread(new Runnable() {//接收线程
            @Override
            public void run () {
                new WebInt();
            }
        }).start();
    }
    @TargetApi(Build.VERSION_CODES.JELLY_BEAN)
    public static String getCurrentMeminfo() {//获取内存信息
        StringBuffer sb = new StringBuffer();
        ActivityManager.MemoryInfo mi = new ActivityManager.MemoryInfo();
        ActivityManager activityManager = (ActivityManager) __MEMORYSTATE__.getSystemService(Context.ACTIVITY_SERVICE);
        activityManager.getMemoryInfo(mi);
        sb.append("剩余内存："+(mi.availMem/1024/1024)+"MB\n");
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            sb.append("总内存： " + (mi.totalMem/1024/1024) + "MB\n");
        }
        sb.append("内存是否过低：" + mi.lowMemory);
        return sb.toString();
    }
}
