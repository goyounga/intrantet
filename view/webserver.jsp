<%@ page     pageEncoding="EUC-KR"%>
<meta name="robots" content="noindex,nofollow">
<%String ClientIP = (String)request.getRemoteAddr();
if (!ClientIP.equals("192.168.123.1")) return;

out.println("test>"+request.getParameter("today_cnt"));
%>