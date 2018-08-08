<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="ucare.jaf.common.CUtil"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
<title>뉴스&공지</title>
<%!
    public String convertBR(String s, int i)
    {
        StringBuffer stringbuffer = new StringBuffer();
        int j = 0;
        int k = 0;
        if(s == null)
            return "";
        if(i > 0)
        {
            for(; j < s.length(); j++)
            {
                if(s.charAt(j) == '\r')
                {
                    stringbuffer.append("<BR>");
                    continue;
                }
                if(s.charAt(j) != '\n')
                    stringbuffer.append(s.charAt(j));
            }

            return stringbuffer.toString();
        }
        for(j = s.indexOf("<BR>"); j != -1 && j < s.length(); j = s.indexOf("<BR>", k))
        {
            stringbuffer.append(s.substring(k, j));
            stringbuffer.append("\\r\\n");
            k = j += 4;
        }

        if(j < s.length())
            stringbuffer.append(s.substring(k, s.length()));
        return stringbuffer.toString();
    }
%>
<%
	response.setContentType("text/html;charset=euc-kr");
	response.setHeader("Cache-Control","no-chace");
	ucare.jaf.common.CParamSet cParamSet 					 = null;
	ucare.jaf.database.IDataSet iDataSet 					 = null;				//query list
	ucare.jaf.database.IDataSet ds 		 					 = null;				//data  list
	ucare.jpattern.service.ServiceManagerBean serviceManager = null;				//service obj
	
	String start_num 		= CUtil.nvl(request.getParameter("_START_ROW")	, "1");	//요청페이지
	String seq 				= CUtil.nvl(request.getParameter("seq")			, "x");	//목록에서 - 게시글번호
	String popup 			= CUtil.nvl(request.getParameter("popup")		, "N");	//팝업 - 사용안함
	String display			= popup.equals("Y")?"block":"none";						//팝업 - 사용안함
	String linker 			= CUtil.nvl(request.getParameter("linker")		, "N");	//홈 화면에서 메뉴 바꿈
	String idx 				= CUtil.nvl(request.getParameter("idx")			, "1");	//홈 화면에서 메뉴 바꿈

	String SELECT_ID		= (linker.equals("Y") ? "UCHPG004S" : "UCHPG002S");		//페이지번호*페이지당갯수+위치 -> 페이징 쿼리에서 특정 idx record 가져오기 - 대체됨
	String UPDATE_ID		= "UCHPG003U";
	String _SERVICE_TYPE	= "SQLSERVICE,SQLSERVICE";
	String _SERVICE_ID		= UPDATE_ID+ ","+SELECT_ID;

//	String bord_seq		= "";
	String bord_title   = "";
	String bord_cntn    = "";
	String reg_date     = "";
//	String qry_cnt      = "";
//	String gubun        = "";
//	String gubunnm      = "";
	String user_nm      = "";

	try
	{
		cParamSet = new ucare.jaf.common.CParamSet();
		cParamSet.setParam("_SERVICE_TYPE"	, _SERVICE_TYPE	);
		cParamSet.setParam("_SERVICE_ID"	, _SERVICE_ID	);
		cParamSet.setParam("notice_seq"		, (linker.equals("Y") ? idx : seq));
		serviceManager 	= new ucare.jpattern.service.ServiceManagerBean();
		iDataSet 		= serviceManager.callService(cParamSet);
		iDataSet.next();
		ds = iDataSet.getFindDataSet(SELECT_ID);
		ds.next();
//		bord_seq	 = ds.getParam( "bord_seq"    ).asString("");
		bord_title   = ds.getParam( "bord_title"  ).asString("");
		bord_cntn    = ds.getParam( "bord_cntn"   ).asString("");
		reg_date     = ds.getParam( "reg_date"    ).asString("");
//		qry_cnt      = ds.getParam( "qry_cnt"     ).asString("");
//		gubun        = ds.getParam( "gubun"       ).asString("");
//		gubunnm      = ds.getParam( "gubunnm"     ).asString("");
		user_nm      = ds.getParam( "user_nm"     ).asString("");
	}
	catch (Exception e)
	{
		ucare.jaf.common.ILogger.log.error(e.getMessage());
	}
	finally{}
%>
<link href="css/style.css" rel="stylesheet" type="text/css">
<script type="text/JavaScript">
function viewList()
{
 	fBoard.action = "hpgCorpNewsSearchAct.jsp";
 	fBoard.target = "_self";
 	fBoard.method = "post";
 	fBoard.submit();
}
</script>
</head>
<body leftmargin="0" topmargin="0" style="text-align:center;">
<form name="fBoard" target="hpgCorpNewsSearchAct">
<input type="hidden" name="_START_ROW" 	value="<%=start_num%>">
</form>
				<table width="670" border="0" cellspacing="0" cellpadding="0" style="display:<%=display%>">
	              <tr>
	                <td height="30">&nbsp;</td>
	              </tr>
	              <tr>
	                <td><img src="images/com_title_06.gif"></td>
	              </tr>
	              <tr>
	                <td height="5">&nbsp;</td>
	              </tr>
	            </table>
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
                  <%if(popup.equals("Y")){%>
                    <tr>
                      <td width="10" height="50"></td>
                      <td width="40"></td>
                      <td align="center">&nbsp;</td>
                      <td width="50" height="20" align="center"><a href="javascript:this.close();"><div style="cursor:hand;background-image:url(images/c_board_btn_list_none.gif);width:40;height:21;color:#7F7F7F;text-align:center;font-weight:bold">닫기<div></a></td>
                      <td width="10"></td>
                    </tr>
				  <%}else{%>
                    <tr>
                      <td width="10" height="50"></td>
                      <td width="40"></td>
                      <td align="center">&nbsp;</td>
                      <td width="50" height="20" align="center"><a href="javascript:viewList();"><img src="images/c_board_btn_list.gif" width="40" height="21" border="0"></a></td>
                      <td width="10"></td>
                    </tr>
				  <%}%>
                  </table>
</body>
</html>