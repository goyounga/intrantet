package ucare.daemon.server;


import java.io.*;
import java.net.*;
import java.util.*;

import ucare.daemon.server.*;
import ucare.daemon.util.*;
import ucare.echo.server.*;
/**
 * ���ӵ� Client �� ������ Ŭ�����̴�.<br>
 * Server�ܿ� ����Ǵ� Client �̴�.
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
     * ��û�� Socket �� EchoServer �� �޾� ó���Ѵ�.<br>
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
     * Thread �� ���۵ȴ�.
     * client ��� ���� ���� �޼����� ��� client ���� ������.
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
					if(CONTENT.equals("$stopserver")){ //���α׷� ���� �޽���		
						log.debug("************************************************");
						log.debug("*********************���� ��û*********************");
						log.debug("************************************************");
						sendMessage(HostUtil.makeMsg("000000","$closed", 1));
						this.sleep(2000);  //�ణ�� ���� �ʿ�..
						server.mainClose();
					}if(CONTENT.equals("$reLoad")){ //���α׷� ���� �޽���
						UCareDaemonProp ucProp = UCareDaemonProp.getInstance();
						ucProp.reLoad();
						sendMessage(HostUtil.makeMsg("000000","$reLoaded", 1));						
					}
//						else if(CONTENT.equals("$INCAT01")){	
//						//������ ��û�Ѵ�. ������ 	INF001 �۾��ϸ�  IFU001 �۾��� �߰輭���� ��û�Ѵ�.
						//2�� ��ġ�۾����� ����
//						HostProcess hp = new HostProcess();
//						hp.INCAT01();
//						sendMessage(HostUtil.makeMsg("000000","$ok", 1)); //closeSocket();	
//					}
				}else{
					if("IFU003".equals(SVC_ID)){ //���󿡼� �ִ°�.
						HostProcess hp = new HostProcess();
						sendMessage(hp.IFU003(str));
					}
				}
			}
		}catch(ThreadDeath ouch){ //Thread �� ����Ǹ� �߻��ϴ� Exception �̴�.��ó�� �۾��� ó���Ѵ�.			
			throw(ouch);
		}catch(Exception e){
			log.error(e.getMessage());
		}finally{		
			closeSocket();
			log.debug("[UCareDaemonRecv][" + id + "]Thread is stoped..");
			log.debug("[UCareDaemonRecv][" + id + "]Recver ����");
		}
	}	
	/**
     * ���� Client���� �޼����� ������.
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
     * ���� Client���� �޼����� ������.
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
     * ���� Client�� �ݴ´�.
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