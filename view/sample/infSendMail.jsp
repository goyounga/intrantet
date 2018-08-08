<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>메일 작성</title>
<script language="javascript" src="js/infSendMail.js"></script>
<SCRIPT language="Javascript1.2">
	_editor_url = "/screditor/";
	var win_ie_ver = parseFloat(navigator.appVersion.split("MSIE")[1]);
	if (navigator.userAgent.indexOf('Mac')        >= 0) { win_ie_ver = 0; }
	if (navigator.userAgent.indexOf('Windows CE') >= 0) { win_ie_ver = 0; }
	if (navigator.userAgent.indexOf('Opera')      >= 0) { win_ie_ver = 0; }

	if (win_ie_ver >= 5.5)
	{
		document.write('<scr' + 'ipt src="' +_editor_url+ 'js/editor.js"');
	  	document.write(' language="Javascript1.2"></scr' + 'ipt>');
	}
	else
	{
		document.write('<scr'+'ipt>function editor_generate() { return false; }</scr'+'ipt>');
	}

// 파일첨부 안됨 (Ajax)	
	function sendMail()
    {
//        alert("dddd");
//    	f.submit();
        var tran=new Trans();
        //tran.setSvc("test01");
        tran.setSvc("test01");
        tran.setForwardId("mailresult","");
        //	DEBUG=true;
        tran.open("f","f","/mail.do");

    }
// 파일첨부 할 경우
	function sendMail2()
    {
    	f.submit();
    }
    function callback(resultcd, successcount)
    {
        alert(resultcd);
        alert(successcount);
    }
</SCRIPT>
<meta http-equiv="Content-Type" content="text/html; application/x-www-form-urlencoded; charset:euc-kr" Accept-Charset="euc-kr"/>
</head>
<body>
<form name="f" method="post" target="iLog" enctype="multipart/form-data" action="/mail.do">
<INPUT name=_SERVICE_TYPE value="SQLSERVICE">
<INPUT name=_SERVICE_ID value="">
<table border=0 cellpadding=1 cellspacing=1 id=tblList width=994>
 	<tr><td colspan=5><ucare:xtitle title="메일 작성"/></td></tr>
 	<tr><td>	
			<ucare:table type="detail" width="100%">
				<tr>
					<td class=MANTDT>메일서버</td>
					<td width="220">
						<input type=text class=TXT name=mail_ip size=20 value="mail.kmps.co.kr">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>메일id</td>
					<td width="220">
						<input type=text class=TXT name=mail_id size=20 value="leecha80@kmps.co.kr">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>메일PWD</td>
					<td width="220">
						<input type=text class=TXT name=mail_pwd size=20 value="leecha80">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>보내는이</td>
					<td width="220">
						<input type=text class=TXT name=mail_from size=20 value="leecha80@kmps.co.kr">
					</td>
				</tr>
				<tr>	
					<td  class=MANTDT>받는이</td>
					<td width="220">
						<input type=text class=TXT name=mail_to size=20 value="leecha80@kmps.co.kr">
					</td>
				</tr>
				<tr>	
					<td  class=MANTDT>제목</td>
					<td>
						<input type=text class=TXT name=mail_subject size=20 required=false>
					</td>
				</tr>		
                <tr>
					<td class=MANTDT>내용</td>
					<td>
						<textarea name="mail_content" rows="" format="" cols="" class="Input_luac" style="width:900;height:220"  onkeyup="" title=내용 ></textarea>
						<!--<SCRIPT language=javascript>
							editor_generate('mail_content');
						</SCRIPT>-->
					</td>
				</tr>
				<tr>	
					<td  class=MANTDT>첨부파일1(서버  url)</td>
					<td>
						<input type=text class=TXT name=mail_file size=20 required=false value="">
					</td>
				</tr>		
				<tr height="25">
					<td class=MANTDT>첨부파일(client)</td>
					<td class=MANTDM>
            			<input type="file" name="_UPLOAD_FILE" style="width:90%">
					</td>
				</tr>
				<tr>
				    <td></td>
					<td><ucare:imgbtn value="전송" onClick="sendMail()"/>
					    <ucare:imgbtn value="전송(submit)" onClick="sendMail2()"/></td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</table>
</form>
<iframe name="iLog" height="200" width="200" frameborder=1></iframe>
</body>
</html>