package ucare.daemon.util;

import java.io.*;
import java.util.Hashtable;
import java.util.ArrayList;
import java.net.Socket;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.StringTokenizer;
import java.util.Vector;
//import ucare.echo.server.*;

import ucare.echo.server.ILogger;


public class CUtil implements ILogger 
{
   	/**
     * ������<BR>
     * @param  none 
     */
   	private CUtil() {}
     
   	
   	      	
  
   	/**
	 * �ڸ����� ���߾� �ִ� Method
	 *
	 * @param srcString ������ ���ڿ�
	 * @param padLength ���߷��� ����Ʈ ��
	 * @param padChar   ä����� ���ڿ� (�� : ' ') - 1byte char�� ����
	 * @param isLeft    �������� ������ ���� �������� true, �����̸� false
	 *
	 * @author ļļ�����˻� �����ۼ�.
	 */ 
	public static String pad(String srcString, 
	        				int padLength, 
	        				char padChar, 
	        				boolean isLeft) {
	
		char[] padDefaultArray = new char[padLength];
	
		// Exception�� �߻����� ��� ä����� ����Ʈ ��ŭ �������� ä�� ���ڿ��� ��ȯ�Ѵ�.
		for (int i = 0; i < padDefaultArray.length; i++) { 
			padDefaultArray[i] = padChar;
		}

		if (srcString == null) {
			return new String(padDefaultArray);
		}
		
		byte[] srcByte = srcString.getBytes();
	
		// ���� ���ڿ��� �� ������� Ŭ ��� ���ʺ��� �� ������ ��ŭ �߶󳽴�.
		if (srcByte.length > padLength) {
			try {
				char[] srcChar          = new char[srcString.length()];
				int    compLength 	    = 0;
				StringBuffer retString  = new StringBuffer();
			
				srcString.getChars(0, srcString.length(), srcChar, 0);
			
				for (int i = 0; i < srcChar.length; i++) {
//					boolean bTwoByte = false;
					
					// 2 byte ���ڿ��� �����Ѵ�.				
					if ((srcChar[i] >= 0x0000) ^ (srcChar[i] <= 0x00FF)) {
						compLength += 2;	
//						bTwoByte = true;				
					} else {
						compLength ++;
//						bTwoByte = false;
					}
				
					if (compLength < padLength) {
						retString.append(srcChar[i]);
					} else if (compLength == padLength) {
						retString.append(srcChar[i]);
					} else if ((compLength -1) == padLength) {
//						if ((compLength - 1) == padLength)
//							retString.append(' ');
						
						break;		
					}
				}
			
				return retString.toString();
															
			} catch (IndexOutOfBoundsException e) {
				return new String(padDefaultArray);
			} catch (NullPointerException e) {
				return new String(padDefaultArray);
			}
		
		// byte�� ��ŭ ä�� �ֱ⸦ �Ѵ�.
		} else {
		
			int fillLength  = padLength - srcByte.length;
			char[] fillChar = new char[fillLength];
		
			for (int i = 0; i < fillLength; i++) 
				fillChar[i] = padChar;
		
			if (isLeft)
				return new String(fillChar) + srcString;
			else 
				return srcString + new String(fillChar);
		}
	}
   	
   	
	public static byte[] pad2(String srcString, int padLength, String padString, boolean isLeft) throws Exception{
	  	  try {
	  		    
	  		    boolean isKorean = false;
	  		    String chngChar = "KSC5601";  // CP933, KSC5601, 8859_1
	  		    if(srcString == null) srcString = "";
	  		    byte[] b_padChar = padString.getBytes(chngChar); //��ȯ�� ���ڿ��� cp933���� �ٲ۴�.
	  		    if (b_padChar.length != 1) {
	  		      throw new Exception("��ȯ����ڿ� ���� ����:" + padString);
	  		    }

//	  		    char[] padDefaultArray = new char[padLength];
	  		    byte[] rt_value = new byte[padLength];

	  		    byte[] b_rt = null;

	  		    byte b_padByte = b_padChar[0];

	  		    byte[] b_conv = srcString.getBytes(chngChar);		    
//	  		    if(b_conv.length < 1) return b_conv; //���� ���ٸ�.. �� return

	  		    if(b_conv.length > 1){  		      
	  		        b_rt = new byte[b_conv.length];
	  		        b_rt = b_conv;  		      
	  		    }else{
	  		        b_rt = new byte[b_conv.length];
	  		        b_rt = b_conv;
	  		    }

	  		    int i_brt_len = rt_value.length - b_rt.length;
	  		    if(isLeft){ // ���� �����ʿ� ���ʿ� ���ϴ°� ����Ÿ..
	  		        if(i_brt_len < 0){
	  		            for(int i = 0; i< rt_value.length ; i++){
	  		                rt_value[i] = b_rt[i];
	  		            }
	  		        }else{
	  		            for(int i = 0; i< rt_value.length ; i++){
	  		                if(i < i_brt_len   ) {
	  		                    rt_value[i] = b_padByte;
	  		                }else{
	  		                    rt_value[i] = b_rt[i - i_brt_len ];
	  		                }
	  		            }
	  		        }
	  		    
	  		    }else{ //���� ���ʿ�. �� ������.
	  		        for(int i = 0; i< rt_value.length; i++){
	  		            if(i < (b_rt.length )) {
	  		                rt_value[i] = b_rt[i];
	  		            }else{
	  		                rt_value[i] = b_padByte;
	  		            }
	  		        }
	  		    }
	  		    return  rt_value;  	    	 
	  	  } catch (Exception e) {
	  		  e.printStackTrace();
	  		  throw e;
	  	  }       
	    }
	
	/**
	 * ���ڿ��� ���ϴ� ����(chr)�� Ư���� ���ڿ��� �ٲپ� �ش�.<br>
	 * ��) CUtil.changeCharToString("ADC", 'D', "B"); => "ABC"<br>
	 * <br>
	 * <b>!����</b><br>
	 * 1. ���ڿ��� null�̸� ���ڿ��� ��ȯ�Ѵ�.<br>
	 * 
	 * @param buff 	: ������ �Ǵ� ���ڿ�
	 * @param cmp  	: �ٲٰ����ϴ� ����
     * @param che 	: �ٲ� ���ڿ�
     * @return 		: �ٲ� ���ڿ�
	 */
	public static String changeCharToString(String buff, char cmp, String che)
	{	
		StringBuffer target = new StringBuffer();
		
	    if (buff == null || buff.length() < 1)
	    {
	    	return "";	
	    }
	     
		for (int i = 0; i < buff.length(); i++)
		{	   
			if (buff.charAt(i) == cmp)
				target.append(che);
			else
				target.append(buff.charAt(i));	
		}
	
		return target.toString();
	}

	/**
	 * �� ���ڿ��� ���Ͽ� ���� ���� ��� ���ϴ� Ư�� ���ڿ��� �ƴ϶�� ���� �񱳴�� ���ڿ��� ��ȯ�Ѵ�.<br>
	 * ��) CUtil.decode("ABC", "ABC", "true"); => "true"<br>
	 * <br>
	 * <b>!���� : </b><br>   
	 * 1. ���ڿ��� ���� �� ������ �������� �ʴ´�.<br> 
	 *    ��, CUtil.decode("ABC   ", "ABC", "true", "false")�� ����� "false" �̴�.<br>
	 * 2. �񱳴�� ���ڿ��� null�̸� ���ڿ��� ��ȯ�� �� ���Ѵ�.<br>
	 * 
	 * @param value : �񱳴���� �Ǵ� ���ڿ�
	 * @param cmp 	: ���� ���ڿ�
	 * @param mov 	: value�� cmp�� ���� �� ��ȯ�� ���ڿ�
	 * @return 		: value�� cmp�� ���ٸ� mov���� �ƴϸ� value���� ��ȯ�Ѵ�.
	 */
    public static String decode(String value, String cmp, String mov)
    {
        return decode(value, cmp, mov, value);
    }

	/**
	 * �� ���ڿ��� ���Ͽ� ����� ���� ���ڿ��� ��ȯ�Ѵ�.<br>
	 * ��)CUtil.decode("ABC", "ABC", "true", "false"); => "true"<br>
	 * <br>
	 * <b>!���� : </b><br>   
	 * 1. ���ڿ��� ���� �� ������ �������� �ʴ´�.<br> 
	 *    ��, CUtil.decode("ABC   ", "ABC", "true", "false")�� ����� "false" �̴�.<br>
	 * 2. �񱳴�� ���ڿ��� null�̸� ���ڿ��� ��ȯ�� �� ���Ѵ�.<br>
	 * 
	 * @param value : �񱳴���� �Ǵ� ���ڿ�
	 * @param cmp 	: ���� ���ڿ�
	 * @param mov 	: value�� cmp�� ���� �� ��ȯ�� ���ڿ�
	 * @param nt 	: value�� cmp�� �������� �� ��ȯ�� ���ڿ�
	 * @return 		: value�� cmp�� ���ٸ� mov���� �ƴϸ� nt���� ��ȯ�Ѵ�.
	 */
    public static String decode(String value, String cmp, String mov, String nt)
    {
        value = nvl(value, "");
        
        if (value.equals(cmp) == true)
            return mov;
            
        return nt;
    }
    
    /**
     * ���ڿ��� null�˻縦 �Ͽ� ���� null�� ��� ���ڿ��� ��ȯ�Ѵ�.<br>
     * ��) String str1 = null; <br>
     *     CUtil.nvl(str1); => ""<br>
     *     
     * @param value	: �˻��� ���ڿ�
     * @return 		: value�� null�̸� ���ڿ��� ��ȯ�ϰ� �ƴϸ� value���� ��ȯ�Ѵ�.
     */
    public static String nvl(String value)
    {
    	return nvl(value, "");
    } 
    
    /**
     * ���ڿ��� null�˻縦 �Ͽ� ���� null�� ��� ���ϴ� ���ڿ��� ��ȯ�Ѵ�.<br>
     * ��) String str1 = null; <br>
     *     CUtil.nvl(str1, "Y"); => "Y"<br>
     *     
     * @param value	: �˻��� ���ڿ�
     * @param mov	: null�� ��� ��ȯ�� ���ڿ�
     * @return 		: value�� null�̸� mov�� ��ȯ�ϰ� �ƴϸ� value���� ��ȯ�Ѵ�.
     */
    public static String nvl(String value, String mov)
    {
        if (value == null)
            return mov;
            
        return value;
    }
    
	/**
     * ���ڿ��� null �Ǵ� ���ڿ� �˻縦 �Ͽ� ���� null�̰ų� ���ڿ��� ��� ���ϴ� ���ڿ��� ��ȯ�Ѵ�.<br>
     * ��) String str1 = ""; <br>
     *     CUtil.nvlNequal("", "Y"); => "Y"<br>
     *     
     * @param value	: �˻��� ���ڿ�
     * @param mov	: null �Ǵ� ���ڿ��� ��� ��ȯ�� ���ڿ�
     * @return 		: value�� null �Ǵ� ���ڿ��̸� mov�� ��ȯ�ϰ� �ƴϸ� value���� ��ȯ�Ѵ�.
     */
    public static String nvlNequal(String value, String mov)
	{
		if (value == null || value.equals(""))
            return mov;
            
        return value;
    }
    
