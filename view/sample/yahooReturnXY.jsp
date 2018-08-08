<%@ page language="java"
	import="java.io.*,java.net.*,org.jdom.*"   
		contentType="text/html; charset=EUC-KR"    
		pageEncoding="EUC-KR"%><%

	String query = request.getParameter("query");
	byte[] btmp = query.getBytes("8859_1");
	query = new String(btmp, "EUC-KR");

	URL url = new URL("http://kr.open.gugi.yahoo.com/service/poi.php?appid=JE6hwU7V34FTU9QfD3bL2nOG9Wb2gnrVGxvU5IVY_rKY8y7zoC0o4KzMSSklBT8-&q=" + query + "&encoding=euc-kr&output=xml&results=50");

	URLConnection connection = url.openConnection();
	connection.setDoOutput(true);
	BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));

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
