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
     * 생성자<BR>
     * @param  none 
     */
   	private CUtil() {}
     
   	
   	      	
  
   	/**
	 * 자릿수를 맞추어 주는 Method
	 *
	 * @param srcString 데이터 문자열
	 * @param padLength 맞추려는 바이트 수
	 * @param padChar   채우려는 문자열 (예 : ' ') - 1byte char만 적용
	 * @param isLeft    오른족에 공백을 집어 넣을려면 true, 왼쪽이면 false
	 *
	 * @author 캬캬마도검사 최초작성.
	 */ 
	public static String pad(String srcString, 
	        				int padLength, 
	        				char padChar, 
	        				boolean isLeft) {
	
		char[] padDefaultArray = new char[padLength];
	
		// Exception이 발생했을 경우 채울려는 바이트 만큼 공백으로 채운 문자열을 반환한다.
		for (int i = 0; i < padDefaultArray.length; i++) { 
			padDefaultArray[i] = padChar;
		}

		if (srcString == null) {
			return new String(padDefaultArray);
		}
		
		byte[] srcByte = srcString.getBytes();
	
		// 원본 문자열이 총 사이즈보다 클 경우 왼쪽부터 총 사이즈 만큼 잘라낸다.
		if (srcByte.length > padLength) {
			try {
				char[] srcChar          = new char[srcString.length()];
				int    compLength 	    = 0;
				StringBuffer retString  = new StringBuffer();
			
				srcString.getChars(0, srcString.length(), srcChar, 0);
			
				for (int i = 0; i < srcChar.length; i++) {
//					boolean bTwoByte = false;
					
					// 2 byte 문자열을 구분한다.				
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
		
		// byte수 만큼 채워 넣기를 한다.
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
	  		    byte[] b_padChar = padString.getBytes(chngChar); //변환할 문자열도 cp933으로 바꾼다.
	  		    if (b_padChar.length != 1) {
	  		      throw new Exception("변환대상문자열 길이 오류:" + padString);
	  		    }

//	  		    char[] padDefaultArray = new char[padLength];
	  		    byte[] rt_value = new byte[padLength];

	  		    byte[] b_rt = null;

	  		    byte b_padByte = b_padChar[0];

	  		    byte[] b_conv = srcString.getBytes(chngChar);		    
//	  		    if(b_conv.length < 1) return b_conv; //값이 없다면.. 걍 return

	  		    if(b_conv.length > 1){  		      
	  		        b_rt = new byte[b_conv.length];
	  		        b_rt = b_conv;  		      
	  		    }else{
	  		        b_rt = new byte[b_conv.length];
	  		        b_rt = b_conv;
	  		    }

	  		    int i_brt_len = rt_value.length - b_rt.length;
	  		    if(isLeft){ // 글자 오른쪽에 왼쪽에 원하는값 데이타..
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
	  		    
	  		    }else{ //글자 왼쪽에. 빈값 오른쪽.
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
	 * 문자열에 원하는 문자(chr)를 특정한 문자열로 바꾸어 준다.<br>
	 * 예) CUtil.changeCharToString("ADC", 'D', "B"); => "ABC"<br>
	 * <br>
	 * <b>!주의</b><br>
	 * 1. 문자열이 null이면 빈문자열로 반환한다.<br>
	 * 
	 * @param buff 	: 기준이 되는 문자열
	 * @param cmp  	: 바꾸고자하는 문자
     * @param che 	: 바꿀 문자열
     * @return 		: 바뀐 문자열
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
	 * 두 문자열을 비교하여 값이 같을 경우 원하는 특정 문자열을 아니라며 원래 비교대상 문자열을 반환한다.<br>
	 * 예) CUtil.decode("ABC", "ABC", "true"); => "true"<br>
	 * <br>
	 * <b>!주의 : </b><br>   
	 * 1. 문자열을 비교할 때 공백을 제거하지 않는다.<br> 
	 *    즉, CUtil.decode("ABC   ", "ABC", "true", "false")의 결과는 "false" 이다.<br>
	 * 2. 비교대상 문자열이 null이면 빈문자열로 변환한 후 비교한다.<br>
	 * 
	 * @param value : 비교대상이 되는 문자열
	 * @param cmp 	: 비교할 문자열
	 * @param mov 	: value와 cmp가 같을 때 반환될 문자열
	 * @return 		: value와 cmp가 같다면 mov값을 아니면 value값을 반환한다.
	 */
    public static String decode(String value, String cmp, String mov)
    {
        return decode(value, cmp, mov, value);
    }

	/**
	 * 두 문자열을 비교하여 결과에 따라 문자열을 반환한다.<br>
	 * 예)CUtil.decode("ABC", "ABC", "true", "false"); => "true"<br>
	 * <br>
	 * <b>!주의 : </b><br>   
	 * 1. 문자열을 비교할 때 공백을 제거하지 않는다.<br> 
	 *    즉, CUtil.decode("ABC   ", "ABC", "true", "false")의 결과는 "false" 이다.<br>
	 * 2. 비교대상 문자열이 null이면 빈문자열로 변환한 후 비교한다.<br>
	 * 
	 * @param value : 비교대상이 되는 문자열
	 * @param cmp 	: 비교할 문자열
	 * @param mov 	: value와 cmp가 같을 때 반환될 문자열
	 * @param nt 	: value와 cmp가 같지않을 때 반환할 문자열
	 * @return 		: value와 cmp가 같다면 mov값을 아니면 nt값을 반환한다.
	 */
    public static String decode(String value, String cmp, String mov, String nt)
    {
        value = nvl(value, "");
        
        if (value.equals(cmp) == true)
            return mov;
            
        return nt;
    }
    
    /**
     * 문자열을 null검사를 하여 만약 null일 경우 빈문자열을 반환한다.<br>
     * 예) String str1 = null; <br>
     *     CUtil.nvl(str1); => ""<br>
     *     
     * @param value	: 검사할 문자열
     * @return 		: value가 null이면 빈문자열을 반환하고 아니면 value값을 반환한다.
     */
    public static String nvl(String value)
    {
    	return nvl(value, "");
    } 
    
    /**
     * 문자열을 null검사를 하여 만약 null일 경우 원하는 문자열을 반환한다.<br>
     * 예) String str1 = null; <br>
     *     CUtil.nvl(str1, "Y"); => "Y"<br>
     *     
     * @param value	: 검사할 문자열
     * @param mov	: null일 경우 반환할 문자열
     * @return 		: value가 null이면 mov로 반환하고 아니면 value값을 반환한다.
     */
    public static String nvl(String value, String mov)
    {
        if (value == null)
            return mov;
            
        return value;
    }
    
	/**
     * 문자열을 null 또는 빈문자열 검사를 하여 만약 null이거나 빈문자열일 경우 원하는 문자열을 반환한다.<br>
     * 예) String str1 = ""; <br>
     *     CUtil.nvlNequal("", "Y"); => "Y"<br>
     *     
     * @param value	: 검사할 문자열
     * @param mov	: null 또는 빈문자열일 경우 반환할 문자열
     * @return 		: value가 null 또는 빈문자열이면 mov로 반환하고 아니면 value값을 반환한다.
     */
    public static String nvlNequal(String value, String mov)
	{
		if (value == null || value.equals(""))
            return mov;
            
        return value;
    }
    
    /**
	 * 문자열을 날짜형식으로 변환한다.<br>
	 * 예) CUtil.getDisplayDate("20080825"); => "2008-08-25"<br>
	 * <br>
	 * <b>!주의</b><br>
	 * 1. 날짜 문자열이 null이면 빈문자열로 반환한다.<br>
	 * 2. 날짜 문자열이 8자리 미만이면 오른쪽에 0을 채워서 변환해준다. (CUtil.getDisplayDate("2008"); => "2008-00-00")<br>
	 *    반대로 8자리 이상이면 8자리까지 절삭하여 반환한다. (CUtil.getDisplayDate("20080825123"); => "2008-08-25")<br>
	 * 3. 문자열이 숫자인지는 검사를 하지 않는다. (CUtil.getDisplayDate("ABCDEFGH"); => "ABCD-EF-GH")<br>
	 * 4. 날짜형식으로 변환된 값이 다시 들어올 경우 마스크를 제거한 후 다시 변환해 준다. (CUtil.getDisplayDate("2008/08/25"); => "2008-08-25")<br>
	 *                                                                 
	 * @param date	: Date의 "YYYYMMDD" 문자열
     * @return 		: 날짜형식(YYYY-MM-DD)으로 변환된 문자열
	 */
    public static String getDisplayDate(String date)
    {   
        return getDisplayDate(date, "-");
    }
    
    /**
	 * 문자열을 날짜형식으로 변환한다.<br>
	 * 예) CUtil.getDisplayDate("20080825"); => "2008/08/25"<br>
	 * <br>
	 * <b>!주의</b><br>
	 * 1. 날짜 문자열이 null이면 빈문자열로 반환한다.<br>
	 * 2. 날짜 문자열이 8자리 미만이면 오른쪽에 0을 채워서 변환해준다. (CUtil.getDisplayDate2("2008"); => "2008/00/00")<br>
	 *    반대로 8자리 이상이면 8자리까지 절삭하여 반환한다. (CUtil.getDisplayDate2("20080825123"); => "2008/08/25")<br>
	 * 3. 문자열이 숫자인지는 검사를 하지 않는다. (CUtil.getDisplayDate2("ABCDEFGH"); => "ABCD/EF/GH")<br>
	 * 4. 날짜형식으로 변환된 값이 다시 들어올 경우 마스크를 제거한 후 다시 변환해 준다. (CUtil.getDisplayDate2("2008-08-25"); => "2008/08/25")<br>
	 *                                                                 
	 * @param date	: Date의 "YYYYMMDD" 문자열
     * @return 		: 날짜형식(YYYY/MM/DD)으로 변환된 문자열
	 */
    public static String getDisplayDate2(String date)
    {
    	// XXX : method명 바꿀까?
    	return getDisplayDate(date, "/");
    }
     
    /**
	 * 문자열을 원하는 날짜형식으로 변환한다.<br>
	 * 예) CUtil.getDisplayDate("20080825", "-"); => "2008-08-25"<br>
	 * <br>
	 * <b>!주의</b><br>
	 * 1. 날짜 문자열이 null이면 빈문자열로 반환한다.<br>
	 * 2. mask가 null이면 빈문자열로 바꿔서 넣어주기 때문에 변환하여도 입력한 그대로 반환된다.<br>
	 * 3. 날짜 문자열이 8자리 미만이면 오른쪽에 0을 채워서 변환해준다. (CUtil.getDisplayDate("2008", "-"); => "2008-00-00")<br>
	 *    반대로 8자리 이상이면 8자리까지 절삭하여 반환한다. (CUtil.getDisplayDate("20080825123", "-"); => "2008-08-25")<br>
	 * 4. 문자열이 숫자인지는 검사를 하지 않는다. (CUtil.getDisplayDate("ABCDEFGH", "-"); => "ABCD-EF-GH")<br>
	 * 5. 날짜형식으로 변환된 값이 다시 들어올 경우 마스크를 제거한 후 다시 변환해 준다. (CUtil.getDisplayDate("2008-08-25", "/"); => "2008/08/25")<br>
	 *                                                                 
	 * @param date	: Date의 "YYYYMMDD" 문자열
	 * @param mask  : Mask 문자열
     * @return 		: 날짜형식으로 변환된 문자열
	 */
    public static String getDisplayDate(String date, String mask)
    {
    	// XXX : 문자열을 숫자로만 되어 있는지 체크해야 할까?
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
//        	FIXME => 로그 남기는 방식으로 변경필요
        	System.out.println("CUtil.getDisplayDate("+date+", "+mask+").Exception  ==> " + e.getMessage());
            return date;
        }
        
        return str;
    }

    /**
     * 문자열을 시간형식으로 변환한다. 마스크를 설정한다. 6자리이하는 6자리로 변경후 변화  "120000" -> "12:00:00"<br>
	 * 예) CUtil.getDisplayTime("122710"); => "12:27:10"<br>
	 * <br>
	 * <b>!주의</b><br>
	 * 1. 시간 문자열이 null이면 빈문자열로 반환한다.<br>
	 * 2. 시간 문자열이 6자리 미만이면 오른쪽에 0을 채워서 변환해준다. (CUtil.getDisplayTime("1227"); => "12:27:00")<br>
	 *    반대로 6자리 이상이면 6자리까지 절삭하여 반환한다. (CUtil.getDisplayTime("122710123"); => "12:27:10")<br>
	 * 3. 문자열이 숫자인지는 검사를 하지 않는다. (CUtil.getDisplayTime("ABCDEF"); => "AB:CD:EF")<br>
	 * 4. 시간형식으로 변환된 값이 다시 들어올 경우 마스크를 제거한 후 다시 변환해 준다. (CUtil.getDisplayTime("12:27:10"); => "12:27:10")<br>
	 *                 
     * @param time  : Time의 "HH24MISS" 문자열
     * @return 		: 시간형식으로 변환된 문자열
     */
    public static String getDisplayTime(String time)
    {
//    	 XXX : 문자열을 숫자로만 되어 있는지 체크해야 할까?
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
//        	FIXME => 로그 남기는 방식으로 변경필요
        	System.out.println("CUtil.getDisplayTime("+time+").Exception  ==> " + e.getMessage());
    		return time;
    	}
    	
    	return str;
    }
    
    /**
     * 문자열을 날짜시간형식으로 변환한다.<br>
	 * 예) CUtil.getDisplayLongDate("20080825122710"); => "2008-08-25 12:27:10"<br>
	 * <br>
	 * <b>!주의</b><br>
	 * 1. 날짜문자열이 null이면 빈문자열로 반환한다.<br>
	 * 2. mask가 null이면 빈문자열로 바꿔서 넣어주기 때문에 날짜는 변환하여도 입력한 그대로 반환된다. 하지만 시간은 자동으로 :이 붙는다.<br>
	 * 3. 날짜 문자열이 14자리 미만이면 오른쪽에 0을 채워서 변환해준다. (CUtil.getDisplayLongDate("20080825", "-"); => "2008-08-25 00:00:00")<br>
	 *    반대로 14자리 이상이면 14자리까지 절삭하여 반환한다. (CUtil.getDisplayLongDate("20080825122710123", "-"); => "2008-08-25 12:27:10")<br>
	 * 4. 문자열이 숫자인지는 검사를 하지 않는다. (CUtil.getDisplayLongDate("ABCDEFGHIJKLMN"); => "ABCD-EF-GH IJ:KL:MN")<br>
	 * 5. 날짜형식으로 변환된 값이 다시 들어올 경우 마스크를 제거한 후 다시 변환해 준다. (CUtil.getDisplayLongDate("2008/08/25 12:27:10", "-"); => "2008-08-25 12:27:10")<br>
	 * 
     * @param datetm : Date의 "YYYYMMDD HH24MISS" 문자열
     * @param mask   : Mask 문자열
     * @return		 : 날짜시간형식으로 변환된 문자열
	 */
	public static String getDisplayLongDate(String datetm, String mask)
    {
//    	XXX : 문자열을 숫자로만 되어 있는지 체크해야 할까?
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
	 * 문자열을 한국시 날짜시간형식으로 변환한다.<br>
	 * 예) CUtil.getDisplayDateString("20080825122710"); => "2008년08월25일 12시27분10초"<br>
	 * <br>
	 * <b>!주의</b><br>
	 * 1. 날짜문자열이 null이면 빈문자열로 반환한다.<br>
	 * 2. 날짜 문자열이 14자리 미만이면 오른쪽에 0을 채워서 변환해준다. (CUtil.getDisplayDateString("20080825"); => "2008년08월25일 00시00분00초")<br>
	 *    반대로 14자리 이상이면 14자리까지 절삭하여 반환한다. (CUtil.getDisplayDateString("20080825122710123", "-"); => "2008년08월25일 12시27분10초")<br>
	 * 3. 문자열이 숫자인지는 검사를 하지 않는다. (CUtil.getDisplayDateString("ABCDEFGHIJKLMN"); => "ABCD년EF월GH일 IJ시KL문MN초")<br>
	 * 4. 날짜형식으로 변환된 값이 다시 들어올 경우 마스크를 제거한 후 다시 변환해 준다. (CUtil.getDisplayDateString("2008/08/25 12:27:10"); => "2008년08월25일 12시27분10초")<br>
	 *                                                                 
	 * @param datetm: Date의 "YYYYMMDD HH24MISS" 문자열
     * @return 		: 한국식 날짜시간형식으로 변환된 문자열
	 */
    public static String getDisplayDateString(String datetm)
    {
//    	XXX : 시간형식을 여러가지로 선택할 수 있도록 수정필요
//    	TODO : 문자열을 숫자로만 되어 있는지 체크해야 할까? CUtil.getDisplayDateString("2008년08월25일 12시27분10초"); 문제있음
        String str = "";
        
        if (datetm == null || datetm.equals(""))	return "";
        
        try
        {
        	datetm = unMask(datetm).replaceAll(" ", "");
        	
        	// FIXME : 이럴 경우 
        	if (datetm.length() < 14)
           		datetm = stringPadding(datetm, "RIGHT", "0", 14);
           	
            str = datetm.substring(0, 4) + "년" + datetm.substring(4, 6) + "월" + datetm.substring(6, 8) + "일 " + datetm.substring(8, 10) + "시" + datetm.substring(10, 12) + "분" + datetm.substring(12, 14) + "초";
        }
        catch(Exception e)
        {
//        	FIXME => 로그 남기는 방식으로 변경필요
        	System.out.println("CUtil.getDisplayDateString("+datetm+").Exception  ==> " + e.getMessage());
            return datetm;
        }
        
        return str;
    }
	
    // FIXME : 여기까지
    /**
	 * 날짜마스크를 해제한다. "2000-10-20" -> "20001020"                                                                
	 * @param date	: "YYYY-MM-DD"문자열
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
	 * 주민번호마스크를 해제한다. "######-#######" -> "#############"                                                                
	 * @param val	: "######-#######"문자열
	 * @return 		: String, "#############"(주민번호)
	 */
    public static String getRealJumin(String val)
    {
        return replace(val, "-", "");
    }

	 /**
	 * 주민번호마스크를 설정한다. "#############" -> "######-#######"                                                                
	 * @param val	: "#############"문자열
	 * @return 		: String, "######-#######"(주민번호)
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
	 * 주민번호를 두개로 나눈다. 나눈 값을 스트링배열로 넘긴다.
	 * @param val 	: 주민번호데이터
	 * @param flag 	: String[], true: 하이폰이 있는 경우 14자리, false: 하이폰이 없는 경우 13자리
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
	 * 시간을 두개로 나눈다. 나눈 값을 스트링배열로 넘긴다.
	 * @param val 	: 시간데이타
	 * @param flag 	: String[], true: 세미콜론이 있는 경우 5자리, false: 세미콜론이 없는 경우 4자리
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
	 * 우편번호마스크를 설정한다. "030442" -> "030-442"
	 * @param post	: "999999"
	 * @return 		: String, "999-999"으로 반환한다.
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
	 * 우편번호마스크를 해제한다. "030-442" -> "030442"
	 * @param post	: "999-999"
	 * @return 		: String, "999999"으로 반환한다.
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
	 * 문자열 내의 특정 문자를 다른 문자열로 바꾼다.
	 * @param src		문자열
	 * @param oldstr	특정문자
	 * @param newstr	바꿀문자
	 * @return 			결과값, 
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
     * 금액문자열을 금액표시타입으로 변환한다.<BR>
     * (예) 12345678 --> 12,345,678<BR>
     * @param moneyString	: 금액문자열     
     * @param delimeter 	: 금액표시구분자
     * @return   			: String, 변경된 금액 문자열
     */
    public static String makeMoneyType(String moneyString, String delimeter)
    {
    	// 좌측의 "0" 제거
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
     * 금액문자열을 금액표시타입으로 변환한다.<BR>
     * (예) 12345678 --> 12,345,678<BR>
     * @param moneyString	: 금액문자열     
     * @param delimeter 	: 금액표시구분자
     * @return   			: String, 변경된 금액 문자열, 없는값일시 리턴을 공백으로.
     */
    public static String makeMoneyType2(String moneyString, String delimeter)
    {
    	// 좌측의 "0" 제거
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
     * 금액문자열을 금액표시타입으로 변환한다.<BR>
     * (예) 12345678 --> 12,345,678<BR>
     * @param intMoneyString	: 금액문자열        
     * @param delimeter  	 	: 금액표시구분자
     * @return   				: String, 변경된 금액 문자열    
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
     * 금액표시타입을 금액문자열로 변환한다.<BR>
     * (예) 12,345,678 --> 12345678<BR>
     * @param moneyString 	: 금액표시문자열
     * @param delimeter   	: 금액표시구분자
     * @return   			: String, 금액문자열
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
     * query string을 parsing한다.<BR>
     * @param queryString	: queryString
     * @param indexParam  	: parsing하고자 하는 인덱스문자열
     * @return   			: String, 인덱스문자열에 의해 parsing된 value값
     */
    public static String parseQueryString(String queryString, String indexParam)
    {
		int start;
		int howLong;
	
		queryString += "&";							// 끝표시 추가
		indexParam += "=";			    			// '='추가		
		start = queryString.indexOf(indexParam, 0); // 원하는 indexParam의 value 첫 위치를 알아낸다.
		
		if (start == -1) 
			return "";
			
		start += indexParam.length();
		howLong = queryString.indexOf("&", start); 	// value의 길이를 알아낸다.
		
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
     * post string을 parsing한다.<BR>
     * @param queryString 	: PostString
     * @param indexParam  	: parsing하고자 하는 인덱스문자열
     * @return   			: String, 인덱스문자열에 의해 parsing된 value값
     */
	public static String parsePostString(String queryString, String indexParam)
	{
		int start;
		int howLong;

		queryString += "&"; 						// 끝표시 추가
		indexParam += "=";							// '='추가
		start = queryString.indexOf(indexParam, 0); // 원하는 indexParam의 value 첫 위치를 알아낸다.
		
		if (start == -1)
			return "";
			
		start += indexParam.length();
		howLong = queryString.indexOf("&", start ); // value의 길이를 알아낸다.
		
		if (howLong < (start + 1))
			return "";								// last value==NULL
			
		return queryString.substring(start, howLong);	// value를 알아낸다.
	}
	
    /**
     * String을 int값으로 변환한다.<BR>
     * @param str	: int값으로 변환될 String문자열
     * @return   	: int, 변환된 int 값
     */
    public static int StringToInt(String str)
    {
        if (str == null ) 
        	return 0;        
        	
        return (Integer.valueOf(str).intValue());
    }
	
    /**
     * int값을 String으로 변환한다.<BR>
     * @param i		: String으로 변환될 int값
     * @return   	: String, 변환된 String 값
     */
    public static String IntToString(int i)
    {
        return (new Integer(i).toString());
    }

    /**
	 * KSC5601 -> EUC-KR 문자열로 변환
	 * @param KscStr	: KscStr
	 * @return			: String, EUC-KR로 변환된 String
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
 	 * 8859_1 ---> KSC5601 문자열로 변환
	 * @param UnicodeStr 	: UnicodeStr
	 * @return				: String, KSC5601로 변환된 String
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
 	 * KSC5601 ---> 8859_1 문자열로 변환
	 * @param UnicodeStr 	: UnicodeStr
	 * @return				: String, 8859_1 변환된 String
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
     * 문자열에 "가 있으면 \을 넣어준다.
     * 예) CUtil.convertComma("A\"B\"C"); => A\\\"B\\\"C java 문법적으로 이렇게 변환되지만
     *     실제는 A"B"C => A\"B\"C 이렇게 변환된다고 생각하면 된다.
     * 
     * <b>!주의</b>
	 * 1. 문자열이 null이면 빈문자열로 반환한다.
	 *      
     * @param value	: 문자열
     * @return 		: 변환된 문자열
     */
    public static String convertComma(String value)
    {
    	// TODO : 사실 comma가 아닌데.. 명칭변경을 고려.
    	return changeCharToString(value, '"', "\\\"");
    }
    
    /**
 	 * <pre> 
	 * 문자열을 받아서 단일 따옴표로 감싸 반환한다.
	 * - SQL문을 생성시 사용키 위함.
	 * </pre>
	 * @param str	: 문자열
	 * @return		: String, 단일 따옴표로 감싸서 반환한다. 'String'			
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
	 * 문자열을 받아서 Enter Key를 특정문자열(`)로 변환하거나
	 * 특정문자열을 Enter key로 변환함
	 * - Informix thin driver Bug 때문에 SQL문을 생성시 사용키 위함.
	 * </pre>
	 * @param str	: 변환 대상
	 * @param nFlag	: 변환 방향
	 * @return		: String, Enter Key => (`), (`) => Enter Key로 변환
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
			if (nFlag > 0)	// 양수이면 Enter Key를 `로 변환
	    	{	    		
	    		str = str.replace('\r', '`');
	    		str = str.replace('\n', '`');
	    		
	    		return str;
	    	}
	    	else			// 음수이면 `를 Enter Key로 변환
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
	 * 문자열을 받아서 Enter Key를 특정문자열(<BR>)로 변환하거나
	 * 특정문자열을 Enter key로 변환함
	 * - Informix thin driver Bug 때문에 SQL문을 생성시 사용키 위함.
	 * </pre>
	 * @param str	: 변환 대상
	 * @param nFlag	: 변환 방향
	 * @return		: String, Enter Key => (<BR>), (<BR>) => Enter Key로 변환
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
			if (nFlag > 0)	// 양수이면 Enter Key를 `<BR>`로 변환
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
	    	else			// 음수이면 <BR>를 Enter Key로 변환
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
	 * 문자열을 받아서 Enter Key를 유닉스용 Enter로 변환
	 * </pre>
	 * @param str	: 변환 대상
	 * @return		: String, Enter Key => 유닉스용 Enter로 변환
	 *				  우선 임시로 사용합니다... 나중에 필요하시면 수정해서 사용하세요!
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
	 * 문자열을 받아서 Enter Key를 TextArea Enter로 변환
	 * </pre>
	 * @param str	: 변환 대상
	 * @return		: String, Enter Key => TextArea Enter로 변환
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
	 * 스트링의 내용을 파일에 쓰기 위한것
	 * </pre>
	 * @param fileContent 	: 파일에 쓰기위한 내용
	 * @param filePath		: 파일의 절대 path
	 * @return				: boolean, 파일의 내용	
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
	 * 스트링의 내용을 파일에 쓰기 위한것
	 * </pre>
	 * @param fileContent	: 파일에 쓰기위한 내용
	 * @param filePath		: 파일의 절대 path
	 * @return				: boolean, 성공여부
	 */
	public static synchronized boolean writeFileAppend(String fileContent, String filePath)
	{
		boolean bResult = false;
        PrintWriter out = null; 		

		try 
		{
	        // create instance of File 
	        File openFile = new File(filePath);
	        
	        // 현재, 파일이 존재하면 append mode, autoflush로 PrintWriter를 생성
	        if (openFile.exists())
	        {
	            out = new PrintWriter(new FileOutputStream(openFile.getAbsolutePath(), true), true);
	        }
	        // 존재하지 않으면, 새로운 파일 생성
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
     * 문자열의 NULL CHECK 및 int형 default값 0셋팅.     
     * @param flag		: 0 이면 문자형 비교하여 기본 공백을 넣는다.
     * 					: 1 이면 숫자형 비교하여 기본 0을 넣는다.
     * @param strData	: 검색할 문자열
	 * @return 			: String, 
	 */
	public static String insertCheck(int flag, String strData)
	{
		if (strData != null) 
			strData = strData.trim();

		if (flag == 0) 			// 문자형
		{
			if (strData == null)
			{
				strData = " "; 	// 저장시 기본 공백을 넣는다.
			}
			else if (strData.equals(""))
			{
				strData = " "; 	// 저장시 기본 공백을 넣는다.
			}
		}
		else if (flag == 1) 	// 숫자형
		{
			if (strData == null)
			{
				strData = "0"; 	// 저장시 기본 0을 넣는다.
			}
			else if (strData.equals(""))
			{
				strData = "0"; 	// 저장시 기본 0을 넣는다.
			}
		}
		
		return strData;
	}

	/**
	 * 길이를 바이트 단위로 계산하여 문자열을 자른다. 한글 일 경우 반바이트는 절삭한다.
	 * 절삭된 문자열이라면 뒤에 "..."이 붙는다.
	 * @param str 		: 문자열
	 * @param length	: 절삭할 길이
	 * 
	 *<font color="#0000ff">
	 *<pre>
	 *String temp = CUtil.substring("절삭할 문자열입니다.", 10);
	 *System.out.println("temp ==>" + temp);
	 *temp = CUtil.substring("절삭할", 8);
	 *System.out.println("temp ==>" + temp);
	 *출력결과:
	 *temp ==>절삭할 문...
	 *temp ==>절삭할
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
			// 1바이트 문자라면(영문)
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
	 * 문자열의 바이트갯수를 구한다.	 
	 */
    public static int getByteLength(String strText)
    {
        byte[] byteArray = strText.getBytes();
        return byteArray.length;
    }
    
    /**
	 * 문자열의 바이트갯수만큼의 문자열을 구한다.
	 */
    public static String getByteLengthString(String str, int byteLength)
    {
    	if (getByteLength(str) > byteLength)
    		return getByteLengthString(str.substring(0, str.length()-1), byteLength);
    		
    	return str;
    }
	
	/**
	 * 페이지 단위로 나누기 위해서 전체갯수와 나눌갯수를 가지고 페이지수를 구한다.
	 * @param nRowCount	: 전체갯수
	 * @param nStep		: 한페이지 갯수
	 * @return 			: int, 한페이지 갯수로 계산한 총 페이지 갯수
	 *<font color="#0000ff">
	 *<pre>
	 *int nTotalRow = 100;  // 나눌 전체 갯수.
	 *int nPageRow  = 10;   // 한페이지의 갯수.
	 *int nPageCount;
	 *nPageCount = CUtil.getPageNum(nTotalRow, nPageRow);
	 *System.out.println("페이지 갯수: "+ nPageCount);
	 *출력결과:
	 *페이지 갯수: 10
	 *</pre>
	 *</font>
	 */
	public static int getPageNum(int nRowCount, int nStep)
	{
        int nPages;
        
        if (nRowCount < 1) 
        	return 0;
        
        nPages = nRowCount / nStep;
        
        if (((nPages * nStep) - nRowCount) != 0)         // 몫이 있으면 한 페이지가 더 있음
            nPages++;
            
        return (nPages < 1)? 1 : nPages;
	}

	/**
	 * 파일명의 확장자를 구분하여 그 image명으로 반환한다.	
	 *<pre>
	 *zip,rar,ace,arj.jar ==> zip.gif
	 *exe ==> exe.gif
	 *txt,doc,hwp,pdf,ppt ==> text.gif
	 *나머지는 ==> file.gif
	 *확장자가 없을 경우 ==> gul.gif
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
	
    /**사용안함*/
	public static String fromDB(String s)
	{
		return s;
	}
	
    /**사용안함*/
	public static String toDB(String s)
	{
		return s;
	}
	
	/**
	* 해당 문자열의 소수점을 digit 단위로 반올림 처리<br>
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
	* 해당 숫자(더블형)의 소수점을 digit 단위로 반올림 처리<br>
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
	* 소수점 digits의 수만큼 0으로 설정<br>
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
	
	/**사용자 정의 숫자 포맷 설정 *
	 * 
	 * @param pattern 변경 포맷
	 * @param value 값
	 * @return 결과값
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

	/** 현재 날짜 반환 *
	 * 
	 * @param format 포맷 형식시정
	 * @return 결과값
	 */
	public static String getCurrDate(String format) 
	{
		SimpleDateFormat simpledf = new SimpleDateFormat(format);
		return simpledf.format(CDateUtil.getDate());
	}
	
	/**
	 * ex) 2달 전 날짜 getMyDate(-2, "yyyy/MM/dd");
	 *     3달 후 날짜 getMyDate(3, "yyyy/MM/dd");
	 * @param term 변경할 기간
	 * @param format 형식
	 * @return term 만큼의 달이 지난 Formatted String date
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
	 * @param value 자를 문자열
	 * @param delimit 구분자
	 * @return 결과값
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
	* @param LINE_PER_PAGE  // 몇라인씩 보여줄 것인가?                         
	* @param totalRowCount  // 총 몇라인인가? Navigation하고자하는 Tatal Row...
	* @param pageGroup      // 현 페이지의 시작 그룹 번호                      
	* @param curPage        // 현 페이지의 시작번호                            
	*/
	public static String navigate(int LINE_PER_PAGE, int totalRowCount, int pageGroup, int curPage, String prevImgUrl, String nextImgUrl)
	{
		StringBuffer navigation = new StringBuffer();
		
		int nextPage = 0;				// 다음 페이지 - 라인 
		int prevPage = 0;				// 이전 페이지 - 라인 
		int totalPage = 0; 				// 총 페이지 수
		int curPageGroup = 0; 			// 현재 페이지 그룹
		int nextPageGroup = 0;			// 다음 페이지 그룹
		int prevPageGroup = 0;			// 이전 페이지 그룹
		int totalPageGroup = 0;			// 총페이지 그룹 수
		//int endPage = 0;	            // 마지막 라인까지만 출력을 위한 값
		int startPage = 0;				// 화면에 인쇄할 페이지의 시작점 - 라인
		int endPageGroup = 0; 			// 마지막 그룹까지만 출력을 위한 값
		
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
			if ("◀".equals(prevImgUrl) || "".equals(prevImgUrl) || prevImgUrl==null) 
				navigation.append("◀");
			else 
				navigation.append("<img src=\""+ prevImgUrl + "\" width=\"56\" height=\"19\">");
				
			navigation.append("</td>");
		} 
		else 
		{
			if ("◀".equals(prevImgUrl) || "".equals(prevImgUrl) || prevImgUrl==null) 
				navigation.append("<a href=\"javascript:navigator(\'" +prevPage+ "\', \'" +prevPageGroup+ "\');\">◀</a>");
			else 
				navigation.append("<a href=\"javascript:navigator(\'" +prevPage+ "\', \'" +prevPageGroup+ "\');\"><img src=\""+ prevImgUrl + "\" width=\"56\" height=\"19\"></a>");
		}		
							
		navigation.append("</td>");
		
		startPage = (curPageGroup-1)*10;
		
		if (startPage+10 < totalPage)	
			endPageGroup = startPage+10;   // 다음 페이지 그룹이 존재할 때 해당 페이지에 10개의 페이지를 보여주고
		else	
			endPageGroup = totalPage;      // 그렇지 않을 경우 총 페이지수에 해당하는 페이지만을 보여준다.
		
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
			if ("▶".equals(nextImgUrl)  || "".equals(nextImgUrl) || nextImgUrl==null ) 
				navigation.append("▶");
			else
				navigation.append("<img src=\""+ nextImgUrl + "\" width=\"56\" height=\"19\">");
		} 
		else 
		{
			if ("▶".equals(nextImgUrl)  || "".equals(nextImgUrl) || nextImgUrl==null ) 
				navigation.append("<a href=\"javascript:navigator(\'" +nextPage+ "\', \'" +nextPageGroup+ "\');\">▶</a>&nbsp;");
			else
				navigation.append("<a href=\"javascript:navigator(\'" +nextPage+ "\', \'" +nextPageGroup+ "\');\"><img src=\""+ nextImgUrl + "\" width=\"56\" height=\"19\"></a>&nbsp;");
		}
		
		navigation.append("</td>");
		
		return navigation.toString();
	}

	
	/** Enumeration.갯수 *
	 * 
	 * @param enum1 Enumeration값
	 * @return 갯수
	 */
	public int getEnumCount(java.util.Enumeration enum1) {
		int i = 0;
		
		while (enum1.hasMoreElements()) {
			enum1.nextElement();
			i++;
		}
		
		return i;
	}
	
	/** 왼쪽에 있는 0(zero)값 제거 *
	 *  valuer값 없을 경우 ""반환
	 * @param value 제거할 값
	 * @return 결과값
	 */
	public static String removeLZero(String value)
	{
		return removeLZero(value, "");
	}
	
	/** 왼쪽에 있는 0(zero)값 제거 *
	 * @param value 제거할 값
	 * @param def value값이 없을 경우 def값 반환
	 * @return 결과값
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
	
	/** 지정한 문자를 지정한 방향으로 지정한 크기만큼 채워 넣는다.
	 * 
	 * @param value 문자
	 * @param direct 방향(LEFT, RIGHT)
	 * @param padchar 채울문자
	 * @param padlen 채울크기
	 * @return 결과값
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
	
	/** Number 만 빼오기
	 * 
	 * @param value
	 * @return 결과값
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
	
	/** 전화번호를 조흥은행 포맷으로 변경한다.
	 * 
	 * @param value 전화번호
	 * @return 결과값
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
	
	/** 구분자를 포함한 문자를 배열로 넘겨준다.
	 * 
	 * @param value 문자(구분자는 |)
	 * @return 결과값
	 */
	public static String[] TokenToArray(String value)
	{
		return TokenToArray(value, "|");
	}
	
	/** 구분자를 포함한 문자를 배열로 넘겨준다.
	 * 
	 * @param value 문자
	 * @param determiter 구분
	 * @return 결과값
	 */
	public static String[] TokenToArray(String value, String determiter)
	{
		StringTokenizer st 	= new StringTokenizer(value, determiter);
		String[] lstrRtn	= new String[st.countTokens()];
		
		for (int i = 0; st.hasMoreTokens(); i++)
			lstrRtn[i] = st.nextToken();
			
		return lstrRtn;
	}

	/** 공백(space)를 "&nbsp;"로 변환한다.
	 * 
	 * @param value
	 * @return 결과값
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
	
	/** <BR>태그를 공백으로 처리한다.*/
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
	 * 8자리 이상이면 0000000000 -> 00-00000000
	 * @param value - 문자열
	 * @return "00-00000000" 형식으로 변환한 문자열
	 */
	public static String maskOldPvNo(String value)
	{
		if (value == null || value.length() < 8)
			return "";
			
		return value.substring(0, 2) + "-" + value.substring(2);
	}
	
	/** 
	 * 7자리 이상이면 00000000 -> 00-000000
	 * @param value - 문자열
	 * @return "00-000000" 형식으로 변환한 문자열
	 */
	public static String maskOldOrgSrlNo(String value)
	{
		if (value == null || value.length() < 7)
			return "";
			
		return value.substring(0, 2) + "-" + value.substring(2);
	}
	
	/**
	 * 사업자 번호 포맷
	 * @param value - 문자열
	 * @return 사업자 번호 포맷으로 변환한 문자열
	 */
	public static String maskBizNo(String value)
	{
		if (value == null || value.length() < 10)
			return "";
			
		return value.substring(0, 3) + "-" + value.substring(3, 5) + "-" + value.substring(5);
	}
	
	/** 
	 * 6자리 이상이면 0000000 -> 00-00000
	 * @param value - 문자열
	 * @return "00-00000" 형식으로 변환한 문자열
	 */
	public static String maskResolNo(String value)
	{
		if (value == null || value.length() < 6)
			return "";
			
		return value.substring(0, 2) + "-" + value.substring(2, 6);
	}
	
	/**
	 * 마스크 제거 ("/", "-", ":", ",")
	 * @param value - 문자열
	 * @return 마스크를 제거한 문자열
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
	 * @param value - 문자열
	 * @return NULL이거나 ""이면 "&nbsp;"로 치환된 문자열
	 */
	public static String nbsp(String value)
	{
		if (value == null || value.length() < 1 || value.trim() == "")
			return "&nbsp;";
		else
			return value;
	}
	
	/* 한자 - > 한글로 변환 */
	final static String Hanja_To_Hangle_Table = 
  "가가가가가가가가가가가가가가가가가가가가가가가가가가가가가각"+
  "각각각각각각각각각각간간간간간간간간간간간간간간간간간간간간"+
  "간간간간갈갈갈갈갈갈갈갈갈갈감감감감감감감감감감감감감감감감"+
  "감감감감갑갑갑갑갑갑강강강강강강강강강강강강강강강강강강강강"+
  "강강강강개개개개개개개개개개개개개개개개개개개개객객갱갱갱갱"+
  "갹거거거거거거거거거거거거거거거거거건건건건건건건건건건건건"+
  "걸걸걸걸검검검검검검검겁겁겁게게게격격격격격격격견견견견견견"+
  "견견견견견결결결결결결겸겸겸겸겸겸경경경경경경경경경경경경경"+
  "경경경경경경경경경경경경경경경경경경경경경경경경경경경경경경"+
  "경경계계계계계계계계계계계계계계계계계계계계계계계계고고고고"+
  "고고고고고고고고고고고고고고고고고고고고고고고고고고고고고고"+
  "고고고고고곡곡곡곡곡곡곡곤곤곤곤곤곤곤곤곤곤골골골공공공공공"+
  "공공공공공공공공공공공곶과과과과과과과과과과과과곽곽곽곽관관"+
  "관관관관관관관관관관관관관관관괄괄괄괄광광광광광광광광광광광"+
  "광광괘괘괘괴괴괴괴괴괴괴괴괴굉굉굉굉교교교교교교교교교교교교"+
  "교교교교교교교교교교교교교구구구구구구구구구구구구구구구구구"+
  "구구구구구구구구구구구구구구구구구구구구구구구구구구구구구구"+
  "구구구구구구구국국국국국국군군군군군군굴굴굴굴궁궁궁궁궁궁권"+
  "권권권권권권권권권궐궐궐궐궐궤궤궤궤궤궤귀귀귀귀귀귀규규규규"+
  "규규규규규규규규규규규균균균균균균균귤극극극극극극극근근근근"+
  "근근근근근근근근근근근글금금금금금금금금금금금금금금급급급급"+
  "급급급긍긍긍긍기기기기기기기기기기기기기기기기기기기기기기기"+
  "기기기기기기기기기기기기기기기기기기기기기기기기기기기기기기"+
  "기기기기기기기기기기기긴길길길길김끽나나나나나나나나나나나나"+
  "나나나낙낙낙낙낙낙낙낙난난난난난난난난난날날남남남남남남남남"+
  "남납납납납납낭낭낭낭낭낭낭내내내내내내냉여년연연염염염염영영"+
  "노노노노노노노노노노노노노노노노노노녹녹녹녹녹녹논농농농농농"+
  "농농뇌뇌뇌뇌뇌뇌요누누누누누누누누눈눌유유늑늑늠능능능능능능"+
  "이이익익다다단단단단단단단단단단단단단단단단단단단단달달달달"+
  "달담담담담담담담담담담담담담담담담담답답답답답당당당당당당당"+
  "당당당당대대대대대대대대대대대대대대대대댁덕덕도도도도도도도"+
  "도도도도도도도도도도도도도도도도도도도도도도도도도도도도도도"+
  "도도도독독독독독독독독독독돈돈돈돈돈돈돈돈돈돈돌돌동동동동동"+
  "동동동동동동동동동동동동두두두두두두두두두두두둔둔둔둔둔둔득"+
  "등등등등등등등등등나나나나나나나나나낙낙낙낙낙낙낙낙낙난난난"+
  "난난난난난난날날남남남남남남남남남남납납납낭낭낭낭낭낭낭낭내"+
  "내내내냉약약양양양양양양양양양양양양양여여여여여여여여여여여"+
  "여여여여여여여역역역역역역역연연연연연연연연연연연연열열열열"+
  "열열염염염염염엽영영영영영영영영영영영영영영영영영영예예예예"+
  "예노노노노노노노노노노노노노노노노노노녹녹녹녹녹녹녹논농농농"+
  "농농농농뇌뇌뇌뇌뇌뇌뇌뇌요요요요요요요요요요요요용누누누누누"+
  "누누누누누누누누유유유유유유유유유유유유유유육육육윤윤윤윤윤"+
  "윤율율율율융늑늑늠능능능능능능이이이이이이이이이이이이리이이"+
  "이이이이이이이리이이이인인인인인인인인인임임임임임입입입입마"+
  "마마마마마마마막막막막막막만만만만만만만만만만만만만만만만만"+
  "만만말말말말말말말망망망망망망망망망망망망매매매매매매매매매"+
  "매매매매매맥맥맥맥맥맹맹맹맹맹맹멱멱면면면면면면면면면면면멸"+
  "멸명명명명명명명명명명명명명명명몌모모모모모모모모모모모모모"+
  "모모모모모모모모모모모목목목목목목목몰몰몽몽몽묘묘묘묘묘묘묘"+
  "묘묘묘묘묘무무무무무무무무무무무무무무무무무무무무무무묵묵문"+
  "문문문문문문문문문문문물물물미미미미미미미미미미미미미미미미"+
  "미미미민민민민민민민민민민민민민밀밀밀박박박박박박박박박박박"+
  "박박박박박박박박반반반반반반반반반반반반반반반반반반반반반반"+
  "반반반발발발발발발발발발발발방방방방방방방방방방방방방방방방"+
  "방방방방방방방방방방방방배배배배배배배배배배배배배배배배배배"+
  "배배백백백백백백백백번번번번번번번번번번벌벌벌벌범범범범범범"+
  "범범범법법벽벽벽벽벽벽벽벽벽벽벽변변변변변변변별별별별병병병"+
  "병병병병병병병병병병병병병병보보보보보보보보보보보보보보보보"+
  "복복복복복복복복복복복복복복복복복본볼봉봉봉봉봉봉봉봉봉봉봉"+
  "봉봉봉봉봉부부부부부부부부부부부부부부부부부부부부부부부부부"+
  "부부부부부부부부부부부부부부부부부부북분분분분분분분분분분분"+
  "분분분분분분분분불불불불불붕붕붕붕붕붕비비비비비비비비비비비"+
  "비비비비비비비비비비비비비비비비비비비비비비비비비비비비비비"+
  "비비빈빈빈빈빈빈빈빈빈빈빈빈빈빈빙빙빙빙사사사사사사사사사사"+
  "사사사사사사사사사사사사사사사사사사사사사사사사사사사사사사"+
  "사사사사사사사사사사사사사사사사사사사사삭삭삭삭산산산산산산"+
  "산산산산산산살살살살살삼삼삼삼삼삼삼삼삽삽삽삽상상상상상상상"+
  "상상상상상상상상상상상상상상상상상상상상상상상상새새새색색색"+
  "색색생생생생생서서서서서서서서서서서서서서서서서서서서서서서"+
  "서서서서서서서석석석석석석석석석석석석석석석선선선선선선선선"+
  "선선선선선선선선선선선선선선선선선선선선선선선선설설설설설설"+
  "설설설설설설설섬섬섬섬섬섬섬섬섭섭섭섭성성성성성성성성성성성"+
  "성성성성성성성세세세세세세세세세소소소소소소소소소소소소소소"+
  "소소소소소소소소소소소소소소소소소소소소소소소속속속속속속속"+
  "속속손손손손손손솔송송송송송송송송쇄쇄쇄쇄쇄쇠쇠수수수수수수"+
  "수수수수수수수수수수수수수수수수수수수수수수수수수수수수수수"+
  "수수수수수수수수수수수수수수수수수수수수수수수수수숙숙숙숙숙"+
  "숙숙숙숙숙숙숙순순순순순순순순순순순순순순순순순순순순순순순"+
  "순순순순술술술술숭숭숭슬슬슬습습습습습승승승승승승승승승승시"+
  "시시시시시시시시시시시시시시시시시시시시시시시시시시시식식식"+
  "식식식식식식식식식식식식신신신신신신신신신신신신신신신신신신"+
  "신신신신신신실실실실심심심심심심심심심심십십십쌍씨아아아아아"+
  "아아아아아아아아아아아아아악악악악악악악악악악악악악악안안안"+
  "안안안안안안안알알알알암암암암암암암암압압압압앙앙앙앙앙앙앙"+
  "애애애애애애애애애애애액액액액액액액앵앵앵앵야야야야야야야야"+
  "야야야약약약약약약약약약양양양양양양양양양양양양양양양양양양"+
  "양양양양양양양양양양양양양어어어어어어어어어어억억억억억언언"+
  "언언언언얼얼엄엄엄엄엄엄업업엔여여여여여여여여여여여여여여여"+
  "여여여여여여여여여역역역역역역역역역역역역역연연연연연연연연"+
  "연연연연연연연연연연연연연연연연연연연연연연연연연연연연연연"+
  "연연연연연열열열열열열열열열열염염염염염염염염염염염염염염염"+
  "엽엽엽엽영영영영영영영영영영영영영영영영영영영영영영영영영영"+
  "영영영영영영영영영영영영영영예예예예예예예예예예예예예예예예"+
  "예예예예예예예예오오오오오오오오오오오오오오오오오오오오오오"+
  "오오오오오오오오옥옥옥옥옥온온온온온온올옹옹옹옹옹옹옹옹옹와"+
  "와와와와와와와완완완완완완완완완완완완완완완완완완왈왕왕왕왕"+
  "왕왜왜왜왜외외외외외요요요요요요요요요요요요요요요요요요요요"+
  "요요요요요요요요요요요요요요요요요요욕욕욕욕욕욕용용용용용용"+
  "용용용용용용용용용용용용용용용용용용우우우우우우우우우우우우"+
  "우우우우우우우우우우우우우우우우우우우우욱욱욱욱욱욱욱욱욱운"+
  "운운운운운운운운운운운운울울울웅웅원원원원원원원원원원원원원"+
  "원원원원원원원원원원원원원원월월월위위위위위위위위위위위위위"+
  "위위위위위위위위위위위위유유유유유유유유유유유유유유유유유유"+
  "유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유"+
  "유유유유유유유유육육육육육육육윤윤윤윤윤윤윤윤윤윤윤윤윤율율"+
  "율율율융융융융융은은은은은은은을음음음음음음읍읍읍응응응응의"+
  "의의의의의의의의의의의의의의의의의의이이이이이이이이이이이이"+
  "이이이이이이이이이이이이이이이이이이이이이이이이이이익익익익"+
  "익익익익인인인인인인인인인인인인인인인인인인인인인인인인일일"+
  "일일일일일일일임임임임임임임임임임임입입입입입잉잉잉잉자자자"+
  "자자자자자자자자자자자자자자자자자자자자자자자작작작작작작작"+
  "작작작작작작잔잔잔잔잔잠잠잠잠잠잠잡장장장장장장장장장장장장"+
  "장장장장장장장장장장장장장장장장장장장장장장장장장재재재재재"+
  "재재재재재재재재재재재재쟁쟁쟁쟁저저저저저저저저저저저저저저"+
  "저저저저저저저저저저저저저저적적적적적적적적적적적적적적적적"+
  "적적적적적적적적적전전전전전전전전전전전전전전전전전전전전전"+
  "전전전전전전전전전전전전전전전전전전전전절절절절절절절절점점"+
  "점점점점점점점접접접정정정정정정정정정정정정정정정정정정정정"+
  "정정정정정정정정정정정정정정정정정정정정정정정정정정정정정정"+
  "정정정정정제제제제제제제제제제제제제제제제제제제제제제제조조"+
  "조조조조조조조조조조조조조조조조조조조조조조조조조조조조조조"+
  "조조조조조조조조조조조조조조족족족족존존졸졸졸종종종종종종종"+
  "종종종종종종종종종종좌좌좌좌좌죄주주주주주주주주주주주주주주"+
  "주주주주주주주주주주주주주주주주주주주주주주주주주주죽죽준준"+
  "준준준준준준준준준준준준준준준준준줄중중중중즉즐즙즙즙증증증"+
  "증증증증증증증증지지지지지지지지지지지지지지지지지지지지지지"+
  "지지지지지지지지지지지지직직직직직진진진진진진진진진진진진진"+
  "진진진진진진진진진진진진진진진진진진진진진진질질질질질질질질"+
  "질질질질질질질짐짐집집집집집집집징징징차차차차차차차차차차차"+
  "차차차차착착착착착착착찬찬찬찬찬찬찬찬찬찬찬찬찬찬찬찰찰찰찰"+
  "찰참참참참참참참참참참창창창창창창창창창창창창창창창창창창창"+
  "창창창채채채채채채채채채채채채책책책책처처처처척척척척척척척"+
  "척척척척척척척척천천천천천천천천천천천천천천천천천천천철철철"+
  "철철철철철철철첨첨첨첨첨첨첨첨첨첨첩첩첩첩첩첩첩첩첩첩청청청"+
  "청청청청청체체체체체체체체체체초초초초초초초초초초초초초초초"+
  "초초초초초초초초초초초초촉촉촉촉촉촉촌촌촌촌총총총총총총총총"+
  "총총촬최최최추추추추추추추추추추추추추추추추추추추추추추추축"+
  "축축축축축축축축축축축춘춘춘출출출충충충충충충췌췌췌췌취취취"+
  "취취취취취취취취취취취측측측측측층치치치치치치치치치치치치치"+
  "치치치치치치치치치치치칙칙칙친칠칠칠침침침침침침침침침칩칭칭"+
  "쾌타타타타타타타타타타타타타타탁탁탁탁탁탁탁탁탁탁탁탁탁탁탁"+
  "탁탄탄탄탄탄탄탄탄탄탄탈탈탐탐탐탐탑탑탑탕탕탕탕탕태태태태태"+
  "태태태태태태태태태택택택탱터토토토토통통통통통통통퇴퇴퇴퇴퇴"+
  "퇴투투투투투투특특틈파파파파파파파파파파파파파파파파판판판판"+
  "판판판판판팔팔팔패패패패패패패패패패패팽팽팽팽퍅편편편편편편"+
  "편편편편폄평평평평평폐폐폐폐폐폐폐폐폐폐포포포포포포포포포포"+
  "포포포포포포포포포포포포포포포포포포폭폭폭폭폭폭표표표표표표"+
  "표표표표표표표표품품풍풍풍풍풍피피피피피피피필필필필필필필필"+
  "필필핍핍하하하하하하하하하하하하하하학학학학학한한한한한한한"+
  "한한한한한한한할할함함함함함함함함함함함함합합합합합합합항항"+
  "항항항항항항항항항항항항항항항해해해해해해해해해해해해해해해"+
  "해해해핵핵행행행행행향향향향향향향향향허허허허헌헌헌헌헐험험"+
  "혁혁혁혁현현현현현현현현현현현현현현현현현현현현현혈혈혈혈혐"+
  "협협협협협협협협협협협협형형형형형형형형형형형형형형형형형형"+
  "형형혜혜혜혜혜혜혜혜혜호호호호호호호호호호호호호호호호호호호"+
  "호호호호호호호호호호호호호호호호호호호호호호혹혹혹혼혼혼혼혼"+
  "혼홀홀홀홍홍홍홍홍홍홍홍홍홍화화화화화화화화화화화화화화확확"+
  "확확확확환환환환환환환환환환환환환환환환환활활활활활황황황황"+
  "황황황황황황황황황황황황황황황황황황황황회회회회회회회회회회"+
  "회회회회회회회회회회획획횡횡횡효효효효효효효효효효효효효후후"+
  "후후후후후후후후후후후훈훈훈훈훈훈훈훈훈훈훙훤훤훤훤훼훼훼휘"+
  "휘휘휘휘휘휘휘휴휴휴휴휴휼휼휼흉흉흉흉흉흑흔흔흔흔흘흘흘흘흠"+
  "흠흠흡흡흡흡흥희희희희희희희희희희희희희희희희희희희희힐";

	/*	getHangle	*/
	public static String getHangle(String s1)
	/*++
		기능설명:
		입력된 문자열에 한자가 포함되어 있다면, 단지 그것을 한글로
		변환하여 준다.
		
		입력값:
			s1	변환하여야할 문자열의 포인터.
			s2	변환한 문자열을 저장할 메모리의 포인터.
			//size	변환한 문자열을 저장할 메모리의 크기. --> 사용안함
		
		반환값:
		성공시 '0'을 리턴한다.
		실패시, 초기 입력 포인터가 존재하지 않는다면 '-9'를 리턴한다
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
				// 한자면 한글테이블에서 가져온다.
				cp = ((( s1Byte[0] & 0xFF ) - 202 ) * 94 + (( s1Byte[1] & 0xFF ) - 161 ));
				result += pHangle.charAt(cp);
			}
			else
			{
				// 한자가 아니면 그대로 사용한다.
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