package ucare.echo.server;

import java.io.*;
import java.net.*;
import java.util.*;

import ucare.echo.server.*;

import org.apache.log4j.PropertyConfigurator;

/**
 * Message Server �� ���� �Ѵ�.<br>
 * /bin/stopserver �� �����Ͽ� ShutDownServer �� ȣ�� �� �� �ֽ��ϴ�.
 */
public class ShutDownServer implements ILogger {
	
	private static String ip=null;
	private static int port=0;
	private Socket socket=null;
	private BufferedReader br=null;
	private BufferedWriter bw=null;
	
	public static void main(String args[]){
		CIni.loadFromFile(args[0]);
		PropertyConfigurator.configure(CIni.getString("log4jurl"));

		ip=args[1];
		port=Integer.parseInt(args[2]);
		new ShutDownServer().shutdown();
	}
	
	private void shutdown(){
		try{
			socket=new Socket(ip,port);
	
			br=new BufferedReader(new InputStreamReader(socket.getInputStream()));
			bw=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
			
			//server stop
			sendMsg("stopmanager");
			
			//�����κ��� �޴� �޼��� Thread start
			ReceiveMessage r=new ReceiveMessage(br,this);
			r.start();
			sendMsg("stopserver");
		}catch(ConnectException e){
			log.info("Message Server �� ���������� ���� �� �ְų� IP , PORT �� Ȯ���� �ּ���.["+e.getMessage()+"]");
		}catch(Exception e){
			e.printStackTrace();
			try{
				socketClose();
			}catch(Exception ee){
				ee.printStackTrace();
			}
		}
	}
	
	//������ ���� ���� �޼���
	private void receiveMsg(String str) {
		
		String code="S";
		String msg=str;

		//getUserList
		String[] ss=str.split("#");
		if(ss[0].equals("userlist")){
			code="C";
			msg=ss[1];
		}else{
			//������ ���� ���� ��� �ݴ´�.
			if(str.equals("$closed")){
				try{
					code="C";
					msg="Server is shutdowned..";
					socketClose();
				}catch(Exception e){}
			}else if(str.equals("$connection")){
				code="O";
				msg="Server connected..";
			}
		}
		log.info(msg);
	}
	
	private void sendMsg(String str){
		try{
			if(!str.equals("")){
				bw.write(str);
				bw.newLine();
				bw.flush();
			}
		}catch(Exception e){}
	}
	
	
	private void socketClose() throws Exception {
		if(socket!=null){
			socket.close();
			socket=null;
		}
		if(br!=null){
			br.close();
			br=null;
		}
		if(bw!=null){
			bw.close();
			bw=null;
		}
	}
	
	/**
	 * innerclass �����κ��� ���� �޼���
	 */
	class ReceiveMessage extends Thread {
		BufferedReader br=null;
		ShutDownServer client=null;

		public ReceiveMessage(BufferedReader br,ShutDownServer c){
			this.client=c;
			this.br=br;
		}
		
		public void run(){
			String str="";
			while(true){
				try{
					str=br.readLine();
					if(str!=null){
						client.receiveMsg(str);
						if(str.equals("$closed")){
							this.stop();
							break;
						}
					}
				}catch (IOException e){}
			}
		}
	}
}