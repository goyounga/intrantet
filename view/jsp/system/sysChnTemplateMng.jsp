<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>채널 템플릿 관리</title>
<script language="javascript" src="/html/js/system/sysChnTemplateMng.js"></script>
</head>
<body onLoad="on_Load()">
<form name="fQuery" method="post">

<table border=0 cellpadding=1 cellspacing=1 id=tblList width="100%">
 	<tr><td colspan=9><ucare:xtitle title="채널 템플릿 관리"/></td></tr>	
 	<tr>
		<td colspan=9>
			<ucare:table type="query" width="100%">
				<tr>
					<td width="80" align=right >조회기간 :&nbsp;</td>
					<td width="200">
						<input type="text" class="frm_text" name="q_date_from" size=10 required=true requirednm="등록일자" title="등록일자"  pattern="D" value="<%=CUtil.getMyDate(-1, "yyyy/MM/dd")%>"><span class=calendar onclick="return ifrmCal.service(fQuery.q_date_from)"></span>&nbsp; 
						~
						<input type="text" class="frm_text" name="q_date_to" size=10 required=true requirednm="등록일자" title="등록일자"  pattern="D" value="<%=CDateUtil.getDateString()%>"><span class=calendar onclick="return ifrmCal.service(fQuery.q_date_to)"></span>
					</td>
					<td width="90" align="right">채널유형 :&nbsp;</td>
					<td width="70">
						<ucare:select name="q_channel_type" brcode="SYS001" code="code" codename="codenm" option="10" width="100" styleClass="frm_select"/>
						<!--<select name="" class="frm_select" style="width:80" >
							<option >전체</option>c
							<option >FAX</option>
							<option >SMS</option>
							<option >Email</option>
						</select>-->
					</td>
					<td width=85 align=right>템플릿명 :&nbsp;</td>
					<td width=190>
						<input type=q_templatenm class=frm_text name=q_template_nm size=27 required=false>
					</td>
					<td>&nbsp;</td>
					<td width=1 bgcolor=#CCCCCC></td>
	 				<td width=60><ucare:imgbtn name="btnQuery" value="조회"  width="40"   onClick="on_Search()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" /></td>
	 			</tr>		
			</ucare:table>
		</td>
	</tr>
</form>

<form name="f" method="post">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="mode">
<input type="hidden" name="worktemplateid">
	
	<tr>
		<td valign="top">
			<ucare:table type="border">
				<tr>
					<td class="stitle">채널 템플릿 리스트</td>
				</tr>
			</ucare:table>
			<ucare:table id="UCSYS001S" rows="32" type="list" width="630" height="685" pageman="true" summary="false" no="true">
			  <tr class="LIST" event="O">
			    <td width="80" column="channeltypenm" title="채널유형" align="center"></td>
			    <td width="400" column="templatenm" title="템플릿명" align="center"></td>
			    <td width="100" column="useyn" title="사용여부" align="center"></td>
			  </tr>
			</ucare:table>
		</td>
		<td valign="top">
			<ucare:table type="border">
				<tr>
					<td class="stitle">채널 템플릿 정보</td>
					<td>&nbsp;</td>
				</tr>
			</ucare:table>
			<ucare:table type="detail" width="100%">
				<tr>
					<td class=MANTDT width=100>채널유형</td>
					<td class=tbl_td><ucare:select name="channeltype" brcode="SYS001" code="code" codename="codenm" option="4" width="100" styleClass="Input_mb05" tag="required='true' requirednm='채널유형'" onChange="on_Change(this)"/></td>
				</tr>
				<tr>
					<td class=MANTDT>템플릿명</td>
					<td class=tbl_td><input name="templatenm" type="text" class="frm_text" size=40  required="true" requirednm="템플릿명"></td>
				</tr>
				<tr>	
					<td class=MANTDT>템플릿경로</td>
					<td class=tbl_td><input name="templatepath" type="text" class="frm_readonly" size=40 readOnly><span id="pathBtn" class=search onClick="openFileDir()"></span></td>
				</tr>
				<tr>
					<td class=MANTDT>사용여부</td>
					<td class=tbl_td>
						<select name="useyn" class="frm_select" style="width:100px">
							<option value="">== 선택 ==</option>
							<option value="Y">사용</option>
							<option value="N">미사용</option>
						</select>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>내용</td>
					<td class=tbl_td><textarea name="templatedesc" cols=70 rows=20></textarea></td>
				</tr>								
			</ucare:table>
			<ucare:table type="border" width="100%">
				<tr>
					<td align="right">
						<ucare:table type="border">
							<tr>
								<td align="right">
									<ucare:imgbtn width="40" name="btnAdd" value="등록"  classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight"  onClick="addTemplate()"/>
									<!--<ucare:imgbtn width="40" name="btnEdit" value="수정"  classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight"  onClick="objectReadOnly(false)"/>-->
									<ucare:imgbtn width="40" name="btnSave" value="저장"  classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight"  onClick="on_Save()"/>
									<ucare:imgbtn width="40" name="btnDel" value="삭제"  classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight"  onClick="on_Delete()"/>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							
						</ucare:table>
					</td>					
				</tr>
			</ucare:table>
		</td>
	</tr>
</form>
</table>

</body>
</html>