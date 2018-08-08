package ucare.daemon.util;

import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Locale;
import java.util.Date;
import java.util.SimpleTimeZone;

import java.sql.ResultSet;

import ucare.echo.server.ILogger;

/**
 * ��¥�ð� ���� util
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
	 * �Էµ� ����Ÿ�� ��¥�� �´��� üũ
	 * @param s "yyyy-MM-dd".
	 * @return boolean ��¥�� �´��� ����
	 */
	public static boolean check(String s) 
	{
		return CDateUtil.check(s, "yyyy-MM-dd");
	}

	/**
	 * �Էµ� ���˿� �°� ��¥ ������ �´��� üũ
	 * @param s üũ�� ����Ÿ(yyyymmdd)
	 * @param format ��¥ ����. For example, "yyyy-MM-dd".
	 * @return boolean ��¥�� �´��� ����
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
	 * ���� ��¥ ��������
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
	 * ���� ��¥ ��������
	 *
	 * @return int ��¥(dd)
	 */
	public static int getDay() 
	{
		return getNumberByPattern("dd");
	}

	/**
	 * For example, String time = DateTime.getFormatString("yyyy-MM-dd HH:mm:ss");
	 * �Էµ� ���Կ� �°� ���� ��¥ ��ȯ
	 * @param pattern  "yyyy, MM, dd, HH, mm, ss and more"
	 * @return String �Էµ� ���˿� �°� ���� ��¥ ��ȯ
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
	 * ���� ���� �����´�.
	 * @return int ��(MM)
	 */
	public static int getMonth() 
	{
		return getNumberByPattern("MM");
	}

	/**
	 * For example, int time = DateTime.getNumberByPattern("yyyyMMdd");
	 * �Էµ� ���Ͽ� �´� ���� ���ڷ� ��ȯ�Ͽ� ��ȯ�Ѵ�.
	 * @param pattern  "yyyy, MM, dd, HH, mm, ss and more"
	 * @return int ��¥���� ���ڷ� ��ȯ�Ͽ� ��ȯ
	 */
	public static int getNumberByPattern(String pattern) 
	{
		SimpleDateFormat formatter = new SimpleDateFormat(pattern, 
		                                                   Locale.KOREA);
		String dateString = formatter.format(getDate());
		return Integer.parseInt(dateString);
	}

	/**
	 * ���� ��¥�� ��ȯ(yyyyMMdd)
	 * @return String formatted string representation of current day with  "yyyyMMdd".
	 */
	public static String getShortDateString() 
	{
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd", 
		                                                   Locale.KOREA);
			
		return formatter.format(getDate());
	}

	/**
	 * ���� �ð��� ��ȯ(HHmmss)
	 * @return String formatted string representation of current time with  "HHmmss".
	 */
	public static String getShortTimeString() 
	{
		SimpleDateFormat formatter = new SimpleDateFormat("HHmmss", 
		                                                   Locale.KOREA);
		return formatter.format(getDate());
	}

	/**
	 * ���� ��¥,�ð��� ��ȯ(yyyy-MM-dd-HH:mm:ss:SSS)
	 * @return String formatted string representation of current time with  "yyyy-MM-dd-HH:mm:ss".
	 */
	public static String getTimeStampString() 
	{
		SimpleDateFormat formatter = 
			new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss:SSS", Locale.KOREA);
			
		return formatter.format(getDate());
	}

	/**
	 * ���� �ð��� ��ȯ(HH:mm:ss)
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
	 * @return int ���� �⵵�� ��ȯ
	 */
	public static int getYear() 
	{
		return getNumberByPattern("yyyy");
	}
	
	/**
	 * ���� ���� ������ ù��° ���ڸ� ���Ѵ�.
	 * @return String yyyymmdd�������� ��ȯ
	 *
	 */
    public static String getBeforeFirstDay() 
    {
    	return getBeforeFirstDay(getToday());
    }	

	/**
	 * �Է� ���� ������ ù��° ���ڸ� ���Ѵ�.
	 * @param  sToday �Է´�
	 * @return String yyyymmdd�������� ��ȯ
	 *
	 */
    public static String getBeforeFirstDay(String sToday) 
    {
        String s = getBeforeMonth(sToday);
        return s.substring(0, 6) + "01";
    }

	/**
	 * ���� ���� �������� ù��° ���ڸ� ���Ѵ�.
	 * @return String yyyymmdd�������� ��ȯ
	 *
	 */
    public static String getNextFirstDay() 
    {
    	return getNextFirstDay(getToday());
    }	

	/**
	 * �Է� ���� �������� ù��° ���ڸ� ���Ѵ�.
	 * @param  sToday �Է´�(yyyymmdd)
	 * @return String yyyymmdd�������� ��ȯ
	 *
	 */
    public static String getNextFirstDay(String sToday) 
    {
        String s = getNextMonth(sToday);
        return s.substring(0, 6) + "01";
    }


    /**
	 * ���� ���� ������ ������ ���ڸ� ���Ѵ�.
	 * @return String yyyymmdd�������� ��ȯ�Ѵ�. �׷��� dd�� ������ �����������̴�.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * //���� ���ڰ� 2002�� 01�� 14�� ���.
	 *currDate = CDateUtil.getBeforeLastDay();
	 * //��ȯ���� 2001�� 12�� 31���� �ȴ�.
	 *System.out.println("CDateUtil.getBeforeLastDay==> " + currDate);
	 *
	 *��°��:
	 *CDateUtil.getBeforeMonth==>20011231 
	 *</pre>
	 *</font>
	 */
    public static String getBeforeLastDay() 
    {
    	return getBeforeLastDay(getToday());
    }

    /**
	 * �Է� ���� ������ ������ ���ڸ� ���Ѵ�.
	 * @param sToday �Է´�(yyyymmdd)
	 * @return String yyyymmdd�������� ��ȯ�Ѵ�. �׷��� dd�� ������ �����������̴�.
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
	 * ���� ���� �������� ������ ���ڸ� ���Ѵ�.
	 * @return String yyyymmdd�������� ��ȯ�Ѵ�. �׷��� dd�� ������ �����������̴�.
	 */
    public static String getNextLastDay() 
    {
    	return getNextLastDay(getToday());
    }

    /**
	 * �Է� ���� �������� ������ ���ڸ� ���Ѵ�.
	 * @param sToday �Է´�(yyyymmdd)
	 * @return String yyyymmdd�������� ��ȯ�Ѵ�. �׷��� dd�� ������ �����������̴�.
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
	 *���� ���� ������ ���ڸ� ������ �´�.
	 *@return String ���޿� ���� ���� yyyymmdd���� ���ڿ��� ��ȯ�Ѵ�.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * //���� ���ڰ� 2002�� 01�� 14�� ���.
	 *currDate = CDateUtil.getBeforeMonth();
	 * //��ȯ���� 2001�� 12�� 14���� �ȴ�.
	 *System.out.println("CDateUtil.getBeforeMonth==> " + currDate);
	 *
	 *��°��:
	 *CDateUtil.getBeforeMonth==>20011214 
	 *</pre>
	 *</font>
	 */
    public static String getBeforeMonth() 
    {
    	return getBeforeMonth(getToday());
    }    

	/**
	 *�Է� ���� ������ ���ڸ� ������ �´�.
	 *@param �Է´�(yyyymmdd)
	 *@return String ���޿� ���� ���� yyyymmdd���� ���ڿ��� ��ȯ�Ѵ�.
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
	 *���� ���� �������� ���ڸ� ������ �´�.
	 *@return String ���޿� ���� ���� yyyymmdd���� ���ڿ��� ��ȯ�Ѵ�.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * //���� ���ڰ� 2002�� 12�� 14�� ���.
	 *currDate = CDateUtil.getNextMonth();
	 * //��ȯ���� 2003�� 01�� 14���� �ȴ�.
	 *System.out.println("CDateUtil.getNextMonth==> " + currDate);
	 *
	 *��°��:
	 *CDateUtil.getNextMonth==>20030114 
	 *</pre>
	 *</font>
	 */
    public static String getNextMonth() 
    {
        return getNextMonth(getToday());
    }    

	/**
	 *�Է� ���� �������� ���ڸ� ������ �´�.
	 *@param �Է´�
	 *@return String �����޿� ���� ���� yyyymmdd���� ���ڿ��� ��ȯ�Ѵ�.
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
	 *Ư���� ���ڿ��� 100���� ���� ���� ���� ��� �Ǵ��� ���ϰ� ������ ���
	 *Date = ���۳��� + ����
	 *@param s ���۳��� "20020101"
	 *@param i ���� 
	 *@return String �����
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * //���ΰ� ù ������ 2002�� 1�� 1�� �̴�. 100��° �Ǵ� ���ڸ� �˰� �ʹ�.
	 * String temp = CDateUtil.getDateWithOffset("20020101", 100);
	 * System.out.println("100��°. �����:"+temp);
	 * ��°��
	 * 100��°. �����:20020411
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
	 *�ش� �⿡ ���� ���� ������ ���ڸ� ���Ѵ�.
	 *@param i ��
	 *@param j ��
	 *@return int ������ ����.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * int cDay = CDateUtil.getDayCount(2002, 1);
	 * System.out.println("CDateUtil.getDayCount==>"+cDay);
	 * ��°��
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
	 *�� ���� ������ ���ڸ� ������ �´�.
	 *@param s �����
	 *@return int �״��� ������ ����.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * int cDate = CDateUtil.getDayCount("20010101");
	 * System.out.println("getDayCount=>" + cDate);
	 * ��°��
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
	 *�� �⵵�� �� ������ ���ڸ� ������ �´�.
	 *@param i �⵵
	 *@param j ��
	 *@param k ��
	 *@return int �״��� ������ ����.
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
	 *�� �⵵ �� ������ ���ڸ� ������ �´�.
	 *@param s �����
	 *@return int �� ���� ������ ����.
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 * int cDate = CDateUtil.getMonthDateCount("20010101");
	 * System.out.println("getMonthDateCount=>" + cDate);
	 * ��°��
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
	 *�������� ���� ���̸� ����Ͽ� ���ڿ��� cut�Ѵ�.
	 *@param s ���ڿ�
	 *@param i ������ ����.
	 *@return String  �����
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 *String temp = CDateUtil.getLeftSubstring("000019", 4);
	 *System.out.println("temp ==>", temp);
	 *��°��
	 *temp==>0000
	 *</pre>
	 *</font>
	 */
    public static String getLeftSubstring(String s, int i) 
    {
        return s.substring(0, s.length() - i);
    }

	/**
	 *���������� ���� ���̸� ����Ͽ� ���ڿ��� cut�Ѵ�.
	 *@param s ���ڿ�
	 *@param i ������ ����.
	 *@return String �����
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 *String temp = CDateUtil.getRightSubstring("000019", 4);
	 *System.out.println("temp ==>", temp);
	 *��°��
	 *temp==>0019
	 *</pre>
	 *</font>
	 */
    public static String getRightSubstring(String s, int i) 
    {
        return s.substring(s.length() - i, s.length());
    }
    
    /** ���� ��¥�� Date�������� ��ȯ�Ѵ�.
      * ���� ������ ���ó�¥�� �����´�.
      * @return Date ��¥
      */
    public static Date getDate()
    {
    	Date date = null;	
	    date = new Date();
    	return date;
    }
	/**
	 *���� ��¥�� ������ �´�. ������ yyyyMMdd
	 *@return String yyyyMMdd
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 *String currDate = CDateUtil.getToday();
	 *System.out.println("���� ����: "+ currDate);
	 *��°��:������ 2002�� 1�� 1�ϰ�� 
	 *���� ����: 20020101
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
    
    /*��¥�� �־��� �������� ��ȯ�Ѵ�.
     * @param dt ��¥
     * @param format ��¥��������
     * @return String �����*/
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
	 *������� ��ȿ�� ���� ������ üũ�Ѵ�.
	 *@param i ��
	 *@param j ��
	 *@param k ��
	 *@return boolean ��ȿ�� �����̸� true �ƴϸ� false
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
	 *������� ��ȿ�� ���� ������ üũ�Ѵ�.
	 *@param s ����� "20020101"
	 *@return boolean ��ȿ�� �����̸� true �ƴϸ� false
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
	 *���ڽð� ���ڿ��� yyyy/MM/dd HH:mm:ss�� �ٲ۾� �ش�.
	 *@param s ���ڿ� �ð��� ���� ���ڿ�
	 *@return String yyyy/MM/dd HH:mm:ss�� ���ڿ�
	 */
	/**
	 *<font color="#0000ff">
	 *<pre>
	 *String temp = CDateUtil.wholeDate("20020101120130");
	 *System.out.println("date ==>" + temp);
	 *��°��
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
     * ���� �ð��� �������� �� ���� �ð�
     * �ð��� ���´�(yyyy-mm-dd)
	 * @param	day		���Ϸ��� ��¥
	 * @return	String		���� �ð��� �Է� �ð��� ���� DATE�� �ð�
   	 */ 
   	public static String getCurrentDateWithOffset(long day)
   	{
        int millisPerHour = 60 * 60 * 1000;
        SimpleDateFormat fmt= new SimpleDateFormat("yyyy-MM-dd");
        SimpleTimeZone timeZone = new SimpleTimeZone(9*millisPerHour,"KST");
        fmt.setTimeZone(timeZone);

        long time = System.currentTimeMillis();
        long span = ( 60 * 60 * 1000 * 24 ) * day;    //�Ϸ翡 ���� millisecond...
        long time2 = time + span;
        String str=fmt.format(new Date(time2));
        
        return str;
   	}

    /**
     * informix���� Date���� field�� �����͸�  			<BR>
     * �Է��� ���� java.sql.Date object�� ��� ���� ��     <BR>
	 *
     * ���̺� ���� :	timetable(a DATE, b DATETIME YEAR TO SECOND)
	 *
     * (��) infomix DATE TYPE === yyyy-mm-dd				<BR>
	 *	   PreparedStatement	pstmt = conn.prepareStatement("Insert into timetable values(?, ? )" );
	 *	   pstmt.setDate( 1, CUtil.getDate("1999-10-10");
	 *			
     * @param    in_time  		��¥���ڿ�(yyyy-mm-dd)
     * @return   Date
     */
	public static java.sql.Date getDate(String in_time)
	{
		return java.sql.Date.valueOf(in_time);
	}//end 
	


    /**
     * informix���� DateTime���� field�� �����͸�  			<BR>
     * �Է��ϱ� ���� java.sql.Timestamp object�� ��� ���� ��    <BR>
 	 *
     * ���̺� ���� :	timetable(a DATE, b DATETIME YEAR TO SECOND)
	 *
     * (��) infomix DATE TYPE === in_dateTime					<BR>
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
     * informix���� DateTime���� field�� �����͸�  			<BR>
     * �Է��� ���� java.sql.Timestamp object�� ��� ���� ��    <BR>
     * @param    in_dateTime  ��¥���ڿ�.
     * @return   Timestamp
     */
    /**
 	 *<font color="#0000ff">
	 *<pre>
     * ���̺� ���� :	timetable(a DATE, b DATETIME YEAR TO SECOND)
     *
     * (��) infomix DATETIME TYPE === yyyy-mm-dd hh:mm:ss
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
     * ��¥���ڿ��� informix DATETIME���·� ��ȯ<BR>
     * (��) 1998-12-10 10:10:10.0 --> 1998-12-10 10:10:10<BR>
     * @param    dateString  �ڿ� .0�� ����ش�.
     * @return   String ����� ��¥ ���ڿ�.
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
	 * ���ڿ� ������ Timestamp��¥�� Timestamp�� ��ȯ�Ѵ�. <br>
	 * <ex> stringToTimestamp("2002-04-02 14:20:34.0") <br>
	 * created by Dragon.
	 *
	 * @param	strDate - ���ڿ� ������ ��¥
	 * @return	Timestamp
	 */ 
	public static java.sql.Timestamp stringToTimestamp(String strDate) throws java.text.ParseException {
		return CDateUtil.stringToTimestamp(strDate, null);
	}
	/**
	 * ���ϴ� ��¥ �������� ���ڿ� ������ Timestamp��¥�� Timestamp�� ��ȯ�Ѵ�. <br>
	 * <ex> stringToTimestamp("2002-04-02 14:20:34.0", "yyyy-MM-dd hh:mm:ss") <br>
	 * created by Dragon.
	 *
	 * @param	strDate - ���ڿ� ������ ��¥.
	 * @param	strPattern - ��¥ ����.
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
	 * //���� ������ �⵵�ʹ��� �����Ѵ�.
	 *ym = CDateUtil.getCurrentYM();
	 * //��ȯ���� 200704
	 *</pre>
	 *</font>
	 *@return String yyyyMM
	 */
    public static String getCurrentYM(){
    	String s=getToday();
    	return s.substring(0,6);
    }

	/*
	 * yyyyMMddHHmmss�������� ��ȯ
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
		System.out.println("100��°. �����:"+currDate);	
		
		cDate = CDateUtil.getDayCount("20020101");
		System.out.println("getDayCount==> " + cDate);
		
		currDate = CDateUtil.getBeforeMonth();
		System.out.println("CDateUtil.getBeforeMonth==> " + currDate);
	}

}