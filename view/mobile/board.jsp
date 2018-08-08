<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="ucare.jaf.common.CUtil"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no," />
<title>게시판</title>
<script type="text/javascript" language="javascript" src="js/mcommon.js"></script>
<script type="text/javascript" language="javascript" src="js/board.js"></script>
<%	
	ucare.jaf.common.CParamSet 	  cParamSet = null;
	response.setContentType("text/html;charset=euc-kr");
	response.setHeader("Cache-Control","no-chace");
	request.setCharacterEncoding("euc-kr");

	String _SERVICE_TYPE;
	String _SERVICE_ID;
	ucare.jaf.database.IDataSet  iDataSet = null;
	ucare.jpattern.common.bean.ComDB comDB	= null;
	ucare.jaf.database.IQuery iQuery = null;
	StringBuffer datasetSb = new StringBuffer();
	StringBuffer sb = new StringBuffer();
	ucare.jaf.database.IDataSet ds = null;

	String start_num = CUtil.nvl(request.getParameter("_START_ROW"), "1");
	String board_tp_seq = CUtil.nvl(request.getParameter("board_tp_seq"), "22");
	String board_seq = CUtil.nvl(request.getParameter("board_seq"), "0");
	String msearch = CUtil.nvl(request.getParameter("msearch"), "");
	String mode = CUtil.nvl(request.getParameter("mode"), "select");
	
	try {
		cParamSet =  new ucare.jaf.common.CParamSet();
		_SERVICE_TYPE = "SQLSERVICE";
		_SERVICE_ID = "UCINF230S";
		comDB = new ucare.jpattern.common.bean.ComDB();
		iQuery = comDB.createQuery();
		iQuery.setAutoCommit(false);
		iQuery.open();
		
		cParamSet.setParam("_SERVICE_TYPE",_SERVICE_TYPE);
		cParamSet.setParam("_SERVICE_ID",_SERVICE_ID);
		cParamSet.setParam("board_tp_seq", board_tp_seq);
		cParamSet.setParam("msearch", 	  msearch);
		
		cParamSet.setParam("_PAGE_ROW", 	 "15");
		cParamSet.setParam("_PAGE", 	 	 start_num);
		
		ucare.jpattern.service.ServiceManagerBean serviceManager=new ucare.jpattern.service.ServiceManagerBean();
		iDataSet=serviceManager.callService(cParamSet); 	//검색
		String[] ids = iDataSet.getColumnName();
		
		for(int l=0;l<ids.length;l++)
		{
			ds = iDataSet.getFindDataSet(ids[l]);
			if (ds.getRowCount() == 0) continue;
			
			while (ds.next())
			{
				
				datasetSb.append("	<li>");
				datasetSb.append("		<a href='#'  onclick=\"javascript:openDetail('").append(ds.getParam("board_tp_seq").asString("")).append("','").append(ds.getParam("board_seq").asString("")).append("');\">");
				datasetSb.append("			<p>");
				datasetSb.append("				<strong>");
				datasetSb.append(					ds.getParam("board_sbjt").asString(""));
				datasetSb.append("            	</strong>");
				datasetSb.append("				<br>");
				datasetSb.append("				<span class='info'>");
				datasetSb.append(					ucare.jaf.common.CUtil.getFormatData(ds.getParam("rg_dt").asString(""),"DATE")).append("&nbsp;");
				datasetSb.append(					ds.getParam("rg_nm").asString(""));
				datasetSb.append("				</span>");
				datasetSb.append("			</p>");
				datasetSb.append("		</a>");
				datasetSb.append("		<span class='cmt_num cmt_num_mid'>");
				datasetSb.append(      	ds.getParam("rply_cnt").asString("0"));
				datasetSb.append("		</span>");
				datasetSb.append("	</li>");
			}	
		}
		
		//페이징 처리 
		int maxcount = 15;								//페이지당 Row 수
		int blockLimit = 10;							//블럭 사이즈	
		int startLink;
		int curPage = Integer.parseInt(start_num);		//현재 페이지
		int totalPage = ds.getRowCount() / maxcount;    //전체 페이지
		int pageNum;
		
		//전체 페이지 수
		if(ds.getRowCount() > maxcount) 
		{
			if(ds.getRowCount() % maxcount != 0) {
				totalPage++; 
			} else {
				totalPage = ds.getRowCount() / maxcount;
			}
		} 
		else 
		{
			totalPage = 1;
		}
		
		//시작 페이지 번호
		startLink = curPage / blockLimit;
		if(startLink == 0) {
			startLink = 1;
		} else if(curPage % 10 ==0) {
			startLink = (startLink-1) * blockLimit + 1;
	    } else {
			startLink = (startLink * blockLimit) + 1;
		}
		
		//끝 페이지 번호	
		int endLink = startLink-1 + blockLimit < totalPage ?  startLink-1 + blockLimit : totalPage;
		
		//맨처음 페이지로 이동
		if(curPage != 1) {
			sb.append("<a href='javascript:goPage(" + 1 + ");'><img src=/html/images/icon/btn_calendar01.gif></a>&nbsp;");
		} else {
			sb.append("<a href='#'><img src=/html/images/icon/btn_calendar01.gif ></a>&nbsp;");	
		}	
		
		//이전 10 페이지
		pageNum = startLink - 10;	
		if (curPage > 10) {
			sb.append("<a href='javascript:goPage(" + pageNum + ");'><img src=/html/images/icon/btn_calendar02.gif></a>&nbsp;");
		} else {
			sb.append("<a href='#'><img src=/html/images/icon/btn_calendar02.gif ></a>&nbsp;");
		}
	
		//리스트	
		for ( int i = startLink; i <= endLink; i++)
		{
			sb.append("<a href='javascript:goPage(" + i + ");'>");
			if(curPage == i){
				sb.append("<strong>" + i +"</strong>");
			}else{
				sb.append("<font color='#A59F9F'><strong>" + i +"</strong></font>");
			}
			sb.append("</a>&nbsp;&nbsp;");
		}
	
		//다음 10 페이지
		pageNum = startLink + 10;
		if(totalPage > pageNum) {
			sb.append("<a href='javascript:goPage(" + pageNum + ");'><img src=/html/images/icon/btn_calendar03.gif></a>&nbsp;");
		} else {
			sb.append("<a href='#'><img src=/html/images/icon/btn_calendar03.gif></a>&nbsp;");
		}
		
		//맨마지막 페이지로 이동	
		if(curPage != totalPage) {
			sb.append("<a href='javascript:goPage(" + totalPage + ");'><img src=/html/images/icon/btn_calendar04.gif></a>&nbsp;");
		} else {
			sb.append("<a href='#'><img src=/html/images/icon/btn_calendar04.gif></a>&nbsp;");	
		}
	}	
	catch (Exception e) {
		if(iQuery != null) iQuery.rollback();
		ucare.jaf.common.ILogger.log.error(e.getMessage());
	}
	finally {
		if (iQuery != null)	iQuery.close();
		if (comDB != null)	comDB.close();
	}
	
