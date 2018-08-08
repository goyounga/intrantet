<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>유지보수사이트 조회</title>
<script language="javascript" src="/html/js/project/prjMntcPOP.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init();" >

<table width="800" cellpadding="0" cellspacing="0" border="0">
	<tr>
 		<td>
 			<table width="800" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="popup_tit"><b>유지보수사이트 조회</b></td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td style="padding:0 5 0 5;">
			<table width="780" cellpadding="0" cellspacing="0" border="0">
				<form	name="fQuery" method="post">
				<tr>
					<td>
						<ucare:table type="query" width="100%">
							<tr>
								<td align="right">고객사명 : &nbsp;</td>
								<td >
									<input type="text" name="clnt_corp_nm" class="input_text" style="width:200;ime-mode:active" onKeyPress="pressEnter('queryList()')">
								</td>
								<td rowspan=2 width="1" bgcolor=#CCCCCC></td>
								<td rowspan=2 width="80" align="right">
									<ucare:imgbtn width="70" name="btnQuery"	value="조회"	 onClick="queryList()"/><!-- 조회 -->
								</td>
							</tr>
						</ucare:table>
					</td>
				</tr>
				</form>
				<form name="f">
				<tr>
					<td class="stitle">유지보수사이트 리스트</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCPRJ031S" width="790" height="415" no="true">
							<tr event="D">
								<td width="0"	column="mtnc_nm" 		title="유지보수명" 		align="left" ></td>
								<td width="100"	column="clnt_corp_nm" 	title="고객사" 			align="left" ></td>
								<td width="110"	column="mtnc_system_nm" title="시스템" 			align="left" ></td>
								<td width="80"	column="chrg_user_id_nm" 	title="상주인력" 			align="center" ></td>
								<td width="60"	column="cs_user_id_nm" 	title="CS담당" 		align="center"></td>
								<td width="120"	column="mtnc_type" 		title="유지보수유형" 	align="center" format="COMBO" brcode="PRJ017"></td>
								<td width="40"	column="mtnc_cost" 		title="비용" 			align="center" format="COMBO" brcode="PRJ014"></td>
								<td width="110"	column="mtnc_period" 	title="기간" 			align="center" ></td>
								<td width="60"	column="regular_chk" 	title="정기점검" 		align="center" format="COMBO" brcode="PRJ015"></td>
								<td width="80"	column="coop_corp_nm" 	title="협력사" 			align="center" ></td>
								<td width="80"	column="dvlp_frwk" 		title="프레임워크" 		align="center" format="COMBO" brcode="PRJ016"></td>
								<td width="170"	column="prj_nm" 		title="프로젝트명" 		align="left"   ></td>
								<td width="200"	column="rmk" 			title="특이사항" 		align="left" maxlength="2000"></td>
								<td width="80"	column="mtnc_seq" 		title="유지보수SEQ" 	align="center" hidden="true"></td>
								<td width="80"	column="clnt_corp_seq" 	title="고객사SEQ" 		align="center" hidden="true"></td>
								<td width="100"	column="mtnc_system" 	title="시스템cd" 		align="center" hidden="true"></td>
								<td width="80"	column="strt_date" 		title="시작일자" 		align="center" hidden="true"></td>
								<td width="80"	column="end_date" 		title="종료일자" 		align="center" hidden="true"></td>
								<td width="80"	column="coop_corp_seq" 	title="협력사SEQ" 		align="center" hidden="true"></td>
								<td width="100"	column="prj_seq" 		title="프로젝트SEQ" 	align="center" hidden="true"></td>
								<td width="100"	column="cs_user_id" 		title="CS담당" 	align="center" hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn name="btnApply" value="적용"  width="70"   onClick="Apply();"/>&nbsp;
						<ucare:imgbtn name="btnClose" value="닫기"  width="70"   onClick="self.close();"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>