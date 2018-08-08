package ucare.echo.server;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * ȯ�������� �ʱ�ȭ �Ѵ�
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
     * ȭ�Ͽ� �ִ� ������ key, value ���·� loading
     * (Dir != null), "Dir cannot be null"
     * </PRE>
     * @param commonConfigPath	: ������ �б� ���� file full_path name
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
    * key�� �ش�Ǵ� value�� string������ ��� ���� ��
    * </PRE>
    * @param code 	: value�� ��� ���� key
    * @return		: String
    * <pre>(key �� null�� �ƴϸ�), "key cannot be null"
    \**************************************************************************/
    public static String getString(String code)
    {
    	CIni.LastModifiedCheck();
		return (String)dbProps.getProperty(code);
	}

	/**************************************************************************\
    * <PRE>
    * �������ε��� �ð� return
    * </PRE>
    * @return:long
    \**************************************************************************/
    private static long getLastModified(){
    	return lastModified;
	}
	
	/**************************************************************************\
    * <PRE>
    * �������ε��ѽð� üũ�Ͽ� static ����
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
			//System.out.println ("global.properties ����Ǿ� ���� ��ε� Start");
    		CIni.loadFromFile(loadfilename);
    		//System.out.println ("global.properties ����Ǿ� ���� ��ε� End");
    	}
	}
}