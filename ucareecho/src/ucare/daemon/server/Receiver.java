package ucare.daemon.server;

import java.io.*;
import java.net.*;
import java.util.*;


import ucare.daemon.server.*;
import ucare.daemon.util.*;
import ucare.echo.server.*;

/**
 *  
 *  안씀..
 */
class Receiver extends Thread implements ILogger {
	
	private UCareDaemonServer server=null;
//	private InputStream in = null;
//	private OutputStream out = null;
	private String id = "";
	private BufferedInputStream in = null;
	private BufferedOutputStream out= null;
	/**
     * constructor<br>
     * 요청된 Socket 과 EchoServer 를 받아 처리한다.<br>
     * @param s
     * @param c
     */
	public Receiver(Socket s,UCareDaemonServer c){
		server=c;
		
		try{
			s.setSoTimeout(1000 * 60 * 3);
			id = System.currentTimeMillis() + "";
//			in = socket.getInputStream();
			in     = new BufferedInputStream(s.getInputStream());
		}catch (IOException e){
			log.error("[UCareDaemonRecv]" + e);
		}
	}
	
	/**
     * Thread 가 시작된다.
     * client 들로 부터 받은 메세지를 모든 client 에게 보낸다.
     */
	public void run(){
		this.setName("Thread-start");
		String str="";
		String msg = "";
		String SVC_ID = "";
		String CONTENT = "";
		try{
//			SockUtil su = new SockUtil();
//			str = su.read_relay_data(in);			
//			if(str.length() < 15){							
//				log.error("PACKET ERROR[" + msg + "]");
//			}else {
//				SVC_ID = str.substring(0,6);
//				CONTENT= CUtil.trim(str.substring(15));
//				log.debug("************************************************");
//				log.debug("SVC_ID[" + SVC_ID + "]");
//				log.debug("CONTENT[" + CONTENT + "]");
//				log.debug("************************************************");
//				if(CONTENT.startsWith("$") ){
//					if(CONTENT.equals("$stopserver")){ //프로그램 종료 메시지		
//						log.debug("************************************************");
//						log.debug("*********************종료 요청*********************");
//						log.debug("************************************************");//
////						INF005 inf005 = new INF005();
////		            	inf005.start();
////						sendMessage(CUtil.makeMsg("0","$closed", 1));
////						server.mainClose();
//					}if(CONTENT.equals("$reLoad")){ //프로그램 종료 메시지
//						UCareDaemonProp ucProp = UCareDaemonProp.getInstance();
//						ucProp.reLoad();											
//					}else if(CONTENT.equals("$INF001")){	
//						//웹에서 요청한다. 웹에서 	INF001 작업하면  IFU001 작업을 중계서버에 요청한다.	
////						HostProcess hp = new HostProcess();
////						hp.IFU001();					
//					}
//				}
//			}			
		}catch(ThreadDeath ouch){ //Thread 가 종료되면 발생하는 Exception 이다.미처리 작업을 처리한다.			
			throw(ouch);
		}catch(Exception e){
			log.error(e.getMessage());
		}
	}
	
}