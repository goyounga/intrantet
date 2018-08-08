<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<%!
public String getFileInfo(String sPath, String sFile)
{
	String sRet = "";
	try{
		String sFilePath = sPath+"\\"+sFile;
		String sDate = ucare.jaf.common.CFileUtil.lastModified(sFilePath);
		String sToday = ucare.jaf.common.CDateUtil.getToday();

		sRet += "<a style=color:blue target=_blank href='/jsp/common/downFile.jsp?flag=mypath&filepath="+sPath+"&filename="+sFile+"&newfilename="+sFile+"'>"+CUtil.getDisplayLongDate(sDate,"-")+"</a>";
		if (Integer.parseInt(CDateUtil.getDateWithOffset(sToday, -7)) < Integer.parseInt(sDate.substring(0,8)))
		{
			sRet += "&nbsp;<img src=/html/images/icon/icon_new.gif>";
		}
	}catch (Exception e)
	{
		e.printStackTrace();
	}	
	return sRet;	
}

%>
<html>
<head>
	<title>Ucare Example</title>
	<script language="javascript" src="/html/js/ucareprogram/ucrUpgradeMng.js"></script>
</head>
<%
	java.util.Properties dbProps = new java.util.Properties();
//	InputStream is_db=null;

	String sFilePath = "D:\\project\\fileupload\\framework\\framework.ini";
	try 
	{
		InputStream is_db=null;
		File file=new File (sFilePath);
		
		System.out.println( "loadFromFile commonConfigPath = " + sFilePath);
		if (file.exists()){
 			is_db=new FileInputStream(file);
 		}
		dbProps.load(is_db);
		is_db.close();
	}
	catch (FileNotFoundException  fnfe) 
	{
		ILogger.log.error ("CInit FileNotFoundException :: loadFromFile... Check the specified properties file exists! ");
		fnfe.printStackTrace();
	}	
	catch (IOException  ioe) 
	{
		ILogger.log.error("CInit IOException :: loadFromFile... Check the specified properties file exists! ");
		ioe.printStackTrace();
	}		
	catch (Exception e) 
	{
		ILogger.log.error ("CInit Exception :: loadFromFile... Check the specified properties file exists! ");
		e.printStackTrace();
	}

String core_path     = dbProps.getProperty("core_path");
String batch_path    = dbProps.getProperty("batch_path");
String echo_svr_path = dbProps.getProperty("echo_svr_path");
String echo_clt_path = dbProps.getProperty("echo_clt_path");
String js_path       = dbProps.getProperty("js_path");
String js_path_new   = dbProps.getProperty("js_path_new");