    /**
	 * ���ڿ��� ��¥�������� ��ȯ�Ѵ�.<br>
	 * ��) CUtil.getDisplayDate("20080825"); => "2008-08-25"<br>
	 * <br>
	 * <b>!����</b><br>
	 * 1. ��¥ ���ڿ��� null�̸� ���ڿ��� ��ȯ�Ѵ�.<br>
	 * 2. ��¥ ���ڿ��� 8�ڸ� �̸��̸� �����ʿ� 0�� ä���� ��ȯ���ش�. (CUtil.getDisplayDate("2008"); => "2008-00-00")<br>
	 *    �ݴ�� 8�ڸ� �̻��̸� 8�ڸ����� �����Ͽ� ��ȯ�Ѵ�. (CUtil.getDisplayDate("20080825123"); => "2008-08-25")<br>
	 * 3. ���ڿ��� ���������� �˻縦 ���� �ʴ´�. (CUtil.getDisplayDate("ABCDEFGH"); => "ABCD-EF-GH")<br>
	 * 4. ��¥�������� ��ȯ�� ���� �ٽ� ���� ��� ����ũ�� ������ �� �ٽ� ��ȯ�� �ش�. (CUtil.getDisplayDate("2008/08/25"); => "2008-08-25")<br>
	 *                                                                 
	 * @param date	: Date�� "YYYYMMDD" ���ڿ�
     * @return 		: ��¥����(YYYY-MM-DD)���� ��ȯ�� ���ڿ�
	 */
    public static String getDisplayDate(String date)
    {   
        return getDisplayDate(date, "-");
    }
    
    /**
	 * ���ڿ��� ��¥�������� ��ȯ�Ѵ�.<br>
	 * ��) CUtil.getDisplayDate("20080825"); => "2008/08/25"<br>
	 * <br>
	 * <b>!����</b><br>
	 * 1. ��¥ ���ڿ��� null�̸� ���ڿ��� ��ȯ�Ѵ�.<br>
	 * 2. ��¥ ���ڿ��� 8�ڸ� �̸��̸� �����ʿ� 0�� ä���� ��ȯ���ش�. (CUtil.getDisplayDate2("2008"); => "2008/00/00")<br>
	 *    �ݴ�� 8�ڸ� �̻��̸� 8�ڸ����� �����Ͽ� ��ȯ�Ѵ�. (CUtil.getDisplayDate2("20080825123"); => "2008/08/25")<br>
	 * 3. ���ڿ��� ���������� �˻縦 ���� �ʴ´�. (CUtil.getDisplayDate2("ABCDEFGH"); => "ABCD/EF/GH")<br>
	 * 4. ��¥�������� ��ȯ�� ���� �ٽ� ���� ��� ����ũ�� ������ �� �ٽ� ��ȯ�� �ش�. (CUtil.getDisplayDate2("2008-08-25"); => "2008/08/25")<br>
	 *                                                                 
	 * @param date	: Date�� "YYYYMMDD" ���ڿ�
     * @return 		: ��¥����(YYYY/MM/DD)���� ��ȯ�� ���ڿ�
	 */
    public static String getDisplayDate2(String date)
    {
    	// XXX : method�� �ٲܱ�?
    	return getDisplayDate(date, "/");
    }
     
    /**
	 * ���ڿ��� ���ϴ� ��¥�������� ��ȯ�Ѵ�.<br>
	 * ��) CUtil.getDisplayDate("20080825", "-"); => "2008-08-25"<br>
	 * <br>
	 * <b>!����</b><br>
	 * 1. ��¥ ���ڿ��� null�̸� ���ڿ��� ��ȯ�Ѵ�.<br>
	 * 2. mask�� null�̸� ���ڿ��� �ٲ㼭 �־��ֱ� ������ ��ȯ�Ͽ��� �Է��� �״�� ��ȯ�ȴ�.<br>
	 * 3. ��¥ ���ڿ��� 8�ڸ� �̸��̸� �����ʿ� 0�� ä���� ��ȯ���ش�. (CUtil.getDisplayDate("2008", "-"); => "2008-00-00")<br>
	 *    �ݴ�� 8�ڸ� �̻��̸� 8�ڸ����� �����Ͽ� ��ȯ�Ѵ�. (CUtil.getDisplayDate("20080825123", "-"); => "2008-08-25")<br>
	 * 4. ���ڿ��� ���������� �˻縦 ���� �ʴ´�. (CUtil.getDisplayDate("ABCDEFGH", "-"); => "ABCD-EF-GH")<br>
	 * 5. ��¥�������� ��ȯ�� ���� �ٽ� ���� ��� ����ũ�� ������ �� �ٽ� ��ȯ�� �ش�. (CUtil.getDisplayDate("2008-08-25", "/"); => "2008/08/25")<br>
	 *                                                                 
	 * @param date	: Date�� "YYYYMMDD" ���ڿ�
	 * @param mask  : Mask ���ڿ�
     * @return 		: ��¥�������� ��ȯ�� ���ڿ�
	 */
    public static String getDisplayDate(String date, String mask)
    {
    	// XXX : ���ڿ��� ���ڷθ� �Ǿ� �ִ��� üũ�ؾ� �ұ�?
        String str = "";
        mask = nvl(mask);
        
        if (date == null || date.equals("")) return "";
        
        try
        {
        	date = unMask(date);
        	
        	if (date.length() < 8)
            	date = stringPadding(date, "RIGHT", "0", 8);
        	
            str = date.substring(0, 4)+ mask + date.substring(4, 6) + mask + date.substring(6, 8);
        }
        catch (Exception e)
        {
//        	FIXME => �α� ����� ������� �����ʿ�
        	System.out.println("CUtil.getDisplayDate("+date+", "+mask+").Exception  ==> " + e.getMessage());
            return date;
        }
        
        return str;
    }

    /**
     * ���ڿ��� �ð��������� ��ȯ�Ѵ�. ����ũ�� �����Ѵ�. 6�ڸ����ϴ� 6�ڸ��� ������ ��ȭ  "120000" -> "12:00:00"<br>
	 * ��) CUtil.getDisplayTime("122710"); => "12:27:10"<br>
	 * <br>
	 * <b>!����</b><br>
	 * 1. �ð� ���ڿ��� null�̸� ���ڿ��� ��ȯ�Ѵ�.<br>
	 * 2. �ð� ���ڿ��� 6�ڸ� �̸��̸� �����ʿ� 0�� ä���� ��ȯ���ش�. (CUtil.getDisplayTime("1227"); => "12:27:00")<br>
	 *    �ݴ�� 6�ڸ� �̻��̸� 6�ڸ����� �����Ͽ� ��ȯ�Ѵ�. (CUtil.getDisplayTime("122710123"); => "12:27:10")<br>
	 * 3. ���ڿ��� ���������� �˻縦 ���� �ʴ´�. (CUtil.getDisplayTime("ABCDEF"); => "AB:CD:EF")<br>
	 * 4. �ð��������� ��ȯ�� ���� �ٽ� ���� ��� ����ũ�� ������ �� �ٽ� ��ȯ�� �ش�. (CUtil.getDisplayTime("12:27:10"); => "12:27:10")<br>
	 *                 
     * @param time  : Time�� "HH24MISS" ���ڿ�
     * @return 		: �ð��������� ��ȯ�� ���ڿ�
     */
    public static String getDisplayTime(String time)
    {
//    	 XXX : ���ڿ��� ���ڷθ� �Ǿ� �ִ��� üũ�ؾ� �ұ�?
    	String str = "";
    	
    	if (time == null || time.equals("")) return "";
    		
    	try
    	{
    		time = unMask(time);
    		
    		if (time.length() < 6)
        		time = stringPadding(time, "RIGHT", "0", 6);
    		
    		str = time.substring(0, 2) + ":" + time.substring(2, 4) + ":" + time.substring(4, 6);
    	}
    	catch(Exception e)
    	{
//        	FIXME => �α� ����� ������� �����ʿ�
        	System.out.println("CUtil.getDisplayTime("+time+").Exception  ==> " + e.getMessage());
    		return time;
    	}
    	
    	return str;
    }
    
    /**
     * ���ڿ��� ��¥�ð��������� ��ȯ�Ѵ�.<br>
	 * ��) CUtil.getDisplayLongDate("20080825122710"); => "2008-08-25 12:27:10"<br>
	 * <br>
	 * <b>!����</b><br>
	 * 1. ��¥���ڿ��� null�̸� ���ڿ��� ��ȯ�Ѵ�.<br>
	 * 2. mask�� null�̸� ���ڿ��� �ٲ㼭 �־��ֱ� ������ ��¥�� ��ȯ�Ͽ��� �Է��� �״�� ��ȯ�ȴ�. ������ �ð��� �ڵ����� :�� �ٴ´�.<br>
	 * 3. ��¥ ���ڿ��� 14�ڸ� �̸��̸� �����ʿ� 0�� ä���� ��ȯ���ش�. (CUtil.getDisplayLongDate("20080825", "-"); => "2008-08-25 00:00:00")<br>
	 *    �ݴ�� 14�ڸ� �̻��̸� 14�ڸ����� �����Ͽ� ��ȯ�Ѵ�. (CUtil.getDisplayLongDate("20080825122710123", "-"); => "2008-08-25 12:27:10")<br>
	 * 4. ���ڿ��� ���������� �˻縦 ���� �ʴ´�. (CUtil.getDisplayLongDate("ABCDEFGHIJKLMN"); => "ABCD-EF-GH IJ:KL:MN")<br>
	 * 5. ��¥�������� ��ȯ�� ���� �ٽ� ���� ��� ����ũ�� ������ �� �ٽ� ��ȯ�� �ش�. (CUtil.getDisplayLongDate("2008/08/25 12:27:10", "-"); => "2008-08-25 12:27:10")<br>
	 * 
     * @param datetm : Date�� "YYYYMMDD HH24MISS" ���ڿ�
     * @param mask   : Mask ���ڿ�
     * @return		 : ��¥�ð��������� ��ȯ�� ���ڿ�
	 */
	public static String getDisplayLongDate(String datetm, String mask)
    {
//    	XXX : ���ڿ��� ���ڷθ� �Ǿ� �ִ��� üũ�ؾ� �ұ�?
        String str = "";
        
        if (datetm == null || datetm.equals("")) return "";
        
        try
        {
        	datetm = unMask(datetm).replaceAll(" ", "");
        	
        	if (datetm.length() < 14)
            	datetm = stringPadding(datetm, "RIGHT", "0", 14);
        	
            str = getDisplayDate(datetm.substring(0, 8), mask) + " " + getDisplayTime(datetm.substring(8));
        }
        catch(Exception e)
        {
        	System.out.println("CUtil.getDisplayLongDate("+datetm+", "+mask+").Exception  ==> " + e.getMessage());
            return datetm;
        }
        
        return str;
    }
	
