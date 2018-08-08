<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>  
<html>
<head>
<title>test </title>
<script language="javascript" src="">
function queryList()
{
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc("TEST000000001");
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","fQuery","/wisegrid.do");
}
</script>
</head>
<body onLoad="" >  
<form name="fQuery" method="post">
<table border=0 cellpadding=1 cellspacing=0 id=tblList width="100%">
 	<tr><td colspan=2><ucare:xtitle title="캠페인할당"/></td></tr>	
 	<tr>
		<td colspan=6 >
			<ucare:table  type="query" width="100%" >
				<tr>
					<td>
					<table border=0 cellpadding=0 cellspacing=0 >
						<tr>
							<td width="90" align=right>실행기간 :&nbsp;</td>
							<td width="250">
								<input type=text readonly class=input_text name=startdt size=10 required=true title="시작일"  pattern="D" value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd")%>"><span class=calendar onClick="return ifrmCal.service(fQuery.startdt,'pop')"></span>&nbsp; 
								~
								<input type=text readonly class=input_text name=enddt size=10 required=true title="종료일"  pattern="D" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>"><span class=calendar onClick="return ifrmCal.service(fQuery.enddt,'pop')"></span>
							</td>
							<td width="90" align=right>진행상태 :&nbsp;</td>
							<td width="150">
								<ucare:select name="statecd" option="10" brcode="CAM002" styleClass="combo_text" />
							</td>
							<td width="90" align=right>캠페인유형 :&nbsp;</td>
							<td width="100">
								<ucare:select name="camptypecd" option="10" brcode="CAM003" width="150" styleClass="combo_text" />
							</td>
						</tr>
					</table>
					</td>
					<td width=1 rowspan="3" bgcolor=#CCCCCC></td>
					<td width=80 rowspan="3" align="center" >
						<ucare:imgbtn name="btnQuery" kind="R"  width="70"   onClick="queryList();"/>
					</td>		
				</tr>
			</ucare:table>
		</td>
	</tr>
	<tr>
		<td>
			<ucare:grid id="TEST000000001" width="1000" height="250" no="true">
				<tr event="O">
					<td width="560" 	column="aa" 		title="제목" 		></td>
					<td width="75" 		column="bb" 		title="조회수" 		align="center"></td>
					<td width="75" 		column="cc"		title="댓글수"		align="center"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
</form>
</table>
</form>
</body>
</html>