%>
<%@ include file="sessionInfo.jsp"%>
<link rel = "stylesheet" href = "css/mobile.css" type="text/css">
</head>
<body>
<form id="f" method="post">
<input type="hidden" name="_START_ROW" value="<%=start_num%>">
<input type="hidden" name="board_seq" value="<%=board_seq%>">
<input type="hidden" name="board_tp_seq" value="<%=board_tp_seq%>">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="mode" value="">


<%@ include file="top.jsp"%>
<div id="contentArea">
	<% if(!"".equals(msearch) && msearch != null) { %>
		<div id="" class="srch_rslt" style="height:20px;border-width: 0px 0px 1px 0px;border-style: solid;border-color: #c5cbcd #c6cdcf #bdc4c6;padding:12 0 0 10;">
			<font  style="font-size:14px;color:orange;font-weight:bold">&quot;<%=msearch%>&quot;</font> 에 관한
				<font style="color:blue;font-weight:bold"><%=ds.getRowCount()%></font> 개의 검색 결과를 찾았습니다. 
		</div>
	<%} %>
	<div id="content">
		<ul class="lst4">
			<%=datasetSb.toString()%>
		</ul>
<!-- 		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="content" > -->
<%-- 			<%=datasetSb.toString()%> --%>
<!-- 		</table> -->
	</div>
</div>
<div id="footerArea">
	<div class="pages">
		<%=sb.toString()%>
	</div>
</div>
</form>
</body>
</html>
