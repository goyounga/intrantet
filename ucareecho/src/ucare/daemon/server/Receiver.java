package ucare.daemon.server;

import java.io.*;
import java.net.*;
import java.util.*;


import ucare.daemon.server.*;
import ucare.daemon.util.*;
import ucare.echo.server.*;

/**
 *  
 *  �Ⱦ�..
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
     * ��û�� Socket �� EchoServer �� �޾� ó���Ѵ�.<br>
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
     * Thread �� ���۵ȴ�.
     * client ��� ���� ���� �޼����� ��� client ���� ������.
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
//					if(CONTENT.equals("$stopserver")){ //���α׷� ���� �޽���		
//						log.debug("************************************************");
//						log.debug("*********************���� ��û*********************");
//						log.debug("************************************************");//
////						INF005 inf005 = new INF005();
////		            	inf005.start();
////						sendMessage(CUtil.makeMsg("0","$closed", 1));
////						server.mainClose();
//					}if(CONTENT.equals("$reLoad")){ //���α׷� ���� �޽���
//						UCareDaemonProp ucProp = UCareDaemonProp.getInstance();
//						ucProp.reLoad();											
//					}else if(CONTENT.equals("$INF001")){	
//						//������ ��û�Ѵ�. ������ 	INF001 �۾��ϸ�  IFU001 �۾��� �߰輭���� ��û�Ѵ�.	
////						HostProcess hp = new HostProcess();
////						hp.IFU001();					
//					}
//				}
//			}			
		}catch(ThreadDeath ouch){ //Thread �� ����Ǹ� �߻��ϴ� Exception �̴�.��ó�� �۾��� ó���Ѵ�.			
			throw(ouch);
		}catch(Exception e){
			log.error(e.getMessage());
		}
	}
	
}