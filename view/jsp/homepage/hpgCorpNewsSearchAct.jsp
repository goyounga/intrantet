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
	String _PAGE_ROW		= "10";					//한페이지당 개수
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
			if(cnt>0){datasetSb.append("<tr align='center'><td height='1' colspan='5' bgcolor='EFEFEF'></td></tr>");}
			bord_seq	 = ds.getParam( "bord_seq"    ).asString("");
			bord_title   = ds.getParam( "bord_title"  ).asString("");
			reg_date     = ds.getParam( "reg_date"    ).asString("");
			qry_cnt      = ds.getParam( "qry_cnt"     ).asString("");
			gubun        = ds.getParam( "gubun"       ).asString("");
			gubunnm      = ds.getParam( "gubunnm"     ).asString("");
			user_nm      = ds.getParam( "user_nm"     ).asString("");

			datasetSb
			.append("<tr>")
			.append("<td width='50' height='28' align='center'>").append(bord_seq).append("</td>")
			.append("<td width='418'><a href=javascript:viewContent('").append(bord_seq).append("');>")
			.append(gubun.equals("02")?"<span class='font_blue'>":"<span class='font_navy'>").append(gubunnm).append("</span>&nbsp;").append(cleanXSS(bord_title)).append("</a></td>")
			.append("<td width='56' align='center'>").append(user_nm ).append("</td>")
            .append("<td width='80' align='center'>").append(reg_date).append("</td>")
            .append("<td width='34' align='center'>").append(qry_cnt ).append("</td>")
			.append("</tr>");
			cnt++;
		}
		//paging s------------------------------------------------------
		int maxcount	= 10;							//페이지당 Row 수
		int blockLimit	= 10;							//페이징 목록 수
		int startLink;
		int curPage		= Integer.parseInt(start_num);	//현재 페이지
		int totalPage 	= ds.getRowCount() / maxcount;  //전체 페이지
		int pageNum;

		//전체 페이지 수
		//if(ds.getRowCount() > maxcount){
			if(ds.getRowCount() % maxcount != 0){
				totalPage++;
			}
			//else {totalPage = ds.getRowCount() / maxcount;}
		//}
		//else{totalPage = 1;}
		
		/**********************************
		시작페이지 찾기, 페이지당 10개
		20p = (20-1)/10 = 1.9 => 1*10+1=11
		19p = (19-1)/10 = 1.8 => 1*10+1=11
		18p = (18-1)/10 = 1.7 => 1*10+1=11
		11p = (11-1)/10 = 1.0 => 1*10+1=11
		10p = (10-1)/10 = 0.9 => 0*10+1=1
		 9p = ( 9-1)/10 = 0.8 => 0*10+1=1
		 8p = ( 8-1)/10 = 0.7 => 0*10+1=1
		 1p = ( 1-1)/10 = 0.0 => 0*10+1=1
		**********************************/
		
		//시작 페이지 번호
		startLink = curPage / blockLimit;
		if(startLink == 0)
		{
			startLink = 1;
		}
		else if(curPage % 10 ==0)
		{
			startLink = (startLink-1) * blockLimit + 1;
	    }else{
			startLink = (startLink * blockLimit) + 1;
		}

		//끝 페이지 번호
		int endLink = startLink-1 + blockLimit < totalPage ?  startLink-1 + blockLimit : totalPage;

		//before
		pageNum = startLink-10;
		sb
		.append("<td width='32'>")
		.append("<a href='javascript:").append((curPage!=1)?"goPage("+ 1     +");":"").append("'><img src='images/c_board_sbtn03.gif' width='13' height='11' border='0' alt='맨처음 페이지'></a>&nbsp;")	//맨처음 페이지로 이동
		.append("<a href='javascript:").append((curPage>10)?"goPage("+pageNum+");":"").append("'><img src='images/c_board_sbtn01.gif' width='13' height='11' border='0' alt='이전 10페이지'></a>")			//이전 10 페이지
		.append("</td>");

		//pages
		sb.append("<td align='center'>&nbsp;");
		for(int i=startLink; i<=endLink; i++)
		{
			if(i!=startLink){sb.append(" l ");}
			sb.append("<a href='javascript:goPage("+i+");'>").append((curPage==i)?"<font color='#234B86'><b>"+i+"</b></font>":i).append("</a>");
		}
		sb.append("&nbsp;&nbsp;</td>");

		//next
		pageNum = startLink+10;
		sb
		.append("<td width='32'>")
		.append("<a href='javascript:").append((totalPage>pageNum) ?"goPage("+pageNum  +");":"").append("'><img src='images/c_board_sbtn02.gif' width='13' height='11' border='0' alt='다음 10페이지'></a>&nbsp;")	//다음10페이지
		.append("<a href='javascript:").append((curPage!=totalPage)?"goPage("+totalPage+");":"").append("'><img src='images/c_board_sbtn04.gif' width='13' height='11' border='0' alt='맨마지막 페이지'></a>")		//맨마지막 페이지로 이동
		.append("</td>");
		//paging end------------------------------------------------------
	}
	catch (Exception e)
	{
		ucare.jaf.common.ILogger.log.error(e.getMessage());
	}
	finally{}
%>
<link href="css/style.css" rel="stylesheet" type="text/css">
<script type="text/JavaScript">
function goPage(page)
{
	fBoard._START_ROW.value = page;
 	fBoard.action = "hpgCorpNewsSearchAct.jsp";
 	fBoard.target = "_self";
 	fBoard.method = "post";
 	fBoard.submit();
}
function viewContent(arg)
{
	fBoard.seq.value = arg;
 	fBoard.action	 = "hpgCorpNewsSearchActView.jsp";
 	fBoard.target 	 = "_self";
 	fBoard.method 	 = "post";
 	fBoard.submit();
}
</script>
</head>
<body leftmargin="0" topmargin="0">
<form name="fBoard">
<input type="hidden" name="_START_ROW" value="<%=start_num%>">
<input type="hidden" name="seq">
</form>
				  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr class="list_table_header">
                      <td align="center" background="images/list_table_header.gif" height="33">번호 </td>
                      <td align="lfet"   background="images/list_table_header.gif">제목</td>
                      <td align="center" background="images/list_table_header.gif">작성자 </td>
                      <td align="center" background="images/list_table_header.gif">작성일 </td>
                      <td align="center" background="images/list_table_header.gif">조회</td>
                    </tr>
                    <%=datasetSb.toString()%>
                    <tr align="center"><td height="2" colspan="5" bgcolor="CDCDCD"></td></tr>
                  </table>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="10" height="50"></td>
                      <td width="40"></td>
                      <td align="center">
                        <table height="18" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <%=sb.toString()%>
                          </tr>
                        </table>
                      </td>
                      <td width="50" height="20" align="center"></td>
                      <td width="10"></td>
                    </tr>
                  </table>
</body>
</html>