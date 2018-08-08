package ucare.echo.client;

import java.io.*;
import java.net.*;
import java.util.*;
import java.applet.*;

import netscape.javascript.*;

public class EchoClientApplet extends Applet{

	private Socket socket=null;
	private BufferedReader br=null;
	private BufferedWriter bw=null;
	
	private	JSObject window=null;
	
	String ip="10.254.28.73";		//서버아이피
	String userid="joon";
	int port=4200;
	
	public void init(){
		window=JSObject.getWindow(this);
			
		ip=getParameter("ip");
		userid=getParameter("userid");
		port=Integer.parseInt(getParameter("port"));
		
		messageStart();
	}
	
	public void messageStart(){
		try{
			if(socket!=null){
				if(socket.isConnected()){
					msgToscript("C","이미 로그인 되어 있습니다.");
				}
			}else{
			
				socket=new Socket(ip,port);

				br=new BufferedReader(new InputStreamReader(socket.getInputStream()));
				bw=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
				
				//userid 보내기
				sendMsg(userid);
				
				//서버로부터 받는 메세지 Thread start
				ReceiveMessage r=new ReceiveMessage(br,this);
				r.start();
			}
			
		}catch(Exception e){
			msgToscript("E","IP:"+ip+" PORT:"+port+" 접속실패");
			e.printStackTrace();
		}
	}
	
	public void messageLogout(){
		sendMsg("logout");
	}
	
	public void destroy(){}
	
	/**
     * 서버로 전체 메세지 보내기
     */
	public void sendMsg(String str){
		try{
			if(!str.equals("")){
				bw.write(str);
				bw.newLine();
				bw.flush();
			}
		}catch(Exception e){}
	}
	
	/**
     * 서버로 특정 client 에게만 메세지 보내기
     * ex)joon|joon1|joon2
     */
	public void sendFixedMsg(String gubun,String str){
		try{
			str=gubun+"$"+str;
			if(!str.equals("")){
				bw.write(str);
				bw.newLine();
				bw.flush();
			}
		}catch(Exception e){}
	}
	
	
	//서버로 부터 받은 메세지
	public void receiveMsg(String str) {
		
		String code="S";
		String msg=str;

		//getUserList
		String[] ss=str.split("#");
		if(ss[0].equals("userlist")){
			code="C";
			msg=ss[1];
		}else{
			//서버로 부터 끊긴 경우 닫는다.
			if(str.equals("$closed")){
				try{
					code="C";
					msg="서버로 부터 접속이 끊어 졌습니다.";
					socketClose();
				}catch(Exception e){}
			}else if(str.equals("$connection")){
				code="O";
				msg="메세지 서버에 연결되었습니다.";
			}else if(str.equals("$logoutok")){
				try{
					code="C";
					msg="정상 로그아웃 되었습니다.";
					socketClose();
				}catch(Exception e){}
			}
		}
		msgToscript(code,msg);
	}
	
	/**
     * 현재 접속중인 사용자 리스트를 리턴한다.<br>
     * joon|joon1|joon2
     */
	public void getAllUser(){
		sendMsg("getuserlist");
	}
	
	private void msgToscript2(String[] msg){
		window.call("receiveReturnMessage",msg);
	}
	
	private void msgToscript(String code,String msg){
		String[] sm=new String[2];
		sm[0]=code;
		sm[1]=msg;
		window.call("receiveReturnMessage",sm);
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
	 * innerclass 서버로부터 받은 메세지
	 */
	class ReceiveMessage extends Thread {
		BufferedReader br=null;
		EchoClientApplet client=null;

		public ReceiveMessage(BufferedReader br,EchoClientApplet c){
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
					}
				}catch (IOException e){}
			}
		}
	}
}