<%@ page contentType="application/vnd.ms-excel;charset=EUC-KR" %>
<meta http-equive="content-type" content="text/html; charset=ksc5601">
<%
request.setCharacterEncoding("EUC-KR");
java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyyMMddHHmmss"); 

String today= formatter.format(new java.util.Date()); 

 

String strClient = request.getHeader("user-agent"); 

 

if( strClient.indexOf("MSIE 5.5") != -1 ) { 
     response.setHeader("Content-Disposition", "inline; filename="+request.getParameter("sFooter")+"_"+ today + ".xls"); 
     response.setHeader("Content-Description", "JSP Generated Data");
 } else {
    response.setHeader("Content-Disposition", "attachment; filename="+request.getParameter("sFooter")+"_"+ today + ".xls"); 
    response.setHeader("Content-Description", "JSP Generated Data");

 }


out.println(request.getParameter("sTitle"));
out.println(request.getParameter("sHeader"));
out.println(request.getParameter("sContent"));
 %>