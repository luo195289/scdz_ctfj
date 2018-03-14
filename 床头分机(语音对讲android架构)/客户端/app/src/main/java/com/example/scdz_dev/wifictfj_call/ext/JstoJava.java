package com.example.scdz_dev.wifictfj_call.ext;

import android.util.Log;

/**
 * Created by scdz_dev on 2017-11-10.
 */

public class JstoJava implements Runnable {
    String TAG2 = "TAG2";
    @Override
    public void run () {
        for (int i = 0;i<200;i++) {
            Log.e(TAG2,"机b" + i);
        }
    }
}
