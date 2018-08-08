package ucare.daemon.server;

import java.util.*;
import java.io.*;
import java.net.*;
import java.util.*;

//import ucare.daemon.server.*;
import ucare.echo.server.*;

import org.apache.log4j.PropertyConfigurator;

/**
 * Echo Server 를 시작하고 Client 의 요청을 대기하도록 한다.
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
     * 각 셋팅값을 가져와서 처리한다.
     * @param properurl
     */
	public UCareDaemonMain(){
		try{						
			udSserver  = new UCareDaemonServer(this);	//서버 start		
			timer = new UCareDaemonTimer(this);  //타이머 처리			
			udSserver.start();   //서버 시작			
			
		}catch(Exception e){			
			e.printStackTrace();
		}
	}
	//타이머 시작 시점때문에 서버 시작후 처리하도록 함
	public void timerStart(){
		timer.start();	     //타이머 시작	
	}
	public void run(){		
		try{			
			while(alive){				
				this.sleep(2000);
			}
		}catch(ThreadDeath ouch){ //Thread 가 종료되면 발생하는 Exception 이다.미처리 작업을 처리한다.	
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
     * 프로그램을 종료한다.
     */		
	public void close(){		
		timer.close();
		udSserver.close();
		this.alive = false;
//		log.debug("all closed");
		System.exit(0);			
	}
}