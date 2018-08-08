package ucare.echo.server;

import java.util.*;
import java.io.*;
import java.net.*;
import java.util.*;

import ucare.echo.server.*;

import org.apache.log4j.PropertyConfigurator;

/**
 * Echo Server 를 시작하고 Client 의 요청을 대기하도록 한다.
 */
public class EchoServer implements ILogger {
	
	private RoleXmlParser rx=null;
	private Hashtable clientlist=new Hashtable();
	private HashMap ipidmap=new HashMap();
	private Hashtable hs=null;
	private ServerSocket serverSocket=null;
	private Socket socket=null;
	private boolean stoptf=false;
	int port=0;
	
	/**
     * constructor<br>
     * role.xml url 를 파라미터로 받는다.
     * @param properurl
     */
	public EchoServer(String properurl){
		try{
			//properties read
			CIni.loadFromFile(properurl);
			//for log4j
			PropertyConfigurator.configure(CIni.getString("log4jurl"));

			//get role value
			rx=new RoleXmlParser(CIni.getString("rolexmlurl"));
			hs=rx.getJobComplexList("E001");
			port=Integer.parseInt((String)hs.get("port"));
			
			//start server
			startEchoServer(port);
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
     * client 객체를 Dataset 에 추가한다.
     * @param serverclient
     */
	public void addClient(String username,EchoServerClient serverclient) {
		clientlist.put(username,serverclient);
		ipidmap.put(serverclient.getUserId(),username);
	}
	
	/**
     * Echo Server 를 시작 한다.
     * @param port
     */
	public void startEchoServer(int port){
		try{
			serverSocket=new ServerSocket(port);
			
			log.info("");
			log.info(" ############## EchoServer Started ###############");
			log.info("   - port : "+port);
			log.info("   - version : 1.0");
			log.info("##################################################");
			log.info("");
			System.out.println("serverstartok");
			
			while(true){
				if(stoptf) break;
				
				socket=serverSocket.accept();	//요청대기
				
				String clientip=socket.getInetAddress().getHostAddress();
				
				//이미 연결된 경우 연결된 sockect close
				EchoServerClient ecl=(EchoServerClient)clientlist.get(clientip);
				if(ecl!=null) this.removeClient(ecl,"$closed");
				
				//Client Thread Start
				EchoServerClient echosclient=new EchoServerClient(socket,this);
				this.addClient(clientip,echosclient);
				echosclient.start();
				
				this.messageFixed(echosclient.getUserId(),"$connection");
			}
		}catch(BindException be){
			//메세지 서버가 이미 구동 중입니다.
			System.out.println("alreadopenserver");
		}catch(IOException e){
			log.debug(e.getMessage());
		}
	}
	
	/**
     * Echo Server 를 중지 한다.
     */
	public void stopEchoServer(){
		try{
			if(serverSocket!=null){
				//client close
				Enumeration eu=clientlist.keys();
				while(eu.hasMoreElements()){
					EchoServerClient es=(EchoServerClient)clientlist.get((String)eu.nextElement());
					this.removeClient(es,"$closed");
				}
				
				stoptf=true;
				serverSocket.close();
				
				log.info("");
				log.info(" EchoServer stoped........");
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public void message(String str,String username){
		if(str.equals("logout")){
			EchoServerClient ec=((EchoServerClient)clientlist.get(username));
			this.removeClient(ec,"$logoutok");
		}else if(str.equals("stopserver")){
			this.stopEchoServer();
		}else if(str.equals("getuserlist")){
			String ulist=this.getAllUser();
			EchoServerClient ec=((EchoServerClient)clientlist.get(username));
			//send message
			if(ec!=null) ec.sendMessage("userlist#"+ulist);
		}else{
			message(str);
		}
	}
	
	/**
     * 메세지 분기
     */
	public void message(String str){
		if(str.indexOf("$")==-1){
			messageAll(str);
		}else{
			String userlist=str.substring(0,str.indexOf("$"));
			str=str.substring(str.indexOf("$")+1,str.length());
			messageFixed(userlist,str);
		}
	}
	
	/**
     * 특정 Client 에게 message 를 보낸다.
     */
	public void messageFixed(String userlist,String str) {
		StringTokenizer st=new StringTokenizer(userlist,"|");
	
		while(st.hasMoreTokens()){
			String userid=(String)st.nextToken();
			String ip=(String)ipidmap.get(userid);
			EchoServerClient ec=null;
			
			if(ip!=null) ec=((EchoServerClient)clientlist.get(ip));
			
			//send message
			if(ec!=null) ec.sendMessage(str);
		}
	}
	
	/**
     * 전체 Client 에게 message 를 보낸다.
     */
	public void messageAll(String str) {
		Enumeration eu=clientlist.keys();
		while(eu.hasMoreElements()){
			String username=(String)eu.nextElement();
			EchoServerClient ec=((EchoServerClient)clientlist.get(username));
			
			//send message
			if(ec!=null) ec.sendMessage(str);
		}
	}
	
	/**
     * 서버에 등록된 Client 를 지운다.
     */
	public void removeClient(EchoServerClient c,String msg){
		if(clientlist.get(c.getUserName())!=null){
			this.messageFixed(c.getUserId(),msg);
			clientlist.remove(c.getUserName());
			ipidmap.remove(c.getUserId());
			c.closeSocket();
			log.debug(c.getUserName()+"["+c.getUserId()+"] is killed.. [all client count:"+getClientCount()+"]");
		}
	}
	
	/**
     * 현재 접속된 모든 사용자 리스트를 보여준다.
     */
	public String getAllUser(){
		StringBuffer str= new StringBuffer();
		Enumeration eu=clientlist.keys();
		while(eu.hasMoreElements()){
			str.append(((EchoServerClient)clientlist.get((String)eu.nextElement())).getUserId()+"|");
		}
		return str.toString();
	}
	
	/**
     * 현재 접속된 모든 client 갯수
     * @return int
     */
	public int getClientCount(){
		return clientlist.size();	
	}
	
	public static void main(String args[]){
		EchoServer es=new EchoServer(args[0]);
	}
}