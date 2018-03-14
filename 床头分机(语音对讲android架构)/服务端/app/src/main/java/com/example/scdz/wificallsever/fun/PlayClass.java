package com.example.scdz.wificallsever.fun;

import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.util.Log;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.util.concurrent.Semaphore;

import static com.example.scdz.wificallsever.ext.WebInt.__CALL__STATE__IF__;

/**
 * Created by scdz_dev on 2017-11-23.
 */

public class PlayClass {
    private AudioTrack track = null;// 播放对象
    private int frequence = 8000;// 采样率 8000
    private int channelInConfig = AudioFormat.CHANNEL_CONFIGURATION_MONO;// 定义采样通道CHANNEL_CONFIGURATION_MONO   //  CHANNEL_OUT_MONO  //   CHANNEL_CONFIGURATION_STEREO
    private int audioEncoding = AudioFormat.ENCODING_PCM_16BIT;// 定义音频编码（16位）
    private int bufferSize = -1;// 播放缓冲大小
    private byte [] buffer = null;

    private ByteArrayOutputStream bufferStream0;
    private ByteArrayOutputStream bufferStream1;
    private Semaphore semaphore = new Semaphore(1);// 互斥信号量
    private int currentBuffer = 0;
    public PlayClass () {
        bufferSize = AudioTrack.getMinBufferSize(frequence, channelInConfig, audioEncoding);// 获取缓冲 大小
        track = new AudioTrack(AudioManager.STREAM_MUSIC, frequence, channelInConfig, audioEncoding, bufferSize, AudioTrack.MODE_STREAM);// 实例AudioTrack
    }
    public void Pstart (Socket socket) {
        if (bufferSize <= 0 || track == null) {__CALL__STATE__IF__ = false;return;}
        bufferStream0 = new ByteArrayOutputStream();
        bufferStream1 = new ByteArrayOutputStream();
        try {track.play();} catch (IllegalStateException e) {
            Log.e("AudioTrack:","播放不正常");e.printStackTrace();__CALL__STATE__IF__ = false;return;}
        new Thread(new Runnable () {//语音播放线程代码
            @Override
            public void run () {
                while (__CALL__STATE__IF__) {
                    try {
                        semaphore.acquire();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    if (currentBuffer == -1) {
                        continue;
                    }
                    //如果当前是第一个buff填充完毕
                    if (currentBuffer == 0) {
                        runPlay(bufferStream0);
                    }
                    //如果当前是第二个buff填充完毕
                    else if (currentBuffer == 1) {
                        runPlay(bufferStream1);
                    }
                }
            }
        }).start();
        while (__CALL__STATE__IF__) {
            try {
                buffer = new byte[bufferSize];
                InputStream inputStream = socket.getInputStream();
                int readCount = inputStream.read(buffer);
                if (readCount == -1) return;
                //track.write(buffer, 0, readCount);//将语音数据写入即可。
                onPlaying(buffer, 0, readCount);//双缓存模式
            } catch (IOException e) {Log.e("关闭流","关闭流");
                e.printStackTrace();
            }
        }
        if (track != null) {//播放结束后，记得关闭播放！！
            Log.e("关闭","已关闭");
            track.stop();
            track.release();
            track = null;
            try {socket.shutdownInput();} catch (IOException e) {e.printStackTrace();}
        }
    }
    public synchronized void onPlaying (byte[] data,int startIndex,int length) {//判断哪个缓存区已满确定存入哪个缓存区
        if (AudioTrack.ERROR_BAD_VALUE == bufferSize) {//初始化错误
            return;
        }
        switch (currentBuffer) {
            case 0:
                bufferStream1.write(data,startIndex,length);
                //如果缓冲区不够大，暂时不往下执行
                if (bufferStream1.size() > bufferSize) {
                    if (bufferStream0.size() <= 0) {
                        currentBuffer = 1;
                        semaphore.release();
                    }
                }
                break;
            case -1:
            case 1:
                bufferStream0.write(data,startIndex,length);
                //如果缓冲区不够大，暂时不往下执行
                if (bufferStream0.size() > bufferSize) {
                    if (bufferStream1.size() <= 0) {
                        currentBuffer = 0;
                        semaphore.release();
                    }
                }
                break;
            default:
                break;
        }
    }
    private void runPlay (ByteArrayOutputStream bufferStream) {//执行播放语音
        int dataSize = bufferStream.size();
        byte[] dataArray = bufferStream.toByteArray();
        int count = dataSize / bufferSize;//将数据按照buffer的大小可以切分的份数
        int offset = dataSize % bufferSize == 0 ? 0 : 1;//如果有余数，则还得循环一次
        for (int i = 0;i<count + offset;i++) {
            int len;
            if ((i + 1) * bufferSize > dataSize) {
                len = dataSize - i * bufferSize;
            } else {
                len = bufferSize;
            }
            track.write(dataArray,i * bufferSize,len);
        }
        bufferStream.reset();//重置Stream
    }
}
