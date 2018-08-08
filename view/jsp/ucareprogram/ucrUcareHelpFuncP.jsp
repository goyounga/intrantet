<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<%@ include file="/jsp/include/include.jsp"%>
</head>
<body>
<%
	ucare.jpattern.common.actionform.ComActionForm comForm = null;
	ucare.jaf.common.CParamSet 	cParamSet 	= null;
	ucare.jaf.common.CParamSet 	rParamSet 	= null;
	ucare.jaf.database.IDataSet iDataSet 	= null;		// DataSet
	ucare.jaf.database.IDataSet rDataSet	= null;		// 고객 정보
	
	ucare.jpattern.service.ServiceManagerBean serviceManager = null;
	
	String viewFlag			= null;
	String func_seq 		= null;
	String lang_tp_cd 		= null;
	String help_ctgr_seq 	= null;
	String func_src			= null;
	//
	String sHeight			= null;
	
	try 
	{
		cParamSet 		= new ucare.jaf.common.CParamSet();
		
		//request.setCharacterEncoding("EUC-KR");
		
		viewFlag		= CUtil.nvl(request.getParameter("viewFlag"), "");
		func_seq		= CUtil.nvl(request.getParameter("func_seq"), "");
		lang_tp_cd		= CUtil.nvl(request.getParameter("lang_tp_cd"), "03");
		help_ctgr_seq	= CUtil.nvl(request.getParameter("help_ctgr_seq"), "");
		func_src		= CUtil.nvl(request.getParameter("func_src"), "");
		
		System.out.println("viewFlag : " + viewFlag);
		System.out.println("func_seq : " + func_seq);
		System.out.println("lang_tp_cd : " + lang_tp_cd);
		System.out.println("help_ctgr_seq : " + help_ctgr_seq);
		System.out.println("func_src : " + func_src);
		
		if ( "EXPORT".equals(viewFlag) )
		{
			sHeight = "";
		}
		else
		{
			sHeight = "height='660'";
		}
		
		if ( "".equals(func_seq) && "".equals(help_ctgr_seq) )
		{
			// do nothing
		}
		else 
		{
		
			serviceManager 	= new ucare.jpattern.service.ServiceManagerBean();
			rParamSet 		= new ucare.jaf.common.CParamSet(cParamSet.toProperties());
			
			// 1. 고객조회
			rParamSet.setParam("_SERVICE_TYPE", "SQLSERVICE");
			rParamSet.setParam("_SERVICE_ID", 	"UCUCR302S");
			rParamSet.setParam("lang_tp_cd", 	"03");
			rParamSet.setParam("help_ctgr_seq", help_ctgr_seq);
			rParamSet.setParam("func_seq",		func_seq);
			rParamSet.setParam("func_src",		func_src);
			
			iDataSet = serviceManager.callService(rParamSet);
			iDataSet.next();
			rDataSet = (ucare.jaf.database.IDataSet)iDataSet.getParam("UCUCR302S").toObject();
			//rDataSet.next();
			
			while ( rDataSet.next() )
			{
%>
				<table class="tblSearch" width="100%" <%= sHeight %>>
					<tr>
						<th width=100 height="1%">함수명</th><td><%= rDataSet.getParam("func_nm").asString() %></td>
					</tr>
					<tr height="4%">
						<th width=100>함수유형</th><td><%= rDataSet.getParam("func_src_nm").asString() %></td>
					</tr>
					<tr height="20%">
						<th>Parameter</th><td valign="top"><%= rDataSet.getParam("func_par").asString().replaceAll("\r\n", "<br>") %></td>
					</tr>
					<tr height="20%">
						<th>Description</th><td valign="top"><%= rDataSet.getParam("func_desc").asString().replaceAll("\r\n", "<br>") %></td>
					</tr>
					<tr height="50%">
						<th>Example</th><td valign="top"><%= rDataSet.getParam("func_ex").asString() %></td>
					</tr>
					<tr height="4%">
						<th>비고</th><td valign="top"><%= rDataSet.getParam("func_rmk").asString() %></td>
					</tr>
					<tr>
						<th height="1%">사용여부</th><td><%= rDataSet.getParam("use_f").asString() %></td>
					</tr>
				</table>
				<table><tr><td>&nbsp;</td></tr></table>
<%		
			}
		}
		
	} catch(Exception e) {
		out.println("Exception : " + e.getMessage());
	}
%>
</body>
</html>