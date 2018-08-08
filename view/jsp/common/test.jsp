<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"
    import="java.util.*,
    		java.net.*,
    		java.io.File,
    		org.jdom.*,
    		org.jdom.input.*,
    		ucare.jaf.common.*"%>
<%@ include file="/jsp/include/include.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
 <HEAD>
  <TITLE> New Document </TITLE>
  <META NAME="Generator" CONTENT="EditPlus">
  <META NAME="Author" CONTENT="">
  <META NAME="Keywords" CONTENT="">
  <META NAME="Description" CONTENT="">
  <script language="JavaScript" src="/cti/js/cti_common.js"></script> 
  <script language="javascript">
  function aaa(){
	  GenesysCTI.GenesysCTI_Login('51152', '48051');
}
  </script>
 </HEAD>

 <BODY>
  <object id="GenesysCTI"
	classid = "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
	WIDTH="500" HEIGHT="500" NAME="GenesysCTI" ALIGN="middle" VSPACE="0" HSPACE="0">
	<PARAM name="code"       	value="ucare.applet.cti.GenesysCTI.class">
	<PARAM name="archive"		value="applet.jar">
	<PARAM name="codebase"		value="../cab">
	<PARAM name="name"			value="GenesysCTI" >
	<param name="type"			value="application/x-java-applet;version=1.6">
	<param name="scriptable"	value="false">
	<PARAM name="servername"	value="">
	<PARAM name="serveruri" 	value="172.25.130.21">
	<PARAM name="ServerPort"	value="3000">
</object>
<a href=# onclick="aaa()">½ÇÇà</a>
 </BODY>
</HTML>
