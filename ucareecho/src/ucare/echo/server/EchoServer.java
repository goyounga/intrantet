package ucare.echo.server;

import java.util.*;
import java.io.*;
import java.net.*;
import java.util.*;

import ucare.echo.server.*;

import org.apache.log4j.PropertyConfigurator;

/**
 * Echo Server �� �����ϰ� Client �� ��û�� ����ϵ��� �Ѵ�.
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
     * role.xml url �� �Ķ���ͷ� �޴´�.
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
     * client ��ü�� Dataset �� �߰��Ѵ�.
     * @param serverclient
     */
	public void addClient(String username,EchoServerClient serverclient) {
		clientlist.put(username,serverclient);
		ipidmap.put(serverclient.getUserId(),username);
	}
	
	/**
     * Echo Server �� ���� �Ѵ�.
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
				
				socket=serverSocket.accept();	//��û���
				
				String clientip=socket.getInetAddress().getHostAddress();
				
				//�̹� ����� ��� ����� sockect close
				EchoServerClient ecl=(EchoServerClient)clientlist.get(clientip);
				if(ecl!=null) this.removeClient(ecl,"$closed");
				
				//Client Thread Start
				EchoServerClient echosclient=new EchoServerClient(socket,this);
				this.addClient(clientip,echosclient);
				echosclient.start();
				
				this.messageFixed(echosclient.getUserId(),"$connection");
			}
		}catch(BindException be){
			//�޼��� ������ �̹� ���� ���Դϴ�.
			System.out.println("alreadopenserver");
		}catch(IOException e){
			log.debug(e.getMessage());
		}
	}
	
	/**
     * Echo Server �� ���� �Ѵ�.
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
     * �޼��� �б�
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
     * Ư�� Client ���� message �� ������.
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
     * ��ü Client ���� message �� ������.
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
     * ������ ��ϵ� Client �� �����.
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
     * ���� ���ӵ� ��� ����� ����Ʈ�� �����ش�.
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
     * ���� ���ӵ� ��� client ����
     * @return int
     */
	public int getClientCount(){
		return clientlist.size();	
	}
	
	public static void main(String args[]){
		EchoServer es=new EchoServer(args[0]);
	}
}