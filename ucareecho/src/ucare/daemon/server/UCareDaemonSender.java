package ucare.daemon.server;

import java.io.*;
import java.net.*;
import java.util.*;

//import ucare.daemon.server.*;
import ucare.echo.server.*;

/**
 * �߰輭���� ����Ÿ �����ϰ� ��� �޴� ���α׷�.<br>
 *  
 */
public class UCareDaemonSender implements ILogger {
		
	private Socket socket=null;
	private BufferedReader br=null;
	private BufferedWriter bw=null;

	private String id = "";
	/**
     * constructor<br>
     * ��û�� Socket �� EchoServer �� �޾� ó���Ѵ�.<br>
     * @param s
     * @param c
     */
	public UCareDaemonSender(String relayIp, int relayport){
		log.debug("UCareDaemonSender create");
		try{
			socket=new Socket(relayIp,relayport);
//			socket.setSoTimeout(5000);
			br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
			bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
		}catch (IOException e){
			log.error(e);
			closeSocket();
		}
	}

	/**
     *  Client���� �޼����� ������.
     */
	public String sendMessage(String str){
		String rtValue = "";
		try{
			log.debug("[UCareDaemonSender send]" + str);
			bw.write(str);
//			bw.newLine();
			bw.flush();
//			while(true){				
//				str=br.readLine();
//				if(str == null) break;
//				rtValue += str;
//				log.debug("[" + id + "][M]" + str);	
//			}
			closeSocket();
		}catch (IOException e){
			closeSocket();
		}
		log.debug("[UCareDaemonSender recv]" + rtValue);
		return rtValue;
	}
		
	/**
     * ���� Client�� �ݴ´�.
     */
	public void closeSocket(){
			if(br!=null) try{br.close();}catch(Exception e){log.error("[" + id + "]" + e.getMessage());}
			if(bw!=null) try{bw.close();}catch(Exception e){log.error("[" + id + "]" + e.getMessage());}
			if(socket!=null) try{socket.close();}catch(Exception e){log.error("[" + id + "]" + e.getMessage());}
	}
}