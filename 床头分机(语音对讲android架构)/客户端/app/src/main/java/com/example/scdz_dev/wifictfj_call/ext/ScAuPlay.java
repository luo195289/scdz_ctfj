package com.example.scdz_dev.wifictfj_call.ext;

import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.util.Log;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

import static com.example.scdz_dev.wifictfj_call.ext.ScAuRecord.buffer;

/**
 * Created by scdz_dev on 2017-11-13.
 */

public class ScAuPlay extends playHan {
    private Socket socket;

    private AudioTrack track = null;// 录音文件播放对象
    private int frequence = 8000;// 采样率 8000
    private int channelInConfig = AudioFormat.CHANNEL_CONFIGURATION_MONO;// 定义采样通道CHANNEL_CONFIGURATION_MONO   //  CHANNEL_OUT_MONO  //   CHANNEL_CONFIGURATION_STEREO
    private int audioEncoding = AudioFormat.ENCODING_PCM_16BIT;// 定义音频编码（16位）
    private int bufferSize = -1;// 播放缓冲大小

    private boolean isPlaying = false;
    public ScAuPlay (Socket socket) {
        super(socket);
        this.socket = socket;
    }
    @Override
    public void start () {
        //isPlaying = true;
        //bufferSize = AudioTrack.getMinBufferSize(frequence, channelInConfig, audioEncoding);// 获取缓冲 大小
        //track = new AudioTrack(AudioManager.STREAM_MUSIC, frequence, channelInConfig, audioEncoding, bufferSize * 5, AudioTrack.MODE_STREAM);// 实例AudioTrack
        //track.play();
        //try {
            //while (isPlaying) {
                /*byte buffers[] = new byte[bufferSize];
                InputStream inputStream = socket.getInputStream();
                int readCount = inputStream.read(buffers);*/
                //String a = String.valueOf(buffer);
                //Log.e("数据",a);

                /*try {
                    byte buffesxsr[] = new byte[bufferSize];
                    InputStream inputStream = socket.getInputStream();
                    int readCount = inputStream.read(buffesxsr);
                    track.write(buffesxsr, 0, readCount);
                } catch (IOException e) {
                    e.printStackTrace();
                }*/

                //OutputStream out = socket.getOutputStream();
                //track.write(buffer, 0, buffer.length);//将语音数据写入即可。

                /*byte buffedrs[] = new byte[bufferSize];
                audioRecord.read(buffer, 0, buffer.length);// 录制的内容放置到了buffer中，result代表存储长度
                OutputStream out = socket.getOutputStream();
                out.write(buffer);
                out.flush();*/
            //}
       // } catch (IOException e) {
            //e.printStackTrace();
       // }
        //if (track != null) {//播放结束后，记得关闭播放！！
            //track.stop();
            //track.release();
            //try {socket.shutdownInput();} catch (IOException e) {e.printStackTrace();}
        //}
    }
    @Override
    public void stop () {
        isPlaying = false;
    }
}
