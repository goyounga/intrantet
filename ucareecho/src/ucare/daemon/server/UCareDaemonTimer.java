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
    	int chkTime = 60 * 1000;  //1��
    	int i = 0;
    	
      try {        
        while(true){	                       
            if(stoptf) break;  
            
//          ********************************            
            try{ //2�� ¥�� ó��.
//                if(i % 2 == 0){ 1�и��� ����..
                  	INCAT01 incat01 = new INCAT01();
	            	incat01.start();
//                }
            }catch(Exception e){
            	log.error(e.getMessage());
            }
//          ********************************
            try{ //5�� ¥�� ó��.
                if(i % 5 == 0){
//                	log.debug("5��¥�� ó��ó��....:" + CDateUtil.getShortTimeString());                	
                	ICNAT03 icnat03 = new ICNAT03();
                	icnat03.start();
                }
            }catch(Exception e){
            	log.error(e.getMessage());
            }
//            ********************************
            try{ //�ѽð�¥��
	            if(i % 60 == 0){
	            	log.debug("******" + CDateUtil.getShortTimeString());
	//            	IFN006 ifn006 = new IFN006(ucMain.getProper());
	//            	ifn006.process("12 mini");
	            		            	
	            }
            }catch(Exception e){
            	log.error(e.getMessage());            	
            }
            
	        sleep(chkTime);   //1��	        
	        i++;
	        if(i % 61 == 0) i = 1;  // �ٽ� 1�� �ʱ�ȭ
        }
      }catch(Exception e){
        log.debug("[UCareDaemonTimer ERROR]" + e.getMessage());
        e.printStackTrace();
      }finally{
    	  log.debug("UCareDaemonTimer end");
      }
    }
    
    
  //���� ������ ���� �Ѵ�.	
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