    /**
	 * ���ڿ��� �ѱ��� ��¥�ð��������� ��ȯ�Ѵ�.<br>
	 * ��) CUtil.getDisplayDateString("20080825122710"); => "2008��08��25�� 12��27��10��"<br>
	 * <br>
	 * <b>!����</b><br>
	 * 1. ��¥���ڿ��� null�̸� ���ڿ��� ��ȯ�Ѵ�.<br>
	 * 2. ��¥ ���ڿ��� 14�ڸ� �̸��̸� �����ʿ� 0�� ä���� ��ȯ���ش�. (CUtil.getDisplayDateString("20080825"); => "2008��08��25�� 00��00��00��")<br>
	 *    �ݴ�� 14�ڸ� �̻��̸� 14�ڸ����� �����Ͽ� ��ȯ�Ѵ�. (CUtil.getDisplayDateString("20080825122710123", "-"); => "2008��08��25�� 12��27��10��")<br>
	 * 3. ���ڿ��� ���������� �˻縦 ���� �ʴ´�. (CUtil.getDisplayDateString("ABCDEFGHIJKLMN"); => "ABCD��EF��GH�� IJ��KL��MN��")<br>
	 * 4. ��¥�������� ��ȯ�� ���� �ٽ� ���� ��� ����ũ�� ������ �� �ٽ� ��ȯ�� �ش�. (CUtil.getDisplayDateString("2008/08/25 12:27:10"); => "2008��08��25�� 12��27��10��")<br>
	 *                                                                 
	 * @param datetm: Date�� "YYYYMMDD HH24MISS" ���ڿ�
     * @return 		: �ѱ��� ��¥�ð��������� ��ȯ�� ���ڿ�
	 */
    public static String getDisplayDateString(String datetm)
    {
//    	XXX : �ð������� ���������� ������ �� �ֵ��� �����ʿ�
//    	TODO : ���ڿ��� ���ڷθ� �Ǿ� �ִ��� üũ�ؾ� �ұ�? CUtil.getDisplayDateString("2008��08��25�� 12��27��10��"); ��������
        String str = "";
        
        if (datetm == null || datetm.equals(""))	return "";
        
        try
        {
        	datetm = unMask(datetm).replaceAll(" ", "");
        	
        	// FIXME : �̷� ��� 
        	if (datetm.length() < 14)
           		datetm = stringPadding(datetm, "RIGHT", "0", 14);
           	
            str = datetm.substring(0, 4) + "��" + datetm.substring(4, 6) + "��" + datetm.substring(6, 8) + "�� " + datetm.substring(8, 10) + "��" + datetm.substring(10, 12) + "��" + datetm.substring(12, 14) + "��";
        }
        catch(Exception e)
        {
//        	FIXME => �α� ����� ������� �����ʿ�
        	System.out.println("CUtil.getDisplayDateString("+datetm+").Exception  ==> " + e.getMessage());
            return datetm;
        }
        
        return str;
    }
	
    // FIXME : �������
    /**
	 * ��¥����ũ�� �����Ѵ�. "2000-10-20" -> "20001020"                                                                
	 * @param date	: "YYYY-MM-DD"���ڿ�
	 * @return 		: String, "YYYYMMDD"
	 */
    public static String getRealDate(String date)
    {
        return replace(date, "-", "");
    }
    
    public static int getRealDate(int date)
    {
    	String strDate 	= Integer.toString(date);
    	strDate			= replace(strDate,"-","");
    	
    	return Integer.parseInt(strDate);
    }
    
    /**
	 * �ֹι�ȣ����ũ�� �����Ѵ�. "######-#######" -> "#############"                                                                
	 * @param val	: "######-#######"���ڿ�
	 * @return 		: String, "#############"(�ֹι�ȣ)
	 */
    public static String getRealJumin(String val)
    {
        return replace(val, "-", "");
    }

	 /**
	 * �ֹι�ȣ����ũ�� �����Ѵ�. "#############" -> "######-#######"                                                                
	 * @param val	: "#############"���ڿ�
	 * @return 		: String, "######-#######"(�ֹι�ȣ)
	 */
    public static String getDisplayJumin(String val)
    {
        String str;
        
        if (val.length() < 13)
        	return val;
        
        try
        {
            str = val.substring(0, 6) + "-" + val.substring(6, 13);
        }
        catch(Exception e)
        {
            return val;
        }
        
        return str;
    }

	/**
	 * �ֹι�ȣ�� �ΰ��� ������. ���� ���� ��Ʈ���迭�� �ѱ��.
	 * @param val 	: �ֹι�ȣ������
	 * @param flag 	: String[], true: �������� �ִ� ��� 14�ڸ�, false: �������� ���� ��� 13�ڸ�
	 */
    public static String[] subJumin(String val, boolean flag)
    {
        String str[] = new String[2];
        
        try
        {
        	if (flag == true)
            {
            	str[0] = val.substring(0, 6);
            	str[1] = val.substring(7, 14);
            }
            else 
            {
            	str[0] = val.substring(0, 6);
            	str[1] = val.substring(6, 13);
            }	
        }
        catch(Exception e)
        {
        	str[0] = "";
        	str[1] = "";
            return str;
        }
        
        return str;
    }

	/**
	 * �ð��� �ΰ��� ������. ���� ���� ��Ʈ���迭�� �ѱ��.
	 * @param val 	: �ð�����Ÿ
	 * @param flag 	: String[], true: �����ݷ��� �ִ� ��� 5�ڸ�, false: �����ݷ��� ���� ��� 4�ڸ�
	 */
    public static String[] subTime(String val, boolean flag)
    {
        String str[] = new String[2];
        
        try
        {
        	if (flag == true)
            {
            	str[0] = val.substring(0, 2);
            	str[1] = val.substring(3, 5);
            }
            else 
            {
            	str[0] = val.substring(0, 2);
            	str[1] = val.substring(2, 4);
            }	
        }
        catch(Exception e)
        {
        	str[0] = "";
        	str[1] = "";
            return str;
        }
        
        return str;
    }

    /**
	 * �����ȣ����ũ�� �����Ѵ�. "030442" -> "030-442"
	 * @param post	: "999999"
	 * @return 		: String, "999-999"���� ��ȯ�Ѵ�.
	 */
    public static String getDisplayPostNo(String post)
    {
    	if(post == null || post.trim().equals("")) return post.trim();
    	
        if (post.length() > 4 && post.substring(3, 4).equals("-"))
        {
            post = post + (new String("   -   ")).substring(post.length(), 6);
            return post;
        }

        if (post.length() >= 4)
            post = post.substring(0, 3) + "-" + post.substring(3, post.length());
        else
            post = post + (new String("   -   ")).substring(post.length(), 6);
            
        return post;
    }
    
    /**
	 * �����ȣ����ũ�� �����Ѵ�. "030-442" -> "030442"
	 * @param post	: "999-999"
	 * @return 		: String, "999999"���� ��ȯ�Ѵ�.
	 */
    static public String getRealPostNo(String post)
    {
        if (post.length() == 7)
            post = post.substring(0, 3) + post.substring(4, post.length());
        else
        {
            if (post.length() < 7)
                post = post + (new String("      ")).substring(post.length(), 6);
            else
                post = post.substring(0, 6);
        }
        
        return post;
    }

    static public String getDisplayPhone(String phone)
    {
    	phone = maskNumber(phone);
    	String[] DDD = {"010", "011", "013", "016", "017", "018", "019", "02", "031", "032", "032", "033", "041", "042", "043", "051", "052", "053", "054", "055", "061", "062", "063", "064", "060", "080", "0505", "0536"};

    	String lstrFirNo	= "";
    	String lstrSecNo	= "";
    	String lstrThrNo	= "";
    	
    	phone = phone.trim();
    	
    	if (phone.length() < 7)
    		return phone;
		else
    	{
    		lstrThrNo	= phone.substring(phone.length() - 4);
    		lstrSecNo	= phone.substring(0, phone.length() - 4);
    		
    		if (lstrSecNo.length() == 3 || lstrSecNo.length() == 4)
    		{
    			//lstrFirNo	= "02";
    			lstrFirNo 	= "";
    			lstrSecNo	= removeLZero(lstrSecNo, "0000");
    		}
    		else
    		{
    			if (lstrSecNo.substring(0, 2).equals("02"))
    			{
    				lstrFirNo	= "02";
    				lstrSecNo	= removeLZero(lstrSecNo.substring(2), "0000");
    			}	
    			else
    			{
    				for (int i = 0; i < DDD.length; i++)
    				{
    					if (lstrSecNo.substring(0, 4).indexOf(DDD[i]) != -1)
    					{
    						lstrFirNo	= DDD[i];
    						lstrSecNo	= removeLZero(lstrSecNo.substring(lstrSecNo.indexOf(DDD[i]) + DDD[i].length()), "0000");
    						break;
    					}
    				}
    			}    			
    		}
    		
    		if (lstrFirNo == "")
    		{
	   			//lstrFirNo 	= "02";
	   			lstrFirNo 	= "";
 				lstrSecNo	= removeLZero(lstrSecNo, "0000");
    		}
    			
    		return lstrFirNo + "-" + lstrSecNo + "-" + lstrThrNo;    			
    	}	
	}
	
	static public String getDisplayPhoneMPVA(String phone)
    {
    	String[] DDD = {"010", "011", "013", "016", "017", "018", "019", "02", "031", "032", "032", "033", "041", "042", "043", "051", "052", "053", "054", "055", "061", "062", "063", "064", "060", "080", "0505", "0536"};

    	String lstrFirNo	= "";
    	String lstrSecNo	= "";
    	String lstrThrNo	= "";
    	
    	phone = phone.trim();
    	
    	if (phone.length() < 7)
    		return phone;
		else
    	{
    		lstrThrNo	= phone.substring(phone.length() - 4);
    		lstrSecNo	= phone.substring(0, phone.length() - 4);
    		
    		if (lstrSecNo.length() == 3 || lstrSecNo.length() == 4)
    		{
//    			lstrFirNo	= "02";
				lstrFirNo 	= "";
    			lstrSecNo	= removeLZero(lstrSecNo, "0000");
    		}
    		else
    		{
    			if (lstrSecNo.substring(0, 2).equals("02"))
    			{
    				lstrFirNo	= "02";
    				lstrSecNo	= removeLZero(lstrSecNo.substring(2), "0000");
    			}	
    			else
    			{
    				for (int i = 0; i < DDD.length; i++)
    				{
    					if (lstrSecNo.substring(0, 4).indexOf(DDD[i]) != -1)
    					{
    						lstrFirNo	= DDD[i];
    						lstrSecNo	= removeLZero(lstrSecNo.substring(lstrSecNo.indexOf(DDD[i]) + DDD[i].length()), "0000");
    						break;
    					}
    				}
    			}    			
    		}
    		
    		if (lstrFirNo == "")
    		{
 //   			lstrFirNo 	= "02";
 				lstrFirNo 	= "";
    			lstrSecNo	= removeLZero(lstrSecNo, "0000");
    		}
    			
    		if (lstrFirNo.equals(""))
    			return lstrSecNo + "-" + lstrThrNo;	
    		else	
    			return lstrFirNo + "-" + lstrSecNo + "-" + lstrThrNo;    			
    	}	
	}

    /**
	 * ���ڿ� ���� Ư�� ���ڸ� �ٸ� ���ڿ��� �ٲ۴�.
	 * @param src		���ڿ�
	 * @param oldstr	Ư������
	 * @param newstr	�ٲܹ���
	 * @return 			�����, 
	 */
    public static String replace(String src, String oldstr, String newstr)
    {
        StringBuffer dest = null;
        
        try
        {
            if (src == null) 
            	return null;
            
            dest = new StringBuffer("");
            
            int  len = oldstr.length();
            int  srclen = src.length();
            int  pos = 0;
            int  oldpos = 0;

            while ((pos = src.indexOf(oldstr, oldpos)) >= 0) 
            {
                dest.append(src.substring(oldpos, pos));
                dest.append(newstr);
                oldpos = pos + len;
            }

            if (oldpos < srclen)
                dest.append(src.substring(oldpos, srclen));
        }
        catch (Exception e)
        {
            return src;
        }
        
        return dest.toString();
    }
   
