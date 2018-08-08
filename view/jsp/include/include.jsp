<!--
  PROJECT : NEXFRON INTRANET
  NAME    : include.jsp
  DESC    : 공통 include 페이지
  AUTHOR  : ㅇㅇㅇ
  VERSION : 1.0
  Copyright ⓒ 2011 Nexfron. All rights reserved.
  ============================================================================================
  							변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.05.19		ㅇㅇㅇ		개발
  1.1		2000.00.00		ㅇㅇㅇ		..........
  -->
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7,IE=EmulateIE8,IE=EmulateIE9" />
<%@ page import =  "java.net.*,
					java.io.*,
					ucare.jpattern.common.bean.*,
					ucare.jaf.common.*,
					ucare.jaf.exception.*,
					ucare.jpattern.common.actionform.ComActionForm" %>
<%@ taglib uri = "/WEB-INF/struts-html.tld"  prefix = "html"  %>
<%@ taglib uri = "/WEB-INF/struts-bean.tld"  prefix = "bean"  %>
<%@ taglib uri = "/WEB-INF/struts-logic.tld" prefix = "logic" %>
<%@ taglib uri = "/WEB-INF/ucare-html.tld"   prefix = "ucare" %>
<%
	String intranet_userid = getCookie(request, "intranet_userid");
%>
<%	if(intranet_userid.equals("")){	%>
	<script language=javascript>
		window.location.replace("/error.jsp");
	</script>
<%	}%>
<jsp:useBean id="comBean"     class="ucare.jpattern.common.bean.ComBean" scope="request"/>
<%
	String LicenseKey = CUtil.nvlNequal(CIni.getString("LicenseKey"), "");

	if(LicenseKey.equals(""))
	{
		response.setContentType("text/html;charset=euc-kr");
		out.println("<font size=20>Ucare LicenseKey is not exist. check global.properties!!!!!!!.</font>");
		return;
	}

	String scriptPath		= CUtil.nvlNequal(CIni.getString("SCRIPT_PATH"), "");
	String charset			= CUtil.nvlNequal(CIni.getString("CHARSET")    , "");
	String appMode			= CUtil.nvlNequal(CIni.getString("APP_MODE")    , "REAL");
	comBean.setResReq(response,request);

	//String myReadYN		= CUtil.nvlNequal(request.getParameter("readyn"),"");
	//String myWriteYN		= CUtil.nvlNequal(request.getParameter("writeyn"),"");

//	String gUserID			= getCookie(request, "gUserID");
	String gUserID			= getCookie(request, "intranet_userid");
	String gGradeCD			= getCookie(request, "gGradeCD");
	String gOrgId			= getCookie(request, "gOrgId");
	String ClientIP			= (String)request.getRemoteAddr();
	
	ServletContext ctx = request.getSession().getServletContext().getContext("/context");
	ctx.setAttribute("ctx_user_id", gUserID);
%>

<script language="javascript">
	var myReadYN   = "";
	var myWriteYN  = "";
	var scriptPath = "<%=scriptPath%>";
	var gAppMode   = "<%=appMode%>";
	var today      ="<%=CUtil.getDisplayDate(CDateUtil.getToday())%>";
	var newServer = "<%=CUtil.nvlNequal(CIni.getString("NEW_SERVER"), "")%>";

	window.status  = "";
	var whoAreU="" ;	// top여부를 판단하기 위한 변수임. 삭제, 수정, 오버로딩 모두 금지.
	var CdXmlFile = scriptPath + "/xml/codebook.xml";
</script>

<!-- Object -->
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_objectUtils.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_dataset.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_htmlUtil.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_transaction.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_grid_transaction.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_selectUtil.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_event.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_intranet.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_editor.js"></script>
<!-- Obejct End-->
<!-- Util -->
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_util.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_format.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_session.js"></script>

<script language="javascript" src="<%= scriptPath %>/js/ucare/WiseGridTag.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/ucare_rMateChart.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/AC_OETags.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/rMateChart.js"></script>
<script language="javascript" src="<%= scriptPath %>/js/ucare/rMateChartLicense.js"></script>
<!-- Util End -->

