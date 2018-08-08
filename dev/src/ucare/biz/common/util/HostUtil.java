package ucare.biz.common.util;

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

import ucare.jaf.common.*;
import ucare.jaf.database.IQuery;
import ucare.jpattern.common.actionform.ComActionForm;
import ucare.jpattern.common.bean.ComDB;
import ucare.jpattern.xmlhandler.CXmlParser;
import ucare.jaf.database.IDataSet;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;


/**
 * 	  프로그램시 필요한 기능들을 모아 두었다.<br>
 *@version  1.0
 *@author 	ucare
 */
public class HostUtil implements ILogger {
   	/**
     * 생성자<BR>
     * @param  none 
     */
   	public HostUtil() {}

   	
   	
   	public static String makeXml(String[] packetSubj, CParamSet cParamSet){
		  String result = "";
		  Element root = null;
		  Document doc = null;
		  XMLOutputter xo = null;	
		  Element child = null;
	      try {
	    	  root = new Element("xml-data");
	    	  root.setAttribute("id", CUtil.nvl(cParamSet.getParam("xmlid").asString()));
	    	  for(int i=0; i<packetSubj.length; i++){	    		 
	    		  child = new Element(packetSubj[i]);
		    	  child.setText(cParamSet.getParam(packetSubj[i]).asString());		
		    	  root.addContent(child); 
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
   	  
//   	// xml 받은 문자열 데이타  파싱해서 결과로 돌려준다.
//   	public Hashtable resolvXml(String packetID, String xml, boolean fromNHN, String inOut){
//   		Hashtable hsXml = null;
//   		Hashtable hsResult = null;
//   		HostPacketMng xmlMng = HostPacketMng.getInstance();
//   		try{
//   			hsXml = new Hashtable();
//   			hsResult = new Hashtable();
////   			xml = "<?xml version='1.0' encoding='UTF-8' ?><xml-data id='INCAT06'><atcl_no>0900000690</atcl_no> <atcl_tp>매매</atcl_tp> <cust_nm>woori</cust_nm> <law_addr1>서울시 금천구 시흥동</law_addr1> <law_addr2>21-1</law_addr2> <adm_addr1>서울시 금천구 시흥동</adm_addr1> <law_addr2>21-1</law_addr2> <atcl_spc>0/200</atcl_spc> <atcl_rg_prc>5,000</atcl_rg_prc> <atcl_min_prc>4500.0</atcl_min_prc> <atcl_max_prc>5500.0</atcl_max_prc> <atcl_rg_dttm>20090218153306</atcl_rg_dttm> </xml-data>";
//	   		
//	   		SAXBuilder builder=new SAXBuilder(false);
//	   		StringReader reader = new java.io.StringReader(xml);	   		
//	        Document doc = builder.build(reader);
//
//	        Element element = doc.getRootElement();
//	        if(fromNHN){
//	            log.debug("element.getAttribute(id)");
//	        	log.debug(element.getAttribute("id").getValue());
//	        	log.debug("element.getAttribute(id)");
//	        	hsXml.put("PACKETID", CUtil.nvl(element.getAttribute("id").getValue()));
//	        	packetID = CUtil.nvl(element.getAttribute("id").getValue());
//	        }
//	        java.util.List list = element.getChildren();
//	        Iterator iterator = list.iterator();	  
//	        
//	        while(iterator.hasNext()) {
//	     	  Element child = (Element) iterator.next();	     	 
//	     	  hsXml.put(child.getName(), CUtil.nvl((child.getText())));		     	  
//	     	  log.debug("Children Element Name: " + child.getName() + ":" + child.getText());
//	     	}	        
//	        String[] packetEle = null;
//	        try{	        	
//	          packetEle = xmlMng.getPacketTitle(packetID + "_" + inOut);
//	          if( packetEle == null) throw new Exception("패킷 아이디가 없습니다.");
//	        }catch(Exception e){
//	        	hsXml.put("RESULT_CODE", "1");
//	   			hsXml.put("RESULT_MSG", "[잘못된 패킷 ID" + packetID + "_" + inOut + "]" + e.getMessage());
//	   			log.error("[resolvXml]" + e);
//	   			return hsXml;
//	        }
//	        
//	        String[] resultEle = new String[packetEle.length];		        
//	        for(int i=0; i< packetEle.length; i++){
//	        	resultEle[i] = CUtil.nvl((String)hsXml.get(packetEle[i]));  //요소값 찾아서 넣는다.	        		        	
//	        }	        
//	        hsXml.put("RESULT", resultEle);	 	        
//	        hsXml.put("RESULT_CODE", CUtil.nvl((String)hsXml.get("RESULT_CODE")));	        
//   			hsXml.put("RESULT_MSG",  CUtil.nvl((String)hsXml.get("RESULT_MSG")));   			
//   			hsXml.put("RESULT_CODE", "0");
//   		}catch(Exception e){
//   			hsXml.put("RESULT_CODE", "1");
//   			hsXml.put("RESULT_MSG", "[결과데이타 처리중 오류]" + e.getMessage());
//   			log.error("[resolvXml]" + e);
//   			e.printStackTrace();   			
//   		}
//        return hsXml;
//   	}
   	
 // xml 받은 문자열 데이타  파싱해서 결과로 돌려준다. -- 결과값만 있는경우.
   	public static Hashtable resolvXmlResult(String packetID, String xml){
   		Hashtable hsXml      = null;
   		Hashtable hsResult   = null;
   		Hashtable hsData     = null;
   		HostPacketMng xmlMng = HostPacketMng.getInstance();
   		String id            = "";
   		SAXBuilder builder   = null;
   		StringReader reader  = null;
   		Document doc         = null;
   		String[] packetEle   = null;
   		boolean isMulti      = false;
   		int cnt = 0;
   		try{
   			log.debug("***************************************");
   			log.debug("[resolvXmlResult]packetid:" + packetID);
   			log.debug("[resolvXmlResult]xml:" + xml);
   			hsXml    = new Hashtable(); 
   			hsResult = new Hashtable();
   			hsResult.put("result", "");
   			hsResult.put("message", "");
   			
   			packetID = CUtil.nvl(packetID);
   			hsXml.put("PACKETID", packetID); 
////   			xml = "<?xml version='1.0' encoding='UTF-8' ?><xml-data id='INCAT06'><atcl_no>0900000690</atcl_no> <atcl_tp>매매</atcl_tp> <cust_nm>woori</cust_nm> <law_addr1>서울시 금천구 시흥동</law_addr1> <law_addr2>21-1</law_addr2> <adm_addr1>서울시 금천구 시흥동</adm_addr1> <law_addr2>21-1</law_addr2> <atcl_spc>0/200</atcl_spc> <atcl_rg_prc>5,000</atcl_rg_prc> <atcl_min_prc>4500.0</atcl_min_prc> <atcl_max_prc>5500.0</atcl_max_prc> <atcl_rg_dttm>20090218153306</atcl_rg_dttm> </xml-data>";
//   			xml = "<?xml version='1.0' encoding='UTF-8' ?><xml-data id='INCAT07'>";
////   			xml += "<atcl_no>0900000690</atcl_no> <atcl_tp>매매</atcl_tp> <cust_nm>woori</cust_nm> <law_addr1>서울시 금천구 시흥동</law_addr1> <law_addr2>21-1</law_addr2> <adm_addr1>서울시 금천구 시흥동</adm_addr1> <law_addr2>21-1</law_addr2> <atcl_spc>0/200</atcl_spc> <atcl_rg_prc>5,000</atcl_rg_prc> <atcl_min_prc>4500.0</atcl_min_prc> <atcl_max_prc>5500.0</atcl_max_prc> <atcl_rg_dttm>20090218153306</atcl_rg_dttm>";
//   			xml += "<result>0000</result><message>메시지메시지</message>";
//   			xml += "<info><atcl_no>0900000690</atcl_no> <atcl_tp>매매</atcl_tp> <cust_nm>woori</cust_nm> <law_addr1>서울시 금천구 시흥동</law_addr1> <law_addr2>21-1</law_addr2> <adm_addr1>서울시 금천구 시흥동</adm_addr1> <law_addr2>21-1</law_addr2> <atcl_spc>0/200</atcl_spc> <atcl_rg_prc>5,000</atcl_rg_prc> <atcl_min_prc>4500.0</atcl_min_prc> <atcl_max_prc>5500.0</atcl_max_prc> <atcl_rg_dttm>20090218153306</atcl_rg_dttm> </info>";
//   			xml += "<info><atcl_no>0900000691</atcl_no> <atcl_tp>매매</atcl_tp> <cust_nm>woori</cust_nm> <law_addr1>서울시 금천구 시흥동</law_addr1> <law_addr2>21-1</law_addr2> <adm_addr1>서울시 금천구 시흥동</adm_addr1> <law_addr2>21-1</law_addr2> <atcl_spc>0/200</atcl_spc> <atcl_rg_prc>5,000</atcl_rg_prc> <atcl_min_prc>4500.0</atcl_min_prc> <atcl_max_prc>5500.0</atcl_max_prc> <atcl_rg_dttm>20090218153306</atcl_rg_dttm> </info>";
//   			xml += 	"</xml-data>";
	   		builder=new SAXBuilder(false);
	   		reader = new java.io.StringReader(xml);	   		
	        doc = builder.build(reader);

	        Element element = doc.getRootElement();

	        //id 값 체크...
	        if(element.getAttribute("id") != null){	        	
	        	id = CUtil.nvl(element.getAttribute("id").getValue());
	        	if("".equals(packetID) && !id.equals("")){
	        		hsResult.put("PACKETID", id); 
	        		packetID = id;
	        	}
	        }
	        log.debug("packetid:" + packetID);
	        //child 가져오기..
	        List list = element.getChildren();
	        Iterator iterator = list.iterator();	       
	        ArrayList arlXml = new ArrayList();
	        
	      //여러건인지 아닌지 체크.
	        isMulti = chkMulti(list); //	       
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
			        	log.debug("listChild" + listChild.size());
			        	iteratorChild = listChild.iterator(); //Iterator
			        	hsData = new Hashtable();  //값 셋팅할거 초기화
			        	cnt = 0;
			        	while(iteratorChild.hasNext()){
				     	  Element childChild = (Element) iteratorChild.next();
				     	  cnt++;
				     	  hsData.put(childChild.getName(), CUtil.nvl((childChild.getText())));		     	  
				     	  log.debug("Children Element Name[" + childChild.getName() + "] value[" + childChild.getText() + "]");
				        }
			        	if(cnt > 0) arlXml.add(hsData); //데이타값이 있으면 넣기.
		        	}
		        }
	        }else{
	        	hsData = new Hashtable();
	        	cnt = 0;
		        while(iterator.hasNext()){
		        	Element child = (Element) iterator.next();
		        	if("result".equals(child.getName()) || "message".equals(child.getName())){
		        		hsResult.put(child.getName(), CUtil.nvl(child.getText()));		        		
		        	}else{	
		        	  cnt++;
			     	  hsData.put(child.getName(), CUtil.nvl((child.getText())));		     	  
			     	  log.debug("Children Element Name[" + child.getName() + "] value[" + child.getText() + "]");
		        	}
		        }
		        if(cnt > 0) arlXml.add(hsData);  //데이타값이 있으면 넣기.
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
        return hsResult;
   	}
   	
// // xml 받은 문자열 데이타  파싱해서 결과로 돌려준다. -- 결과값만 있는경우.
//   	public static Hashtable sendAfterResolvXmlResult(String packetID, String xml){
//   		Hashtable hsXml      = null;   		
//   		String id            = "";
//   		SAXBuilder builder   = null;
//   		StringReader reader  = null;
//   		Document doc         = null;
//   		String[] packetEle   = null;
//   		HostPacketMng xmlMng = HostPacketMng.getInstance();
//   		try{
//   			log.debug("***************************************");
//   			log.debug("[resolvXmlResult]packetid:" + packetID);
//   			log.debug("[resolvXmlResult]xml:" + xml);
//   			hsXml = new Hashtable();
//   			hsXml.put("PACKETID", packetID); 
////   			xml = "<?xml version='1.0' encoding='UTF-8' ?><xml-data id='INCAT06'><atcl_no>0900000690</atcl_no> <atcl_tp>매매</atcl_tp> <cust_nm>woori</cust_nm> <law_addr1>서울시 금천구 시흥동</law_addr1> <law_addr2>21-1</law_addr2> <adm_addr1>서울시 금천구 시흥동</adm_addr1> <law_addr2>21-1</law_addr2> <atcl_spc>0/200</atcl_spc> <atcl_rg_prc>5,000</atcl_rg_prc> <atcl_min_prc>4500.0</atcl_min_prc> <atcl_max_prc>5500.0</atcl_max_prc> <atcl_rg_dttm>20090218153306</atcl_rg_dttm> </xml-data>";
//	   		
//	   		builder=new SAXBuilder(false);
//	   		reader = new java.io.StringReader(xml);	   		
//	        doc = builder.build(reader);
//
//	        Element element = doc.getRootElement();
//	        id = CUtil.nvl(element.getAttribute("id").getValue());
//
//	      //id 값 체크...
//	        if(element.getAttribute("id") != null){	        	
//	        	id = CUtil.nvl(element.getAttribute("id").getValue());
//	        	if("".equals(packetID) && !id.equals("")){
//	        		hsXml.put("PACKETID", id); 
//	        		packetID = id;
//	        	}
//	        }
//	        log.debug("packetid:" + packetID);
//
//	        List list = element.getChildren();
//	        Iterator iterator = list.iterator();	        
//	        while(iterator.hasNext()){
//	     	  Element child = (Element) iterator.next();
//	     	  hsXml.put(child.getName(), CUtil.nvl((child.getText())));		     	  
//	     	  log.debug("Children Element Name[" + child.getName() + "] value[" + child.getText() + "]");
//	        }
//	        	        
//	        try{	        	
//	        	packetEle = (String[])xmlMng.getPacketTitle(packetID + "_OUT");
//	          if( packetEle == null) throw new Exception("패킷 목록에 정의된 값이 없습니다.[" + packetID + "_OUT]");
//	        }catch(Exception e){
//	        	hsXml.put("result", "10000");
//	   			hsXml.put("message", "[잘못된 패킷 ID" + packetID + "_OUT" + "]" + e.getMessage());
//	   			log.error("[resolvXml]" + e);
//	   			return hsXml;
//	        }
//	        
//	        String[] resultEle = new String[packetEle.length];		        
//	        for(int i=0; i< packetEle.length; i++){	        	
//	        	resultEle[i] = CUtil.nvl((String)hsXml.get(packetEle[i]));  //요소값 찾아서 넣는다.	
//	        }
//	        hsXml.put("data", resultEle);
//	        hsXml.put("result", CUtil.nvl((String)hsXml.get("result")));
//   			hsXml.put("message",  CUtil.nvl((String)hsXml.get("message")));		
//   		}catch(Exception e){
//   			hsXml.put("result", "1");
//   			hsXml.put("message", "[결과데이타 처리중 오류]" + e.getMessage());
//   			log.error("[resolvXml]" + e);
//   			e.printStackTrace();   			
//   		}finally{
//   			if(reader!=null) try{reader.close();}catch(Exception e){}	 
//   		}
//        return hsXml;
//   	}	
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
   	    
   		public static Hashtable INFProcess(String packetID, ComActionForm comForm) throws Exception{
   			String xmlResult = "";
   			HostPacketMng xmlMng = HostPacketMng.getInstance();
   			CParamSet cParamSet = null;
   			Hashtable result = null;
   			try{
   				log.debug("[INFProcess]---------------------------");
   				cParamSet = comForm.getParamset();   
   				SockUtil su = new SockUtil();
   				xmlResult = su.sendMsgHttpURL(CIni.getString("NAVERURL") + xmlMng.getPacketTitle(packetID + "_URL"), 
   						                   makeXml((String[])xmlMng.getPacketTitle(packetID + "_IN"), cParamSet));
   				if("".equals(xmlResult))
   					throw new Exception("인터페이스 오류 입니다.");
   				result = resolvXmlResult(packetID, xmlResult);   
   				
   				//개인정보 조회이력 쌓기..
   				if("INCAT06".equals(packetID) && "00000".equals(CUtil.nvl((String)result.get("result")))){
   					HostProcess hp = new HostProcess();
   					hp.INCAT06(comForm);
   				}
   			}catch(Exception e){
   				result = new Hashtable();
   				result.put("result", "10000");
   				result.put("message", e.getMessage());
   				log.error("[INFProcess ERROR]" + e.getMessage());
   			}
   			return result;
   		}
   		   	   		
   		
   	// xml 받은 문자열 데이타  파싱해서 결과로 돌려준다. -- 결과값만 있는경우.
   	   	public static void readTest(String xml){
   	   		Hashtable hsXml      = null;
   	   		HostPacketMng xmlMng = HostPacketMng.getInstance();
   	   		String id            = "";
   	   		SAXBuilder builder   = null;
   	   		StringReader reader  = null;
   	   		Document doc         = null;
   	   		String[] packetEle   = null;
   	   		try{
   	   			hsXml = new Hashtable();
  		   		
   		   		builder=new SAXBuilder(false);
   		   		reader = new java.io.StringReader(xml);	   		
   		        doc = builder.build(reader);

   		        Element element = doc.getRootElement();
   		        id = CUtil.nvl(element.getAttribute("id").getValue());
   		        log.debug("id" + id);
   	        	if(!id.equals("")){
   	        		hsXml.put("PACKETID", CUtil.nvl(element.getAttribute("id").getValue())); 
   	        	}
   		        List list = element.getChildren();
   		     
   		        log.debug("list.size()" + list.size());
   		        log.debug("element.getName()" + element.getName());
   		        Iterator iterator = list.iterator();
   		        while(iterator.hasNext()){
   		     	  Element child = (Element) iterator.next();
   		     	  hsXml.put(child.getName(), CUtil.nvl((child.getText())));		     	  
   		     	  log.debug("Children Element Name[" + child.getName() + "] value[" + child.getText() + "]");
   		        }
   		        	        
   		       
   	   		}catch(Exception e){
   	   			log.error("[resolvXml]" + e);
   	   			e.printStackTrace();   			
   	   		}finally{
   	   			if(reader!=null) try{reader.close();}catch(Exception e){}	 
   	   		}

   	   	}
   	   	
//   		public boolean INFProcess(String packetID, Hashtable hst, String inOut){
//   			String xmlResult = "";
//   			HostPacketMng xmlMng = HostPacketMng.getInstance();
//   			CParamSet cParamSet = null;
//   			Hashtable result = null;
//   			String name = "";
//   			try{
//				cParamSet = new CParamSet();
//				Enumeration e = hst.keys();		
//				while(e.hasMoreElements()){					
//	   			  	name = (String)e.nextElement();
//	   			  	log.debug("[" + name + "]" + CUtil.nvl((String)hst.get(name)));
//	   			  	cParamSet.setParam(name, CUtil.nvl((String)hst.get(name)));	   			  	
//	   			}
//				cParamSet.setParam("xmlid", packetID);
//   				xmlResult = sendMsgHttpURL(CIni.getString("NAVERURL"), 
//   						                   makeXml(xmlMng.getPacketTitle(packetID + "_" + inOut), cParamSet));
//   				
//   				log.debug("*******************************");
//   				log.debug(xmlResult);
//   				log.debug("*******************************");
//   				if("".equals(xmlResult))
//   					return false;
//   				
//   				result    = resolvXmlResult(packetID, xmlResult);
//   				
//   				if("0".equals(CUtil.nvl((String)result.get("RESULT_CODE")))){   					
//   					return true;
//   				}else{   					
//   					log.error("[INFProcess XML RESULT ERROR]" + CUtil.nvl((String)result.get("RESULT_MSG")));   					
//   					return false;   			   					
//   				}
//   			}catch(Exception e){
//   				log.error("[INFProcess ERROR]" + e.getMessage());
//   				return false;
//   			}   			   			
//   		}
   		
   		
//   	public String read_data(InputStream in) throws Exception
//	{
//   		ByteArrayOutputStream bout = null;
//   		try{   
//	   		if(in == null || in.available() < 0) return "";	   		
//		    bout = new ByteArrayOutputStream();
//		    int bcount = 0, n=0;
//		    byte buf[] = new byte[2048];
//		    int read_retry_count = 0;		    
//		    do {
//		        n = in.read(buf);
//		        log.debug("읽기" + n);
//		        if(n > 0) {
//		            bcount += n;
//		            bout.write(buf, 0, n);
//		        }
//		        else if(n == -1) break;
//		        else if(n == 0 && ++read_retry_count == 10)
//		            throw new IOException("inputstream-read-retry-count( 10) exceed !");
//		    } while(true);
//		    log.debug("읽기 끝");
//		    bout.flush();
//   		}catch(Exception e){
//   			log.error("[read_data]" + e.getMessage());
//   			return "";
//   		}
//   		return bout.toString();
////	    return bout.toByteArray();
//	}
   	
	

	
  //********************************** httpclient 사용 **********************************		
//  			
////              new MultiThreadedHttpConnectionManager()
//  			client = new HttpClient(); 
//  			client.getHostConfiguration().setHost("127.0.0.1", 8080, "http");
  //	
////              client.setTimeout(5000);
//  			log.debug("111111111111111192.168.10.107");
//  			PostMethod xmlMethod = new PostMethod("/test.jsp"); 
//  			xmlMethod.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
//              entity = new InputStreamRequestEntity(is, "text/xml");
//  			log.debug("222222222222222222");
////              xmlMethod.setRequestEntity(entity);
////              method = xmlMethod;             
//              responseCode = client.executeMethod(method); 
//              log.debug("3333333333333333333333:" + responseCode);
//              if(responseCode == HttpStatus.SC_OK) 
//              { 
//              	
//  	        	/**Call method.getResponseBodyAsString(). 
//  	        	 * This will return a String containing the response body. 
//  	        	 * Be warned though that the conversion from bytes to a String is done 
//  	        	 * using the default encoding so this method may not be portable across all platforms. 
//  	        	 * */            	
//              	content = method.getResponseBodyAsString();             
//  	        	/**Call method.getResponseBodyAsStream()
//  	        	 * and read the entire contents of the stream then call stream.close().
//  	        	 *  This method is best if it is possible for a lot of data to be received 
//  	        	 *  as it can be buffered to a file or processed as it is read. 
//  	        	 *  Be sure to always read the entirety of the data and call close on the stream.  
//  	        	 * */  
//                  contentIns = method.getResponseBodyAsStream();
//              } 
//              log.debug("4444444444444444444444444444");
//              log.debug(contentIns.toString());
  			//********************************** httpclient 사용 **********************************					
  			   	
}