    /**
     * �ݾ׹��ڿ��� �ݾ�ǥ��Ÿ������ ��ȯ�Ѵ�.<BR>
     * (��) 12345678 --> 12,345,678<BR>
     * @param moneyString	: �ݾ׹��ڿ�     
     * @param delimeter 	: �ݾ�ǥ�ñ�����
     * @return   			: String, ����� �ݾ� ���ڿ�
     */
    public static String makeMoneyType(String moneyString, String delimeter)
    {
    	// ������ "0" ����
    	moneyString = removeLZero(moneyString);
    	
    	if (moneyString == null || moneyString.trim().length() < 1)
    		return "0";
    	
        int len = moneyString.length();
        
        String temp = null;
        String money = null;
        String ret = "";
        
        for (int x = len; x > 0; x -= 3)
        {
            if ((x-3) <= 0) 
            {
                temp = moneyString.substring(0,x);   
	            money = temp;
	            ret = money + ret;
            }
            else
            {
                temp = moneyString.substring(x-3,x);
	            money = delimeter+temp;
	            ret = money + ret;                
            }
        }
        
        if ((ret.charAt(0) == '+') || (ret.charAt(0) == '-'))
        {
   			if (ret.charAt(1) == delimeter.charAt(0))
   			{
        		String tempMoneyStr = null;
        		tempMoneyStr = ret.substring(0,1) + ret.substring(2, ret.length());
        		
        		ret = null;	
  				ret = tempMoneyStr;
  			}
  		}
        
        return ret;
    }

    /**
     * �ݾ׹��ڿ��� �ݾ�ǥ��Ÿ������ ��ȯ�Ѵ�.<BR>
     * (��) 12345678 --> 12,345,678<BR>
     * @param moneyString	: �ݾ׹��ڿ�     
     * @param delimeter 	: �ݾ�ǥ�ñ�����
     * @return   			: String, ����� �ݾ� ���ڿ�, ���°��Ͻ� ������ ��������.
     */
    public static String makeMoneyType2(String moneyString, String delimeter)
    {
    	// ������ "0" ����
    	//moneyString = removeLZero(moneyString);
    	String ret = "";
    	
    	if (moneyString == null || moneyString.trim().length() < 1)
    		return "";
    		
    	moneyString = moneyString.replaceAll(",", "");
    	try{
	    	java.text.DecimalFormat df = new java.text.DecimalFormat("###,###,###,##0");  
	    	moneyString = df.format(Double.parseDouble(moneyString)) + "";
    	}catch(Exception e){
    		System.out.println("CUtil ERROR:" + e.getMessage());
    	}
		ret = moneyString;
    	System.out.println("==============" + moneyString);
    	 /* 	moneyString = maskNumber(moneyString);
      int len = moneyString.length();
        
        String temp = null;
        String money = null;
        String ret = "";
        
        for (int x = len; x > 0; x -= 3)
        {
            if ((x-3) <= 0) 
            {
                temp = moneyString.substring(0,x);   
	            money = temp;
	            ret = money + ret;
            }
            else
            {
                temp = moneyString.substring(x-3,x);
	            money = delimeter+temp;
	            ret = money + ret;                
            }
        }
        
        if ((ret.charAt(0) == '+') || (ret.charAt(0) == '-'))
        {
   			if (ret.charAt(1) == delimeter.charAt(0))
   			{
        		String tempMoneyStr = null;
        		tempMoneyStr = ret.substring(0,1) + ret.substring(2, ret.length());
        		
        		ret = null;	
  				ret = tempMoneyStr;
  			}
  		}
        */
        return ret;
    }
    
    /**
     * �ݾ׹��ڿ��� �ݾ�ǥ��Ÿ������ ��ȯ�Ѵ�.<BR>
     * (��) 12345678 --> 12,345,678<BR>
     * @param intMoneyString	: �ݾ׹��ڿ�        
     * @param delimeter  	 	: �ݾ�ǥ�ñ�����
     * @return   				: String, ����� �ݾ� ���ڿ�    
     */
    public static String makeMoneyType(int intMoneyString, String delimeter)
    {
        String temp = null;
        String money = null;
        String ret = "";

        String moneyString = new Integer(intMoneyString).toString();
        
        moneyString = removeLZero(moneyString);
        
        int len = moneyString.length();
        
        if (len <= 0 || moneyString == null) 
        	return "";
        
        for (int x = len; x > 0; x -= 3)
        {
            if ((x-3) <= 0) 
            {
                temp = moneyString.substring(0,x);   
	            money = temp;
	            ret = money + ret;
            }
            else
            {
                temp = moneyString.substring(x-3,x);
	            money = delimeter+temp;
	            ret = money + ret;
            }
        }
        
        if ((ret.charAt(0) == '+') || (ret.charAt(0) == '-'))
        {
   			if (ret.charAt(1) == delimeter.charAt(0))
   			{   			     	
        		String tempMoneyStr = null;
        		tempMoneyStr = ret.substring(0,1) + ret.substring(2, ret.length());
        		
        		ret = null;	
  				ret = tempMoneyStr;
  			}
  		}
  		        
        return ret;
    }
	
    /**
     * �ݾ�ǥ��Ÿ���� �ݾ׹��ڿ��� ��ȯ�Ѵ�.<BR>
     * (��) 12,345,678 --> 12345678<BR>
     * @param moneyString 	: �ݾ�ǥ�ù��ڿ�
     * @param delimeter   	: �ݾ�ǥ�ñ�����
     * @return   			: String, �ݾ׹��ڿ�
     */
    public static String makeNoMoneyType(String moneyString, String delimeter)
    {
        StringTokenizer st = new StringTokenizer(moneyString,delimeter);
        String out = "";
        String temp = null;
        
        while (st.hasMoreTokens())
        {
            temp = st.nextToken();
            out = out + temp;
        }    
        
        return out;
    }
		
    /**
     * query string�� parsing�Ѵ�.<BR>
     * @param queryString	: queryString
     * @param indexParam  	: parsing�ϰ��� �ϴ� �ε������ڿ�
     * @return   			: String, �ε������ڿ��� ���� parsing�� value��
     */
    public static String parseQueryString(String queryString, String indexParam)
    {
		int start;
		int howLong;
	
		queryString += "&";							// ��ǥ�� �߰�
		indexParam += "=";			    			// '='�߰�		
		start = queryString.indexOf(indexParam, 0); // ���ϴ� indexParam�� value ù ��ġ�� �˾Ƴ���.
		
		if (start == -1) 
			return "";
			
		start += indexParam.length();
		howLong = queryString.indexOf("&", start); 	// value�� ���̸� �˾Ƴ���.
		
		if (howLong < (start + 1))	
			return "";								// last value==NULL
	
		String temp = queryString.substring(start, howLong);
        int idx = temp.indexOf("%20");
        
        while (idx != -1)
        {
            temp = temp.substring(0,idx) +" "+ temp.substring(idx+3,temp.length());
            idx = temp.indexOf("%20");
        }
        
        return temp;	
    }
           
    /**
     * post string�� parsing�Ѵ�.<BR>
     * @param queryString 	: PostString
     * @param indexParam  	: parsing�ϰ��� �ϴ� �ε������ڿ�
     * @return   			: String, �ε������ڿ��� ���� parsing�� value��
     */
	public static String parsePostString(String queryString, String indexParam)
	{
		int start;
		int howLong;

		queryString += "&"; 						// ��ǥ�� �߰�
		indexParam += "=";							// '='�߰�
		start = queryString.indexOf(indexParam, 0); // ���ϴ� indexParam�� value ù ��ġ�� �˾Ƴ���.
		
		if (start == -1)
			return "";
			
		start += indexParam.length();
		howLong = queryString.indexOf("&", start ); // value�� ���̸� �˾Ƴ���.
		
		if (howLong < (start + 1))
			return "";								// last value==NULL
			
		return queryString.substring(start, howLong);	// value�� �˾Ƴ���.
	}
	
    /**
     * String�� int������ ��ȯ�Ѵ�.<BR>
     * @param str	: int������ ��ȯ�� String���ڿ�
     * @return   	: int, ��ȯ�� int ��
     */
    public static int StringToInt(String str)
    {
        if (str == null ) 
        	return 0;        
        	
        return (Integer.valueOf(str).intValue());
    }
	
    /**
     * int���� String���� ��ȯ�Ѵ�.<BR>
     * @param i		: String���� ��ȯ�� int��
     * @return   	: String, ��ȯ�� String ��
     */
    public static String IntToString(int i)
    {
        return (new Integer(i).toString());
    }

    /**
	 * KSC5601 -> EUC-KR ���ڿ��� ��ȯ
	 * @param KscStr	: KscStr
	 * @return			: String, EUC-KR�� ��ȯ�� String
	 */
    public static String KscToUni(String KscStr) 
	{
		try
		{
			if (KscStr == null)
			{
				return null;	
			}
			else
			{
				return new String(KscStr.getBytes("KSC5601"), "EUC-KR");	
			}
		}
		catch (Exception e)
		{
			return null;
		}
	}
		 	
    /**
 	 * 8859_1 ---> KSC5601 ���ڿ��� ��ȯ
	 * @param UnicodeStr 	: UnicodeStr
	 * @return				: String, KSC5601�� ��ȯ�� String
	 */
	public static String UniToKsc(String UnicodeStr)
	{
		try
		{
			if (UnicodeStr == null)
			{
				return null;	
			}
			else
			{
				return new String(UnicodeStr.getBytes("8859_1"), "KSC5601");	
			}
		}
		catch (Exception e)
		{
			return null;
		}
	}
	
	/**
 	 * KSC5601 ---> 8859_1 ���ڿ��� ��ȯ
	 * @param UnicodeStr 	: UnicodeStr
	 * @return				: String, 8859_1 ��ȯ�� String
	 */
	public static String KscToUnicode(String UnicodeStr)
	{
		try
		{
			if (UnicodeStr == null)
			{
				return null;	
			}
			else
			{
				return new String(UnicodeStr.getBytes("KSC5601"), "8859_1");	
			}
		}
		catch (Exception e)
		{
			return null;
		}
	}
	
    /**
     * ���ڿ��� "�� ������ \�� �־��ش�.
     * ��) CUtil.convertComma("A\"B\"C"); => A\\\"B\\\"C java ���������� �̷��� ��ȯ������
     *     ������ A"B"C => A\"B\"C �̷��� ��ȯ�ȴٰ� �����ϸ� �ȴ�.
     * 
     * <b>!����</b>
	 * 1. ���ڿ��� null�̸� ���ڿ��� ��ȯ�Ѵ�.
	 *      
     * @param value	: ���ڿ�
     * @return 		: ��ȯ�� ���ڿ�
     */
    public static String convertComma(String value)
    {
    	// TODO : ��� comma�� �ƴѵ�.. ��Ī������ ���.
    	return changeCharToString(value, '"', "\\\"");
    }
    
    /**
 	 * <pre> 
	 * ���ڿ��� �޾Ƽ� ���� ����ǥ�� ���� ��ȯ�Ѵ�.
	 * - SQL���� ������ ���Ű ����.
	 * </pre>
	 * @param str	: ���ڿ�
	 * @return		: String, ���� ����ǥ�� ���μ� ��ȯ�Ѵ�. 'String'			
	 */
	public static String quote(String str)
	{
		StringBuffer sqlStr = new StringBuffer();
		
		if (str == null)
		{
			return "''";	
		}
		else
		{
			sqlStr.append("'");
			
			for (int i = 0; i < str.length(); i++)
			{
				if (str.charAt(i) == '\'')
				{
					sqlStr.append("''");	
				}	
				else
				{
					sqlStr.append(str.charAt(i));	
				}
								
			}
			
			sqlStr.append("'");
			
			return sqlStr.toString();
		}
	}

