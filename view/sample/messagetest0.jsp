<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/jsp/include/include.jsp"%>

<html>
	<head>
		<script language="javascript">
		
			/////////////////////////////////////메시지박스 변수값 객체/////////////////////////////////
			/**
			 * 그리드 리스트
			 * 현재 생성된 그리드들을 리스트로 관리한다.
			 */
			var msgValList = new Array();
			var msgValue = new Array();		//메시지 박스 변수값 배열

			/**
			 * 메시지 박스 변수값 생성자
			 * divMsgId      : 메시지박스 ID
			 * intervalobj   : 메시지박스 Timer
			 * iVal          : 레이아웃 값
			 * count         : 메시지박스 번호
			 */
			function msgVal()
			{
				this.divMsgId;
				this.intervalobj;				
				this.iVal;						
				this.count;						

				msgValList.push(this);			
			}

			/**
			 * 메시지박스 ID값 리턴
			 * divMsgId      : 메시지박스 ID
			 */
			msgVal.prototype.getDivMsgIdj = function()
			{
				return this.divMsgId;
			}

			/**
			 * 메시지박스 Timer 리턴
			 * intervalobj      : 메시지박스 Timer 
			 */
			msgVal.prototype.getIntervalobj = function()
			{
				return this.intervalobj;
			}

			/**
			 * 레이아웃 값 리턴
			 * iVal      : 레이아웃 값
			 */
			msgVal.prototype.getIVal = function()
			{
				return this.iVal;
			}

			/**
			 * 메시지박스 번호 리턴
			 * getCount      : 메시지박스 번호
			 */
			msgVal.prototype.getCount = function()
			{
				return this.count;
			}

			///////////////////////////////////////////////////////////////////////////////////////////////////////////

			/**
			  * 내용을 뿌려줄 메시지 박스 선택
			  */
			function makeMsgBox(msg)
			{
				var cnt;
				//아무것도 정의되지 않았을 경우
				if(typeof document.all.trMsg_0 == "undefined")
				{
					cnt = 0;
				}
				else if (typeof document.all.trMsg_1 == "undefined")
				{
					cnt = 1;
				}
				else if (typeof document.all.trMsg_2 == "undefined")
				{
					cnt = 2;
				}
				else if (typeof document.all.trMsg_3 == "undefined")
				{
					cnt = 3;
				}
				else if (typeof document.all.trMsg_4 == "undefined")
				{
					cnt = 4;
				}
				else if (typeof document.all.trMsg_5 == "undefined")
				{
					cnt = 5;
				}
				else 
				{
					cnt = 0;
					clearInterval(msgValue[cnt].getIntervalobj());
					initMsg(cnt);

				}

				var sb = new StringBuffer();
				sb.append("<table border='0' cellpadding=0 cellspacing=1 class='table_line' width='200' style='position:absolute;z-index:10000'>");
				sb.append("	<tr id=trMsg_"+cnt+">");
				sb.append("		<td class=table_header width=198 align='center'>메세지알림</td>");
				sb.append("	</tr>");
				sb.append("	<tr>");
				sb.append("		<td class=MANTDM width=198>");
				sb.append("			<textarea class=input_transparent name='tdmsg' readOnly='true' value='' style='width:191;height:119;overflow-x:hidden;overflow-y:hidden;cursor:hand' onclick='showMsg(0)'></textarea>");
				sb.append("		</td>");
				sb.append("	</tr>");
				sb.append("</table>");
				sb.append("<div style='width:200;height:145;z-index:0; position:relative; left:0px; top:-0; background-color:#FFFFFF;'>");
				sb.append("	<iframe id='lineFrame' width='200' height='145' frameborder='0' marginheight='0' marginwidth='0' topmargin='0' leftmargin='0' scrolling='no'></iframe>");
				sb.append("</div>");
				
				divMsgBox[cnt].innerHTML = sb.toString();

				msgValSet("divMsgBox["+cnt+"]", "", 0, cnt);
				return cnt;
			}

			/**
			  * 변수값 설정
			  */
			function msgValSet(msgId,interval,iVal,cnt)
			{
				msgValue[cnt] = new msgVal();

				msgValue[cnt].divMsgIdj		= msgId;
				msgValue[cnt].intervalobj	= interval;
				msgValue[cnt].iVal			= iVal;
				msgValue[cnt].count			= cnt;
			}

			/**
			  * divMsgBox[cnt]의 변수값 및 태그 초기화
			  */
			function initMsg(cnt)
			{
				divMsgBox[cnt].innerHTML= "";
				if(typeof msgValue[cnt] != "undefined")	clearInterval(msgValue[cnt].getIntervalobj());
				msgValue[cnt] = new msgVal();
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
			
			
			function clear1(){
				f.txt.value="";
			}

			/**
			  * 받은 메세지
			  */
			function receiveReturnMessage(errorcd,msg){	
				var cnt = makeMsgBox(msg);
				f.txt.value+="\n"+msg;

				clearInterval(msgValue[cnt].getIntervalobj());
				divMsgBox[cnt].style.filter = "Alpha(opacity=" + msgValue[cnt].getIVal() +")";

				//도착한 메시지 알림창에 설정
				if(errorcd=="S"){
					if(typeof document.all.tdmsg.length == "undefined") tdmsg.value=msg;
					else tdmsg[cnt].innerText=msg;
					
					//메인창 받은메시지수 +1
					//memocnt.innerText = parseInt(memocnt.innerText) + 1;

				}
				else if(errorcd=="O"){
					if(typeof document.all.tdmsg.length == "undefined") tdmsg.value=msg;
					else tdmsg[cnt].innerText=msg;

					if( msg == "메세지 서버에 연결되었습니다." ) loginYN = "Y";
					//return;
				}
				else if(errorcd=="E"){
					//mserverlogin(); 
					initMsg(cnt);
					return;
				}else if(errorcd=="C"){
					if(typeof document.all.tdmsg.length == "undefined") tdmsg.value=msg;
					else tdmsg[cnt].innerText=msg;
					
					if(msg == "서버로 부터 접속이 끊어 졌습니다." || msg == "정상 로그아웃 되었습니다.") loginYN = "N";
					//return;
				}
				msgwin(cnt);
			}

			/**
			  * 보낸 메세지
			  */
			function sendFixedMsg(user,content)
			{
				EchoApplet.sendFixedMsg(user,content);
			}

			/**
			  * 메세지 서버 수동 로그인
			  */
			function mserverlogin(){
				 EchoApplet.messageStart();
			}

			/**
			  * 메세지 서버에서 로그아웃한다.
			  */
			function msgLogout()
			{
				for (var i=0; i < 6 ; i++ )
				{
					initMsg(i);
				}
				mserverlogout();
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


			/**
			  * 알림창 나타내기 timer 시작
			  */
			function msgwin(cnt){
				divMsgBox[cnt].style.display="";
				msgValue[cnt].intervalobj = setInterval("winstart("+cnt+")",100);
			}

			/**
			  * 알림창 나타내기 및 대기
			  */
			function winstart(cnt){	
				divMsgBox[cnt].style.filter = "Alpha(opacity=" + msgValue[cnt].getIVal() +")";
				if( msgValue[cnt].getIVal() == 100 ) 
				{
					clearInterval(msgValue[cnt].getIntervalobj());
					msgValue[cnt].intervalobj=setInterval("waitwin("+cnt+")",2000);
				}
				else msgValue[cnt].iVal = msgValue[cnt].getIVal() + 10;
			}

			/**
			  * 알림창 사라지기 timer 시작
			  */
			function waitwin(cnt){
				clearInterval(msgValue[cnt].getIntervalobj());
				msgValue[cnt].intervalobj = setInterval("winend("+cnt+")",100);
			}

			/**
			  * 알림창 사라지기 및 초기화
			  */
			function winend(cnt){
				divMsgBox[cnt].style.filter = "Alpha(opacity=" + msgValue[cnt].getIVal() +")";
				if( msgValue[cnt].getIVal() == 0 ) 
				{
					
					clearInterval(msgValue[cnt].getIntervalobj());
					initMsg(cnt);
				}
				else msgValue[cnt].iVal = msgValue[cnt].getIVal() - 10;
			}
			
			/**
			  * 창닫힐때 로그아웃
			  */
			function explorerEnd()
			{
				for (var i=0; i < 6 ; i++ )
				{
					initMsg(i);
				}
				mserverlogout();
			}
		</script>
	</head>
<body onbeforeunload="explorerEnd()">
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
	<br>
	<br>
	서버관리
	<br>
	<input type="button" value="Stop Server" onClick="serverstop();">
</form>

<form name="f1" method="post" onsubmit="return false;">
	<input type="button" value="Start Server" onClick="serverstart();">
</form>

<div id=divMsgBox style="position:absolute; left:1058px;top:775px; z-index:10000;display:;" style='filter: Alpha(opacity=100)'></div>
<div id=divMsgBox style="position:absolute; left:1058px;top:630px; z-index:10000;display:;" style='filter: Alpha(opacity=100)'></div>
<div id=divMsgBox style="position:absolute; left:1058px;top:485px; z-index:10000;display:;" style='filter: Alpha(opacity=100)'></div>
<div id=divMsgBox style="position:absolute; left:1058px;top:340px; z-index:10000;display:;" style='filter: Alpha(opacity=100)'></div>
<div id=divMsgBox style="position:absolute; left:1058px;top:195px; z-index:10000;display:;" style='filter: Alpha(opacity=100)'></div>
<div id=divMsgBox style="position:absolute; left:1058px;top:50px;  z-index:10000;display:;" style='filter: Alpha(opacity=100)'></div>
</body>



<OBJECT id="EchoApplet" classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" 
	codebase="http://java.sun.com/update/1.5.0/jinstall-1_5-windows-i586.cab#Version=1,5,0,0"
	width="100" height="100" border="1" align="baseline">
	<PARAM name="code"      value="ucare.echo.client.EchoClientApplet">
	<PARAM name="codebase"  value="/applets/">
	<PARAM name="archive"   value="echoclient.jar">
	<PARAM name="ip"    	value="192.168.123.143">		<!--서버아이피-->
	<PARAM name="port"    	value="23500">
	<PARAM name="userid"    value="8000103">
	<PARAM name="type"      value="application/x-java-applet;jpi-version=1.5.0">
</OBJECT>

<iframe name="ifam" id="ifam" width="800" height="180"/>

</html>