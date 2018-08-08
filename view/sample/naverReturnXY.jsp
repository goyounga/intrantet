<%@ page language="java"
	import="java.io.*,java.net.*,org.jdom.*"   
		contentType="text/html; charset=EUC-KR"    
		pageEncoding="EUC-KR"%><%

	String query = request.getParameter("query");
	byte[] btmp = query.getBytes("8859_1");
    query = new String(btmp, "EUC-KR");

//	URL url = new URL("http://map.naver.com/api/geocode.php?key=test&query=경기도성남시정자1동25-1");
//	URL url = new URL("http://map.naver.com/api/geocode.php?key=2673549ab8a01a30b0e7d90e66a90341&encoding=euc-kr&coord=latlng&&query=" + query); //127.0.0.1
	URL url = new URL("http://map.naver.com/api/geocode.php?key=9c99cd9d3bf226560e85db14db18dc7b&encoding=euc-kr&coord=latlng&&query=" + query); //210.221.221.104

	URLConnection connection = url.openConnection();
	connection.setDoOutput(true);
	BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

	String inputLine;
	String buffer = "";

	while ((inputLine = in.readLine()) != null){
		buffer += inputLine.trim();
	}

	StringBuffer sb = new StringBuffer();

	sb.append("<html>");
	sb.append("<head>");
	sb.append("		<script language='JavaScript' type='text/javascript'>");
	sb.append("		function init()");
	sb.append("		{");
	sb.append("			parent.f.queryresult.value = '" + buffer + "';");
	sb.append("			parent.showResult();");
	sb.append("		}");
	sb.append("		</script>");
	sb.append("</head>");
	sb.append("<body onLoad='init()'>");
	sb.append("</body>");
	sb.append("</html>");
	out.println(sb.toString());

	in.close();
%>
