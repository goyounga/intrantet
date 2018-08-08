package ucare.daemon.server;

import java.util.*;
import java.io.*;
import java.net.*;

//import ucare.daemon.server.*;
import ucare.echo.server.*;

import org.apache.log4j.PropertyConfigurator;
/**
 * Echo Server 를 시작하고 Client 의 요청을 대기하도록 한다.
 */
public class UCareDaemonServer extends Thread implements ILogger {
	
//	private RoleXmlParser rx=null;
	private ServerSocket serverSocket=null;
	private Socket socket=null;
	private boolean stoptf=false;
	private static int sockCnt = 0;	
	public UCareDaemonMain ucMain = null;
	
//	public static void main(String args[]){
//		System.out.println("main call");
//		UCareDaemonServer es=new UCareDaemonServer();
//	}
		
	/**
     * constructor<br>
     * role.xml url 를 파라미터로 받는다.
     * @param properurl
     */
	public UCareDaemonServer(UCareDaemonMain ucMain){		
		this.ucMain = ucMain;
	}

	/**
     * Echo Server 를 시작 한다.
     * @param port
     */
	public void run(){
		UCareDaemonRecv ucareRecv = null;
		UCareDaemonProp ucProp = UCareDaemonProp.getInstance();
		try{			
			serverSocket=new ServerSocket(Integer.parseInt(ucProp.getProp("serverport")));
			log.info("");
			log.info(" ############## DaemonServer Started ###############");
			log.info("   - port : "+ ucProp.getProp("serverport"));
			log.info("   - version : 1.0");
			log.info("##################################################");
			log.info("");
			this.ucMain.timerStart();
			while(true){
				if(stoptf) break;
				
				socket=serverSocket.accept();	//요청대기			
				String clientip=socket.getInetAddress().getHostAddress();
				log.debug("from connected ip:" + clientip);

				//Client Thread Start
				ucareRecv = new UCareDaemonRecv(socket,this);
				ucareRecv.start();
				log.debug("ucareRecv 시작했다.");
				chkThreadCnt();
			}
			log.info(" ############## DaemonServer End ###############");
		}catch(BindException be){
			//메세지 서버가 이미 구동 중입니다.
			log.error("서버가 이미 구동 중입니다");
			log.error(be);
			mainClose();
		}catch(IOException e){
			log.debug(e.getMessage());
			mainClose();
		}
	}
	
	public void chkThreadCloseCnt(String id){
		sockCnt--;
		log.debug("[" + id + "]current sock closed =" + sockCnt );
	}
	
	public void chkThreadCnt(){
		sockCnt++;
		log.debug("current sock cnt =" + sockCnt );		
	}
	
	
	public void mainClose(){
		log.debug("********UCareDaemonServer mainClose************");
		ucMain.close();
	}
	//서버 소켓을 종료 한다.	
	public void close(){
		try{
			log.debug("*********************************************");	
			log.debug("UCareDaemonServer close call");	
			log.debug("*********************************************");	
			this.stoptf = true;
			serverSocket.close();
		}catch(Exception e){
			log.error("startDaemonServer close");
			log.error(e);			
		}
	}	
}