    /**
	 * <pre>
	 * ���ڿ��� �޾Ƽ� Enter Key�� Ư�����ڿ�(`)�� ��ȯ�ϰų�
	 * Ư�����ڿ��� Enter key�� ��ȯ��
	 * - Informix thin driver Bug ������ SQL���� ������ ���Ű ����.
	 * </pre>
	 * @param str	: ��ȯ ���
	 * @param nFlag	: ��ȯ ����
	 * @return		: String, Enter Key => (`), (`) => Enter Key�� ��ȯ
	 */
	public static String convertRN(String str, int nFlag)
	{
		StringBuffer dbStr = new StringBuffer();
		
		int i = 0;
		
		if (str == null)
		{
			return "";	
		}
		else
		{
			if (nFlag > 0)	// ����̸� Enter Key�� `�� ��ȯ
	    	{	    		
	    		str = str.replace('\r', '`');
	    		str = str.replace('\n', '`');
	    		
	    		return str;
	    	}
	    	else			// �����̸� `�� Enter Key�� ��ȯ
	    	{
				for (; i < str.length(); i++)
				{
					if ((str.charAt(i) == '`') && ((i+1) < str.length()) && (str.charAt(i+1) == '`'))
					{
						i++;
						dbStr.append("\r\n");
					}	
					else
					{
						dbStr.append(str.charAt(i));	
					}				
				}
	    	}
	    }
	    
		return  dbStr.toString();
	}

    /**
	 * <pre>
	 * ���ڿ��� �޾Ƽ� Enter Key�� Ư�����ڿ�(<BR>)�� ��ȯ�ϰų�
	 * Ư�����ڿ��� Enter key�� ��ȯ��
	 * - Informix thin driver Bug ������ SQL���� ������ ���Ű ����.
	 * </pre>
	 * @param str	: ��ȯ ���
	 * @param nFlag	: ��ȯ ����
	 * @return		: String, Enter Key => (<BR>), (<BR>) => Enter Key�� ��ȯ
	 */
	public static String convertBR(String str, int	nFlag)
	{
		StringBuffer fileStr = new StringBuffer();
		
		int i = 0;
		int lasti = 0;
		
		if (str == null)
		{
			return "";	
		}
		else
		{
			if (nFlag > 0)	// ����̸� Enter Key�� `<BR>`�� ��ȯ
	    	{	    			    		
				for (; i < str.length(); i++)
				{
					if (str.charAt(i) == '\r')
					{
						fileStr.append("<BR>");
					}	
					else if (str.charAt(i) == '\n')		
					{ 
						;
					}	
					else
					{
						fileStr.append(str.charAt(i));	
					}				
				}
								
				return fileStr.toString();
	    	}
	    	else			// �����̸� <BR>�� Enter Key�� ��ȯ
	    	{
				i = str.indexOf("<BR>"); 
				
				while ((i != -1) && (i < str.length()))
				{
					fileStr.append(str.substring(lasti, i));
					fileStr.append("\\r\\n");
					
					i += 4;
					lasti = i;
					
					i = str.indexOf("<BR>", lasti); 
				}
				
				if (i < str.length())
				{
					fileStr.append(str.substring(lasti, str.length()));
				}				
	    	}
	    }
		
		return  fileStr.toString();
	}

    /**
	 * <pre>
	 * ���ڿ��� �޾Ƽ� Enter Key�� ���н��� Enter�� ��ȯ
	 * </pre>
	 * @param str	: ��ȯ ���
	 * @return		: String, Enter Key => ���н��� Enter�� ��ȯ
	 *				  �켱 �ӽ÷� ����մϴ�... ���߿� �ʿ��Ͻø� �����ؼ� ����ϼ���!
	 */
	public static String convertUnixRN(String str)
	{
		StringBuffer fileStr = new StringBuffer();
		
		int i = 0;
		
		if (str == null)
		{
			return "";	
		}
		else
		{
			for (; i < str.length(); i++)
			{
				if (str.charAt(i) == '\r' || str.charAt(i) == '\n')
				{ 
					fileStr.append(" ");;
				}	
				//if( str.charAt(i) == '\n' )
				//{ ;}	
				else
				{
					fileStr.append(str.charAt(i));	
				}				
			}
							
			return fileStr.toString();
	    }
	}
	
	/**
	 * <pre>
	 * ���ڿ��� �޾Ƽ� Enter Key�� TextArea Enter�� ��ȯ
	 * </pre>
	 * @param str	: ��ȯ ���
	 * @return		: String, Enter Key => TextArea Enter�� ��ȯ
	 */
	public static String convertTextArea(String str)
	{
		StringBuffer fileStr = new StringBuffer();
		
		int i = 0;
		
		if (str == null)
		{
			return "";	
		}
		else
		{
			for (; i < str.length(); i++)
			{	
				if (str.charAt(i) == '\r')
				{ 
					fileStr.append("\\r\\n");
				}
				else if (str.charAt(i) == '\n')
				{
					fileStr.append("");
				}	
				else
				{
					fileStr.append(str.charAt(i));	
				}				
			}
							
			return fileStr.toString();
	    }
	}

    /**
	 * <pre>
	 * ��Ʈ���� ������ ���Ͽ� ���� ���Ѱ�
	 * </pre>
	 * @param fileContent 	: ���Ͽ� �������� ����
	 * @param filePath		: ������ ���� path
	 * @return				: boolean, ������ ����	
	 */
	public static boolean writeFile(String fileContent, String filePath)
		throws Exception
	{
		FileWriter 		writer = null;
		BufferedWriter 	buf_writer = null;

		try 
		{
			writer = new FileWriter(filePath);
			buf_writer = new BufferedWriter(writer);
			
			buf_writer.write(fileContent);
				
			return true;						
		}
		catch (IOException e) 
		{
			throw e;  
		}
		finally 
		{
			try 
			{			
				buf_writer.close();
			} 
			catch(Exception e)
			{
				;
			}
		}
	}

    /**
	 * <pre>
	 * ��Ʈ���� ������ ���Ͽ� ���� ���Ѱ�
	 * </pre>
	 * @param fileContent	: ���Ͽ� �������� ����
	 * @param filePath		: ������ ���� path
	 * @return				: boolean, ��������
	 */
	public static synchronized boolean writeFileAppend(String fileContent, String filePath)
	{
		boolean bResult = false;
        PrintWriter out = null; 		

		try 
		{
	        // create instance of File 
	        File openFile = new File(filePath);
	        
	        // ����, ������ �����ϸ� append mode, autoflush�� PrintWriter�� ����
	        if (openFile.exists())
	        {
	            out = new PrintWriter(new FileOutputStream(openFile.getAbsolutePath(), true), true);
	        }
	        // �������� ������, ���ο� ���� ����
	        else
	        {
	            out = new PrintWriter(new FileOutputStream(openFile.getAbsolutePath()), true);
	        }
	
            out.println(fileContent);
            
            bResult = true;
		}
		catch (IOException e) 
		{	
			bResult = false;  
		}		
		finally 
		{
			try 
			{			
				out.close();
			} 
			catch(Exception e) {}
		}
		
		return bResult;
	}

    /**
     * ���ڿ��� NULL CHECK �� int�� default�� 0����.     
     * @param flag		: 0 �̸� ������ ���Ͽ� �⺻ ������ �ִ´�.
     * 					: 1 �̸� ������ ���Ͽ� �⺻ 0�� �ִ´�.
     * @param strData	: �˻��� ���ڿ�
	 * @return 			: String, 
	 */
	public static String insertCheck(int flag, String strData)
	{
		if (strData != null) 
			strData = strData.trim();

		if (flag == 0) 			// ������
		{
			if (strData == null)
			{
				strData = " "; 	// ����� �⺻ ������ �ִ´�.
			}
			else if (strData.equals(""))
			{
				strData = " "; 	// ����� �⺻ ������ �ִ´�.
			}
		}
		else if (flag == 1) 	// ������
		{
			if (strData == null)
			{
				strData = "0"; 	// ����� �⺻ 0�� �ִ´�.
			}
			else if (strData.equals(""))
			{
				strData = "0"; 	// ����� �⺻ 0�� �ִ´�.
			}
		}
		
		return strData;
	}

	/**
	 * ���̸� ����Ʈ ������ ����Ͽ� ���ڿ��� �ڸ���. �ѱ� �� ��� �ݹ���Ʈ�� �����Ѵ�.
	 * ����� ���ڿ��̶�� �ڿ� "..."�� �ٴ´�.
	 * @param str 		: ���ڿ�
	 * @param length	: ������ ����
	 * 
	 *<font color="#0000ff">
	 *<pre>
	 *String temp = CUtil.substring("������ ���ڿ��Դϴ�.", 10);
	 *System.out.println("temp ==>" + temp);
	 *temp = CUtil.substring("������", 8);
	 *System.out.println("temp ==>" + temp);
	 *��°��:
	 *temp ==>������ ��...
	 *temp ==>������
	 *</pre>
	 *</font>
	 */ 
	public static String substring(String str, int length)	
	{
		if (str == null || length < 4) return str;
		
		int len	= str.length();
		int cnt = 0, index = 0;
		
		while (index < len && cnt < length)
		{
			// 1����Ʈ ���ڶ��(����)
			if (str.charAt(index++) < 256)
				cnt ++;
			else
				cnt += 2;
		}
		
		if (index < len && length >= cnt)
			str = str.substring(0, index);
		else if (index < len && length < cnt)
			str = str.substring(0, index - 1);
		
	/*	byte[] data = str.getBytes();
		int count = 0;
		int index = 0;
		boolean bHangul = false;

		StringBuffer sbuf = new StringBuffer(length + 3);
		
		if (length < str.length())
		{
			while (index < length)    
			{
				if (data[index] < 0 && bHangul)  
				{
					count++;
					bHangul = false;
				}
				else if (data[index] < 0)   
				{
					bHangul = true;
				}
				else 	
				{
					count++;
				}		
						
				index++;				
			}
			
			sbuf.append(new String(data,0,index));
			sbuf.append("...");
			
			return sbuf.toString();
		}*/
		
		return str;
	}
	
    /**
	 * ���ڿ��� ����Ʈ������ ���Ѵ�.	 
	 */
    public static int getByteLength(String strText)
    {
        byte[] byteArray = strText.getBytes();
        return byteArray.length;
    }
    
    /**
	 * ���ڿ��� ����Ʈ������ŭ�� ���ڿ��� ���Ѵ�.
	 */
    public static String getByteLengthString(String str, int byteLength)
    {
    	if (getByteLength(str) > byteLength)
    		return getByteLengthString(str.substring(0, str.length()-1), byteLength);
    		
    	return str;
    }
	
	/**
	 * ������ ������ ������ ���ؼ� ��ü������ ���������� ������ ���������� ���Ѵ�.
	 * @param nRowCount	: ��ü����
	 * @param nStep		: �������� ����
	 * @return 			: int, �������� ������ ����� �� ������ ����
	 *<font color="#0000ff">
	 *<pre>
	 *int nTotalRow = 100;  // ���� ��ü ����.
	 *int nPageRow  = 10;   // ���������� ����.
	 *int nPageCount;
	 *nPageCount = CUtil.getPageNum(nTotalRow, nPageRow);
	 *System.out.println("������ ����: "+ nPageCount);
	 *��°��:
	 *������ ����: 10
	 *</pre>
	 *</font>
	 */
	public static int getPageNum(int nRowCount, int nStep)
	{
        int nPages;
        
        if (nRowCount < 1) 
        	return 0;
        
        nPages = nRowCount / nStep;
        
        if (((nPages * nStep) - nRowCount) != 0)         // ���� ������ �� �������� �� ����
            nPages++;
            
        return (nPages < 1)? 1 : nPages;
	}

