package ucare.daemon.util;

import java.io.*;
import java.net.Socket;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
//import java.text.DecimalFormat;
//import java.text.SimpleDateFormat;
//import java.util.Calendar;
//import java.util.StringTokenizer;
import java.util.*;

import org.jdom.*;
import org.jdom.input.SAXBuilder;
import ucare.echo.server.ILogger;


public class HostUtil implements ILogger {
   	/**
     * 생성자<BR>
     * @param  none 
     */
   	public HostUtil() {}

   
  //패킷 메시지 만들어 주기...
   	public static String makeMsg(String packetID, String msg, int cnt){
   		String result = null;
   		// 서비스번호(6) + 패킷사이즈(6) + 데이터 건수(3) + msg
   		try{   	   			
   			result = CUtil.pad(packetID,6,' ',false) 
			       + CUtil.pad((msg.getBytes("KSC5601").length + 15) + "",6,'0',true) 
			       + CUtil.pad(cnt + "",3 ,'0' ,true) 
			       + msg;
   		}catch(Exception e){
   			log.error("[makeMsg]" + e);
   			return result;
   		}
   		return result;
   	}
   	
   	
//  //패킷 메시지 만들어 주기...
//   	public static Byte[] makeMsgByte(String packetID, byte[] msg, int cnt){
//   		String result = null;
//   		// 서비스번호(6) + 패킷사이즈(6) + 데이터 건수(3) + msg
//   		try{   	   			
//   			result = CUtil.pad(packetID,6,' ',false) 
//			       + CUtil.pad((msg + 15) + "",6,'0',true) 
//			       + CUtil.pad(cnt + "",3 ,'0' ,true) 
//			       + msg;
//   		}catch(Exception e){
//   			log.error("[makeMsg]" + e);
//   			return result;
//   		}
//   		return result;
//   	}
   	
  //결과만 있는 xml 만들기
   	public static String makeXmlError(String result_code, String errMsg ){
		  String result = "";
		  Element root = null;
		  Document doc = null;
		  XMLOutputter xo = null;	
		  Element child = null;
	      try {
	    	root = new Element("xml-data");

	   		child = new Element("result");
	   		child.setText(result_code);	   		
		    root.addContent(child); 
		    child = new Element("message");
		    child.setText(errMsg);		
		    root.addContent(child); 
	    	  
	  	    doc = new Document(root); //문서 객체 생성		  			  		
	  	    xo = new XMLOutputter();
	        Format fo = xo.getFormat(); //출력형식 얻기
	        fo.setEncoding("UTF-8");
	        fo.setLineSeparator("\r\n"); //줄바꿈
	        fo.setIndent(""); //들여쓰기
	        fo.setTextMode(Format.TextMode.TRIM); //Enter값 무시...
	        xo.setFormat(fo); //출력형식 재 설정
	          
	        result = xo.outputString(doc);	          
	        log.debug(result);
	      }catch(Exception e){
	    	  log.error("[makeXml]" + e.getMessage());
	      }
		  return result;
	  }
   	  

