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


public class SockUtil extends Thread implements ILogger {
   	/**
     * 생성자<BR>
     * @param  none 
     */
   	public SockUtil() {}
   	/**
	 * HttpURLConnection 사용하여 메시지 전송후 결과 받기 
	 */	
   	public String sendMsgHttpURL(String addr, String msg) throws Exception{   	
   		String result = "";
   		String line = "";
   		InputStream    ins = null;
   		BufferedReader in  = null;
   		DataOutputStream os = null;
   		try{
   			log.debug("***************** HttpURLConnection 생성(sendMsgHttpURL) ***************");
   			log.debug(addr);
   			log.debug("[" + msg +"]");
   			log.debug("*********************************************************");
			java.net.URL targetURL = new java.net.URL(addr);			
			java.net.HttpURLConnection u = (java.net.HttpURLConnection)targetURL.openConnection();						
			u.setRequestMethod("POST");		
			u.setDoOutput(true);
			u.setDoInput(true);				

			os = new DataOutputStream(u.getOutputStream());			
			os.write(("xmlData="+ msg).getBytes("UTF-8"));	
			os.flush();
				
			ins = u.getInputStream();
			in = new BufferedReader(new InputStreamReader(ins, "UTF-8"));						
			
			while(true) {			
		        line = in.readLine();     		        
		        if(line==null) break;
		        result += line;
			}
			log.debug("******************RECEIVED DATA*****************************");
   			log.debug("[" + result + "]");
   			log.debug("***************** HttpURLConnection 종료 ********************");
   			log.debug("************************************************************");   			
   		}catch(Exception e){
   			throw e;
   		}finally{		
   			if(os!=null)  try{os.close(); }catch(Exception e){log.error(e);}
   			if(ins!=null) try{ins.close();}catch(Exception e){log.error(e);}
   			if(in!=null)  try{in.close(); }catch(Exception e){log.error(e);}
   		}
		return result;		
   	}   	   	   	
   	
   	
   	/**
	 * sendMsgSocket 사용하여 메시지 전송후 결과 받기 
	 */	
   	public String sendMsgSocket(String addr, int port, String msg){   	
   		String result = "";
   		Socket socket=null;
//   		InputStream in = null;
//   		OutputStream out = null;
   		BufferedInputStream in = null;
   		BufferedOutputStream out= null;
   		try{   			
   			log.debug("***************** 소켓 생성(sendMsgSocket) ***************");
   			log.debug(addr + ":" + port);
   			log.debug("[" + msg + "]");
   			log.debug("*********************************************************");
   			socket =  new Socket(addr,port);   
   			socket.setSoTimeout(1000 * 60 * 3);
//   			in     = socket.getInputStream();
//   			out    = socket.getOutputStream();   	
   			in     = new BufferedInputStream(socket.getInputStream());
   			out    = new BufferedOutputStream(socket.getOutputStream());   
			out.write(msg.getBytes("KSC5601"));
			out.flush();
			result = read_relay_data(in);
			
   		}catch(Exception e){
   			log.debug("[sendMsgSocket]" + e.getMessage());
   			e.printStackTrace();
   		}finally{
   			log.debug("******************RECEIVE**********************************");
   			log.debug("[" + result + "]");
   			log.debug("***************** Socket close(sendMsgSocket) ***************");
   			log.debug("*********************************************************");   			
   			if(in!=null) try{in.close();}catch(Exception e){}
			if(out!=null) try{out.close();}catch(Exception e){}   			
			if(socket!=null) try{socket.close();}catch(Exception e){}
   		}
		return result;					
   	}
   	
   	/**
	 * sendMsgSocket 사용하여 메시지 전송후 결과 받기 
	 */	
   	public String sendMsgSocket(String addr, int port, byte[] msg, int iTimeOut){   	
   		String result           = "";
   		Socket socket           = null;
   		BufferedInputStream in  = null;
   		BufferedOutputStream out= null;
   		try{   			
   			log.debug("***************** 소켓 생성(sendMsgSocket) ***************");
   			log.debug(addr + ":" + port);
   			log.debug("[" + new String(msg) + "]");
   			log.debug("*********************************************************");
   			socket =  new Socket(addr,port);   
   			socket.setSoTimeout(iTimeOut);

   			in     = new BufferedInputStream(socket.getInputStream());
   			out    = new BufferedOutputStream(socket.getOutputStream()); 
   			out.write(msg);
			out.flush();
			result = read_relay_data(in);
			
   		}catch(Exception e){
   			log.debug("[sendMsgSocket]" + e.getMessage());
   			e.printStackTrace();
   		}finally{
   			log.debug("******************RECEIVE**********************************");
   			log.debug("[" + result + "]");
   			log.debug("***************** Socket close(sendMsgSocket) ***************");  			
   			if(in!=null) try{in.close();}catch(Exception e){}
			if(out!=null) try{out.close();}catch(Exception e){}   			
			if(socket!=null) try{socket.close();}catch(Exception e){}
   		}
		return result;					
   	}

