<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="ucare.jaf.common.CUtil"%>
<%@ include file="include.jsp"%>
<%
	response.setContentType("text/html;charset=euc-kr");
	response.setHeader("Cache-Control","no-chace");
	ucare.jaf.common.CParamSet cParamSet 					 = null;
	ucare.jaf.database.IDataSet iDataSet 					 = null;	//query list
	ucare.jaf.database.IDataSet ds 		 					 = null;	//data  list
	ucare.jpattern.service.ServiceManagerBean serviceManager = null;	//service obj
	StringBuffer sb 	= new StringBuffer();	//Screen
	String start_num	= cleanXSS(CUtil.nvl(request.getParameter("_START_ROW"), "1"));
	String mode			= cleanXSS(CUtil.nvl(request.getParameter("mode"),""));
	String seq 			= cleanXSS(CUtil.nvl(request.getParameter("seq"), "x"));
	String pwd 			= cleanXSS(CUtil.nvl(request.getParameter("pwd"), "x"));

	try
	{
		if(mode.equals("LIST"))
		{
			sb.append("<html><body><form name='f' method='post' target='_self' action='").append(strList).append("'>")
			.append("<input type='hidden' name='_START_ROW' value='").append(start_num).append("'>")
			.append("</form></body></html>")
			.append("<script type='text/JavaScript'>")
			.append("f.submit();")
			.append("</script>");
		}
		else if(mode.equals("VIEW"))
		{
			cParamSet = new ucare.jaf.common.CParamSet();
			cParamSet.setParam("_SERVICE_TYPE"	, "SQLSERVICE"	);
			cParamSet.setParam("_SERVICE_ID"	, _SELECT_ID_PW);
			cParamSet.setParam("seq"			, seq			);
			cParamSet.setParam("pwd"			, pwd			);
			serviceManager	= new ucare.jpattern.service.ServiceManagerBean();
			iDataSet 		= serviceManager.callService(cParamSet);
			iDataSet.next();
			ds = iDataSet.getFindDataSet(_SELECT_ID_PW);

			if(ds.getRowCount()>0)
			{
				sb.append("<html><body><form name='f' method='post' target='_self' action='").append(strView).append("'>")
				.append("<input type='hidden' name='_START_ROW' value='").append(start_num).append("'>")
				.append("<input type='hidden' name='seq' value='").append(seq).append("'/>")
				.append("<input type='hidden' name='pwd' value='").append(pwd).append("'/>")
				.append("</form></body></html>")
				.append("<script type='text/JavaScript'>")
				.append("f.submit();")
				.append("</script>");
			}else{
				sb.append("<script type='text/JavaScript'>")
				.append("alert('비밀번호가 일치하지 않습니다.');")
				.append("history.back();")
				.append("</script>");
			}
		}
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
	out.println(sb.toString());
%>