<jsp:useBean id="sessioninfo" class="ucare.biz.common.bean.SessionInfo" scope="session"/>
<%
ILogger.log.debug("---------------------------------------------------------");
ILogger.log.debug(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
ILogger.log.debug("# getCookie : intranet_userid : "	+ getCookie(request, "intranet_userid"));
ILogger.log.debug("# sessioninfo.getUserID() : "	+ CUtil.nvl(sessioninfo.getUserID()).equals(""));
ILogger.log.debug(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
ILogger.log.debug("---------------------------------------------------------");

	if (CUtil.nvl(sessioninfo.getUserID()).equals(""))	//세션이 없어졌을 때 쿠키에서 읽기
	{
		System.out.println("################## sessioninfo doesn't exist. ################## ");
		System.out.println("# userid : " + getCookie(request,"userid"));
ILogger.log.debug("# userid : " + getCookie(request,"userid"));		
		%>
		<script language="javascript">
		if( top.whoAreU!="" &&  top.whoAreU!="top")//처음login일때만 없다
		{
			top.window.location.replace("/error.jsp?msgCode=nosession");
		}
		</script>
		<%
		//세션이 없어졌을 때 쿠키에서 읽기
		sessioninfo.setUserID(			Nf_Encode(getCookie(request, "userid"			)));
//		sessioninfo.setUserID(			Nf_Encode(getCookie(request, "intranet_userid"	)));
		sessioninfo.setUserName(		Nf_Encode(getCookie(request, "username"			)));
		sessioninfo.setUserGradeCD(		Nf_Encode(getCookie(request, "usergradecd"		)));
		sessioninfo.setUserMenuGroupID(	Nf_Encode(getCookie(request, "usermenugroupid"	)));
		sessioninfo.setUserPartCD(		Nf_Encode(getCookie(request, "userdeptcd"		)));
		sessioninfo.setUserPositionCD(	Nf_Encode(getCookie(request, "userposcd"		)));

System.out.println("# getCookie : intranet_userid : "	+ getCookie(request, "intranet_userid"));
System.out.println("# getCookie : userid : "			+ Nf_Encode(getCookie(request, "userid"			)));
System.out.println("# getCookie : username : " 			+ Nf_Encode(getCookie(request, "username"		)));
System.out.println("# getCookie : usergradecd : " 		+ Nf_Encode(getCookie(request, "usergradecd"	)));
System.out.println("# getCookie : usermenugroupid : " 	+ Nf_Encode(getCookie(request, "usermenugroupid")));
System.out.println("# getCookie : userdeptcd : " 		+ Nf_Encode(getCookie(request, "userdeptcd"		)));
System.out.println("# getCookie : userposcd : " 		+ Nf_Encode(getCookie(request, "userposcd"		)));

//		sessioninfo.setUserPrjID(getCookie(request,"userprjid"));
//		sessioninfo.setUserInLine(getCookie(request,"userinline"));
//		sessioninfo.setUserLoginIP(getCookie(request,"userloginip"));
//		sessioninfo.setUserCtiLoginID(getCookie(request,"userctiloginid"));

		//sessioninfo.setUserLoginDT(getCookie(request,"userlogindt"));
		//sessioninfo.setUserLoginTM(getCookie(request,"userlogintm"));
		//sessioninfo.setUserMessageID(getCookie(request,"usermessageid"));
		//sessioninfo.setUserPartCD(getCookie(request,"userpartcd"));
		//sessioninfo.setUserPositionCD(getCookie(request,"userpositioncd"));
		//sessioninfo.setUserRID(getCookie(request,"userrid"));
		//sessioninfo.setUserCtiLoginPWD(getCookie(request,"userctiloginpwd"));
	}

	if(CIni.getString("APP_SERVER").equals("weblogic"))
	{
		//ClientIP = (String)request.getHeader("WL-Proxy-Client-IP");
		ClientIP = (String)request.getRemoteAddr();
	}
	else
	{
		ClientIP = (String)request.getRemoteAddr();
	}
%>
<link rel = "stylesheet" href = "<%= scriptPath %>/style/ucareStyle.css" type = "text/css">
<link rel = "stylesheet" href = "<%= scriptPath %>/style/common.css" type = "text/css">
<%!
	private String getCookie(HttpServletRequest req, String sKey)
	{
		Cookie[] cookies = req.getCookies();
		String value ="";
		if(cookies!=null)
		{
			for (int i = 0; i < cookies.length; i++)
		 	{
		  		Cookie c = cookies[i];
		  		String name = c.getName();
				if(name.compareTo(sKey)==0)
		 		{
		 			try
		 			{
		   				value = Nf_Encode(URLDecoder.decode(c.getValue(), "euc-kr"));
		 			}
		 			catch (UnsupportedEncodingException e)
		 			{
						e.printStackTrace();
		 			}
		   			return value;
		 		}
		 	}
		}
		return "";
	}

	public String Nf_Encode(String code)
	{
		if(code != null){
			//암호화 키
			String strkey = "NE&SH#!K";           // 암호화 키
			byte keyChar[] = new byte[strkey.getBytes().length];
			keyChar = strkey.getBytes();

			//암호화할 대상
			byte codeChar[] = new byte[code.getBytes().length];
			codeChar = code.getBytes();

			//XOR 연산
			for(int i=0, j=0; i< code.getBytes().length; i++)
			{
				codeChar[i] = (byte) (codeChar[i] ^ keyChar[j]);
				j = (++j < keyChar.length ? j : 0);
			}

			return new String(codeChar) ; //byte배열인 code를 String으로 변환하여 반환한다.
		}
		else {
			return "";
		}
	}
	private void setCookie(HttpServletResponse res, String sKey, String sVal)
	{
		try
		{
			sVal = URLEncoder.encode(sVal, "euc-kr");
		}
		catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
		}
		Cookie cookie = new Cookie(sKey, sVal);
		cookie.setMaxAge(-1);
		cookie.setPath("/");
		res.addCookie(cookie);
		return;
	}
%>

<!-- OpenPopup Close Event -->
<script language="javascript" for="window" event="onunload">
	closeAllPopWin();
</script>