<%@ page contentType="text/html;charset=euc-kr" %> 
<%@ page import="java.util.*,java.io.File,org.jdom.*,org.jdom.input.*" %>
<%@ include file="/jsp/include/include.jsp"%>

<%
	StringBuffer treesb=new StringBuffer();
	SAXBuilder builder=new SAXBuilder(false);
	Document doc=builder.build(new File("D:/project/workspace/uCare/view/webadmin/common/adminmenu.xml"));
	Element root=doc.getRootElement();
	
	List menuinfo=root.getChildren();
	Iterator i=menuinfo.iterator();
	
	int o=0;
	while(i.hasNext()){
		Element da=(Element)i.next();
		String menuId=da.getAttributeValue("id");	//menu 상위아이디
		String menuname=da.getAttributeValue("name");
		List elements=da.getChildren();
		Iterator j=elements.iterator();
		
		String spanname="p_"+(o++);
		treesb
			.append("<span id='"+spanname+"'>")
			.append("<img id='t' src='/webadmin/images/folderopen.gif' align='absmiddle'>")
			.append("&nbsp;<a href=javascript:treeView('"+spanname+"')><b>"+menuname+"</b></a><br>");
		
		int k=0;
		while(j.hasNext()){
			Element el=(Element)j.next();
			String id=el.getAttributeValue("id");
			String useyn=el.getAttributeValue("useyn");
			String name=el.getAttributeValue("name");
			String value=el.getAttributeValue("value");
			
			treesb
				.append("<span id='"+spanname+"_c_"+(k++)+"' style='display:'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
				.append("<a href=javascript:getMenu('"+value+"');>"+name+"</a><br></span>");
			
		}
		treesb.append("</span>");
	}
%>

<html>
	<head>
		<title></title>
		<script language="javascript" src="js/adminleft.js"></script>
	</head>
<body topmargin="1" leftmargin="1" >
	<table border="0" width="100%" height="100%">
		<tr>
			<td width="10%" bgcolor="#E0E0E0">
				<table width="100%" border="0" height="100%" border="0" cellpadding="1" cellspacing="1">
					<tr>
						<td id="monitortd" align="middle" height="20" bgcolor="white">
							<a href="javascript:leftview('1')">
								<img src="/webadmin/images/ico_graph02.gif" align="absmiddle" alt="모니터링">
							</a>
						</td>
					</tr>
					<tr>
						<td id="explorertd" align="middle" height="20" bgcolor="#E0E0E0">
							<a href="javascript:leftview('2')">
								<img src="/webadmin/images/ico_calculator.gif" align="absmiddle" alt="폴더구조">
							</a>
						</td>
					</tr>
					<tr>
						<td height="100%">&nbsp;</td>
					</tr>
				</table>
			</td>
			<td id="monitor" style="display:">
				<table width="100%" height="100%" border="0" cellpadding="1" cellspacing="1">
					<tr>
						<td height="10" bgcolor="#F3F3F3"><b><i>모니터링</i></b></td>
					</tr>
					<tr>
						<td valign="top">
							<span id="treeSpan">
								<%=treesb.toString()%>
							</span>
						</td>
					</tr>
				</table>
			</td>
			<td id="explorer" style="display:none" valign="top">
				<table width="100%" height="100%" border="0" cellpadding="1" cellspacing="1">
					<tr>
						<td height="10" bgcolor="#F3F3F3"><b><i>폴더구조</i></b></td>
					</tr>
					<tr>
						<td valign="top" height="100%">
						</td>
					</tr>
				</table>	
			</td>
		</tr>
	</table>
</body>
</html>