package ucare.daemon.server;


import java.io.*;

import java.util.*;

import org.apache.log4j.PropertyConfigurator;

import ucare.daemon.util.CUtil;
import ucare.echo.server.*;

public class UCareDaemonProp implements ILogger {
		
	  private static final UCareDaemonProp singleton = new UCareDaemonProp();
	  private RoleXmlParser rx=null;
	  private Hashtable hs=null;
//	  private String b_dir = "c:/project/workspace/ucareecho/lib/";
//	  private String b_dir = "/home/nhn/ucareecho/lib/";
	  private String b_dir = "";
	//╫л╠шео...
	  public static UCareDaemonProp getInstance() { 	    
	    return singleton;
	  }
	  public UCareDaemonProp(){	
		//  try{
//		  System.out.println("===================================");
//		  java.util.Enumeration e = System.getProperties().propertyNames();		  
//	        while(e.hasMoreElements()){
//	            String obj = (String)e.nextElement();
//	            System.out.print(obj + "===>");
//	            System.out.println(System.getProperty(obj));
//	        }
//	        System.out.println("===================================");
//	      System.out.println(System.getProperty("java.home"));
	      String javahome = CUtil.nvl(System.getProperty("java.home"));
	      if(javahome.startsWith("/")){
	    	  b_dir = "/home1/irteam/naver/docs/ucareecho/lib/"; 
	      }else{
	    	  b_dir = "c:/project/workspace/ucareecho/lib/";	    	  
	      }
	      
		  System.out.println("b_dir:" + b_dir + "sys.properties");
		  CIni.loadFromFile(b_dir + "sys.properties");
		  PropertyConfigurator.configure(CIni.getString("log4jurl"));					  	  
		  reLoad();
//		  }catch(Exception e){
//			  log.error("[UCareDaemonProp] Creater ERROR:" + e.getMessage());
//		  }		  
	  }
	  
	  public String getProp(String str){		  
		  try{
			  return (String)hs.get(str);
		  }catch(Exception e){
			  return null;
		  }
	  }	  
	  
	  public void reLoad(){
		  try{
			  if(hs != null) {
				  hs.clear();
				  hs = null;
			  }
			    rx  = new RoleXmlParser(CIni.getString("rolexmlurl"));	
				hs 	       = rx.getJobComplexList("NHN");	
				hs.put("b_dir",b_dir);

				log.debug("************************");
				log.debug("b_dir:" + (String)hs.get("b_dir"));
				log.debug("dburl:" + (String)hs.get("dburl"));
				log.debug("dbuser:" + (String)hs.get("dbuser"));
				log.debug("relayport:" + (String)hs.get("relayport"));
				log.debug("relayip:" + (String)hs.get("relayip"));
				log.debug("serverport:" + (String)hs.get("serverport"));
				log.debug("naverurl:" + (String)hs.get("naverurl"));
				log.debug("************************");			
			  }catch(Exception e){
				  log.error("[UCareDaemonProp]" + e);
			  }
	  }
}