	/**
	 * ���ϸ��� Ȯ���ڸ� �����Ͽ� �� image������ ��ȯ�Ѵ�.	
	 *<pre>
	 *zip,rar,ace,arj.jar ==> zip.gif
	 *exe ==> exe.gif
	 *txt,doc,hwp,pdf,ppt ==> text.gif
	 *�������� ==> file.gif
	 *Ȯ���ڰ� ���� ��� ==> gul.gif
	 *</pre>
	 */
    public static String extendImg(String extendedname)
    {
        String img  = "";
        String str2 = "";
        StringTokenizer str1 = new StringTokenizer(extendedname,".");
        int cnt = 0;
        cnt = str1.countTokens();
        
        if (cnt != 0)
        {
        	for (int i = 0; i < cnt; i++)
        	{
        	    str2 = str1.nextToken();
        	}
        		
        	if (str2.equals("zip") || str2.equals("rar") || 
        	    str2.equals("ace") || str2.equals("arj") || 
        	    str2.equals("jar")) 
        	{
        	    img = "zip.gif";
	    	}
	    	else if(str2.equals("exe")) 
	    	{
        	    img = "exe.gif";
	    	}
	    	else if (str2.equals("txt") || str2.equals("doc") || 
	    	         str2.equals("hwp") || str2.equals("pdf") || 
	    	         str2.equals("ppt")) 
	   		{
        	    img = "text.gif";   
	    	}
	    	else 
	    	{
	    	    img = "file.gif";
	    	}
	    }
	    else 
	    {
	    	img = "gul.gif";
	    }	 
	    		
	    return img;
    }
	
    /**������*/
	public static String fromDB(String s)
	{
		return s;
	}
	
    /**������*/
	public static String toDB(String s)
	{
		return s;
	}
	
	/**
	* �ش� ���ڿ��� �Ҽ����� digit ������ �ݿø� ó��<br>
	* @param str_number	: String representation of the number to truncate digits 
	* @param digits 	: the number of count to be remained after the fraction point
	* @return double		: double,
	* <font color="#0000ff">double formatted = Util.format("1234.67789", 2);<br>
	* formatted double ==> 1234.68
	* </font>
	*/	
	public static double format(String str_number, int digits) {
		String pattern = "###";
		double value = -1.;
		
		for (int i = 0; i < digits; i++) 
		{
			if (i == 0) 
				pattern += ".";
				
			pattern += "0";
		}
		
		try 
		{
			value = Double.parseDouble(str_number);
		} 
		catch(NumberFormatException e) 
		{
			log.debug("[CUtil] Bad Number String!! ->" + str_number);
			e.printStackTrace();
		}
		
		return customFormat(pattern, value);
	}
	
	/**
	* �ش� ����(������)�� �Ҽ����� digit ������ �ݿø� ó��<br>
	* @param number 	: the number to truncate digits 
	* @param digits : the number of count to be remained after the fraction point
	* @return double,
	* <font color="#0000ff">double formatted = Util.format(1234.67789, 2);<br>
	* formatted ==> 1234.68
	* </font>
	*/	
	public static double format(double number, int digits) {
		return format(""+number, digits);
	}
	
	/**
	* This method actually does all for number formatting...
	* @param pattern 	: pattern to apply to the given double value
	* @param value 		: number to be formatted
	* @return 			: double,
	*/	
	private static double customFormat(String pattern, double value ) {
		DecimalFormat myFormatter = new DecimalFormat(pattern);
		String output = myFormatter.format(value);
		
		try 
		{
			return Double.parseDouble(output);
		} 
		catch (NumberFormatException e) 
		{
			log.debug("[CUtil] invalid Number String!! " + output + " return 0.0 ");  
			e.printStackTrace();
			return 0.0;
		}		
	}
	
	/**
	* �Ҽ��� digits�� ����ŭ 0���� ����<br>
	* @param number 	: double value to convert into specified format pattern
	* @param digits 	: the number of count to be remained after the fraction point
	* @return 			: String, converted into specified format
	* <font color="#0000ff">String formatted = Util.formatStrZero(123456789, 2);<br>
	* formatted ==> "123,456,789.00"
	* </font>	
	* This method resolves some defects when converting String representation of double primitives	
	*/	
	public static String formatStrZero(double number, int digits) {
		return formatStrZero("" + number, digits);
	}
	
	/**
	* Use this method like this:<br>
	* @param str_number	: String value to convert into specified format pattern
	* @param digits 	: the number of count to be remained after the fraction point
	* @return 			: String, converted into specified format
	* <font color="#0000ff">String formatted = Util.formatStrZero("123456789", 2);<br>
	* formatted ==> "123456789.00"
	* </font>	
	* This method resolves some defects when converting String representation of double primitives
	*/	
	public static String formatStrZero(String str_number, int digits) {
		String pattern = "###";
		double value = 0.0;
		
		for (int i = 0; i < digits; i++) 
		{
			if (i == 0) 
				pattern += ".";
				
			pattern += "0";
		}
		
		try 
		{
			value = Double.parseDouble(str_number);
		} 
		catch (NumberFormatException e) 
		{
			log.debug("[CUtil] Bad Number String!! ->" + str_number);
			e.printStackTrace();
		}		
		
		return customFormatZero(pattern, value);
	}	
	
	/**����� ���� ���� ���� ���� *
	 * 
	 * @param pattern ���� ����
	 * @param value ��
	 * @return �����
	 */
	private static String customFormatZero(String pattern, double value ) {
		DecimalFormat myFormatter = new DecimalFormat(pattern);
		String output = myFormatter.format(value);
		
		int idx = output.indexOf(".");
		
		if (idx == 0)
		{ 
			output = "0" + output;
		}
		
		return output;
	}	
		
	/**
	* Use this method like this:<br>
	* @param str_number	: String representation of the number to truncate digits 
	* @param digits 	: the number of count to be remained after the fraction point
	* @return String,
	* <font color="#0000ff">String formatted = Util.formatIntoCurr("123456789.123", 2);<br>
	* formatted ==> "123,456,789.12"
	* </font>
	*/	
	public static String formatIntoCurr(String str_number, int digits) {
		String pattern = "###,###";
		double value = -1.;
		
		for (int i = 0; i < digits; i++) 
		{
			if (i == 0) 
				pattern +=".";
				
			pattern += "0";
		}
		
		try 
		{
			value = Double.parseDouble(str_number);
		} 
		catch(NumberFormatException e) 
		{
			log.debug("[CUtil] Bad Number String!! -> " + str_number);
			e.printStackTrace();
		}
		
		return toCurrencyFormat(pattern, value);
	}
	
	/**
	* This method actually does all for number formatting into Currency 
	* @param formatted 	: Formatted Number String to reverse into double primitive number
	* @return 			: double, -1 if parameter passes was not a valid number to parse..
	*/	
	public static double currencyToNumber(String formatted) 
	{
		StringTokenizer st = new StringTokenizer(formatted, ",");
		StringBuffer sb = new StringBuffer();
		
		double ret = -1;
		
		while (st.hasMoreTokens()) 
		{
			sb.append(st.nextToken());
		}
		
		try 
		{
			ret = Double.parseDouble(sb.toString());			
		} 
		catch (NumberFormatException e) 
		{
			log.debug ("[CUtil] Bad Number Format ...."+ formatted+"<" + sb);
			e.printStackTrace();
		} 
		return ret;
	}	
	
	/**
	* Use this method like this:<br>
	* @param number 	: the number to truncate digits 
	* @param digits 	: the number of count to be remained after the fraction point
	* @return 			: double String
	* <font color="#0000ff">String formatted = Util.formatIntoCurr(123456789.123, 2);<br>
	* formatted ==> "123,456,789.12"
	* </font>	
	*/		
	public static String formatIntoCurr(double number, int digits) 
	{
		return formatIntoCurr(""+ number, digits);
	} 

	/**
	* This method actually does all for number formatting into Currency 
	* @param pattern pattern to apply to the given double value
	* @param value number to be formatted
	* @return formatted currency String
	*/	
	private static String toCurrencyFormat(String pattern, double value) 
	{
		DecimalFormat formatter = new DecimalFormat(pattern);
		return formatter.format(value);	
	}
	
	/**
	* @param src 	: source string to validate 
	* @return 		: boolean, true if parameter string contains only digits(that is to say 1/2/3/......)
	*/	
	public static boolean checkDigitString(String src) 
	{
		if (src == null || "".equals(src)) { 
			log.debug("parameter src passed: " + src ); 
			return false;
		}
		
		for (int i = 0; i < src.length(); i++) 
		{
			if (!Character.isDigit(src.charAt(i))) 
				return false;
		}
		
		return true;
	}
	
	/**
	*	Generates a Random Unique ID
	*/	
	public static String getUniqueID() 
	{
		StringBuffer  sb = new StringBuffer();
		java.util.StringTokenizer st = new java.util.StringTokenizer(new java.rmi.server.UID().toString(), ":");

		while (st.hasMoreTokens()) 
		{
			sb.append(st.nextToken());
		}	
		
		return sb.toString();
	}
	
	/**
	* Check Null Value!!
	* @param src 			: source string to check null
	* @param defaultValue	: Default Value
	*/	
	public static String nullCheck(String src, String defaultValue) 
	{
		return (src==null || "".equals(src.trim()) )? defaultValue:src;
	}	
	
	/**
	* @return Current Timestamp
	*/	
	public static java.sql.Timestamp getCurrTimestamp() {
		return new java.sql.Timestamp(System.currentTimeMillis());
	}	

	/**
	*	Format Pattern                         Result
	*	 --------------                         -------
	*	 "yyyy.MM.dd G 'at' hh:mm:ss z"    ->>  1996.07.10 AD at 15:08:56 PDT
	*	 "EEE, MMM d, ''yy"                ->>  Wed, July 10, '96
	*	 "h:mm a"                          ->>  12:08 PM
	*	 "hh 'o''clock' a, zzzz"           ->>  12 o'clock PM, Pacific Daylight Time
	*	 "K:mm a, z"                       ->>  0:00 PM, PST
	*	 "yyyyy.MMMMM.dd GGG hh:mm aaa"    ->>  1996.July.10 AD 12:08 PM
	*	 
	*    ex) CUtil.getCurrDate("yyyy-MM-dd");
	*
	* @return Formatted String date
	*/
	public static String getCurrDate() 
	{
		return getCurrDate("yyyy/MM/dd");
	}

	/** ���� ��¥ ��ȯ *
	 * 
	 * @param format ���� ���Ľ���
	 * @return �����
	 */
	public static String getCurrDate(String format) 
	{
		SimpleDateFormat simpledf = new SimpleDateFormat(format);
		return simpledf.format(CDateUtil.getDate());
	}
	
	/**
	 * ex) 2�� �� ��¥ getMyDate(-2, "yyyy/MM/dd");
	 *     3�� �� ��¥ getMyDate(3, "yyyy/MM/dd");
	 * @param term ������ �Ⱓ
	 * @param format ����
	 * @return term ��ŭ�� ���� ���� Formatted String date
	 */
	public static String getMyDate(int term, String format) 
	{
		Calendar now = Calendar.getInstance();
		now.set(now.get(now.YEAR), now.get(now.MONTH)+term, now.get(now.DAY_OF_MONTH));
		
		SimpleDateFormat simpledf = new SimpleDateFormat(format);
		return simpledf.format(now.getTime());
	}

