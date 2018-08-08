<!--
  PROJ : Nexfron Intranet
  NAME : main.jsp
  DESC : 메인 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		김은수		주석추가
  1.1		2009.08.20		김은수		쪽지 관련 로직 추가
  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"
    import="java.util.*,
    		java.net.*,
    		java.io.File,
    		org.jdom.*,
    		org.jdom.input.*,
    		ucare.jaf.common.*"%>
<%@ include file="/jsp/include/include.jsp"%>

<%
	ucare.jaf.common.CParamSet 	  cParamSet = null;
	cParamSet 	= new ucare.jaf.common.CParamSet() ;
	response.setContentType("text/html;charset=euc-kr");
	response.setHeader("Cache-Control","no-chace");
	ucare.jaf.database.IDataSet iDataSet = new ucare.jaf.database.CDataSet();
	ucare.jaf.database.IDataSet dsMenu = null;
	ucare.jaf.database.IDataSet dsMsg  = null;
	ucare.jaf.database.IDataSet dsUser  = null;
	//ucare.jaf.database.IDataSet dsBoard = null;

	int mdiCnt = 8; //mdi유형으로 보여줄 화면 갯수

	String menuStr = null;
	String leftStr[] = null;
	String supervisor	= "";	//Supervisor
	String new_menu_id = CUtil.nvl(request.getParameter("menu_id"), "");

	StringBuffer menuauth = new StringBuffer();

	menuauth.append("<script language='javascript'>\n");
	menuauth.append(" var g_auth_hs = new Hashtable();\n");

	String em_addr = "";
	String hdp_no  = "";
	String view_org_1  = "";
	String view_org_2  = "";
	String view_org_3  = "";
	String scriptClick="";

	try {
		//UCCOM001S : 사용자 정보
		//UCCOM005S : 상담유형 정보
		//UCCOMMENU : 메뉴리스트
		//UCINF011S : 쪽지조회

		//cParamSet.setParam("_SERVICE_TYPE","SQLSERVICE,SQLSERVICE,SQLSERVICE,SQLSERVICE");
		//cParamSet.setParam("_SERVICE_ID","UCCOM001S,UCCOM005S,UCCOMMENU,UCCOMBOARD");
		//cParamSet.setParam("_SERVICE_TYPE","SQLSERVICE,SQLSERVICE,SQLSERVICE");
		//cParamSet.setParam("_SERVICE_ID","UCCOM001S,UCCOMMENU,UCCOMBOARD");
		cParamSet.setParam("_SERVICE_TYPE","SQLSERVICE,SQLSERVICE,SQLSERVICE,SQLSERVICE");
		cParamSet.setParam("_SERVICE_ID","UCCOM001S,UCCOMMENU,UCINF011S,UCCOM031S");
		//cParamSet.setParam("user_id",request.getParameter("user_id"));
		cParamSet.setParam("user_id",gUserID);


		ucare.jpattern.service.ServiceManagerBean serviceManager = (ucare.jpattern.service.ServiceManagerBean)Class.forName("ucare.jpattern.service.ServiceManagerBean").newInstance();
		iDataSet = serviceManager.callService(cParamSet);

		iDataSet.next();
		ucare.jaf.database.IDataSet ds = (ucare.jaf.database.IDataSet)iDataSet.getParam("UCCOM001S").toObject();
		dsMenu 	= (ucare.jaf.database.IDataSet)iDataSet.getParam("UCCOMMENU").toObject();
		dsMsg	= (ucare.jaf.database.IDataSet)iDataSet.getParam("UCINF011S").toObject();
		dsUser	= (ucare.jaf.database.IDataSet)iDataSet.getParam("UCCOM031S").toObject();
		//dsBoard = (ucare.jaf.database.IDataSet)iDataSet.getParam("UCCOMBOARD").toObject();
		ds.next();
		sessioninfo.setUserID(          ds.getParam("user_id"   ).asString(""));
		sessioninfo.setUserName(        ds.getParam("user_nm"   ).asString(""));
		sessioninfo.setUserGradeCD(     ds.getParam("grd_cd"    ).asString(""));
		sessioninfo.setUserMenuGroupID( ds.getParam("mnu_grp_id").asString(""));
		sessioninfo.setUserPartCD(      ds.getParam("dept_cd"   ).asString(""));
		sessioninfo.setUserPositionCD(  ds.getParam("pos_cd"    ).asString(""));
		sessioninfo.setViewOrg1Cd(      ds.getParam("view_org_1").asString(""));
		sessioninfo.setViewOrg2Cd(      ds.getParam("view_org_2").asString(""));
		sessioninfo.setViewOrg3Cd(      ds.getParam("view_org_3").asString(""));
		em_addr = ds.getParam("em_addr").asString("");
		hdp_no  = ds.getParam("hdp_no").asString("");
		view_org_1 = ds.getParam("view_org_1").asString("");
		view_org_2 = ds.getParam("view_org_2").asString("");
		view_org_3 = ds.getParam("view_org_3").asString("");
		//sessioninfo.setUserPrjID(ds.getParam("prj_id").asString(""));
		//sessioninfo.setUserInLine(ds.getParam("ext_no").asString(""));
		//sessioninfo.setUserLoginIP(ds.getParam("loi_ip").asString(""));
		//sessioninfo.setUserCtiLoginID(ds.getParam("cti_id").asString(""));
		//sessioninfo.setUserCorpID(ds.getParam("corp_id").asString(""));
		//sessioninfo.setUserCorpName(ds.getParam("corp_nm").asString(""));

//		sessioninfo.setUserCtiLoginPWD(ds.getParam("ctiloginpwd").asString(""));
//		sessioninfo.setUserAgentYN(ds.getParam("agentyn").asString(""));
//		sessioninfo.setUserRID(ds.getParam("citizen_no").asString(""));
//		sessioninfo.setUserPartCD(ds.getParam("").asString(""));
//		sessioninfo.setUserPositionCD(ds.getParam("").asString(""));
//		sessioninfo.setUserLoginDT(ds.getParam("").asString(""));
//		sessioninfo.setUserLoginTM(ds.getParam("").asString(""));
//		sessioninfo.setUserMessageID(ds.getParam("").asString(""));
/*
		System.out.println ("===========================================");
		System.out.println ("[ userid ] : "+ ds.getParam("user_id").asString(""));
		System.out.println ("[ user_nm ] : "+ ds.getParam("user_nm").asString(""));
		System.out.println ("[ grd_cd ] : "+ ds.getParam("grd_cd").asString(""));
		System.out.println ("[ mnu_grp_id ] : "+ ds.getParam("mnu_grp_id").asString(""));
		System.out.println ("[ inline ] : "+ ds.getParam("ext_no").asString(""));
		System.out.println ("[ loi_ip ] : "+ ds.getParam("loi_ip").asString(""));
		System.out.println ("[ cti_id ] : "+ ds.getParam("cti_id").asString(""));
		System.out.println ("[ corp_id ] : "+ ds.getParam("corp_id").asString(""));
		System.out.println ("[ corp_nm ] : "+ ds.getParam("corp_nm").asString(""));
		System.out.println ("===========================================");
*/
		// 로그인 정보를 쿠키에 저장한다.
		setCookie(response, "userid",			ds.getParam("user_id"	).asString(""));
		setCookie(response, "username",			ds.getParam("user_nm"	).asString(""));
		setCookie(response, "usergradecd",		ds.getParam("grd_cd"	).asString(""));
		setCookie(response, "usermenugroupid",	ds.getParam("mnu_grp_id").asString(""));
		setCookie(response, "userdeptcd",		ds.getParam("dept_cd"	).asString(""));
		setCookie(response, "userposcd",		ds.getParam("pos_cd"	).asString(""));

//		setCookie(response, "userprjid",		ds.getParam("prj_id").asString(""));
/*
		setCookie(response, "userinline",		ds.getParam("ext_no").asString(""));
		setCookie(response, "userloginip",		ds.getParam("loi_ip").asString(""));
		setCookie(response, "userctiloginid",	ds.getParam("cti_id").asString(""));
		setCookie(response, "corpid",			ds.getParam("corp_id").asString(""));
		setCookie(response, "corpname",			ds.getParam("corp_nm").asString(""));
*/

//		setCookie(response, "userctiloginpwd",	ds.getParam("ctiloginpwd").asString(""));
//		setCookie(response, "useragentyn",		ds.getParam("agentyn").asString(""));
//		setCookie(response, "userrid",			ds.getParam("citizen_no").asString(""));
//		setCookie(response, "userpartcd",		ds.getParam("").asString(""));
//		setCookie(response, "userpositioncd",	ds.getParam("").asString(""));
//		setCookie(response, "userlogindt",		ds.getParam("").asString(""));
//		setCookie(response, "userlogintm",		ds.getParam("").asString(""));
//		setCookie(response, "usermessageid",	ds.getParam("").asString(""));


		menuStr = "<table border=0 cellpadding=0 cellspacing=0 width='100%'><tr>";
//		menuStr += "<td><img src='"+scriptPath+"/images/menu/type_1/menu_left.gif'></td>";
		menuStr += "<td width='1042' align=right><table border=0 cellpadding=0 cellspacing=0><tr><td>";

		int index = 0;
		String templcode = "";
		String tempmcode = "";
		String tempscode = "";
		int j = 0;
		int l = 0;
		int m = 0;
		int l_menu_cnt = 0;

		while (dsMenu.next())
		{
			if(dsMenu.getParam("menu_lvl").asString("").equals("1"))
			{
				l_menu_cnt ++;
				//System.out.println(l_menu_cnt);
			}
		}
		dsMenu.first();

		leftStr =  new String[l_menu_cnt];

		dsMenu.next();

		String up_menu_id;
		while (dsMenu.isNext())
		{
			if (dsMenu.getParam("menu_lvl").asString("").equals("1"))	//대분류
			{
				menuStr += "<td style='cursor:hand' onclick=\"topmenu_click("+index+",'"+dsMenu.getParam("menu_id").asString("")+"', '"+dsMenu.getParam("menu_src").asString("")+"')\">";
				menuStr += "<table border='0' cellspacing='0' cellpadding='1'><tr>";
				menuStr += "<td id=lmenu></td>";
				menuStr += "<td id=menu class=tmmenu><B>"+ dsMenu.getParam("menu_nm").asString("") +"</B></td>";
				menuStr += "<td id=rmenu></td>";

				if((l_menu_cnt-1) != index)
				{
				//	menuStr += "<td><img src='"+scriptPath+"/images/menu/type_1/menu_bar.gif'></td>";
				}


				menuStr += "</tr></table></td>";

				up_menu_id = dsMenu.getParam("menu_id").asString("");
				leftStr[index] = "";
				leftStr[index] += "<div id=leftmenu style='filter:alpha(opacity=100);height:100%'>\r\n";
				leftStr[index] += " <table width='100%' border='0' cellspacing='0' cellpadding='0'>\r\n";
				leftStr[index] += "  <tr>\r\n";
				leftStr[index] += "   <td background='/html/images/main/sub_table_bg.gif' bgcolor=#EEF6F1>\r\n";
				leftStr[index] += "    <table border='0' cellspacing='0' cellpadding='0' id=tblMenu>\r\n";
				leftStr[index] += "     <tr><td height=20>&nbsp;</td></tr>\r\n";

				while (dsMenu.isNext())
				{
					dsMenu.next();

					if (dsMenu.getParam("menu_lvl").asString("").equals("1")) break;
					if (!up_menu_id.equals(dsMenu.getParam("up_menu_id").asString(""))) continue;

					String menunm		= dsMenu.getParam("menu_nm").asString("");
					String menuid		= dsMenu.getParam("menu_id").asString("");
					String menuBtnAuth	= dsMenu.getParam("menu_auth_func").asString("");
					String menuUrl = dsMenu.getParam("menu_url").asString("");
					if (dsMenu.getParam("new_flag").asString("").equals("Y"))
						menuUrl = "/goGateWay.jsp?menu_id="+dsMenu.getParam("menu_id").asString();
					if (new_menu_id.equals(menuid)) scriptClick = 	"parent.menu_click('"+dsMenu.getParam("menu_id").asString("")+"', '"+menuUrl+"', '"+dsMenu.getParam("menu_nm").asString("")+"', '"+ dsMenu.getParam("up_menu_nm").asString("") +"', '"+dsMenu.getParam("pop_type_tc").asString("")+"', "+index+", '"+dsMenu.getParam("readyn").asString("")+"', '"+dsMenu.getParam("writeyn").asString("")+"')";


					leftStr[index] += "     <tr id=trMenu>\r\n";
					leftStr[index] += "      <td class='topmenu_2dep'  id="+dsMenu.getParam("menu_id").asString("")+" onmouseover=parent.lmmenu_over(this) onmouseout=parent.lmmenu_out(this) style='cursor:hand;' ";
					leftStr[index] += "	onclick=\"parent.menu_click('"+dsMenu.getParam("menu_id").asString("")+"', '"+menuUrl+"', '"+dsMenu.getParam("menu_nm").asString("")+"', '"+ dsMenu.getParam("up_menu_nm").asString("") +"', '"+dsMenu.getParam("pop_type_tc").asString("")+"', "+index+", '"+dsMenu.getParam("readyn").asString("")+"', '"+dsMenu.getParam("writeyn").asString("")+"')\">"+dsMenu.getParam("menu_nm").asString("")+"</td>\r\n";
					leftStr[index] += "     </tr>\r\n";

					leftStr[index] += "  <tr>\r\n";
					//leftStr[index] += "   <td bgcolor='#bdd4da' height='1' width='100%'></td>\r\n";
					leftStr[index] += "  </tr>\r\n";


					String cAuth = "";	//등록
					String rAuth = "";	//조회
					String uAuth = "";	//수정
					String dAuth = "";	//삭제

					if(!menuBtnAuth.equals("")){

						if(menuBtnAuth.substring(0,1).equals("1")){
							cAuth = "Y";
						}else{
							cAuth = "N";
						}

						if(menuBtnAuth.substring(1,2).equals("1")){
							rAuth = "Y";
						}else{
							rAuth = "N";
						}

						if(menuBtnAuth.substring(2,3).equals("1")){
							uAuth = "Y";
						}else{
							uAuth = "N";
						}

						if(menuBtnAuth.substring(3,4).equals("1")){
							dAuth = "Y";
						}else{
							dAuth = "N";
						}

						//auth (등록:조회:수정:삭제)
						String	authvl = menuid;
								authvl	+=":"+cAuth;	//등록
								authvl	+=":"+rAuth;	//조회
								authvl	+=":"+uAuth;	//수정
								authvl	+=":"+dAuth;	//삭제
								authvl	+=":"+menunm;

						String[] targerarr = menuUrl.split("/");
						String temp="";

						if(targerarr.length>0){
							temp=targerarr[targerarr.length-1];
						}else{
							temp=targerarr[0];
						}

						int pos=temp.indexOf(".");
						if(pos>-1){
							temp=temp.substring(0,pos);
						}

						menuauth.append("g_auth_hs.put('"+temp+"','"+authvl+"');\n");
					}
				}

				leftStr[index] += "    </table>\r\n";
				leftStr[index] += "   </td>\r\n";
				leftStr[index] += "  </tr>\r\n";
				leftStr[index] += "  <tr>\r\n";
				leftStr[index] += "  <td><img src='/html/images/main/sub_table_btm.gif'></td>\r\n";
				leftStr[index] += "  </tr>\r\n";
				leftStr[index] += "</table>\r\n";
				leftStr[index] += "</div>\r\n";
				index++;
			}
		}

		menuStr += "</td></tr></table></td>";
//		menuStr += "<td><img src='"+scriptPath+"/images/menu/type_1/menu_right.gif'></td>";
		menuStr += "</tr></table>";

	}catch (Exception e){System.out.println(e.toString());}

	// 신규쪽지 조회
	dsMsg.next();
	int nNewMsg = dsMsg.getParam("cnt").asInt();

	dsUser.first();
	String sUserList = "";
	for (int k=0; k < dsUser.getRowCount(); k++)
	{
		dsUser.next();
		if (!sUserList.equals("")) sUserList+=",";
		sUserList +=dsUser.getParam("em_addr").asString("");
	}

	menuauth.append("\n</script>");

	out.println(menuauth.toString());

	out.println("<script language=javascript>var gUserList='"+sUserList+"';</script>");
