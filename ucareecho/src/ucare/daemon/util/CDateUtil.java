package ucare.daemon.util;

import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Locale;
import java.util.Date;
import java.util.SimpleTimeZone;

import java.sql.ResultSet;

import ucare.echo.server.ILogger;

/**
 * 날짜시간 관련 util
 * @version 1.0
 * @author  ucare
 */
public final class CDateUtil implements ILogger
{
	public static final int DATA_CHECK_ERROR = 100;

	/**
	 * Don't let anyone instantiate this class
	 */
	private CDateUtil() {}

	/**
	 * 입력된 데이타가 날짜가 맞는지 체크
	 * @param s "yyyy-MM-dd".
	 * @return boolean 날짜가 맞는지 여부
	 */
	public static boolean check(String s) 
	{
		return CDateUtil.check(s, "yyyy-MM-dd");
	}

	/**
	 * 입력된 포맷에 맞게 날짜 형식이 맞는지 체크
	 * @param s 체크할 데이타(yyyymmdd)
	 * @param format 날짜 포맷. For example, "yyyy-MM-dd".
	 * @return boolean 날짜가 맞는지 여부
	 */
	public static boolean check(String s, String format) 
	{
		if ( s == null ) return false;
		if ( format == null ) return false;

		SimpleDateFormat formatter = new SimpleDateFormat(format, 
		                                                   Locale.KOREA);
		Date date = null;
		try 
		{
			date = formatter.parse(s);
		}
		catch (ParseException e) 
		{
			return false;
		}
		
		if (!formatter.format(date).equals(s))
			return false;
			
		return true;
	}

	/**
	 * 오늘 날짜 가져오기
	 * @return String "yyyy/MM/dd".
	 */
	public static String getDateString() 
	{
		SimpleDateFormat formatter = 
			new SimpleDateFormat("yyyy/MM/dd", Locale.KOREA);
		return formatter.format(getDate());
	}
	
	/**
	 *
	 * 오늘 날짜 가져오기
	 *
	 * @return int 날짜(dd)
	 */
	public static int getDay() 
	{
		return getNumberByPattern("dd");
	}

	/**
	 * For example, String time = DateTime.getFormatString("yyyy-MM-dd HH:mm:ss");
	 * 입력된 패텃에 맞게 오늘 날짜 반환
	 * @param pattern  "yyyy, MM, dd, HH, mm, ss and more"
	 * @return String 입력된 포맷에 맞게 오늘 날짜 반환
	 */
	public static String getFormatString(String pattern) 
	{
		SimpleDateFormat formatter = new SimpleDateFormat(pattern, 
		                                                   Locale.KOREA);
		String dateString = formatter.format(getDate());
		return dateString;
	}

	public static String getFormatString(String sDate, String pattern)
	{
		Date date =  new Date(Integer.parseInt(sDate.substring(0,4))-1900, Integer.parseInt(sDate.substring(4,6))-1, Integer.parseInt(sDate.substring(6)));;
		SimpleDateFormat formatter = new SimpleDateFormat(pattern, 
                Locale.KOREA);
		String dateString = formatter.format(date);
		return dateString;
	}
	
	/**
	 * For example, String time = DateTime.getFormatString("yyyy-MM-dd HH:mm:ss");
	 * 오늘 달을 가져온다.
	 * @return int 월(MM)
	 */
	public static int getMonth() 
	{
		return getNumberByPattern("MM");
	}

	/**
	 * For example, int time = DateTime.getNumberByPattern("yyyyMMdd");
	 * 입력된 패턴에 맞는 값을 숫자로 변환하여 반환한다.
	 * @param pattern  "yyyy, MM, dd, HH, mm, ss and more"
	 * @return int 날짜값을 숫자로 변환하여 반환
	 */
	public static int getNumberByPattern(String pattern) 
	{
		SimpleDateFormat formatter = new SimpleDateFormat(pattern, 
		                                                   Locale.KOREA);
		String dateString = formatter.format(getDate());
		return Integer.parseInt(dateString);
	}

	/**
	 * 오늘 날짜를 반환(yyyyMMdd)
	 * @return String formatted string representation of current day with  "yyyyMMdd".
	 */
	public static String getShortDateString() 
	{
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd", 
		                                                   Locale.KOREA);
			
