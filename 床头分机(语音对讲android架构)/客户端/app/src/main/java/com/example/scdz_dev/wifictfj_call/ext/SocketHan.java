package com.example.scdz_dev.wifictfj_call.ext;

import android.content.Context;
import android.media.AudioFormat;
import android.media.AudioTrack;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import java.io.DataInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

import static com.example.scdz_dev.wifictfj_call.MainActivity.main_web;
import static com.example.scdz_dev.wifictfj_call.ext.SocketHan.__PLAYIF__;
import static com.example.scdz_dev.wifictfj_call.ext.SocketHan.__RECORIF__;

/**
 * Created by scdz_dev on 2017-11-10.
 */

public class SocketHan {
    public static boolean __RECORIF__ = false;//录音挂断全局变量
    public static boolean __PLAYIF__ = false;//播放挂断全局变量

    private Context xContext;
    private String ip = "192.168.5.137";
    private int prot = 4000;

    private Socket socket;
    private boolean talking = true;
    public SocketHan (Context context) {
        this.xContext = context;
    }
    @JavascriptInterface
    public void handle () {
        talking = true;
        new Thread(new Runnable () {
            @Override
            public void run () {
                try {
                    while (talking) {
                        if (null == socket || socket.isClosed()) {
                            socket = new Socket(ip, prot);continue;
                        }
                        main_web.post(new Runnable() {
                            @Override
                            public void run() {
                                start(socket);
                                main_web.loadUrl("javascript:converIf = 1");
                                talking = false;
                            }
                        });
                        break;
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
    public void start (Socket socket) {
        new Thread(new recordHan(socket)).start();
        new Thread(new playHan(socket)).start();
    }
    @JavascriptInterface
    public void Callup () {//挂断
        talking = false;
        __RECORIF__ = false;
        __PLAYIF__ = false;
    }
}

class recordHan implements Runnable {//录音
    private ScAuRecord re;

    protected Socket socket;
    public recordHan (Socket socket) {
        this.socket = socket;
    }
    @Override
    public void run () {
        __RECORIF__ = true;
        re = new ScAuRecord(socket);
        new Thread(new Runnable () {
            @Override
            public void run () {
                start();
            }
        }).start();
        new Thread(new Runnable () {
            @Override
            public void run () {
                stop();
            }
        }).start();
    }
    public void start () {
        re.start();
    }
    public void stop () {
        while (__RECORIF__) {//Log.e("停止","停止");
            if (null == socket || socket.isClosed()) {
                __RECORIF__ = false;
                re.stop();
                main_web.post(new Runnable() {
                    @Override
                    public void run() {
                        main_web.loadUrl("javascript:converIf = 0");
                    }
                });
            }
            try {
                socket.sendUrgentData(0xFF);
            } catch (IOException e) {
                __RECORIF__ = false;
                re.stop();
                main_web.post(new Runnable() {
                    @Override
                    public void run() {
                        main_web.loadUrl("javascript:converIf = 0");
                    }
                });
            }
        }
        re.stop();
        try {
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                    socket = null;
                    System.out.println("客户端 finally 异常:" + e.getMessage());
                }
            }
        }
        Log.e("录音通迅已关闭","录音通迅已关闭");
    }
}
class playHan implements Runnable {//播放
    private ScAuPlay pe;

    private Socket socket;
    public playHan (Socket socket) {
        this.socket = socket;
    }
    @Override
    public void run () {
        __PLAYIF__ = true;
        pe = new ScAuPlay(socket);
        new Thread(new Runnable () {
            @Override
            public void run () {
                start();
            }
        }).start();
        new Thread(new Runnable () {
            @Override
            public void run () {
                stop();
            }
        }).start();
    }
    public void start () {
        pe.start();
    }
    public void stop () {
        while (__PLAYIF__) {//Log.e("停止","停止");
            if (null == socket || socket.isClosed()) {
                __PLAYIF__ = false;
                pe.stop();
                main_web.post(new Runnable() {
                    @Override
                    public void run() {
                        main_web.loadUrl("javascript:converIf = 0");
                    }
                });
            }
            try {
                socket.sendUrgentData(0xFF);
            } catch (IOException e) {
                __PLAYIF__ = false;
                pe.stop();
                main_web.post(new Runnable() {
                    @Override
                    public void run() {
                        main_web.loadUrl("javascript:converIf = 0");
                    }
                });
            }
        }
        pe.stop();
        try {
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                    socket = null;
                    System.out.println("客户端 finally 异常:" + e.getMessage());
                }
            }
        }
        Log.e("播放通迅已关闭","播放通迅已关闭");
    }
}
