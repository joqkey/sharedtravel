package com.ihub.sharedtravel.strest;

public class Utils {
    public static String removeNewLines(String s) {
        if (s == null) {
            return s;
        }

        return s.replaceAll("(\\n|\\r)", "\t");
    }
}