 // xml 받은 문자열 데이타  파싱해서 결과로 돌려준다. -- 결과값만 있는경우.
   	public static Hashtable resolvXmlResult(String packetID, String xml){
   		Hashtable hsXml      = null;
   		Hashtable hsResult   = null;
   		Hashtable hsData     = null;   		
   		String id            = "";
   		SAXBuilder builder   = null;
   		StringReader reader  = null;
   		Document doc         = null;
   		boolean isMulti      = false;
   		try{
   			log.debug("***************************************");
   			log.debug("[resolvXmlResult]packetid:" + packetID);
   			log.debug("[resolvXmlResult]xml:" + xml);
   			
   			hsXml = new Hashtable(); 
   			hsResult = new Hashtable();
   			hsResult.put("result", "");
   			hsResult.put("message", "");
   			
   			packetID = CUtil.nvl(packetID);
   			hsXml.put("PACKETID", packetID); 
	   		builder=new SAXBuilder(false);
	   		reader = new java.io.StringReader(xml);	   		
	        doc = builder.build(reader);

	        Element element = doc.getRootElement();

	        //id 값 체크...
	        if(element.getAttribute("id") != null){	        	
	        	id = CUtil.nvl(element.getAttribute("id").getValue());
	        	if("".equals(packetID) && !"".equals(id)){
	        		hsResult.put("PACKETID", id); 
	        		packetID = id;
	        	}
	        }
	        log.debug("packetid:" + packetID);
	        //child 가져오기..
	        List list = element.getChildren();
	        Iterator iterator = list.iterator();	       
	        ArrayList arlXml = new ArrayList();
	        	     
	        isMulti = chkMulti(list);  //여러건인지 아닌지 체크.    
	        log.debug("ismulti" + isMulti);
	        
	        if(isMulti){
	        	List listChild = null;
		        Iterator iteratorChild = null;
		        while(iterator.hasNext()){
		        	Element child = (Element) iterator.next(); //<info>  
		        	if("result".equals(child.getName()) || "message".equals(child.getName())){
		        		hsResult.put(child.getName(), CUtil.nvl(child.getText()));			        		
		        	}else{
			        	listChild = child.getChildren();  //List
			        	iteratorChild = listChild.iterator(); //Iterator
			        	hsData = new Hashtable();  //값 셋팅할거 초기화
			        	while(iteratorChild.hasNext()){
				     	  Element childChild = (Element) iteratorChild.next();
				     	  hsData.put(childChild.getName(), CUtil.nvl((childChild.getText())));		     	  
				     	  log.debug("Children Element Name[" + childChild.getName() + "] value[" + childChild.getText() + "]");
				        }
			        	arlXml.add(hsData);
		        	}
		        }
	        }else{
	        	hsData = new Hashtable();
		        while(iterator.hasNext()){
		        	Element child = (Element) iterator.next();
		        	if("result".equals(child.getName()) || "message".equals(child.getName())){
		        		hsResult.put(child.getName(), CUtil.nvl(child.getText()));		        		
		        	}else{			     	  
			     	  hsData.put(child.getName(), CUtil.nvl((child.getText())));		     	  
			     	  log.debug("Children Element Name[" + child.getName() + "] value[" + child.getText() + "]");
		        	}
		        }
		        arlXml.add(hsData);
	        }
	        
	        hsResult.put("data", arlXml);
   		}catch(Exception e){
   			hsResult.put("result", "10000");
   			hsResult.put("message", "[결과데이타 처리중 오류]" + e.getMessage());
   			log.error("[resolvXml]" + e);
   			e.printStackTrace();   			
   		}finally{
   			if(reader!=null) try{reader.close();}catch(Exception e){}	 
   		}
   		log.debug("***************************************");
        return hsResult;
   	}
   	
 // xml 받은 문자열 데이타  파싱해서 결과로 돌려준다. -- 결과값만 있는경우.
   	public static Hashtable sendAfterResolvXmlResult(String packetID, String xml){
   		Hashtable hsXml      = null;   		
   		String id            = "";
   		SAXBuilder builder   = null;
   		StringReader reader  = null;
   		Document doc         = null;   		
   		try{
   			hsXml = new Hashtable();
   			hsXml.put("PACKETID", packetID); 
	   		
	   		builder=new SAXBuilder(false);
	   		reader = new java.io.StringReader(xml);	   		
	        doc = builder.build(reader);

	        Element element = doc.getRootElement();
	        id = CUtil.nvl(element.getAttribute("id").getValue());

	      //id 값 체크...
	        if(element.getAttribute("id") != null){	        	
	        	id = CUtil.nvl(element.getAttribute("id").getValue());
	        	if("".equals(packetID) && !id.equals("")){
	        		hsXml.put("PACKETID", id); 
	        		packetID = id;
	        	}
	        }
	        
	        List list = element.getChildren();
	        Iterator iterator = list.iterator();	        
	        while(iterator.hasNext()){
	     	  Element child = (Element) iterator.next();
	     	  hsXml.put(child.getName(), CUtil.nvl((child.getText())));		     	  
	     	  log.debug("Children Element Name[" + child.getName() + "] value[" + child.getText() + "]");
	        }
     
	        hsXml.put("data", hsXml);
	        hsXml.put("result", CUtil.nvl((String)hsXml.get("result")));
   			hsXml.put("message",  CUtil.nvl((String)hsXml.get("message")));		
   		}catch(Exception e){
   			hsXml.put("result", "10000");
   			hsXml.put("message", "[결과데이타 처리중 오류]" + e.getMessage());
   			log.error("[resolvXml]" + e);
   			e.printStackTrace();   			
   		}finally{
   			if(reader!=null) try{reader.close();}catch(Exception e){}	 
   		}
        return hsXml;
   	}	
   	
