package ucare.echo.server;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * 환경파일을 초기화 한다
 */
public class CIni
{
	public static Properties dbProps = new Properties();
	public static long lastModified=0L;
	public static String loadfilename=null;

    /**
     * to Extend this class in the phomeproperty class
     */
    private CIni() {}

    /**
     * <PRE>
     * 화일에 있는 내용을 key, value 형태로 loading
     * (Dir != null), "Dir cannot be null"
     * </PRE>
     * @param commonConfigPath	: 정보를 읽기 위한 file full_path name
     * @return					: bLoadFromFiel
     */
    public static boolean loadFromFile(String commonConfigPath)
    {
    	boolean	bLoadFromFiel=false;
		try 
		{
			InputStream is_db=null;
			File file=new File (commonConfigPath);
			
			//System.out.println( "loadFromFile commonConfigPath = " + commonConfigPath);
			if (file.exists()){
				//System.out.println("global.properties file access ");
     			is_db=new FileInputStream(file);
     		}
			dbProps.load(is_db);
			is_db.close();
			bLoadFromFiel=true;
			loadfilename=commonConfigPath;
			
			if(file.canRead()){
				lastModified=file.lastModified();
				//System.out.println ("[global.properties file access time] : "+lastModified);
			}
		}
		catch (FileNotFoundException  fnfe) 
		{
			System.out.println("CInit FileNotFoundException :: loadFromFile... Check the specified properties file exists! ");
			fnfe.printStackTrace();
			bLoadFromFiel = false;
		}	
		catch (IOException  ioe) 
		{
			System.out.println ("CInit IOException :: loadFromFile... Check the specified properties file exists! ");
			ioe.printStackTrace();
			bLoadFromFiel = false;
		}		
		catch (Exception e) 
		{
			System.out.println("CInit Exception :: loadFromFile... Check the specified properties file exists! ");
			e.printStackTrace();
			bLoadFromFiel = false;
		}
		return bLoadFromFiel;
	}

	public static String getParam(String code)
	{
		CIni.LastModifiedCheck();
		return (String)dbProps.getProperty(code);
	}

	/**************************************************************************\
    * <PRE>
    * key에 해당되는 value를 string값으로 얻기 위한 것
    * </PRE>
    * @param code 	: value를 얻기 위한 key
    * @return		: String
    * <pre>(key 가 null이 아니면), "key cannot be null"
    \**************************************************************************/
    public static String getString(String code)
    {
    	CIni.LastModifiedCheck();
		return (String)dbProps.getProperty(code);
	}

	/**************************************************************************\
    * <PRE>
    * 마지막로드한 시간 return
    * </PRE>
    * @return:long
    \**************************************************************************/
    private static long getLastModified(){
    	return lastModified;
	}
	
	/**************************************************************************\
    * <PRE>
    * 마지막로드한시간 체크하여 static 갱신
    * </PRE>
    * @return:long
    \**************************************************************************/
    private static void LastModifiedCheck(){
    	long iDate=0L;
		File _file=new File(loadfilename);
		if (_file.canRead()){
			iDate=_file.lastModified();
		}
		if(lastModified<iDate){
			//System.out.println ("global.properties 변경되어 파일 재로딩 Start");
    		CIni.loadFromFile(loadfilename);
    		//System.out.println ("global.properties 변경되어 파일 재로딩 End");
    	}
	}
}