%>
<%
	String sUrl     = request.getRequestURL().toString();
	String sSerAddr = sUrl.substring(7,sUrl.indexOf("/",7));
%>
<html>
<head>
<title>Nexfron Intranet</title>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<script language="JavaScript" src="/html/js/main/main.js"></script>
<script language="javascript">
	// for session info
	var whoAreU = "top";	// top여부를 판단하기 위한 변수임. 삭제, 수정, 오버로딩 모두 금지.
	var g_auth_hs = new Hashtable();
</script>
</head>
<!-- BlackScreen Start -->
<div id="blackScreen" style="display:none;filter:alpha(opacity=40);zIndex:9999999;position:absolute;top:0;left:0;width:100%;height:100%">
	<iframe src="/jsp/common/blackScreen.jsp" frameborder=0 style="width:100%;height:100%"></iframe>
</div>
<!-- BlackScreen End -->

<%for(int f=0 ; f <leftStr.length; f++){ %>		<!--메뉴를 각각의 div에 담는다.-->
	<div id="left_menu" style="display:none;"><%=leftStr[f]%></div>
<%}%>

<BODY leftmargin="0" topmargin="0" onload="init();<%=scriptClick%>" onbeforeunload="">

<form name="f">
<%for(int f=0 ; f <leftStr.length; f++){ %>		<!--메뉴를 각각의 div에 담는다.-->
	<div id="left_menu" style="display:none;"><%=leftStr[f]%></div>
<%}%>

	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="usernm" value="<%=sessioninfo.getUserName()%>">
	<input type="hidden" name="gradecd" value="<%=sessioninfo.getUserGradeCD()%>">
	<input type="hidden" name="prjid" value="<%=sessioninfo.getUserPrjID()%>">
	<input type="hidden" name="ctiloginid" value="<%=sessioninfo.getUserCtiLoginID()%>">
	<input type="hidden" name="inline" value="<%=sessioninfo.getUserInLine()%>">
	<input type="hidden" name="shownotice" value="<%=CDateUtil.getDateString()%>">
	<input type="hidden" name="corp_cd" value="<%=sessioninfo.getUserCorpID()%>">
	<input type="hidden" name="newmsgcnt" value="<%= nNewMsg %>">
	<input type="hidden" name="em_addr" value="<%=em_addr%>">
	<input type="hidden" name="hdp_no" value="<%=hdp_no%>">
	<input type="hidden" name="view_org_1" value="<%=view_org_1%>">
	<input type="hidden" name="view_org_2" value="<%=view_org_2%>">
	<input type="hidden" name="view_org_3" value="<%=view_org_3%>">