	/** String Split *
	 * 
	 * @param value �ڸ� ���ڿ�
	 * @param delimit ������
	 * @return �����
	 */
 	public static String[] split(String value, String delimit) 
 	{
 		Vector lv_split		= new Vector(1);
 		String[] ls_split 	= null;
// 		String ls_temp		= "";
	
 		while (value.indexOf(delimit) != -1) {
 			lv_split.add(value.substring(0, value.indexOf(delimit)));
 			
 			value = value.substring(value.indexOf(delimit) + 1);
 		}
 		
 		lv_split.add(value);
 		
 		ls_split = new String[lv_split.size()];
 		
 		for (int i = 0; i < lv_split.size(); i++) {
 			ls_split[i] = (String) lv_split.elementAt(i);
 		}
 		
 		return ls_split;
 	}

	/**
	* Page Navigator
	* @param LINE_PER_PAGE  // ����ξ� ������ ���ΰ�?                         
	* @param totalRowCount  // �� ������ΰ�? Navigation�ϰ����ϴ� Tatal Row...
	* @param pageGroup      // �� �������� ���� �׷� ��ȣ                      
	* @param curPage        // �� �������� ���۹�ȣ                            
	*/
	public static String navigate(int LINE_PER_PAGE, int totalRowCount, int pageGroup, int curPage, String prevImgUrl, String nextImgUrl)
	{
		StringBuffer navigation = new StringBuffer();
		
		int nextPage = 0;				// ���� ������ - ���� 
		int prevPage = 0;				// ���� ������ - ���� 
		int totalPage = 0; 				// �� ������ ��
		int curPageGroup = 0; 			// ���� ������ �׷�
		int nextPageGroup = 0;			// ���� ������ �׷�
		int prevPageGroup = 0;			// ���� ������ �׷�
		int totalPageGroup = 0;			// �������� �׷� ��
		//int endPage = 0;	            // ������ ���α����� ����� ���� ��
		int startPage = 0;				// ȭ�鿡 �μ��� �������� ������ - ����
		int endPageGroup = 0; 			// ������ �׷������ ����� ���� ��
		
		totalPage = (int)Math.ceil(totalRowCount /(LINE_PER_PAGE + 0.0));
		curPageGroup = pageGroup<=0? 1:pageGroup;
		totalPageGroup = (int)Math.ceil(totalPage/10.0);
		
		if (curPageGroup + 1 <= totalPageGroup) 
		{
			nextPageGroup = curPageGroup + 1;
			nextPage = curPageGroup*LINE_PER_PAGE*10 + 1;
		} 
		else 
		{
			nextPageGroup = totalPageGroup;
			nextPage = (nextPageGroup-1)*LINE_PER_PAGE*10 + 1;
		}

		if (curPageGroup > 1) 
		{
			prevPageGroup = curPageGroup - 1;
			prevPage = (curPageGroup-2)*LINE_PER_PAGE*10 + 1;
		} 
		else 
		{
			prevPageGroup = 1;
			prevPage = 1;
		}
		
		navigation.append("<td width=\"70\">");
		
		if (curPage < LINE_PER_PAGE || curPageGroup < 2) 
		{
			if ("��".equals(prevImgUrl) || "".equals(prevImgUrl) || prevImgUrl==null) 
				navigation.append("��");
			else 
				navigation.append("<img src=\""+ prevImgUrl + "\" width=\"56\" height=\"19\">");
				
			navigation.append("</td>");
		} 
		else 
		{
			if ("��".equals(prevImgUrl) || "".equals(prevImgUrl) || prevImgUrl==null) 
				navigation.append("<a href=\"javascript:navigator(\'" +prevPage+ "\', \'" +prevPageGroup+ "\');\">��</a>");
			else 
				navigation.append("<a href=\"javascript:navigator(\'" +prevPage+ "\', \'" +prevPageGroup+ "\');\"><img src=\""+ prevImgUrl + "\" width=\"56\" height=\"19\"></a>");
		}		
							
		navigation.append("</td>");
		
		startPage = (curPageGroup-1)*10;
		
		if (startPage+10 < totalPage)	
			endPageGroup = startPage+10;   // ���� ������ �׷��� ������ �� �ش� �������� 10���� �������� �����ְ�
		else	
			endPageGroup = totalPage;      // �׷��� ���� ��� �� ���������� �ش��ϴ� ���������� �����ش�.
		
		navigation.append("<td align=\"center\">&nbsp;[");
		
		for (int i = startPage; i < endPageGroup ; i++) 
		{
			if (curPage == i*LINE_PER_PAGE+1) 
			{
				navigation.append(""+(i+1)+"&nbsp;");
			} 
			else 
			{
				navigation.append("<a href=\"javascript:navigator(\'" +(i*LINE_PER_PAGE+1) +"\', \'" +curPageGroup+ "\');\">" + (i+1) +"</a>&nbsp;");
			}
			
			if (i < endPageGroup-1) 
				navigation.append("|");
		}
		
		navigation.append("]&nbsp;</td>");
		
		navigation.append("<td width=\"70\" align=\"right\">");
		
		if (curPage+LINE_PER_PAGE > totalRowCount || curPageGroup == totalPageGroup) 
		{
			if ("��".equals(nextImgUrl)  || "".equals(nextImgUrl) || nextImgUrl==null ) 
				navigation.append("��");
			else
				navigation.append("<img src=\""+ nextImgUrl + "\" width=\"56\" height=\"19\">");
		} 
		else 
		{
			if ("��".equals(nextImgUrl)  || "".equals(nextImgUrl) || nextImgUrl==null ) 
				navigation.append("<a href=\"javascript:navigator(\'" +nextPage+ "\', \'" +nextPageGroup+ "\');\">��</a>&nbsp;");
			else
				navigation.append("<a href=\"javascript:navigator(\'" +nextPage+ "\', \'" +nextPageGroup+ "\');\"><img src=\""+ nextImgUrl + "\" width=\"56\" height=\"19\"></a>&nbsp;");
		}
		
		navigation.append("</td>");
		
		return navigation.toString();
	}

	
	/** Enumeration.���� *
	 * 
	 * @param enum1 Enumeration��
	 * @return ����
	 */
	public int getEnumCount(java.util.Enumeration enum1) {
		int i = 0;
		
		while (enum1.hasMoreElements()) {
			enum1.nextElement();
			i++;
		}
		
		return i;
	}
	
	/** ���ʿ� �ִ� 0(zero)�� ���� *
	 *  valuer�� ���� ��� ""��ȯ
	 * @param value ������ ��
	 * @return �����
	 */
	public static String removeLZero(String value)
	{
		return removeLZero(value, "");
	}
	
	/** ���ʿ� �ִ� 0(zero)�� ���� *
	 * @param value ������ ��
	 * @param def value���� ���� ��� def�� ��ȯ
	 * @return �����
	 */
	public static String removeLZero(String value, String def)
	{
		String temp	= def;
		
		char[] arr	= value.toCharArray();
		
		for (int i = 0; i < arr.length; i++)
		{
			if (arr[i] != '0')
			{
				temp = value.substring(i);
				break;
			}
		}	
	
		return temp;
	}
	
	/** ������ ���ڸ� ������ �������� ������ ũ�⸸ŭ ä�� �ִ´�.
	 * 
	 * @param value ����
	 * @param direct ����(LEFT, RIGHT)
	 * @param padchar ä�﹮��
	 * @param padlen ä��ũ��
	 * @return �����
	 */
	public static String stringPadding(String value, String direct, String padchar, int padlen) 
	{
		String lstrPad = value.trim();
		
		if (lstrPad.length() == padlen)
			return lstrPad;
		else
		{
			int lintGap	= padlen - lstrPad.length();
			
			if (direct.equals("LEFT"))
			{
				for (int i = 0; i < lintGap; i++) lstrPad = padchar + lstrPad;
			}
			else
			{
				for (int i = 0; i < lintGap; i++) lstrPad = lstrPad + padchar;
			}
		}
		
		return lstrPad;
	}
	
	/** Number �� ������
	 * 
	 * @param value
	 * @return �����
	 */
	public static String maskNumber(String value)
	{
		String lstrNum	 = "";
		
		if (value == null || value == "")
			return "";
		
		for (int i = 0; i < value.length(); i++)
		{
			if (Character.isDigit(value.charAt(i)))
				lstrNum += value.charAt(i);
		}
		
		return lstrNum;
	}
	
	/** ��ȭ��ȣ�� �������� �������� �����Ѵ�.
	 * 
	 * @param value ��ȭ��ȣ
	 * @return �����
	 */
	public static String chbTelFormat(String value)
	{
		String lstrNum	= "";
		
		if (value == null || value == "")
			return "";
		
		StringTokenizer st = new StringTokenizer(value, "-");
		
		if (st.countTokens() == 0 || st.countTokens() == 1)
			lstrNum = stringPadding(value, "LEFT", "0", 12);
		else if (st.countTokens() == 2)
			lstrNum = stringPadding(st.nextToken(), "LEFT", "0", 4) + 
					  stringPadding(st.nextToken(), "LEFT", "0", 8);
		else if (st.countTokens() == 3)
			lstrNum = stringPadding(st.nextToken(), "LEFT", "0", 4) + 
					  stringPadding(st.nextToken(), "LEFT", "0", 4) + 
					  stringPadding(st.nextToken(), "LEFT", "0", 4);
		else
			lstrNum = stringPadding(maskNumber(value), "LEFT", "0", 12);
			
		return lstrNum;
	}
	
	/** �����ڸ� ������ ���ڸ� �迭�� �Ѱ��ش�.
	 * 
	 * @param value ����(�����ڴ� |)
	 * @return �����
	 */
	public static String[] TokenToArray(String value)
	{
		return TokenToArray(value, "|");
	}
	
	/** �����ڸ� ������ ���ڸ� �迭�� �Ѱ��ش�.
	 * 
	 * @param value ����
	 * @param determiter ����
	 * @return �����
	 */
	public static String[] TokenToArray(String value, String determiter)
	{
		StringTokenizer st 	= new StringTokenizer(value, determiter);
		String[] lstrRtn	= new String[st.countTokens()];
		
		for (int i = 0; st.hasMoreTokens(); i++)
			lstrRtn[i] = st.nextToken();
			
		return lstrRtn;
	}

	/** ����(space)�� "&nbsp;"�� ��ȯ�Ѵ�.
	 * 
	 * @param value
	 * @return �����
	 */	
	public static String SpaceToNBSP(String value)
	{
		String lstrTemp		= "";
		
		if (value.length() < 1) return "";
		
		for (int i = 0; i < value.length(); i++)
		{
			if (value.charAt(i) == ' ')
				lstrTemp += "&nbsp;";
			else
				lstrTemp += value.charAt(i);
		}
		
		return lstrTemp;
	}
	
	/** <BR>�±׸� �������� ó���Ѵ�.*/
	public static String BRTagToSpace(String value)
	{
		if (value.length() < 1) return "";
		
		while (value.indexOf("<BR>") != -1)
		{
			if (value.indexOf("<BR>") != -1)
				value = value.substring(0, value.indexOf("<BR>")) + " " + value.substring(value.indexOf("<BR>") + 4);
		}
		
		return value;
	}
	
	/** 
	 * 8�ڸ� �̻��̸� 0000000000 -> 00-00000000
	 * @param value - ���ڿ�
	 * @return "00-00000000" �������� ��ȯ�� ���ڿ�
	 */
	public static String maskOldPvNo(String value)
	{
		if (value == null || value.length() < 8)
			return "";
			
		return value.substring(0, 2) + "-" + value.substring(2);
	}
	
