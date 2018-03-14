package com.example.scdz_dev.wifictfj_call.ext;

import android.util.Log;

/**
 * Created by scdz_dev on 2017-11-10.
 */

public class JavatoJs implements Runnable {
    String TAG1 = "TAG1";
    public JavatoJs () {
        Log.e(TAG1,"机a");
    }
    public void sdfs () {
        Log.e(TAG1,"机a1");
    }
    @Override
    public void run () {
        for (int i = 0;i<200;i++) {
            Log.e(TAG1,"机a" + i);
        }
    }
}
