package ucare.daemon.server;

import java.util.*;

import java.io.*;
import java.net.*;
import java.util.*;

//import ucare.daemon.server.*;
import ucare.echo.server.*;
import ucare.daemon.util.*;

import org.apache.log4j.PropertyConfigurator;

public class UCareDaemonTimer extends Thread  implements ILogger {
	private UCareDaemonMain ucMain = null;
	private boolean stoptf=false;
	
    public UCareDaemonTimer(UCareDaemonMain ucMain) {
    	log.debug("UCareDaemonTimer created");
    	this.ucMain = ucMain;
    	log.debug("===============================");
    }

    public void run() {	
    	log.debug("UCareDaemonTimer run started");
    	int chkTime = 60 * 1000;  //1분
    	int i = 0;
    	
      try {        
        while(true){	                       
            if(stoptf) break;  
            
//          ********************************            
            try{ //2분 짜리 처리.
//                if(i % 2 == 0){ 1분마다 돌게..
                  	INCAT01 incat01 = new INCAT01();
	            	incat01.start();
//                }
            }catch(Exception e){
            	log.error(e.getMessage());
            }
//          ********************************
            try{ //5분 짜리 처리.
                if(i % 5 == 0){
//                	log.debug("5분짜리 처리처리....:" + CDateUtil.getShortTimeString());                	
                	ICNAT03 icnat03 = new ICNAT03();
                	icnat03.start();
                }
            }catch(Exception e){
            	log.error(e.getMessage());
            }
//            ********************************
            try{ //한시간짜리
	            if(i % 60 == 0){
	            	log.debug("******" + CDateUtil.getShortTimeString());
	//            	IFN006 ifn006 = new IFN006(ucMain.getProper());
	//            	ifn006.process("12 mini");
	            		            	
	            }
            }catch(Exception e){
            	log.error(e.getMessage());            	
            }
            
	        sleep(chkTime);   //1분	        
	        i++;
	        if(i % 61 == 0) i = 1;  // 다시 1로 초기화
        }
      }catch(Exception e){
        log.debug("[UCareDaemonTimer ERROR]" + e.getMessage());
        e.printStackTrace();
      }finally{
    	  log.debug("UCareDaemonTimer end");
      }
    }
    
    
  //서버 소켓을 종료 한다.	
	public void close(){
		try{
			log.debug("*********************************************");	
			log.debug("UCareDaemonTimer close call");	
			log.debug("*********************************************");	
			this.stoptf = true;
			this.interrupt();
		}catch(Exception e){
			log.error("UCareDaemonTimer close");
			log.error(e);			
		}
	}
}    