   	/**
	 * sendMsgSocket 사용하여 메시지 전송후 결과 받기 
	 */	
//   	public String sendMsgSocket(String msg_key, String addr, int port, String msg){   	
//   		String result = "";
//   		Socket socket=null;
////   		InputStream in = null;
////   		OutputStream out = null;
//   		BufferedInputStream in = null;
//   		BufferedOutputStream out= null;
//   		try{   			
//   			log.debug("***************** 소켓 생성(sendMsgSocket) ***************");
//   			log.debug(msg_key + ":" + addr + ":" + port);
//   			log.debug("[" + msg + "]");
//   			log.debug("*********************************************************");
//   			socket =  new Socket(addr,port);   
//   			socket.setSoTimeout(1000 * 60 * 3);
////   			in     = socket.getInputStream();
////   			out    = socket.getOutputStream();   	
//   			in     = new BufferedInputStream(socket.getInputStream());
//   			out    = new BufferedOutputStream(socket.getOutputStream());   
//			   			
//			out.write(msg.getBytes());	
//			out.flush();
//			result = read_relay_data(msg_key, in);
//			
//   		}catch(Exception e){
//   			log.debug("[sendMsgSocket]" + e.getMessage());
//   			e.printStackTrace();
//   		}finally{
//   			log.debug("******************RECEIVE**********************************");
//   			log.debug("[" + result + "]");
//   			log.debug("***************** 소켓 종료(sendMsgSocket) ***************");
//   			log.debug("*********************************************************");   			
//   			if(in!=null) try{in.close();}catch(Exception e){}
//			if(out!=null) try{out.close();}catch(Exception e){}   			
//			if(socket!=null) try{socket.close();}catch(Exception e){}
//   		}
//		return result;					
//   	}
   	
   	public String read_relay_data(BufferedInputStream in) {
   		byte[] headbuf = null;
   		byte[] contbuf = null;
   		String result  = "";
   		String head    = "";
   		int n = 0;
   		int data_length = 0;
   		int in_avail = 0;
   		int i = 0;
   		try{
   			while(true){
   				if( in.available() >= 15 ) break;   				
   				this.sleep(500);
   			}
//   			in_avail = in.available();
//   			if( in_avail < 15){
//   				log.error("[wrong message]available length:"  + in_avail );
//   				if ( in_avail < 1) return "";   				
//   				headbuf = new byte[in_avail];
//   				in.read(headbuf);
//	        	return CUtil.nvl(new String(headbuf));
//   			}
   			headbuf = new byte[15];
			n = in.read(headbuf);
			
			log.debug("[header][" + new String(headbuf) + "]");
	        if(n<0) {
	        	log.error("[wrong message]length:"  + n );
	        	return "";
	        }
	        head = CUtil.nvl(new String(headbuf)).trim();
	        if(head.length() < 15) {
	        	log.error("[wrong message]" + head );
	        	return "";
	        }
	        in_avail = in.available();
	        try{
	        	data_length = Integer.parseInt(head.substring(6,12)) - 15;	        
	        	log.debug("[read_relay_data]cont_length[" + (Integer.parseInt(head.substring(6,12)) - 15)
	        			+ "]available[" + in_avail + "]");
	        }catch(Exception e){
	        	log.error("[read_relay_data]ERROR NOT SPEC:" + new String(head) + ":" + e.getMessage());	        	
	        }
//	        if(data_length < 1) {
//	        	log.error("[wrong message]" + head );
//	        	return "";
//	        }
	        if(in_avail < data_length){
	        	data_length = in_avail;
	        }
	        log.debug("data_length" + data_length);
	        contbuf = new byte[ data_length];
	        n = in.read(contbuf);	        
	        if(n < 1){
	        	log.error("[wrong message]" + head );
	        	return head;
	        }
	        result = head + new String(contbuf);
		    
   		}catch(Exception e){
   			log.error("[read_relay_data]" + e );
   		}
   		return result;
	}  
   	
//   	public String read_relay_data(String msg_key, BufferedInputStream in) {
//   		byte[] headbuf = null;
//   		byte[] contbuf = null;
//   		String result  = "";
//   		String head    = "";
//   		int n = 0;
//   		int data_length = 0;
//   		int in_avail = 0;
//   		try{
//   			log.debug("[key]" + msg_key);
//   			while(true){
//   				if( in.available() > 0) break;
//   				log.debug("available[key]" + msg_key);
//   				this.sleep(500);
//   			}
//   			in_avail = in.available();
//   			if( in_avail < 15){
//   				log.error("[wrong message]available length:"  + in_avail );
//   				if ( in_avail < 1) return "";   				
//   				headbuf = new byte[in_avail];
//   				in.read(headbuf);
//	        	return CUtil.nvl(new String(headbuf));
//   			}
//   			headbuf = new byte[15];
//			n = in.read(headbuf);
//			
//			log.debug("[header][" + new String(headbuf) + "]");
//	        if(n<0) {
//	        	log.error("[wrong message]length:"  + n );
//	        	return "";
//	        }
//	        head = CUtil.nvl(new String(headbuf)).trim();
//	        if(head.length() < 15) {
//	        	log.error("[wrong message]" + head );
//	        	return "";
//	        }
//	        in_avail = in.available();
//	        
//	        data_length = Integer.parseInt(head.substring(6,12)) - 15;	        
//	        log.debug("[read_relay_data]cont_length[" + (Integer.parseInt(head.substring(6,12)) - 15)
//	        		+ "]available[" + in_avail + "]");
////	        if(data_length < 1) {
////	        	log.error("[wrong message]" + head );
////	        	return "";
////	        }
//	        if(in_avail < data_length){
//	        	data_length = in_avail;
//	        }
//	        log.debug("[key]" + msg_key + ":data_length:" + data_length);
//	        contbuf = new byte[ data_length];
//	        n = in.read(contbuf);	        
//	        if(n < 1){
//	        	log.error("[wrong message]" + head );
//	        	return head;
//	        }
//	        result = head + new String(contbuf);
//		    
//   		}catch(Exception e){
//   			log.error("[read_relay_data]" + e );
//   		}
//   		return result;
//	}   
   	  	
}