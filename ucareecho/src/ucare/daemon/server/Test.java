package ucare.daemon.server;

import java.io.*;
import java.net.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.*;


import ucare.daemon.util.*;
import ucare.echo.server.*;

import org.apache.log4j.PropertyConfigurator;


/**
 * Message Server 를 중지 한다.<br>
 * /bin/stopserver 를 실행하여 ShutDownServer 를 호출 할 수 있습니다.
 */
public class Test implements ILogger {
	
	private static String ip=null;
	private static int port=0;
	private Socket socket=null;
//	private BufferedReader br=null;
//	private BufferedWriter bw=null;
	
	public static void main(String args[]){
		CIni.loadFromFile(args[0]);
		PropertyConfigurator.configure(CIni.getString("log4jurl"));
		
		ip=args[1];
		port=Integer.parseInt(args[2]);
		log.debug("************************");
		log.debug("ip:" + ip);
		log.debug("port:" + port);
		log.debug("************************");
		new Test().test();
	}
	
	private void test(){
		Connection        conn   = null;
		try{			
			UCareDaemonProp ucProp = UCareDaemonProp.getInstance();
			String dburl     = ucProp.getProp("dburl");
			String dbuser    = ucProp.getProp("dbuser");
			String dbpass    = ucProp.getProp("dbpass");
			log.debug("dburl:" + dburl);
			log.debug("dbuser:" + dbuser);
			log.debug("dbpass:" + dbpass);			
			Class.forName( "oracle.jdbc.driver.OracleDriver");		    	
			conn = DriverManager.getConnection(dburl, dbuser, dbpass);
		}catch(Exception e){
			log.info("ERROR["+e.getMessage()+"]");
			e.printStackTrace();			
		}finally{
//			try{socketClose();}catch(Exception ee){ee.printStackTrace();}
			if(conn != null)  try{conn.setAutoCommit(true);}catch(Exception e){log.error(e);}
		}
	}
	
}