	/** 
	 * 7�ڸ� �̻��̸� 00000000 -> 00-000000
	 * @param value - ���ڿ�
	 * @return "00-000000" �������� ��ȯ�� ���ڿ�
	 */
	public static String maskOldOrgSrlNo(String value)
	{
		if (value == null || value.length() < 7)
			return "";
			
		return value.substring(0, 2) + "-" + value.substring(2);
	}
	
	/**
	 * ����� ��ȣ ����
	 * @param value - ���ڿ�
	 * @return ����� ��ȣ �������� ��ȯ�� ���ڿ�
	 */
	public static String maskBizNo(String value)
	{
		if (value == null || value.length() < 10)
			return "";
			
		return value.substring(0, 3) + "-" + value.substring(3, 5) + "-" + value.substring(5);
	}
	
	/** 
	 * 6�ڸ� �̻��̸� 0000000 -> 00-00000
	 * @param value - ���ڿ�
	 * @return "00-00000" �������� ��ȯ�� ���ڿ�
	 */
	public static String maskResolNo(String value)
	{
		if (value == null || value.length() < 6)
			return "";
			
		return value.substring(0, 2) + "-" + value.substring(2, 6);
	}
	
	/**
	 * ����ũ ���� ("/", "-", ":", ",")
	 * @param value - ���ڿ�
	 * @return ����ũ�� ������ ���ڿ�
	 */
	public static String unMask(String value) {
		String ls_str = "";
		
		if (value == null) return ls_str;
		
		ls_str = value;
		
		ls_str = replace (ls_str, "/", "");
		ls_str = replace (ls_str, "-", "");
		ls_str = replace (ls_str, ":", "");
		ls_str = replace (ls_str, ",", "");
		
		return ls_str;
	}
	
	/**
	 * @param value - ���ڿ�
	 * @return NULL�̰ų� ""�̸� "&nbsp;"�� ġȯ�� ���ڿ�
	 */
	public static String nbsp(String value)
	{
		if (value == null || value.length() < 1 || value.trim() == "")
			return "&nbsp;";
		else
			return value;
	}
	
	/* ���� - > �ѱ۷� ��ȯ */
	final static String Hanja_To_Hangle_Table = 
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "���ŰŰŰŰŰŰŰŰŰŰŰŰŰŰŰŰŰǰǰǰǰǰǰǰǰǰǰǰ�"+
  "�ɰɰɰɰ˰˰˰˰˰˰˰̰̰̰԰԰԰ݰݰݰݰݰݰݰ߰߰߰߰߰�"+
  "�߰߰߰߰߰�������������������������"+
  "�������������������������������"+
  "�������������������������������"+
  "�������������������������������"+
  "�����������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "�����������������������������������������������ññññññ�"+
  "�ǱǱǱǱǱǱǱǱǱȱȱȱȱȱ˱˱˱˱˱˱ͱͱͱͱͱͱԱԱԱ�"+
  "�ԱԱԱԱԱԱԱԱԱԱԱձձձձձձձֱرررررررٱٱٱ�"+
  "�ٱٱٱٱٱٱٱٱٱٱٱ۱ݱݱݱݱݱݱݱݱݱݱݱݱݱݱޱޱޱ�"+
  "�ޱޱޱ���������������������������"+
  "�������������������������������"+
  "�����������������賣������������������������"+
  "������������������������������������������������������������"+
  "���������������������������������������ÿ��⿬��������������"+
  "�������������������������������"+
  "���������������䴩���������������������������ƴɴɴɴɴɴ�"+
  "�������ʹٴٴܴܴܴܴܴܴܴܴܴܴܴܴܴܴܴܴܴܴܴܴ޴޴޴�"+
  "�޴�����������������������������"+
  "���������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "�������������������������εεεεεεεεεεεееееее�"+
  "�������������������������������������������������"+
  "������������������������������������������������������������"+
  "�������þ��������������翩��������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "��������������������������������"+
  "���������������������������������봩��������"+
  "������������������������������������������������������������"+
  "�����������������ƴɴɴɴɴɴ������������������������̸�����"+
  "�������������̸������������������������������������������Ը�"+
  "������������������������������������������������������������"+
  "�������������������������������������������ŸŸŸŸŸŸŸŸ�"+
  "�ŸŸŸŸŸƸƸƸƸƸ͸͸͸͸͸͸��������������"+
  "�������������������������������"+
  "������������������������������������������"+
  "������������������������������������������������������������"+
  "�����������������������������̹̹̹̹̹̹̹̹̹̹̹̹̹̹̹�"+
  "�̹̹̹ιιιιιιιιιιιιιйййڹڹڹڹڹڹڹڹڹڹ�"+
  "�ڹڹڹڹڹڹڹڹݹݹݹݹݹݹݹݹݹݹݹݹݹݹݹݹݹݹݹݹݹ�"+
  "�ݹݹݹ߹߹߹߹߹߹߹߹߹߹߹����������������"+
  "�������������������������������"+
  "��������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "�����������κκκκκκκκκκκκκκκκκκκκκκκκ�"+
  "�κκκκκκκκκκκκκκκκκκϺкккккккккк�"+
  "�ккккккккҺҺҺҺҺغغغغغغ�����������"+
  "�������������������������������"+
  "�����������������������������������"+
  "�������������������������������"+
  "�������������������������������"+
  "�������������������������������"+
  "������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "���������������������������������ҼҼҼҼҼҼҼҼҼҼҼҼҼ�"+
  "�ҼҼҼҼҼҼҼҼҼҼҼҼҼҼҼҼҼҼҼҼҼҼҼӼӼӼӼӼӼ�"+
  "�ӼӼռռռռռռּۼۼۼۼۼۼۼۼ������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "���������������������������������������½½½½½½½½½½�"+
  "�ýýýýýýýýýýýýýýýýýýýýýýýýýýýĽĽ�"+
  "�ĽĽĽĽĽĽĽĽĽĽĽĽŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽŽ�"+
  "�ŽŽŽŽŽŽǽǽǽǽɽɽɽɽɽɽɽɽɽɽʽʽʽ־��ƾƾƾƾ�"+
  "�ƾƾƾƾƾƾƾƾƾƾƾƾƾǾǾǾǾǾǾǾǾǾǾǾǾǾǾȾȾ�"+
  "�ȾȾȾȾȾȾȾ˾˾˾˾ϾϾϾϾϾϾϾϾооооӾӾӾӾӾӾ�"+
  "�־־־־־־־־־־־׾׾׾׾׾׾׾޾޾޾޾߾߾߾߾߾߾߾�"+
  "�߾߾߾���������������������������"+
  "�������������������������������"+
  "������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "���������������������������¿¿¿¿¿¿ÿ˿˿˿˿˿˿˿˿˿�"+
  "�ͿͿͿͿͿͿͿϿϿϿϿϿϿϿϿϿϿϿϿϿϿϿϿϿϿпտտտ�"+
  "�տֿֿֿֿܿܿܿܿܿ��������������������"+
  "�������������������������������"+
  "�������������������������������"+
  "�������������������������������"+
  "���������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "��������������������������������¡¡¡����������������������"+
  "������������������������������������������������������������"+
  "����������������������âââââââââââââââââââ"+
  "âââääääääääääääååååóóóóôôôôôôô"+
  "ôôôôôôôôõõõõõõõõõõõõõõõõõõõööö"+
  "ööööööö÷÷÷÷÷÷÷÷÷÷øøøøøøøøøøûûû"+
  "ûûûûûüüüüüüüüüü������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "����������������������������������ġġġġġġġġġġġġġ"+
  "ġġġġġġġġġġġĢĢĢģĥĥĥħħħħħħħħħĨĪĪ"+
  "��ŸŸŸŸŸŸŸŸŸŸŸŸŸŸŹŹŹŹŹŹŹŹŹŹŹŹŹŹŹ"+
  "ŹźźźźźźźźźźŻŻŽŽŽŽžžž��������������������"+
  "������������������������������������������������������������"+
  "��������������ƯƯƴ����������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������ǥǥǥǥǥǥ"+
  "ǥǥǥǥǥǥǥǥǰǰǳǳǳǳǳ������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "����������������������ȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣ"+
  "ȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȣȤȤȤȥȥȥȥȥ"+
  "ȥȦȦȦȫȫȫȫȫȫȫȫȫȫȭȭȭȭȭȭȭȭȭȭȭȭȭȭȮȮ"+
  "ȮȮȮȮȯȯȯȯȯȯȯȯȯȯȯȯȯȯȯȯȯȰȰȰȰȰȲȲȲȲ"+
  "ȲȲȲȲȲȲȲȲȲȲȲȲȲȲȲȲȲȲȲȲȸȸȸȸȸȸȸȸȸȸ"+
  "ȸȸȸȸȸȸȸȸȸȸȹȹȾȾȾȿȿȿȿȿȿȿȿȿȿȿȿȿ����"+
  "������������������������������������������������������������"+
  "������������������������������������������������������������"+
  "��������������������������������������������������������";

	/*	getHangle	*/
	public static String getHangle(String s1)
	/*++
		��ɼ���:
		�Էµ� ���ڿ��� ���ڰ� ���ԵǾ� �ִٸ�, ���� �װ��� �ѱ۷�
		��ȯ�Ͽ� �ش�.
		
		�Է°�:
			s1	��ȯ�Ͽ����� ���ڿ��� ������.
			s2	��ȯ�� ���ڿ��� ������ �޸��� ������.
			//size	��ȯ�� ���ڿ��� ������ �޸��� ũ��. --> ������
		
		��ȯ��:
		������ '0'�� �����Ѵ�.
		���н�, �ʱ� �Է� �����Ͱ� �������� �ʴ´ٸ� '-9'�� �����Ѵ�
	--*/
	{
		int     i, cp;
		String pHangle = null;
		String result = "";

		if ( s1 == null)
			return null;

		pHangle = Hanja_To_Hangle_Table;
		for ( i = 0; i < s1.length(); i++ )
		{
			byte s1Byte[] = s1.substring(i,i+1).getBytes();

			if  (((( s1Byte[0] & 0xFF) >= 0xCA ) && (( s1Byte[0] & 0xFF) <= 0xFD ))
				&& ((( s1Byte[1] & 0xFF) >= 0xA1 ) && (( s1Byte[1] & 0xFF) <= 0xFE )))
			{
				// ���ڸ� �ѱ����̺��� �����´�.
				cp = ((( s1Byte[0] & 0xFF ) - 202 ) * 94 + (( s1Byte[1] & 0xFF ) - 161 ));
				result += pHangle.charAt(cp);
			}
			else
			{
				// ���ڰ� �ƴϸ� �״�� ����Ѵ�.
				result += s1.charAt(i);
			}
		}
		return result;
	}
	
	public static String tradeString(String oldStr, String trgStr, String newStr) {
		String target = trgStr;
		int index = oldStr.indexOf(target);

		if (index > -1) {
			oldStr = oldStr.substring(0, index) + newStr + oldStr.substring((index + target.length()), oldStr.length());
		}

		return oldStr;
	}

	//=======================================================================
    public static String trim(String str) {
        //-----------------------------------------------------------------------
            if (str == null || str.equals("")) {
                str = "";
            } else {
                str = decode(str);
            }
            return str;
    }

	//=======================================================================
    public static String decode(String str) {
        //-----------------------------------------------------------------------
            if (str != null) {
                str = str.trim();

                //        str = new String(str.getBytes("iso-8859-1"));
            }
        
            return str;
    }
}