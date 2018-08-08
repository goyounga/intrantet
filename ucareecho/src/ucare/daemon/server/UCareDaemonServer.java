package ucare.daemon.server;

import java.util.*;
import java.io.*;
import java.net.*;

//import ucare.daemon.server.*;
import ucare.echo.server.*;

import org.apache.log4j.PropertyConfigurator;
/**
 * Echo Server �� �����ϰ� Client �� ��û�� ����ϵ��� �Ѵ�.
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
     * role.xml url �� �Ķ���ͷ� �޴´�.
     * @param properurl
     */
	public UCareDaemonServer(UCareDaemonMain ucMain){		
		this.ucMain = ucMain;
	}

	/**
     * Echo Server �� ���� �Ѵ�.
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
				
				socket=serverSocket.accept();	//��û���			
				String clientip=socket.getInetAddress().getHostAddress();
				log.debug("from connected ip:" + clientip);

				//Client Thread Start
				ucareRecv = new UCareDaemonRecv(socket,this);
				ucareRecv.start();
				log.debug("ucareRecv �����ߴ�.");
				chkThreadCnt();
			}
			log.info(" ############## DaemonServer End ###############");
		}catch(BindException be){
			//�޼��� ������ �̹� ���� ���Դϴ�.
			log.error("������ �̹� ���� ���Դϴ�");
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
	//���� ������ ���� �Ѵ�.	
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