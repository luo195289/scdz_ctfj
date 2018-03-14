package com.example.scdz.wificallsever.ext;

import android.util.Log;

import com.example.scdz.wificallsever.fun.PlayClass;
import com.example.scdz.wificallsever.fun.RecordClass;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created by scdz_dev on 2017-11-23.
 */

public class WebInt {
    private int prot = 4000;
    public static boolean __CALL__STATE__IF__ = false;//播放挂断全局变量
    public static int __CALL__CUST__STATE__IF__ = 0;//客户端挂断全局变量
    public WebInt () {
        try {
            ServerSocket serverSocket = new ServerSocket(prot);
            while (true) {
                Socket socket = null;
                try {
                    socket = serverSocket.accept();
                    __CALL__STATE__IF__ = true;
                    __CALL__CUST__STATE__IF__ = 1;
                    Thread playThread = new Thread(new PlayTh(socket));
                    playThread.start();
                    Thread recordThread = new Thread(new RecordTh(socket));
                    recordThread.start();
                    Thread stopIfThread = new Thread(new StopTh(socket));
                    stopIfThread.start();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    class PlayTh implements Runnable {
        private Socket socket;
        public PlayTh (Socket socket) {
            this.socket = socket;
        }
        @Override
        public void run () {
            new PlayClass().Pstart(socket);
        }
    }
    class RecordTh implements Runnable {
        private Socket socket;
        public RecordTh (Socket socket) {
            this.socket = socket;
        }
        @Override
        public void run () {
            new RecordClass().Rstart(socket);
        }
    }
    class StopTh implements Runnable {
        private Socket socket;
        public StopTh (Socket socket) {
            this.socket = socket;
        }
        @Override
        public void run () {
            while (__CALL__STATE__IF__) {//Log.e("停止","停止");
                if (null == socket || socket.isClosed()) {
                    Log.e("状态:","通讯断开");
                    __CALL__STATE__IF__ = false;break;//通讯断开
                }
            }
            if (__CALL__CUST__STATE__IF__ == 2) {Log.e("状态","对方已关闭");
                //对方挂断处理
            }
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
            __CALL__CUST__STATE__IF__ = 0;
            Log.e("状态","已关闭");
        }
    }
}
