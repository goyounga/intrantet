package ucare.daemon.server;

import java.util.*;
import java.io.*;
import java.net.*;
import java.util.*;

//import ucare.daemon.server.*;
import ucare.echo.server.*;

import org.apache.log4j.PropertyConfigurator;

/**
 * Echo Server �� �����ϰ� Client �� ��û�� ����ϵ��� �Ѵ�.
 */
public class UCareDaemonMain extends Thread implements ILogger  {
	
	private UCareDaemonServer udSserver = null;
	private UCareDaemonTimer timer = null;
	private boolean alive = true;
	
	private int port=0;
	
	public static void main(String args[]){
		UCareDaemonProp ucProp = UCareDaemonProp.getInstance();
		UCareDaemonMain es=new UCareDaemonMain();				
		es.start();
	}
	
	/**
     * constructor<br>
     * �� ���ð��� �����ͼ� ó���Ѵ�.
     * @param properurl
     */
	public UCareDaemonMain(){
		try{						
			udSserver  = new UCareDaemonServer(this);	//���� start		
			timer = new UCareDaemonTimer(this);  //Ÿ�̸� ó��			
			udSserver.start();   //���� ����			
			
		}catch(Exception e){			
			e.printStackTrace();
		}
	}
	//Ÿ�̸� ���� ���������� ���� ������ ó���ϵ��� ��
	public void timerStart(){
		timer.start();	     //Ÿ�̸� ����	
	}
	public void run(){		
		try{			
			while(alive){				
				this.sleep(2000);
			}
		}catch(ThreadDeath ouch){ //Thread �� ����Ǹ� �߻��ϴ� Exception �̴�.��ó�� �۾��� ó���Ѵ�.	
//			log.error("ThreadDeath error");
			throw(ouch);
		}catch(Exception e){
			log.error("*****************UCareDaemonMain ERROR******************");
			log.error(e.getMessage());
			log.error("*******************************************************");
		}finally{
			log.debug("*****************PROGRAM END******************");
		}
	}	
	
	/**
     * ���α׷��� �����Ѵ�.
     */		
	public void close(){		
		timer.close();
		udSserver.close();
		this.alive = false;
//		log.debug("all closed");
		System.exit(0);			
	}
}