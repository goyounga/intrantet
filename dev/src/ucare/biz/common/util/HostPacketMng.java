package ucare.biz.common.util;

import java.io.*;

import ucare.jaf.common.CIni;
import ucare.jaf.common.CParamSet;
import ucare.jaf.common.CUtil;
import ucare.jaf.common.ILogger;

import java.util.*;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.jdom.output.Format;

public class HostPacketMng implements ILogger {
	
	  private static final HostPacketMng singleton = new HostPacketMng();
	  private Hashtable hsPacket = null;
	  
	//싱글턴...
	  public static HostPacketMng getInstance() {		  
	    return singleton;
	  }
	  public HostPacketMng(){	
		  log.debug("*******HostPacketMng Created***********");
		  reLoad();
	  }
	  
	  public Object getPacketTitle(String packetID){
		  log.debug("[getPacketTitle]" + packetID);
		  try{
			  return hsPacket.get(packetID);
		  }catch(Exception e){
			  return null;
		  }
		  
	  }	

	  
	  public void reLoad(){
		  log.debug("*******HostPacketMng reLoad***********");
		  String lineString = "";		  		  
		  String[] gubun = null;
		  LineNumberReader lineReader = null;
		  try{
			  if(hsPacket != null) {
				  hsPacket.clear();
				  hsPacket = null;
			  }
			  
			  hsPacket = new Hashtable();		  		  
			  lineReader = new LineNumberReader(new FileReader(CIni.getString("xml.dirPath") + "/host/IFN000.txt"));
			  while ((lineString = lineReader.readLine()) != null) {
				  if(lineString.startsWith("#") || "".equals(CUtil.trim(lineString))) continue;
				  gubun = lineString.split("=");
				  if(gubun.length < 2) continue;
				  if(gubun[0].indexOf("_URL") > 0){ //주소값일경우 셋팅
					  hsPacket.put(gubun[0], CUtil.trim(gubun[1]));
					  log.debug(gubun[0] + ":" + gubun[1]);
					  continue;
				  }
				  hsPacket.put(gubun[0], arrayTrim(gubun[1].split(",")));	
			  }
		  }catch(Exception e){
			  try{lineReader.close();}catch(Exception ex){log.error(ex);}
			  log.error("[HostPacketMng]"+ e);
		  }		  
	  }
	  
	  public String[] arrayTrim(String[] arArg){
		  String[] arResult = new String[arArg.length];
		  for(int i = 0; i<arResult.length; i++){
			  arResult[i] = CUtil.trim(arArg[i]);
		  }
		  return arResult;
	  }
}