String core_ver    = dbProps.getProperty("core_ver");
String batch_ver   = dbProps.getProperty("batch_ver");
String echo_ver    = dbProps.getProperty("echo_ver");
String ucare_js    = dbProps.getProperty("ucare_js");
String ucare_js_new= dbProps.getProperty("ucare_js_new");
String[] ucare     = CUtil.TokenToArray(ucare_js,",");
String[] ucare_new = CUtil.TokenToArray(ucare_js_new,",");
%>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- 검색조건 S -->
	<form	name="fQuery" method="post">
	<input type="hidden" name="search" value="">
	<tr>
		<td colspan=3>
			<ucare:table type="query" width="100%">
				<tr>
					<td width="80" align="right">유형 :&nbsp;</td>
					<td width="100">
						<ucare:select name="upg_type_cd" option="10" brcode="UCR004" width="100" styleClass="combo_text" option="0"/>
					</td>	
					<td width="80" align="right">작성일 :&nbsp;</td>
					<td width="300">
						<ucare:search name="dt" type="TERM"  width="70" formnm="fQuery" requirednm="작성일" format="DATE" strtval="2000-01-01" endval="<%=CUtil.getCurrDate(\"yyyy-MM-dd\")%>"  pattern="D" required="true" styleClass="input_readonly"/>
					</td>	
					<td width="80" align="right">검색조건 :&nbsp;</td>
					<td width="300">
						<select name="keycode" class="combo_text">
							<option value=""> == 선택 == </option>
							<option value="upg_title">예제명</option>
							<option value="upg_cntn">예제내용</option>
						</select>
						<input type=text class="input_text" name="keyword" size=30 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn name="btnQuery"	value="조회"	 onClick="queryList()"/><!-- 조회 -->
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- 검색조건 E -->

	<tr>
		<td height="5" width=30%></td>
		<td height="5" rowspan=7 width=1%></td>
		<td height="5" width=69%></td>
	</tr>

	<!-- 본문 S -->
	<form name="f" method="post">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="upg_seq" value="">
	<tr>
		<td class="stitle">파일 정보</td>
		<td class="stitle">업그레이드 정보</td>
	</tr>
	<tr>
		<td rowspan=5 valign=top>
			<span  style='height:700;width:400;overflow-x:auto;overflow-y:scroll' >
			<ucare:table type="detail" width="100%" >
				<tr>
					<td class='MANTDT'>구분</td>
					<td class='MANTDT'>파일</td>
					<td class='MANTDT'>버전</td>
					<td class='MANTDT'>JDK</td>
					<td class='MANTDT'>수정일</td>
				</tr>
				<tr>
					<td class='MANTDM' rowspan=9>UCare</td>
					<td class='MANTDM' rowspan=3>Jaf</td>
					<td class='MANTDM' rowspan=9><%=core_ver%></td>
					<td class='MANTDM'>4</td>
					<td class='MANTDM'><%=getFileInfo(core_path+"\\1.4","jaf"+core_ver+".4.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>5</td>
					<td class='MANTDM'><%=getFileInfo(core_path+"\\1.5","jaf"+core_ver+".5.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>6</td>
					<td class='MANTDM'><%=getFileInfo(core_path+"\\1.6","jaf"+core_ver+".6.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM' rowspan=3>JPattern</td>
					<td class='MANTDM'>4</td>
					<td class='MANTDM'><%=getFileInfo(core_path+"\\1.4","jpattern"+core_ver+".4.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>5</td>
					<td class='MANTDM'><%=getFileInfo(core_path+"\\1.5","jpattern"+core_ver+".5.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>6</td>
					<td class='MANTDM'><%=getFileInfo(core_path+"\\1.6","jpattern"+core_ver+".6.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM' rowspan=3>JAddition</td>
					<td class='MANTDM'>4</td>
					<td class='MANTDM'><%=getFileInfo(core_path+"\\1.4","jaddition"+core_ver+".4.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>5</td>
					<td class='MANTDM'><%=getFileInfo(core_path+"\\1.5","jaddition"+core_ver+".5.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>6</td>
					<td class='MANTDM'><%=getFileInfo(core_path+"\\1.6","jaddition"+core_ver+".6.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM' rowspan=3 colspan=2>UCare Batch</td>
					<td class='MANTDM' rowspan=3><%=batch_ver%></td>
					<td class='MANTDM'>4</td>
					<td class='MANTDM'><%=getFileInfo(batch_path,"ucarebatch"+batch_ver+".4.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>5</td>
					<td class='MANTDM'><%=getFileInfo(batch_path,"ucarebatch"+batch_ver+".5.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>6</td>
					<td class='MANTDM'><%=getFileInfo(batch_path,"ucarebatch"+batch_ver+".6.jar")%></td>
				</tr>			
				<tr>
					<td class='MANTDM' rowspan=6>UCare Echo</td>
					<td class='MANTDM' rowspan=3>EchoServer</td>
					<td class='MANTDM' rowspan=6><%=echo_ver%></td>
					<td class='MANTDM'>4</td>
					<td class='MANTDM'><%=getFileInfo(echo_svr_path,"echoserver"+echo_ver+".4.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>5</td>
					<td class='MANTDM'><%=getFileInfo(echo_svr_path,"echoserver"+echo_ver+".5.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>6</td>
					<td class='MANTDM'><%=getFileInfo(echo_svr_path,"echoserver"+echo_ver+".6.jar")%></td>
				</tr>
				<tr>
					<td class='MANTDM' rowspan=3>EchoClient</td>
					<td class='MANTDM'>4</td>
					<td class='MANTDM'><%=getFileInfo(echo_clt_path,"echoclient"+echo_ver+".4.zip")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>5</td>
					<td class='MANTDM'><%=getFileInfo(echo_clt_path,"echoclient"+echo_ver+".5.zip")%></td>
				</tr>
				<tr>
					<td class='MANTDM'>6</td>
					<td class='MANTDM'><%=getFileInfo(echo_clt_path,"echoclient"+echo_ver+".6.zip")%></td>
				</tr>
				<%for (int i=0; i < ucare_new.length; i++)
				{
					out.println("<tr>");
					if (i==0) out.println("<td class='MANTDM' rowspan="+ucare_new.length+">UCare Js(<img src=/html/images/icon/icon_new.gif>)</td>");
				%>		
					<td class='MANTDM' colspan=3><%=ucare_new[i]%></td>
					<td class='MANTDM'><%=getFileInfo(js_path_new,ucare_new[i])%></td>
				</tr>
				<%}%>

				<%for (int i=0; i < ucare.length; i++)
				{
					out.println("<tr>");
					if (i==0) out.println("<td class='MANTDM' rowspan="+ucare.length+">UCare Js(Old)</td>");
				%>		
					<td class='MANTDM' colspan=3><%=ucare[i]%></td>
					<td class='MANTDM'><%=getFileInfo(js_path,ucare[i])%></td>
				</tr>
				<%}%>
			</ucare:table>
			</span>
		</td>
		<td valign=top>
			<ucare:grid id="UCUCR306S" width="100%" height="320" no="true">
				<tr event="O">
					<td width="70" column="upg_type_cd" 	title="형태" brcode="UCR005"  format="COMBO"></td>
					<td width="70" column="upg_src_cd" 	title="위치" brcode="UCR004"  format="COMBO"></td>
					<td width="570" column="upg_title" 		title="제목"></td>
					<td width="0" column="upg_src" 		title="내용" hidden="true"></td>
					<td width="0" column="upg_cntn" 		title="내용" hidden="true"></td>
					<td width="0" column="upg_exps" 		title="내용" hidden="true"></td>
					<td width="0" column="notc_yn" 		title="내용" hidden="true"></td>
					<td width="120" column="reg_dt" 		title="작성일시"	align="center" format="DATET"></td>
					<td width="50"  column="reg_user_id" 	title="작성자"		align="center"></td>
					<td width="50"  column="upg_seq" 		title="ex_seq" hidden="true"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr>	
		<td class="stitle">상세정보</td>
	</tr>
	<tr>
		<td>
			<ucare:table type="detail" width="100%">
				<tr>
					<td class="MANTDT">제목</td>
					<td class="MANTDM" colspan="3">
						<ucare:select name="upg_type_cd" option="10" brcode="UCR005" width="100" styleClass="combo_text" option="0"/>
						<ucare:select name="upg_src_cd" option="10" brcode="UCR004" width="100" styleClass="combo_text" option="0"/>
						<input type=text class="input_required" name="upg_title" required="true" requirednm="예제명" style="width:60%;" maxlength="100">
					</td>
				</tr>
				<tr>
					<td class="MANTDT">파일위치</td>
					<td class="MANTDM" colspan="3">
						<input type=text class="input_required" name="upg_src" required="true" requirednm="예제명" style="width:80%;" maxlength="100">
					</td>
				</tr>
				<tr>
					<td class="MANTDT">내용</td>
					<td class="MANTDM" colspan="3">
						<textarea class="input_required" name="upg_cntn" style="width:100%;height:130;"></textarea>
					</td>
				</tr>
				<tr>
					<td class="MANTDT">사용예시</td>
					<td class="MANTDM" colspan="3">
						<textarea class="input_required" name="upg_exps" style="width:100%;height:120;"></textarea>
					</td>
				</tr>
				<tr>
					<td class="MANTDT">공지여부</td>
					<td class="MANTDM" colspan="3">
						<ucare:input type="radio" name="notc_yn" option="10" brcode="USEYN" width="50" styleClass="combo_text" option="0"/>
					</td>
				</tr>
				<tr>
					<td class="MANTDT">작성자</td>
					<td class="MANTDM">
						<input type=text class=input_readonly readonly name="reg_user_id" style="width:197;">
					</td>
					<td class="MANTDT">작성일시</td>
					<td class="MANTDM">
						<input type=text class=input_readonly readonly name="reg_dt" style="width:197;">
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	<tr>
		<td height="10"></td>
	</tr>
	<tr>
		<td align="right">
			<ucare:imgbtn name="btnAdd"		value="등록"	onClick="exAdd()"/><!-- 등록 -->
			<ucare:imgbtn name="btnSave"		value="저장"	onClick="exSave()"/><!-- 저장 -->
			<ucare:imgbtn name="btnDel"		value="삭제"	onClick="exDel()"/><!-- 삭제 -->
		</td>
	</tr>
</form>
</table>
</body>
</html>