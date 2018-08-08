package ucare.echo.server;

import java.io.*;
import java.net.*;
import java.util.*;

import ucare.echo.server.*;

/**
 * 접속된 Client 를 가지는 클래스이다.<br>
 * Server단에 실행되는 Client 이다.
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
     * 요청된 Socket 과 EchoServer 를 받아 처리한다.<br>
     * @param s
     * @param c
     */
	public EchoServerClient(Socket s,EchoServer c){
		socket=s;
		server=c;
		
		try{
			br=new BufferedReader(new InputStreamReader(socket.getInputStream()));
			bw=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
			userid=br.readLine();	//client 에서 넘겨준 userid
			
			//접속 client ip
			InetAddress ia=socket.getInetAddress();
			username=ia.getHostAddress();
			
		}catch (IOException e){
			closeSocket();
		}
	}
	
	/**
     * Thread 가 시작된다.
     * client 들로 부터 받은 메세지를 모든 client 에게 보낸다.
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
						//log.debug("서버가 받은 메세지:"+str);
						server.message(str,username);	//전체 또는 특정 client 에게 메세지를 보낸다.
					}
				}catch (IOException e){
					server.removeClient(this,"$closed");
					break;
				}
			}
		}catch(ThreadDeath ouch){ //Thread 가 종료되면 발생하는 Exception 이다.미처리 작업을 처리한다.
			log.debug("Thread is stoped..");
			throw(ouch);
		}
	}
	
	/**
     * 현재 Client에게만 메세지를 보낸다.
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
     * 현재 Client의 이름(IP)을 넘겨준다.
     * @return String
     */
	public String getUserName(){
		return username;
	}
	
	/**
     * 현재 Client의 ID를 넘겨준다.
     * @return String
     */
	public String getUserId(){
		return userid;
	}
	
	/**
     * 현재 Client를 닫는다.
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