		return formatter.format(getDate());
	}

	/**
	 * 현재 시간을 반환(HHmmss)
	 * @return String formatted string representation of current time with  "HHmmss".
	 */
	public static String getShortTimeString() 
	{
		SimpleDateFormat formatter = new SimpleDateFormat("HHmmss", 
		                                                   Locale.KOREA);
		return formatter.format(getDate());
	}

	/**
	 * 현재 날짜,시간을 반환(yyyy-MM-dd-HH:mm:ss:SSS)
	 * @return String formatted string representation of current time with  "yyyy-MM-dd-HH:mm:ss".
	 */
	public static String getTimeStampString() 
	{
		SimpleDateFormat formatter = 
			new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss:SSS", Locale.KOREA);
			
		return formatter.format(getDate());
	}

	/**
	 * 현재 시간을 반환(HH:mm:ss)
	 * @return String formatted string representation of current time with  "HH:mm:ss".
	 */
	public static String getTimeString() 
	{
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss", 
		                                                   Locale.KOREA);
		return formatter.format(getDate());
	}

	/**
	 *
	 * For example, int year= DateTime.getYear();
	 *
	 * @return int 현재 년도를 반환
	 */
	public static int getYear() 
	{
		return getNumberByPattern("yyyy");
	}
	
	/**
	 * 오늘 달의 전달의 첫번째 일자를 구한다.
	 * @return String yyyymmdd형식으로 반환
	 *
	 */
    public static String getBeforeFirstDay() 
    {
    	return getBeforeFirstDay(getToday());
    }	

	/**
	 * 입력 달의 전달의 첫번째 일자를 구한다.
	 * @param  sToday 입력달
	 * @return String yyyymmdd형식으로 반환
	 *
	 */
    public static String getBeforeFirstDay(String sToday) 
    {
        String s = getBeforeMonth(sToday);
        return s.substring(0, 6) + "01";
    }

	/**
	 * 오늘 달의 다음달의 첫번째 일자를 구한다.
	 * @return String yyyymmdd형식으로 반환
	 *
	 */
    public static String getNextFirstDay() 
    {
    	return getNextFirstDay(getToday());
    }	

	/**
	 * 입력 달의 다음달의 첫번째 일자를 구한다.
	 * @param  sToday 입력달(yyyymmdd)
	 * @return String yyyymmdd형식으로 반환
	 *
	 */
    public static String getNextFirstDay(String sToday) 
    {
        String s = getNextMonth(sToday);
        return s.substring(0, 6) + "01";
    }


    /**
	 * 오늘 달의 전달의 마지막 일자를 구한다.
	 * @return String yyyymmdd형식으로 반환한다. 그러나 dd는 전달의 마지막일자이다.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * //오늘 날자가 2002년 01월 14일 경우.
	 *currDate = CDateUtil.getBeforeLastDay();
	 * //반환값은 2001년 12월 31일이 된다.
	 *System.out.println("CDateUtil.getBeforeLastDay==> " + currDate);
	 *
	 *출력결과:
	 *CDateUtil.getBeforeMonth==>20011231 
	 *</pre>
	 *</font>
	 */
    public static String getBeforeLastDay() 
    {
    	return getBeforeLastDay(getToday());
    }

    /**
	 * 입력 달의 전달의 마지막 일자를 구한다.
	 * @param sToday 입력달(yyyymmdd)
	 * @return String yyyymmdd형식으로 반환한다. 그러나 dd는 전달의 마지막일자이다.
	 */
    public static String getBeforeLastDay(String sToday) 
    {
        boolean flag = false;
        boolean flag1 = false;
        String s = getBeforeMonth(sToday);
        try 
        {
            int j = Integer.parseInt(s.substring(0, 4));
            int k = Integer.parseInt(s.substring(4, 6));
        }
        catch(Exception _ex) 
        { 
        }
        
        int i = getDayCount(s);
        return s.substring(0, 6) + i;
    }

    /**
	 * 오늘 달의 다음달의 마지막 일자를 구한다.
	 * @return String yyyymmdd형식으로 반환한다. 그러나 dd는 전달의 마지막일자이다.
	 */
    public static String getNextLastDay() 
    {
    	return getNextLastDay(getToday());
    }

    /**
	 * 입력 달의 다음달의 마지막 일자를 구한다.
	 * @param sToday 입력달(yyyymmdd)
	 * @return String yyyymmdd형식으로 반환한다. 그러나 dd는 전달의 마지막일자이다.
	 */
    public static String getNextLastDay(String sToday) 
    {
        boolean flag = false;
        boolean flag1 = false;
        String s = getNextMonth(sToday);
        try 
        {
            int j = Integer.parseInt(s.substring(0, 4));
            int k = Integer.parseInt(s.substring(4, 6));
        }
        catch(Exception _ex) 
        { 
        }
        
        int i = getDayCount(s);
        return s.substring(0, 6) + i;
    }
    
    /**
	 *현재 달의 전달의 날자를 가지고 온다.
	 *@return String 전달에 대한 날자 yyyymmdd값을 문자열로 반환한다.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * //오늘 날자가 2002년 01월 14일 경우.
	 *currDate = CDateUtil.getBeforeMonth();
	 * //반환값은 2001년 12월 14일이 된다.
	 *System.out.println("CDateUtil.getBeforeMonth==> " + currDate);
	 *
	 *출력결과:
	 *CDateUtil.getBeforeMonth==>20011214 
	 *</pre>
	 *</font>
	 */
    public static String getBeforeMonth() 
    {
    	return getBeforeMonth(getToday());
    }    

	/**
	 *입력 달의 전달의 날자를 가지고 온다.
	 *@param 입력달(yyyymmdd)
	 *@return String 전달에 대한 날자 yyyymmdd값을 문자열로 반환한다.
	 */
    public static String getBeforeMonth(String s) 
    {
        String s1 = null;
        int i = Integer.parseInt(s.substring(0, 4));
        String s2 = String.valueOf(i);
        int j = Integer.parseInt(s.substring(4, 6)) - 1;
        String s3 = String.valueOf(j);
        if (j == 0) 
        {
            i--;
            s3 = "12";
            s2 = String.valueOf(i);
        }
        
        if (s3.length() == 1)
            s3 = "0" + s3;
            
        s1 = s2 + s3 + s.substring(6);
        return s1;
    }

	/**
	 *현재 달의 다음달의 날자를 가지고 온다.
	 *@return String 전달에 대한 날자 yyyymmdd값을 문자열로 반환한다.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * //오늘 날자가 2002년 12월 14일 경우.
	 *currDate = CDateUtil.getNextMonth();
	 * //반환값은 2003년 01월 14일이 된다.
	 *System.out.println("CDateUtil.getNextMonth==> " + currDate);
	 *
	 *출력결과:
	 *CDateUtil.getNextMonth==>20030114 
	 *</pre>
	 *</font>
	 */
    public static String getNextMonth() 
    {
        return getNextMonth(getToday());
    }    

	/**
	 *입력 달의 다음달의 날자를 가지고 온다.
	 *@param 입력달
	 *@return String 다음달에 대한 날자 yyyymmdd값을 문자열로 반환한다.
	 */
    public static String getNextMonth(String s) 
    {
        String s1 = null;
        int i = Integer.parseInt(s.substring(0, 4));
        String s2 = String.valueOf(i);
        int j = Integer.parseInt(s.substring(4, 6)) +1;
        String s3 = String.valueOf(j);
        if (j == 13) 
        {
            i++;
            s3 = "01";
            s2 = String.valueOf(i);
        }
        
        if (s3.length() == 1)
            s3 = "0" + s3;
            
        s1 = s2 + s3 + s.substring(6);
        return s1;
    }

    /**
	 *특정한 날자에서 100일을 더한 값의 날자 어떻게 되는지 구하고 싶을때 사용
	 *Date = 시작날자 + 일자
	 *@param s 시작날자 "20020101"
	 *@param i 일자 
	 *@return String 결과밧
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * //연인과 첫 만남이 2002년 1월 1일 이다. 100일째 되는 날자를 알고 싶다.
	 * String temp = CDateUtil.getDateWithOffset("20020101", 100);
	 * System.out.println("100일째. 년월일:"+temp);
	 * 출력결과
	 * 100일째. 년월일:20020411
	 *</pre>
	 *</font>
	 */
    public static String getDateWithOffset(String s, int i) 
    {
        int j = 0;
        int k = 0;
        int l = 0;
        try 
        {
            j = Integer.parseInt(s.substring(0, 4)) - 1900;
            k = Integer.parseInt(s.substring(4, 6)) - 1;
            l = Integer.parseInt(s.substring(6, 8));
        }
        catch(Exception _ex) 
        { 
        }
        
        l += i;
        Integer ainteger[] = getValidateDate(j, k, l);
        
        String year = "0000"+String.valueOf(ainteger[0].intValue() + 1900);
        String month= "00"  +String.valueOf(ainteger[1].intValue() + 1);
        String day  = "00"  +String.valueOf(ainteger[2]);
        return getRightSubstring(year,  4) + getRightSubstring(month, 2) + 
               getRightSubstring(day,   2);
    }

	/**
	 *해당 년에 대한 달의 마지막 일자를 구한다.
	 *@param i 년
	 *@param j 월
	 *@return int 마지막 일자.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * int cDay = CDateUtil.getDayCount(2002, 1);
	 * System.out.println("CDateUtil.getDayCount==>"+cDay);
	 * 출력결과
	 * CDateUtil.getDayCount==>31
	 *</pre>
	 *</font>
	 */
    public static int getDayCount(int i, int j) 
    {
        int ai[] = {
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 
            30, 31
        };
        if(i % 4 == 0 && j == 2)
            return 29;
        else
            return ai[j - 1];
    }

	
	/**
	 *그 달의 마직막 일자를 가지고 온다.
	 *@param s 년월일
	 *@return int 그달의 마직막 일자.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * int cDate = CDateUtil.getDayCount("20010101");
	 * System.out.println("getDayCount=>" + cDate);
	 * 출력결과
	 * getDayCount>31
	 *</pre>
	 *</font>
	 */
    public static int getDayCount(String s) 
    {
        int i = 0;
        int j = 0;
        try 
        {
            i = Integer.parseInt(s.substring(0, 4));
            j = Integer.parseInt(s.substring(4, 6));
        }
        catch(Exception _ex) 
        { 
        }
        
        return getDayCount(i, j);
    }

	/**
	 *그 년도의 달 마직막 일자를 가지고 온다.
	 *@param i 년도
	 *@param j 월
	 *@param k 일
	 *@return int 그달의 마지막 일자.
	 */
    protected static int getMonthDateCount(int i, int j, int k) 
    {
        Date date = getDate();
        Date date1 = getDate();
        date.setYear(i);
        date.setMonth(j);
        date.setDate(1);
        
        int l  = date.getDay();
        int j1 = i;
        int k1 = j + 1;
        if(k1 == 12) 
        {
            k1 = 0;
            j1++;
        }
        
        date1.setYear(j1);
        date1.setMonth(k1);
        date1.setDate(1);
        
        int i1 = date1.getDay();
        byte byte0;
        switch((i1 - l) % 7) 
        {
        case 0: // '\0'
            byte0 = 28;
            break;

        case 1: // '\001'
            byte0 = 29;
            break;

        case 2: // '\002'
            byte0 = 30;
            break;

        default:
            byte0 = 31;
            break;
        }
        
        return byte0;
    }

	/**
	 *그 년도 달 마직막 일자를 가지고 온다.
	 *@param s 년월일
	 *@return int 그 달의 마지막 일자.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * int cDate = CDateUtil.getMonthDateCount("20010101");
	 * System.out.println("getMonthDateCount=>" + cDate);
	 * 출력결과
	 * getMonthDateCount=>31
	 *</pre>
	 *</font>
	 */
    public static int getMonthDateCount(String s) 
    {
        int i = 0;
        int j = 0;
        int k = 1;
        try 
        {
            i = Integer.parseInt(s.substring(0, 4)) - 1900;
            j = Integer.parseInt(s.substring(4, 6)) - 1;
            k = Integer.parseInt(s.substring(6, 8));
        }
        catch(Exception _ex) 
        { 
        }
        
        return getMonthDateCount(i, j, k);
    }
    
    /**
	 *왼쪽으로 부터 길이를 계산하여 문자열을 cut한다.
	 *@param s 문자열
	 *@param i 절삭할 길이.
	 *@return String  결과값
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 *String temp = CDateUtil.getLeftSubstring("000019", 4);
	 *System.out.println("temp ==>", temp);
	 *출력결과
	 *temp==>0000
	 *</pre>
	 *</font>
	 */
    public static String getLeftSubstring(String s, int i) 
    {
        return s.substring(0, s.length() - i);
    }

	/**
	 *오른쪽으로 부터 길이를 계산하여 문자열을 cut한다.
	 *@param s 문자열
	 *@param i 절삭할 길이.
	 *@return String 결과값
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 *String temp = CDateUtil.getRightSubstring("000019", 4);
	 *System.out.println("temp ==>", temp);
	 *출력결과
	 *temp==>0019
	 *</pre>
	 *</font>
	 */
    public static String getRightSubstring(String s, int i) 
    {
        return s.substring(s.length() - i, s.length());
    }
    
    /** 오늘 날짜를 Date형식으로 반환한다.
      * 현재 서버의 오늘날짜를 가져온다.
      * @return Date 날짜
      */
    public static Date getDate()
    {
    	Date date = null;	
	    date = new Date();
    	return date;
    }
	/**
	 *오늘 날짜를 가지고 온다. 형식은 yyyyMMdd
	 *@return String yyyyMMdd
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 *String currDate = CDateUtil.getToday();
	 *System.out.println("오늘 날자: "+ currDate);
	 *출력결과:오늘이 2002년 1월 1일경우 
	 *오늘 날자: 20020101
	 *</pre>
	 *</font>
	 */
    public static String getToday() 
    {
        Date date = getDate();
    	
        SimpleDateFormat simpledateformat = 
        	new SimpleDateFormat("yyyyMMdd", new Locale("ko", "KOREA"));
        	
        return simpledateformat.format(date);
    }    
    
    /*날짜를 주어진 포맷으로 변환한다.
     * @param dt 날짜
     * @param format 날짜포맷형식
     * @return String 결과값*/
    public static String getDateToFormat(Date dt, String format) 
    {
        Date date = getDate();
        SimpleDateFormat simpledateformat = 
        	new SimpleDateFormat(format, new Locale("ko", "KOREA"));
        	
        return simpledateformat.format(dt);
    }

	/*
	 * */
    protected static Integer[] getValidateDate(int i, int j, int k) 
    {
        Integer ainteger[] = new Integer[3];
        ainteger[0] = new Integer(i);
        ainteger[1] = new Integer(j);
        ainteger[2] = new Integer(k);
        if(i < 0)
            return ainteger;
        int l = getMonthDateCount(i, j, k);
        if(k <= 0) 
        {
            if(--j < 0) 
            {
                j = 11;
                i--;
            }
            k = getMonthDateCount(i, j, 1) + k;
            ainteger = getValidateDate(i, j, k);
        } 
        else
        if(k > l) 
        {
            k -= getMonthDateCount(i, j, 1);
            if(++j > 11) 
            {
                j = 0;
                i++;
            }
            ainteger = getValidateDate(i, j, k);
        }
        return ainteger;
    }

	/**
	 *년월일이 유효한 날자 인지를 체크한다.
	 *@param i 년
	 *@param j 월
	 *@param k 일
	 *@return boolean 유효한 날자이면 true 아니면 false
	 */
    public static boolean isValidateDate(int i, int j, int k) 
    {
        int l = getMonthDateCount(i, j, k);
        if(i < 0)
            return false;
        if(j < 0 || j >= 12)
            return false;
        return k >= 1 && k <= l;
    }

	/**
	 *년월일이 유효한 날자 인지를 체크한다.
	 *@param s 년월일 "20020101"
	 *@return boolean 유효한 날자이면 true 아니면 false
	 */
    public static boolean isValidateDate(String s) 
    {
        int i = 0;
        int j = 0;
        int k = 0;
        try 
        {
            i = Integer.parseInt(s.substring(0, 4)) - 1900;
            j = Integer.parseInt(s.substring(4, 6)) - 1;
            k = Integer.parseInt(s.substring(6, 8));
        }
        catch(Exception _ex) 
        {
            return false;
        }
        return isValidateDate(i, j, k);
    }

	/**
	 *날자시간 문자열을 yyyy/MM/dd HH:mm:ss로 바꾼어 준다.
	 *@param s 날자와 시간에 대한 문자열
	 *@return String yyyy/MM/dd HH:mm:ss된 문자열
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 *String temp = CDateUtil.wholeDate("20020101120130");
	 *System.out.println("date ==>" + temp);
	 *출력결과
	 *date ==>2002/01/01 12:01:30
	 *</pre>
	 *</font>
	 */
    public String wholeDate(String s) 
    {
        String s1 = null;
        if(s.trim().length() == 15) 
        {
            String s2 = s.substring(0, 8);
            s2 = s2.substring(0, 4) + "/" + s2.substring(4, 6) + "/" + s2.substring(6);
            String s3 = s.substring(9);
            s3 = s3.substring(0, 2) + ":" + s3.substring(2, 4) + ":" + s3.substring(4);
            s1 = s2 + " " + s3;
        } 
        else 
        {
            s1 = s;
        }
        return s1;
    }

    /**
     * 현재 시간을 기준으로 몇 일후 시간
     * 시간의 형태는(yyyy-mm-dd)
	 * @param	day		더하려는 날짜
	 * @return	String		현재 시간에 입력 시간을 더한 DATE형 시간
   	 */ 
   	public static String getCurrentDateWithOffset(long day)
   	{
        int millisPerHour = 60 * 60 * 1000;
        SimpleDateFormat fmt= new SimpleDateFormat("yyyy-MM-dd");
        SimpleTimeZone timeZone = new SimpleTimeZone(9*millisPerHour,"KST");
        fmt.setTimeZone(timeZone);

        long time = System.currentTimeMillis();
        long span = ( 60 * 60 * 1000 * 24 ) * day;    //하루에 대한 millisecond...
        long time2 = time + span;
        String str=fmt.format(new Date(time2));
        
        return str;
   	}

    /**
     * informix에서 Date관련 field에 데이터를  			<BR>
     * 입력하 위한 java.sql.Date object를 얻기 위한 것     <BR>
	 *
     * 데이블 구성 :	timetable(a DATE, b DATETIME YEAR TO SECOND)
	 *
     * (예) infomix DATE TYPE === yyyy-mm-dd				<BR>
	 *	   PreparedStatement	pstmt = conn.prepareStatement("Insert into timetable values(?, ? )" );
	 *	   pstmt.setDate( 1, CUtil.getDate("1999-10-10");
	 *			
     * @param    in_time  		날짜문자열(yyyy-mm-dd)
     * @return   Date
     */
	public static java.sql.Date getDate(String in_time)
	{
		return java.sql.Date.valueOf(in_time);
	}//end 
	


    /**
     * informix에서 DateTime관련 field에 데이터를  			<BR>
     * 입력하기 위한 java.sql.Timestamp object를 얻기 위한 것    <BR>
 	 *
     * 데이블 구성 :	timetable(a DATE, b DATETIME YEAR TO SECOND)
	 *
     * (예) infomix DATE TYPE === in_dateTime					<BR>
	 *	   PreparedStatement	pstmt = conn.prepareStatement("Insert into timetable values(?, ? )" );
	 *	   pstmt.setTimestamp( 2,  CUtil.getCurrentDateTime());
	 *			
     * @return   Timestamp
     */
	public static java.sql.Timestamp getCurrentDateTime()
	{
	//	return java.sql.Timestamp
	//	       .valueOf(getFormatString("yyyy-mm-dd hh:mm:ss"));
	// modified by Dragon.(2002-04-02)
		return new java.sql.Timestamp(System.currentTimeMillis());
	}

    /**
     * informix에서 DateTime관련 field에 데이터를  			<BR>
     * 입력하 위한 java.sql.Timestamp object를 얻기 위한 것    <BR>
     * @param    in_dateTime  날짜문자열.
     * @return   Timestamp
     */
    /**
 	 *<font color="#0000ff">
	 *<pre>
     * 데이블 구성 :	timetable(a DATE, b DATETIME YEAR TO SECOND)
     *
     * (예) infomix DATETIME TYPE === yyyy-mm-dd hh:mm:ss
	 *	   	PreparedStatement	pstmt = conn.prepareStatement("Insert into timetable values(?, ? )" );
	 *		pstmt.setTimestamp( 2,  CUtil.getDateTime("1999-10-10 10:10:10"));
	 *</pre>
	 *</font>
     */     
	public static java.sql.Timestamp getDateTime(String in_dateTime)
	{
		return java.sql.Timestamp.valueOf(in_dateTime);
	} //end 

    /**
     * 날짜문자열을 informix DATETIME형태로 변환<BR>
     * (예) 1998-12-10 10:10:10.0 --> 1998-12-10 10:10:10<BR>
     * @param    dateString  뒤에 .0을 얻애준다.
     * @return   String 변경된 날짜 문자열.
     */
    public static String convertDateTimeType(String dateString)
    {
        if (dateString.length() == 0) return "";
        //if (dateString.length() != 21) return "invalid length";

        String year 	= dateString.substring(0,4);
        String month 	= dateString.substring(5,7);
        String date 	= dateString.substring(8,10);
        String hour 	= dateString.substring(11,13);
        String min	 	= dateString.substring(14,16);
        String sec		= dateString.substring(17,19);
        
        return (year+"-"+month+"-"+date+" "+hour+":"+min+":"+sec);
    }
    
	/**
	 * 문자열 형태의 Timestamp날짜를 Timestamp로 변환한다. <br>
	 * <ex> stringToTimestamp("2002-04-02 14:20:34.0") <br>
	 * created by Dragon.
	 *
	 * @param	strDate - 문자열 형태의 날짜
	 * @return	Timestamp
	 */ 
	public static java.sql.Timestamp stringToTimestamp(String strDate) throws java.text.ParseException {
		return CDateUtil.stringToTimestamp(strDate, null);
	}
	/**
	 * 원하는 날짜 패턴으로 문자열 형태의 Timestamp날짜를 Timestamp로 변환한다. <br>
	 * <ex> stringToTimestamp("2002-04-02 14:20:34.0", "yyyy-MM-dd hh:mm:ss") <br>
	 * created by Dragon.
	 *
	 * @param	strDate - 문자열 형태의 날짜.
	 * @param	strPattern - 날짜 패턴.
	 * @return	Timestamp
	 */ 	
	public static java.sql.Timestamp stringToTimestamp(String strDate, String strPattern) throws java.text.ParseException {
		String pattern = "yyyy-MM-dd hh:mm:ss";
		
		if(strDate == null || strDate.length() < 1) 
			return null;
			
		if(strPattern != null)
			pattern = strPattern;
			
		try {	
			java.text.SimpleDateFormat sd = new java.text.SimpleDateFormat(pattern);
			return new java.sql.Timestamp(sd.parse(strDate).getTime());
		} catch(java.text.ParseException e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * //오늘 날자의 년도와달을 리턴한다.
	 *ym = CDateUtil.getCurrentYM();
	 * //반환값은 200704
	 *</pre>
	 *</font>
	 *@return String yyyyMM
	 */
    public static String getCurrentYM(){
    	String s=getToday();
    	return s.substring(0,6);
    }

	/*
	 * yyyyMMddHHmmss형식으로 반환
	 * @return String yyyyMMddHHmmss*/
	public static String getDateTimeEmail()
	{
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		Date   xDate = new Date();
		String xStrDate = formatter.format(xDate);
		return (xStrDate.trim());
	}
    
	public static void main(String[] args)
	{
		int cDate = CDateUtil.getMonthDateCount("20010101");
		System.out.println("getMonthDateCount=>" + cDate);
		
		String currDate = CDateUtil.getDateWithOffset("20020101", 100);
		System.out.println("100일째. 년월일:"+currDate);	
		
		cDate = CDateUtil.getDayCount("20020101");
		System.out.println("getDayCount==> " + cDate);
		
		currDate = CDateUtil.getBeforeMonth();
		System.out.println("CDateUtil.getBeforeMonth==> " + currDate);
	}

}