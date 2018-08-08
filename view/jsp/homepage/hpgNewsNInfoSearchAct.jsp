<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="ucare.jaf.common.CUtil"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
<title>뉴스&공지</title>
<%!
    public String cleanXSS(String s)
    {
        s = s.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        s = s.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
        s = s.replaceAll("eval\\((.*)\\)", "");
        s = s.replaceAll("[\\\"\\'][\\s]*javascript:(.*)[\\\"\\']", "\"\"");
        s = s.replaceAll("script", "_script_");
        return s;
    }
%>
<%
	response.setContentType("text/html;charset=euc-kr");
	response.setHeader("Cache-Control","no-chace");
	ucare.jaf.common.CParamSet cParamSet 					 = null;
	ucare.jaf.database.IDataSet iDataSet 					 = null;	//query list
	ucare.jaf.database.IDataSet ds 		 					 = null;	//data  list
	ucare.jpattern.service.ServiceManagerBean serviceManager = null;	//service obj
	StringBuffer datasetSb 	= new StringBuffer();	//table  tag
	StringBuffer sb 		= new StringBuffer();	//paging tag
	String start_num 		= CUtil.nvl(request.getParameter("_START_ROW"), "1");//요청페이지
	String _PAGE_ROW		= "7";					//한페이지당 개수
	String _SERVICE_TYPE	= "SQLSERVICE";
	String _SERVICE_ID		= "UCHPG001S";

	try
	{
		cParamSet = new ucare.jaf.common.CParamSet();
		cParamSet.setParam("_SERVICE_TYPE"	, _SERVICE_TYPE	);
		cParamSet.setParam("_SERVICE_ID"	, _SERVICE_ID	);
		cParamSet.setParam("_PAGE_ROW"		, _PAGE_ROW		);
		cParamSet.setParam("_PAGE"			, start_num		);
		serviceManager 	= new ucare.jpattern.service.ServiceManagerBean();
		iDataSet 		= serviceManager.callService(cParamSet);

		int cnt 			= 0;
		String bord_seq		= "";
		String bord_title   = "";
		String reg_date     = "";
		String qry_cnt      = "";
		String gubun        = "";
		String gubunnm      = "";
		String user_nm      = "";

		iDataSet.next();
		ds = iDataSet.getFindDataSet(_SERVICE_ID);

		while (ds.next())
		{			
			bord_seq	 = ds.getParam( "bord_seq"    ).asString("");
			bord_title   = ds.getParam( "bord_title"  ).asString("");
			reg_date     = ds.getParam( "reg_date"    ).asString("");
			qry_cnt      = ds.getParam( "qry_cnt"     ).asString("");
			gubun        = ds.getParam( "gubun"       ).asString("");
			gubunnm      = ds.getParam( "gubunnm"     ).asString("");
			user_nm      = ds.getParam( "user_nm"     ).asString("");

			datasetSb
			.append("<tr>")
			.append("<td><img src='images/dot_gray.gif'>&nbsp;")
			.append(gubun.equals("02")?"<span class='font_blue'>":"<span class='font_navy'>").append(gubunnm).append("</span>&nbsp;<a href=javascript:viewContent('").append(bord_seq).append("');>").append(cleanXSS(bord_title)).append("</a></td>")
            .append("<td>").append(reg_date).append("</td>")
			.append("</tr>");
			cnt++;			
		}
	}
	catch (Exception e)
	{
		ucare.jaf.common.ILogger.log.error(e.getMessage());
	}
	finally{}
%>
<link href="css/style.css" rel="stylesheet" type="text/css">
<script type="text/JavaScript">
function viewContent(arg)
{
//	var str = "http://www.nexfron.com/company01_06_view.html?seq="+arg;
//	parent.document.location.href = str;
	window.open("", "NewsSearch", "width=700,height=420,toolbar=no,scrollbars=no,status=no");
	fBoard.seq.value = arg;
 	fBoard.action	 = "hpgCorpNewsSearchActView.jsp";
 	fBoard.target 	 = "NewsSearch";
 	fBoard.method 	 = "post";
 	fBoard.submit();
}
</script>
</head>
<body leftmargin="0" topmargin="0">
<form name="fBoard">
<input type="hidden" name="_START_ROW" value="<%=start_num%>">
<input type="hidden" name="seq">
<input type="hidden" name="popup" value="Y">
</form>
              <table width="390" border="0" cellspacing="0" cellpadding="0" bordercolor="red">
                <%=datasetSb.toString()%>
              </table>
</body>
</html>