<center>
<table border=0 cellpadding=0 cellspacing=0 width="1270" align=center height="100%">
	<tr height="74" valign=top>
		<td colspan="3" style="padding:0 0 0 0">
			<table border="0" height="45" width="1270" cellspacing="0" cellpadding="0" style="background: url(/html/images/main/top_bg.gif);margin-top:0px;margin-left:0px;">
				<tr>
					<td width="144" valign="top" style="padding:20 0 0 30;">
						<a style="cursor:hand" onclick="goHome()"><img src="/html/images/main/logo.gif" border=0/></a></td>
					<td width="2"></td>
					<td valign=top>
			          	<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="green">
							<tr height="74">
								<td width="670" style="padding:0 5 0 40">
									<%=menuStr%>
								</td>
			 					<td style="padding:5 5 0 0" align="right">
			 						<table width=100% cellpadding="0" cellspacing="0" border="0" bordercolor="blue">
										<tr>
											<td align="right">
												<img src="<%=scriptPath%>/images/main/logininfo.gif" border="0" align="absmiddle"></img>&nbsp;
												<b><%=sessioninfo.getUserName()%>(<%=sessioninfo.getUserID()%>)</b> 님
												로그인시각 : <span id="fLoginTime"><%=CUtil.getCurrDate("yyyy-MM-dd")%> <%=CUtil.getCurrDate("h:mm a")%></span>
											</td>
										</tr>
										<tr>
											<td style="height:0px"></td>
										</tr>
										<tr>
											<td align="right">
												<table cellpadding="0" cellspacing="0" border="0" bordercolor="red">
													<tr>
														<!--td width="39" align=left style="padding:0 5 0 5;display:none;">
															<label id="gotnewmsg" style="display:none"><img src="<%=scriptPath%>/images/main/message.gif"  border=0 style="cursor:hand" onclick="openMsgList()"></label>
															<label id="nomsg" style="display:"><img src="<%=scriptPath%>/images/main/message.gif" border=0 style="cursor:hand" onclick="openMsgList()"></label>
														</td-->
														<td></td>
														<td width="39" align=left style="padding:0 0 0 7">
															<a href="http://www.nexfron.com" target="new"><img src="<%=scriptPath%>/images/main/home.gif" style="cursor:hand" border="0" alt="Nexfron 홈페이지 Open"></a>
														</td>
														<!--td width="1" align="left" style="background: url(<%=scriptPath%>/images/main/bar.gif) no-repeat center;"></td-->
														<td width="39" align=left style="padding:2 0 0 5">
															<a href="http://mail.nexfron.com" target="new"><img src="<%=scriptPath%>/images/main/mail.gif" style="cursor:hand" border="0" alt="메일 Open"></a>
														</td>
														<!--td width="1" align="left" style="background: url(<%=scriptPath%>/images/main/bar.gif) no-repeat center;"></td-->
														<td width="39" align=left style="padding:2 0 0 5">
															<img src="<%=scriptPath%>/images/main/demo.gif" style="cursor:hand" border="0" alt="데모 Open" onclick="demoLongin()"></a>
														</td>
													</tr>
													<tr>
														<td width="39"  align=left style="padding:0 0 0 5;width:41">
															<a href="javascript:openSendSMS();" ><img src="<%=scriptPath%>/images/main/sms.png" style="cursor:hand;border="0" alt="SMS"><span style="cursor:pointer;padding:0 0 3 0;height:100%;font-size:11px;">SMS</span></a>
														</td>
														<!--td width="1" align="left" style="background: url(<%=scriptPath%>/images/main/bar.gif) no-repeat center;"></td-->
														<td width="39" align=left style="padding:2 0 0 7">
															<a href="javascript:openSendMail();" ><img src="<%=scriptPath%>/images/main/mail_write.gif" style="cursor:hand" border="0" alt="메일쓰기"></a>
														</td>
														<!--td width="1" align="left" style="background: url(<%=scriptPath%>/images/main/bar.gif) no-repeat center;"></td-->
														<td width="39" align=left style="padding:0 0 0 5">
															<a href="http://<%=sSerAddr%>/jsp/dashboard/index.jsp" target="new"><img src="<%=scriptPath%>/images/main/dashboard.gif" style="cursor:hand" border="0" alt="전광판 Open"></a>
														</td>
														<!--td width="1" align="left" style="background: url(<%=scriptPath%>/images/main/bar.gif) no-repeat center;"></td-->
														<td width="60" align=left style="padding:0 0 0 5">
															<img src="<%=scriptPath%>/images/main/logout.gif" style="cursor:hand" border="0" onclick="parent.window.close()" alt="로그아웃">
														</td>
													</tr>
												</table>
											</td>
									</table>
								</td>
			 				</tr>
			 			</table>
			 		</td>
					<td width="15"></td>
			 	</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td width=6 style="background:url(/html/images/main/bodyline_left.gif); repeat margin-top:0px;margin-left:0px;"></td>
		<td style="padding:0 0 0 0" valign=top>
			<table border=0 cellpadding=0 cellspacing=0 width="1258" align=left >
				<tr>
					<td valign=top>
						<table border=0 cellpadding=0 cellspacing=0>
							<tr>
								<td valign="top" style="padding:0 0 0 0">
									<table border="0" cellpadding="0" cellspacing="0" width="100%">
										<tr id="screentitle">
											<td valign="top" style="padding:0 0 0 0">
												<table border="0" cellpadding="0" cellspacing="0" width="100%">
													<tr><td class=hmargin5></td></tr>
													<tr>
														<td width="1238">
															<table border=0 cellpadding=0 cellspacing=0 height=25>
																<tr>
																	<td width="5"></td>
																	<td style='cursor:hand' id=tdCrsScreen onclick='crsScreenMenu_onClick()'></td>
																	<%for(int i=0;i < mdiCnt;i++){ %>
																	<td style='cursor:hand' id=tdScreen onclick='screenMenu_onClick(<%=i%>)'></td>
																	<td width=2></td>
																	<%} %>
																</tr>
															</table>
															<div id=tblscreen></div>
															<div id=mscreen></div>
															<div id=lscreen></div>
															<div id=rscreen></div>
															<div id=tdscreen></div>
														</td>
														<td width="30" algin="right">
															<img src="<%=scriptPath%>/images/menu/type_2/close.gif" align="absmiddle" style="cursor:hand" alt="활성화된 화면을 제외하고 전체닫기" onClick="closeMdiAllTab()">
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td valign="top" height="585" style="padding:0 0 0 0">
												<table border=0 cellpadding=0 cellspacing=0 width="100%" bgcolor="white" >
													<tr>
														<td>
															<%for(int i=0;i < mdiCnt;i++){ %>
															<div id=divMain<%=i%> style="padding:0 7 0 7;display:none">
																<iframe src="#"  marginwidth="0" marginheight="0" width="1238" height="810" frameborder="0" framespacing="0" id="ifmWorkMain<%=i%>" scrolling="no"></iframe>
															</div>
															<%} %>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="100%" id=tdStatus></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>

			<!--table border=0 cellpadding=0 cellspacing=0 width=1258>
				<tr>
					<td valign=top>
						<div class="sbar1" id=divMain style="padding:0 7 0 7">
							<iframe src="/jsp/main/home.jsp"  marginwidth="0" marginheight="0" width="1238" height="835" frameborder="0" framespacing="0" id="ifmWorkMain" name=ifmWorkMain scrolling="no"></iframe>
						</div>
						<div class="sbar1" id=divMain style="padding:0 7 0 7;display:none">
							<iframe src="/jsp/management/mngWeeklyRpt.jsp"  marginwidth="0" marginheight="0" width="1238" height="835" frameborder="0" framespacing="0" id="ifmMain" name=ifmMain scrolling="no"></iframe>
						</div>
					</td>
				</tr>
			</table-->
		</td>
		<td width=6 style="background:url(/html/images/main/bodyline_right.gif); repeat margin-top:0px;margin-left:0px;">1</td>
	</tr>
	<tr height="18">
		<td colspan="3" style="background:url(/html/images/main/bottom.gif);margin-top:0px;margin-left:0px;"></td>
	</tr>
</table>
</form>

<!--OBJECT ID="ucutil" HEIGHT="0" WIDTH="0" CLASSID="CLSID:75AB3445-283A-4E84-BED6-1EF585839CB7" CODEBASE="/cab/ucutil.cab#version=1,0,0,3"></OBJECT-->
<!--OBJECT id="uCareUtil" classid="clsid:5F375594-9666-4D12-BECC-C6C2BBA16257" CODEBASE="<%=scriptPath%>/cab/uCareUtil.cab#version=1,0,0,8" width="0" height="0" style="position:absolute;left:1266">
<PARAM NAME="LOGPREFIX" value="UCARE_">
<PARAM NAME="LOGPATH" value="C:\uLog">
</OBJECT-->
</body>

<iframe name="ifam" id="ifam" width="0" height="0"/>

</html>