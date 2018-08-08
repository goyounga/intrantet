<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>  
<html>
<head>
	<title>Table 조회</title>
<script language=javascript>
function init()
{
	searchCoodbookList();
}

//조회
function searchCoodbookList() 
{
	var tran = new Trans();
	tran.setPageRow(9999);
	tran.setSvc("UCCOMTABLE");
	tran.setDefClick(true);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.open("fQuery","f","/wisegrid.do");	
}

//엔터키 조회
function checkEnterKey()
{
	if(isEnterKey())
	{
		searchCoodbookList();
	}
}
/********************
* 트리 클릭이벤트
********************/
function treeClick(obj, strTreeKey, strArea)
{
}
var tempTname = '';
function showDetail_obj(id, strColumnKey, nRow)
{
	var tname = (DataSet.getParam(id, 1, nRow, "tname"));

	if(tname == tempTname) return;

	tempTname = tname;

	selectTable(tname);
}

function selectTable(tname)
{
	var tran = new Trans();
	tran.setPageRow(999);
	tran.setSvc("UCCOMTABLE_DETAIL1");
	tran.setWiseGrid("1");
	tran.setUserParams("tname="+tname);
	tran.setForwardId("wgdsl","");
	tran.open("fQuery","f","/wisegrid.do");
}

function callback(sid)
{
}
</script>
</head>
<body onLoad="init()" style="padding:0 0 0 5;">

<table width="800" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="Table 조회"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	
	<!-- 검색 -->
	<form name="fQuery" method="post">
	<tr>
		<td>
			<ucare:table type="query" width="800">
				<col width="80"	/>
				<col width="150"/>
				<col width="80"	/>
				<col width="150"/>
				<col width="1"	/>
				<col width="200"	/>
				<tr>
					<td align=right> Table 명 :&nbsp;</td>					
					<td>
						<input type=text class=input_text name="table" size=20 required=false onKeyPress="checkEnterKey();">
					</td>					
					<td align=right> Table 설명 :&nbsp;</td>
					<td>
						<input type=text class=input_text name="commment" size=20 required=false onKeyPress="checkEnterKey();">
					</td>					
					<td bgcolor=#CCCCCC></td>
					<td width="80"align=center>
						<ucare:imgbtn name="btnQuery" value="조회"  width="70" onClick="searchCoodbookList()" />
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	
	<!-- 본문  -->
	<form name="f" method="post" target="iLog">
	<input type="hidden" name="codeReload" value="<%=CIni.getString("CODEBOOK_RELOAD")%>">
	<input type="hidden" name="SERVER1" value="<%=CIni.getString("SERVER1")%>">
	<input type="hidden" name="SERVER2" value="<%=CIni.getString("SERVER2")%>">
	<input type="hidden" name="DB_SERVICEMODE" value="<%=ucare.jaf.common.CIni.getParam("DB_SERVICEMODE").asString("")%>">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	
	<tr>
		<td>
			<table width="800" cellpadding="0" cellspacing="0" border="0">
				<col width="240"/>
				<col width="10"/>
				<col width="550"/>
				<tr>
					<!-- 트리 -->
					<td valign="top">
		
						<table width="240" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">Table</td>
							</tr>
							<tr>
								<td>
		
									<ucare:grid id="UCCOMTABLE" width="240" height="500" tree="true">
										<tr class="LIST" event="O">
											<td  width="350" column="codev" image="doc" format="TREE" action="true"></td>
										</tr>
									</ucare:grid>
		
								</td>
							</tr>
						</table>
		
					</td>
					<!-- 공백 -->
					<td></td>
					<!-- 상세정보 -->
					<td valign="top">
		
						<!-- 게시판리스트 S -->
					<td valign="top">
						<table width="550" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">Table 정보</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCCOMTABLE_DETAIL1" width="550" height="500" no="true">
										<tr>
											<td width="30" 		column="pk" 		title="PK" 			align="center"></td>
											<td width="150" 	column="col_nm" 	title="컬럼명" 		align="left"></td>
											<td width="150" 	column="col_cmt" 	title="컬럼설명"	align="left"></td>
											<td width="90"		column="type_cd" 	title="TYPE"		align="center"></td>
											<td width="40"		column="length" 	title="크기"		align="right"></td>
											<td width="50" 		column="null_yn" 	title="NULL"		align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>

				</tr>
			</table>

		</td>
	</tr>
	</form>

</table>
</body>
</html>