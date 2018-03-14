package com.example.scdz.wificallsever.fun;

import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

import static com.example.scdz.wificallsever.ext.WebInt.__CALL__CUST__STATE__IF__;
import static com.example.scdz.wificallsever.ext.WebInt.__CALL__STATE__IF__;

/**
 * Created by scdz_dev on 2017-11-23.
 */

public class RecordClass {
    private int MAX_DATA_LENGTH = 160;
    private AudioRecord audioRecord;// 录音对象
    private int frequence = 8000;// 采样率 8000
    private int channelInConfig = AudioFormat.CHANNEL_CONFIGURATION_MONO;// 定义采样通道
    private int audioEncoding = AudioFormat.ENCODING_PCM_16BIT;// 定义音频编码（16位）
    private int bufferSize;

    private byte [] buffer = null;
    private Socket socket;
    public RecordClass () {
        bufferSize = AudioRecord.getMinBufferSize(frequence, channelInConfig, audioEncoding);// 根据定义好的几个配置，来获取合适的缓冲大小
        MAX_DATA_LENGTH = bufferSize / 2;
        audioRecord = new AudioRecord(MediaRecorder.AudioSource.MIC,frequence, channelInConfig, audioEncoding, bufferSize);// 实例化AudioRecord
    }
    public void Rstart (Socket socket) {
        this.socket = socket;
        if (bufferSize <= 0 || audioRecord == null) {__CALL__STATE__IF__ = false;return;}
        audioRecord.startRecording();// 开始录制
        while (__CALL__STATE__IF__) {// 开始录制
            if (null != audioRecord) {
                buffer = new byte[bufferSize];
                int result = audioRecord.read(buffer, 0, buffer.length);
                if (result == AudioRecord.ERROR_INVALID_OPERATION || result == AudioRecord.ERROR_BAD_VALUE) {
                    continue;
                }
                if (result != 0 && result != -1) {
                    //在此可以对录制音频的数据进行二次处理 比如变声，压缩，降噪，增益等操作
                    //我们这里直接将pcm音频原数据写入文件 这里可以直接发送至服务器 对方采用AudioTrack进行播放原数据
                    int offset = result % MAX_DATA_LENGTH > 0 ? 1 : 0;
                    for (int i = 0; i < result / MAX_DATA_LENGTH + offset; i++) {
                        int length = MAX_DATA_LENGTH;
                        if ((i + 1) * MAX_DATA_LENGTH > result) {
                            length = result - i * MAX_DATA_LENGTH;
                        }
                        onRecording(buffer, i * MAX_DATA_LENGTH, length);
                    }
                } else {
                    break;
                }
            }
        }
        if (audioRecord != null) {//录制循环结束后，记得关闭录制！！
            audioRecord.stop();
            audioRecord.release();
            audioRecord = null;
            try {socket.shutdownOutput();} catch (IOException ee) {ee.printStackTrace();}
        }
    }
    public void onRecording (byte[] data, int startIndex, int length) {
        if (__CALL__STATE__IF__ == false) return;
        try {
            OutputStream out = socket.getOutputStream();
            out.write(data, startIndex, length);
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
            __CALL__CUST__STATE__IF__ = 2;
            __CALL__STATE__IF__ = false;
        }
    }
}
