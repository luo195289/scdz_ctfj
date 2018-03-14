package com.example.scdz_dev.wifictfj_call.ext;

import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.util.Log;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

/**
 * Created by scdz_dev on 2017-11-13.
 */

public class ScAuRecord extends recordHan {
    public static byte buffer[];


    private Socket socket;

    private AudioRecord audioRecord;// 录音对象

    private int frequence = 8000;// 采样率 8000
    private int channelInConfig = AudioFormat.CHANNEL_CONFIGURATION_MONO;// 定义采样通道
    private int audioEncoding = AudioFormat.ENCODING_PCM_16BIT;// 定义音频编码（16位）

    private boolean isRecording = false;

    private static int MAX_DATA_LENGTH = 160;
    public ScAuRecord (Socket socket) {
        super(socket);
        this.socket = socket;
    }
    @Override
    public void start () {
        //String a = String.valueOf(socket);
        //Log.e("SOCKET是:",a);
        isRecording = true;// 设置录制标记为true
        int bufferSize = AudioRecord.getMinBufferSize(frequence, channelInConfig, audioEncoding);// 根据定义好的几个配置，来获取合适的缓冲大小
        MAX_DATA_LENGTH = bufferSize / 2;
        audioRecord = new AudioRecord(MediaRecorder.AudioSource.MIC,frequence, channelInConfig, audioEncoding, bufferSize);// 实例化AudioRecord

        audioRecord.startRecording();// 开始录制

        try {
            while (isRecording) {// 开始录制
                byte[] buffer = new byte[bufferSize];// 定义缓冲数组
                int result = audioRecord.read(buffer, 0, buffer.length);// 录制的内容放置到了buffer中，result代表存储长度
                OutputStream out = socket.getOutputStream();



                // 我们使用160个byte作为一个包传递可以做到比较良好的播放效果（也就是将一份buffer拆分成四个发送）
                int offset = result % MAX_DATA_LENGTH > 0 ? 1 : 0;
                for (int i = 0; i < result / MAX_DATA_LENGTH + offset; i++) {
                    int length = MAX_DATA_LENGTH;
                    if ((i + 1) * MAX_DATA_LENGTH > result) {
                        length = result - i * MAX_DATA_LENGTH;
                    }
                    out.write(buffer,i * MAX_DATA_LENGTH,length);
                    out.flush();
                }
            } //.....result为buffer中录制数据的长度(貌似基本上都是640)。剩下就是处理buffer了，是发送出去还是直接播放，这个随便你。
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (audioRecord != null) {//录制循环结束后，记得关闭录制！！
            audioRecord.stop();
            //audioRecord.release();
            try {socket.shutdownOutput();} catch (IOException e) {e.printStackTrace();}
        }
    }
    @Override
    public void stop () {
        isRecording = false;
    }
}
