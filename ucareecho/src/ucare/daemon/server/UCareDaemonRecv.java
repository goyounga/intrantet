package ucare.daemon.server;


import java.io.*;
import java.net.*;
import java.util.*;

import ucare.daemon.server.*;
import ucare.daemon.util.*;
import ucare.echo.server.*;
/**
 * 접속된 Client 를 가지는 클래스이다.<br>
 * Server단에 실행되는 Client 이다.
 */
class UCareDaemonRecv extends Thread implements ILogger {
	
	private Socket socket=null;
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
	public UCareDaemonRecv(Socket s,UCareDaemonServer c){
		socket=s;
		server=c;
		
		try{
			s.setSoTimeout(1000 * 60 * 3);
			id = System.currentTimeMillis() + "";
//			in = socket.getInputStream();
//			out = socket.getOutputStream();
			in     = new BufferedInputStream(socket.getInputStream());
   			out    = new BufferedOutputStream(socket.getOutputStream());   	
		}catch (IOException e){
			log.error("[UCareDaemonRecv]" + e);
		}
	}
	
	/**
     * Thread 가 시작된다.
     * client 들로 부터 받은 메세지를 모든 client 에게 보낸다.
     */
	public void run(){		
		String str="";
		String msg = "";
		String SVC_ID = "";
		String CONTENT = "";
		try{
			SockUtil su = new SockUtil();
			str = su.read_relay_data(in);	
			if(str.length() < 15){
				sendMessage(HostUtil.makeMsg("000000","$MSGERROR", 1));				
				log.error("PACKET ERROR[" + msg + "]");
			}else {
				SVC_ID = str.substring(0,6);
				CONTENT= CUtil.trim(str.substring(15));
				log.debug("************************************************");
				log.debug("input[" + str + "]");
				log.debug("SVC_ID[" + SVC_ID + "]");
				log.debug("CONTENT[" + CONTENT + "]");
				log.debug("************************************************");
				if(CONTENT.startsWith("$") ){
					if(CONTENT.equals("$stopserver")){ //프로그램 종료 메시지		
						log.debug("************************************************");
						log.debug("*********************종료 요청*********************");
						log.debug("************************************************");
						sendMessage(HostUtil.makeMsg("000000","$closed", 1));
						this.sleep(2000);  //약간의 텀이 필요..
						server.mainClose();
					}if(CONTENT.equals("$reLoad")){ //프로그램 종료 메시지
						UCareDaemonProp ucProp = UCareDaemonProp.getInstance();
						ucProp.reLoad();
						sendMessage(HostUtil.makeMsg("000000","$reLoaded", 1));						
					}
//						else if(CONTENT.equals("$INCAT01")){	
//						//웹에서 요청한다. 웹에서 	INF001 작업하면  IFU001 작업을 중계서버에 요청한다.
						//2분 배치작업으로 변경
//						HostProcess hp = new HostProcess();
//						hp.INCAT01();
//						sendMessage(HostUtil.makeMsg("000000","$ok", 1)); //closeSocket();	
//					}
				}else{
					if("IFU003".equals(SVC_ID)){ //데몬에서 주는값.
						HostProcess hp = new HostProcess();
						sendMessage(hp.IFU003(str));
					}
				}
			}
		}catch(ThreadDeath ouch){ //Thread 가 종료되면 발생하는 Exception 이다.미처리 작업을 처리한다.			
			throw(ouch);
		}catch(Exception e){
			log.error(e.getMessage());
		}finally{		
			closeSocket();
			log.debug("[UCareDaemonRecv][" + id + "]Thread is stoped..");
			log.debug("[UCareDaemonRecv][" + id + "]Recver 종료");
		}
	}	
	/**
     * 현재 Client에게 메세지를 보낸다.
     */
	public void sendMessage(String str){
		try{			
			out.write(str.getBytes());
			out.flush();
			log.debug("******SEND MSG***********");
			log.debug(str);
			log.debug("******SEND MSG END***********");
		}catch (IOException e){
			log.error("[UCareDaemonRecv]" + e);
		}
	}
		
	/**
     * 현재 Client에게 메세지를 보낸다.
     */
	public void sendMessage(byte[] str){
		try{			
			out.write(str);
			out.flush();	
		}catch (IOException e){
			log.error("[UCareDaemonRecv]" + e);
		}
	}
	
	
	/**
     * 현재 Client를 닫는다.
     */
	public void closeSocket(){
		    server.chkThreadCloseCnt(id);
//			if(br!=null) try{br.close();}catch(Exception e){log.error("[" + id + "]" + e.getMessage());}
//			if(bw!=null) try{bw.close();}catch(Exception e){log.error("[" + id + "]" + e.getMessage());}
		    if(in!=null) try{in.close();}catch(Exception e){log.error("[" + id + "]" + e.getMessage());}
			if(out!=null) try{out.close();}catch(Exception e){log.error("[" + id + "]" + e.getMessage());}
			if(socket!=null) try{socket.close();}catch(Exception e){log.error("[" + id + "]" + e.getMessage());}
	}
}