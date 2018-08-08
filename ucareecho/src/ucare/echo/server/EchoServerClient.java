package ucare.echo.server;

import java.io.*;
import java.net.*;
import java.util.*;

import ucare.echo.server.*;

/**
 * ���ӵ� Client �� ������ Ŭ�����̴�.<br>
 * Server�ܿ� ����Ǵ� Client �̴�.
 */
class EchoServerClient extends Thread implements ILogger {
	
	private Socket socket=null;
	private EchoServer server=null;
	private BufferedReader br=null;
	private BufferedWriter bw=null;
	private String userid="";			//client userid
	private String username="";			//client ip
	
	/**
     * constructor<br>
     * ��û�� Socket �� EchoServer �� �޾� ó���Ѵ�.<br>
     * @param s
     * @param c
     */
	public EchoServerClient(Socket s,EchoServer c){
		socket=s;
		server=c;
		
		try{
			br=new BufferedReader(new InputStreamReader(socket.getInputStream()));
			bw=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
			userid=br.readLine();	//client ���� �Ѱ��� userid
			
			//���� client ip
			InetAddress ia=socket.getInetAddress();
			username=ia.getHostAddress();
			
		}catch (IOException e){
			closeSocket();
		}
	}
	
	/**
     * Thread �� ���۵ȴ�.
     * client ��� ���� ���� �޼����� ��� client ���� ������.
     */
	public void run(){
		log.debug(username+"["+userid+"] is running.. [all client count:"+server.getClientCount()+"]");
		this.setName("Thread-"+username);
		
		String str="";
		try{
			while(true){
				try{
					str=br.readLine();
					
					if(str!=null){
						//log.debug("������ ���� �޼���:"+str);
						server.message(str,username);	//��ü �Ǵ� Ư�� client ���� �޼����� ������.
					}
				}catch (IOException e){
					server.removeClient(this,"$closed");
					break;
				}
			}
		}catch(ThreadDeath ouch){ //Thread �� ����Ǹ� �߻��ϴ� Exception �̴�.��ó�� �۾��� ó���Ѵ�.
			log.debug("Thread is stoped..");
			throw(ouch);
		}
	}
	
	/**
     * ���� Client���Ը� �޼����� ������.
     */
	public void sendMessage(String str){
		try{
			bw.write(str);
			bw.newLine();
			bw.flush();
		}catch (IOException e){
		}
	}
	
	/**
     * ���� Client�� �̸�(IP)�� �Ѱ��ش�.
     * @return String
     */
	public String getUserName(){
		return username;
	}
	
	/**
     * ���� Client�� ID�� �Ѱ��ش�.
     * @return String
     */
	public String getUserId(){
		return userid;
	}
	
	/**
     * ���� Client�� �ݴ´�.
     */
	public void closeSocket(){
		try{
			if(br!=null) br.close();
			if(bw!=null) bw.close();
			if(socket!=null) socket.close();
		}catch(IOException e){
			e.printStackTrace();
		}
	}
}