<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="ucare.jaf.common.CUtil"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
<title>CLIENT</title>
<%@ include file="include.jsp"%>
<%
	response.setContentType("text/html;charset=euc-kr");
	response.setHeader("Cache-Control","no-chace");
	ucare.jaf.common.CParamSet cParamSet 					 = null;
	ucare.jaf.database.IDataSet iDataSet 					 = null;				//query list
	ucare.jaf.database.IDataSet ds 		 					 = null;				//data  list
	ucare.jpattern.service.ServiceManagerBean serviceManager = null;				//service obj
	
	String start_num 	= cleanXSS(CUtil.nvl(request.getParameter("_START_ROW")	, "1"));	//요청페이지
	String seq 			= cleanXSS(CUtil.nvl(request.getParameter("seq")		, "x"));	//목록에서 - 게시글번호

	String bord_title   = "";
	String bord_cntn    = "";
	String reg_date     = "";
	String user_nm      = "";

	try
	{
		cParamSet = new ucare.jaf.common.CParamSet();
		cParamSet.setParam("_SERVICE_TYPE"	, "SQLSERVICE,SQLSERVICE");
		cParamSet.setParam("_SERVICE_ID"	, _UPDATE_ID_VIEW+ ","+_SELECT_ID_VIEW);
		cParamSet.setParam("notice_seq"		, seq);
		serviceManager 	= new ucare.jpattern.service.ServiceManagerBean();
		iDataSet 		= serviceManager.callService(cParamSet);
		iDataSet.next();
		ds = iDataSet.getFindDataSet(_SELECT_ID_VIEW);
		ds.next();

		bord_title   = ds.getParam( "bord_title"  ).asString("");
		bord_cntn    = ds.getParam( "bord_cntn"   ).asString("");
		reg_date     = ds.getParam( "reg_date"    ).asString("");
		user_nm      = ds.getParam( "user_nm"     ).asString("");
	}
	catch (Exception e)
	{
		ucare.jaf.common.ILogger.log.error(e.getMessage());
	}
	finally
	{
		cParamSet		= null;
		iDataSet		= null;
		ds 				= null;
		serviceManager	= null;
	}
%>
<link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<body leftmargin="0" topmargin="0" style="text-align:center;">
<form name="fBoard" method="post" action="hpgClientMod.jsp" target="_self">
<input type="hidden" name="_START_ROW" 	value="<%=start_num%>">
<input type="hidden" name="mode" value="LIST">
</form>
				  <table width="670" border="0" cellspacing="0" cellpadding="0">
                    <tr class="list_table_header2">
                      <td height="33" colspan="2" background="images/list_table_header.gif" id="tdNewsTitle"><%=bord_title%></td>
                    </tr>
                    <tr>
                      <td width="70"  class="table_header" height="28" >게시자<br></td>
                      <td width="600" class="list_table_data" id="tdNewsRegNm"><%=user_nm%></td>
                    </tr>
                    <tr align="center"><td height="1" colspan="2" bgcolor="EFEFEF"></td></tr>
                    <tr>
                      <td class="table_header">게시일자</td>
                      <td class="list_table_data" id="tdNewsRegDate"><%=reg_date%></td>
                    </tr>
                    <tr align="center"><td height="1" colspan="2" bgcolor="EFEFEF"></td></tr>
                    <tr>
                      <td height="200" colspan="2" valign="top"><div style="height:200;overflow-y:auto" id="tdNewsContent"><%=convertBR(bord_cntn,1)%></div></td>
                    </tr>
                    <tr align="center"><td height="2" colspan="2" bgcolor="CDCDCD"></td></tr>
                  </table>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="10" height="50"></td>
                      <td width="40"></td>
                      <td align="center">&nbsp;</td>
                      <td width="50" height="20" align="center"><a href="javascript:fBoard.submit();"><img src="images/c_board_btn_list.gif" width="40" height="21" border="0"></a></td>
                      <td width="10"></td>
                    </tr>
                  </table>
</body>
</html>