    public static boolean chkMulti(List list){
    	boolean returl = false;
    	List childList = null;
    	Iterator iterator = list.iterator();
    	while(iterator.hasNext()){
    		Element child = (Element) iterator.next();  	     	      	     	  
	     	childList = child.getChildren();
	     	if(childList.size() > 0) {
	     		returl = true;
	     		break;
	     	}
    	}
    	return returl;
    }
   	
   	public static String makeXml(String packetID, String[] packetSubj, ArrayList arLst){
		  String result = "";
		  Element root = null;
		  Document doc = null;
		  XMLOutputter xo = null;	
		  Element child = null;
		  Element childchild = null;
		  String[] arStr = null;
		  int i = 0;
		  int j = 0;
	      try {
	    	  root = new Element("xml-data");
	    	  root.setAttribute("id", packetID);
	    	  
	    	  if(arLst.size() <= 1){
		    	  for(j = 0;j<arLst.size();j++){
		    		  arStr = (String[])arLst.get(j);	    		  
		    		  for(i=0; i<packetSubj.length; i++){   		 
			    		  child = new Element(packetSubj[i]);
				    	  child.setText(arStr[i]);
				    	  root.addContent(child);
			    	  }
		    	  }
	    	  }else{
		    	  for(j = 0;j<arLst.size();j++){
		    		  child = new Element("info");	    		  
			    	  root.addContent(child);
		    		  arStr = (String[])arLst.get(j);	    		  
		    		  for(i=0; i<packetSubj.length; i++){   		 
		    			  childchild = new Element(packetSubj[i]);
		    			  childchild.setText(arStr[i]);
				    	  child.addContent(childchild);
			    	  }	  
		    	  }
	    	  }	      	  
	  	      doc = new Document(root); //문서 객체 생성		  			  		
	  	      xo = new XMLOutputter();
	          Format fo = xo.getFormat(); //출력형식 얻기
	          fo.setEncoding("UTF-8");
	          fo.setLineSeparator("\r\n"); //줄바꿈
	          fo.setIndent(""); //들여쓰기
	          fo.setTextMode(Format.TextMode.TRIM); //Enter값 무시...
	          xo.setFormat(fo); //출력형식 재 설정	          
	          result = xo.outputString(doc);	          
	          log.debug(result);
	      }catch(Exception e){
	    	  log.error("[makeXml]" + e);
	      }
		  return result;
	  }
   	
  //**********************************************
   	//중계서버로 보낸값의 결과 문자열을 를 ArrayList로 돌려준다.
    //**********************************************
   	public static ArrayList repackMsg(String msg) throws Exception{   		
   		int cnt = 0;
   		int j = 0;
   		String content = "";
   		ArrayList result = null;   		
   		try{   			
   			result = new ArrayList();
   			if(msg == null || msg.length() < 15) return result;
   			content = msg.substring(15);
   			cnt = Integer.parseInt(msg.substring(12,15));
   			log.debug("[데이타건수]" + cnt);
   			for(int i = 0; i< cnt; i++){
   				result.add(new String[]{content.substring(j, j+=11), content.substring(j, j+=10),
   					content.substring(j, j+=1)});   				
//   				content.substring(j, j+=10);
//   				content.substring(j, j+=10);
//   				content.substring(j, j+=1);
   			}
   		}catch(Exception e){
   			log.error("[repackMsg]" + e);
   			throw e;
   		}   		
   		return result;   		   		
   	}
   	
  //**********************************************
   	//IFU003 에 대해 중계서버에서 받은값의 결과 문자열을 를 ArrayList로 돌려준다.
    //**********************************************
   	public static ArrayList repackIFU003Msg(String msg) throws Exception{   		
   		int cnt = 0;
   		int j = 0;
   		String content = "";
   		ArrayList result = null;   		
   		try{   			   			
   			result = new ArrayList();
   			if(msg == null || msg.length() < 15) return result;
   			content = msg.substring(15);
   			cnt = Integer.parseInt(msg.substring(12,15));
   			log.debug("[데이타건수]" + cnt);
   			for(int i = 0; i< cnt; i++){
   				result.add(new String[]{content.substring(j, j+=11)
   									    ,content.substring(j, j+=10)
   									    ,content.substring(j, j+=8)
   										,content.substring(j, j+=6)
										,content.substring(j, j+=10)
										,content.substring(j, j+=1)
										,content.substring(j, j+=1)
   				                       }
   				          );
   			}
   		}catch(Exception e){
   			log.error("[repackMsg]" + e);
   			throw e;
   		}   		
   		return result;   		   		
   	}
   	  	
   	
}