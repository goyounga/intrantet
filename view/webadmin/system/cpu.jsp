<%@ page import="java.io.*" %>

<%
	FileReader in=null;
	try{
		in=new FileReader("D:/project/workspace/uCare/view/webadmin/common/adminmenu.xml");
		int c=0;
		StringBuffer s=new StringBuffer();
		
		while((c=in.read())!=-1)
			s.append((char)c);
		
		out.println(s.toString());
	}catch(Exception e){
		e.printStackTrace();
	}finally{
		if(in!=null) in.close();
	}
%>
