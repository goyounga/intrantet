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
	
	String ip="10.254.28.73";		//����������
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
					msgToscript("C","�̹� �α��� �Ǿ� �ֽ��ϴ�.");
				}
			}else{
			
				socket=new Socket(ip,port);

				br=new BufferedReader(new InputStreamReader(socket.getInputStream()));
				bw=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
				
				//userid ������
				sendMsg(userid);
				
				//�����κ��� �޴� �޼��� Thread start
				ReceiveMessage r=new ReceiveMessage(br,this);
				r.start();
			}
			
		}catch(Exception e){
			msgToscript("E","IP:"+ip+" PORT:"+port+" ���ӽ���");
			e.printStackTrace();
		}
	}
	
	public void messageLogout(){
		sendMsg("logout");
	}
	
	public void destroy(){}
	
	/**
     * ������ ��ü �޼��� ������
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
     * ������ Ư�� client ���Ը� �޼��� ������
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
	
	
	//������ ���� ���� �޼���
	public void receiveMsg(String str) {
		
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
					msg="������ ���� ������ ���� �����ϴ�.";
					socketClose();
				}catch(Exception e){}
			}else if(str.equals("$connection")){
				code="O";
				msg="�޼��� ������ ����Ǿ����ϴ�.";
			}else if(str.equals("$logoutok")){
				try{
					code="C";
					msg="���� �α׾ƿ� �Ǿ����ϴ�.";
					socketClose();
				}catch(Exception e){}
			}
		}
		msgToscript(code,msg);
	}
	
	/**
     * ���� �������� ����� ����Ʈ�� �����Ѵ�.<br>
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
	 * innerclass �����κ��� ���� �޼���
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