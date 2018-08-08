<!--
  PROJ : Nexfron Intranet
  NAME : infMsgList.jsp
  DESC : 쪽지 - 쪽지 확인
  Author : 하지윤 사원
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.20		하지윤		새로 작성
  -->
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>Grid Sample</title>
<script language="javascript" src="/html/js/information/infMsgList.js"></script>
</head>

<body onLoad="msgSendList()">

<form name="f" target="iLog">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>"/>
	
	<ucare:table type="detail" width="50%">
		<tr>
			<td class="MANTDM" >
				<ucare:grid id="UCINF021S" width="640" height="200">
					<!--id는 db명  -->
					<tr event="O">
						
						<td width="20" column="chk" title=" " format="CHECKBOX"
							hcheckbox="true" editable="true" ></td>
						<td width="60" column="read_yn" title="수신여부"></td>
						<td width="80" column="send_dt" title="보낸일자" format="DATE"></td>
						<td width="80" column="send_tm" title="보낸시각" format="TIME"></td>
						<td width="300" column="title" title="제목" ></td>
						<td width="80" column="send_nm" title="보낸사람"></td>
						<!-- 해당 값은 조회버튼 클릭시  뿌려지지 않음 -->
						<td width="0" column="contents" title="내용" hidden="true"></td>
						<td width="0" column="send_id" title="보낸사람ID" hidden="true"></td>
					</tr>
				</ucare:grid>
			</td>
		</tr>
		
		<tr>
			<td align="right">
				<ucare:imgbtn name="btnSearch" kind="D" onClick="msgRemove()" />
				<ucare:imgbtn name="btnSearch" value="답장" onClick="msgReply()" />
			</td>
			
		</tr>
		<tr>
			<td >
				<textarea rows="10" cols="105"  name="contents">
				</textarea>
				
			</td>
			
		</tr>	
	</ucare:table>

</form>

</body>
</html>