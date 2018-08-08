<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<%@page import="ucare.jaf.database.IDataSet"%>

<%
	ComActionForm 	comForm 	= null;
	IDataSet 		iDataSet 	= null;
	IDataSet		aDataSet	= null;
	
	String reqno		= null;
	
	int dataSetIndex	= 0;
	int sumNo			= 0;
	
	try 
	{
		comForm 	= (ComActionForm)request.getAttribute("comForm");
		iDataSet	= comForm.getDataset();
		iDataSet.next();
		
		request.setCharacterEncoding("EUC-KR");
		reqno 		= request.getParameter("no");
		
		String[] ls_column_name	= iDataSet.getColumnName();
		aDataSet	= (IDataSet)iDataSet.getParam(ls_column_name[dataSetIndex++]).toObject();
		
		// 1. 합계 구하기
		while (aDataSet.next())
		{
			if (aDataSet.getParam("no").asString().equals(reqno))
			{
				sumNo += aDataSet.getParam("no").asInt();
			}
		}
		aDataSet.first();	// 한 번 썼을면 다시 처음으로 돌리기
	}
	catch (Exception e)
	{
		ILogger.log.error("[smpCommonjspAct2 at Exception] " + e.getMessage());
	}
	
	StringBuffer ls_script = new StringBuffer();
	ls_script.append("<script language = javascript>\r\n");
	ls_script.append("parent.f.sumno.value = '" + sumNo + "';\r\n");
	ls_script.append("</script>");
			
	out.println (ls_script.toString());
%>