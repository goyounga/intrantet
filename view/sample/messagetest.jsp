<%@ page language="java" contentType="text/html; charset=utf-8"%>


<html>
	<head>
		<script language="javascript">
			var intervalobj;
			var intervalobj2;
			
			function receiveReturnMessage(errorcd,msg){
				f.txt.value+="\n"+msg;
				
				//공지사항
				if(errorcd=="S"){
					document.all("tdmsg").innerText=msg;
					msgwin();
				}else if(errorcd=="E"){
					document.all("tdmsg").innerText=msg;
				}else if(errorcd=="C"){
					document.all("tdmsg").innerText=msg;
				}else if(errorcd=="L"){
					document.all("tdmsg").innerText=msg;
				}
			}
			
			//연결여부
			function isConnect(){
				EchoApplet.isConnect();
			}
			
			//메세지 보내기
			//접속된 모든 client 에게 전달 된다.
			function sendmessage(){
				if(f.message.value=="") return;
				
				EchoApplet.sendMsg(f.message.value);
				f.message.value="";
			}
			
			//메세지 보내기
			//지정 client 에게만 메세지를 보낸다.
			function sendmessage2(){
				if(f.message2.value=="") return;
				
				EchoApplet.sendFixedMsg(f.clist.value,f.message2.value);
				f.message2.value="";
			}
			
			//server stop
			function serverstop(){
				EchoApplet.sendMsg("stopserver");
			}
			
			//server start
			function serverstart(){
				f1.action="/jsp/sample/test3.jsp"
				f1.target="ifam";
				f1.submit();
			}
			
			//메세지 서버 수동 로그인
			function mserverlogin(){
				EchoApplet.messageStart();
			}
			
			//메세지 서버 수동 로그아웃
			function mserverlogout(){
				EchoApplet.messageLogout();
			}
			
			//연결확인
			function isConnected(){
				EchoApplet.isConnected();
			}
			
			//전체 접속인원
			function getUserList(){
				EchoApplet.getAllUser();
			}
			

///////////////////////////////////////////////////


			//알림창 슬라이드 timer 시작
			function msgwin(){
				divTerm.style.display="";
				intervalobj=setInterval(winstart,100);
			}
			
			//알림창 슬라이드
			function winstart(){
				if(parseInt(divTerm.style.top)==200){
					clearInterval(intervalobj);
					intervalobj2=setInterval(waitwin,2000);
				}
				
				divTerm.style.top=parseInt(divTerm.style.top)-10;
			}
			
			//알림창 슬라이드 끝나고 2초동안 알림창대기
			function waitwin(){
				clearInterval(intervalobj2);
				divTerm.style.display="none";
				divTerm.style.top=300;
			}
			
			function clear1(){
				f.txt.value="";
			}
			
		</script>
	</head>
<body>
<form name="f" method="post" onsubmit="return false;">
	<input type="button" value="clear" onClick="clear1();">
	<textarea name="txt" cols="100" rows="8"></textarea><br>
	메세지:<input type="text" name="message">
	<input type="button" value="전체전송" onClick="sendmessage()"><br><br>
	
	대상자( joon|joon1):<br><input type="text" name="clist" size="40" value="joon|joon1"><br>
	메세지:<input type="text" name="message2">
	<input type="button" value="부분전송" onClick="sendmessage2()">
	<br>
	<br>
	<input type="button" value="수동 로그인" onClick="mserverlogin();">
	<input type="button" value="수동 로그아웃" onClick="mserverlogout();">
	<input type="button" value="접속리스트" onClick="getUserList();">
	<input type="button" value="로그인여부" onClick="isConnect()">
	<br>
	<br>
	서버관리
	<br>
	<input type="button" value="Stop Server" onClick="serverstop();">
</form>

<form name="f1" method="post" onsubmit="return false;">
	<input type="button" value="Start Server" onClick="serverstart();">
</form>

<div id=divTerm style="position:absolute; left:400px;top:300px; z-index:10000;display:none;">
	<table border="1" width="200">
		<tr>
			<td align="center">메세지알림</td>
		</tr>
		<tr>
			<td id="tdmsg" height="140"></td>
		</tr>
	</table>
</div>
</body>

<OBJECT id="EchoApplet" classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" 
	codebase="http://java.sun.com/update/1.5.0/jinstall-1_5-windows-i586.cab#Version=1,5,0,0"
	width="100" height="100" border="1" align="baseline">
	<PARAM name="code"      value="ucare.echo.client.EchoClientApplet">
	<PARAM name="codebase"  value="/applets/">
	<PARAM name="archive"   value="echoclient.jar">
	<PARAM name="ip"    	value="192.168.123.143">		<!--서버아이피-->
	<!--PARAM name="ip"    	value="10.255.112.10"-->		<!--서버아이피-->
	<PARAM name="port"    	value="23500">
	<PARAM name="userid"    value="joon1">
	<PARAM name="type"      value="application/x-java-applet;jpi-version=1.5.0">
</OBJECT>

<iframe name="ifam" id="ifam" width="800" height="180"/>

</html>