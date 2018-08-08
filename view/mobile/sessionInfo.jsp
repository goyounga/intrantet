<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="ucare.jaf.common.*"%>
<%
	try {
		
		String cookie_userid = CUtil.nvl(getCookie(request, "userid"));
		String session_userid = CUtil.nvl(sessioninfo.getUserID());
		
		System.out.println("#########session_userid"+session_userid);
		System.out.println("#########cookie_userid"+cookie_userid);
		
		if(cookie_userid.equals("") && session_userid.equals("")){
			
			cParamSet.setParam("_SERVICE_TYPE","SQLSERVICE");
			cParamSet.setParam("_SERVICE_ID","UCCOM001S");
			cParamSet.setParam("user_id",gUserID);

			ucare.jpattern.service.ServiceManagerBean serviceManager=new ucare.jpattern.service.ServiceManagerBean();
			iDataSet = serviceManager.callService(cParamSet);
			iDataSet.next();
			ucare.jaf.database.IDataSet dsUser = (ucare.jaf.database.IDataSet)iDataSet.getParam("UCCOM001S").toObject();
			dsUser.next();
			sessioninfo.setUserID(          dsUser.getParam("user_id"   ).asString(""));
			sessioninfo.setUserName(        dsUser.getParam("user_nm"   ).asString(""));
			sessioninfo.setUserGradeCD(     dsUser.getParam("grd_cd"    ).asString(""));
			sessioninfo.setUserMenuGroupID( dsUser.getParam("mnu_grp_id").asString(""));
			sessioninfo.setUserPartCD(      dsUser.getParam("dept_cd"   ).asString(""));
			sessioninfo.setUserPositionCD(  dsUser.getParam("pos_cd"    ).asString(""));
			sessioninfo.setViewOrg1Cd(      dsUser.getParam("view_org_1").asString(""));
			sessioninfo.setViewOrg2Cd(      dsUser.getParam("view_org_2").asString(""));
			sessioninfo.setViewOrg3Cd(      dsUser.getParam("view_org_3").asString(""));
			setCookie(response, "userid",			dsUser.getParam("user_id"	).asString(""));
			setCookie(response, "username",			dsUser.getParam("user_nm"	).asString(""));
			setCookie(response, "usergradecd",		dsUser.getParam("grd_cd"	).asString(""));
			setCookie(response, "usermenugroupid",	dsUser.getParam("mnu_grp_id").asString(""));
			setCookie(response, "userdeptcd",		dsUser.getParam("dept_cd"	).asString(""));
			setCookie(response, "userposcd",		dsUser.getParam("pos_cd"	).asString(""));
		}
	}catch (Exception e){System.out.println(e.toString());}


System.out.println("#########sessioninfo.getUserGradeCD()#"+sessioninfo.getUserGradeCD());
	if( !"03".equals(sessioninfo.getUserGradeCD()) && !"06".equals(sessioninfo.getUserGradeCD()) && !"05".equals(sessioninfo.getUserGradeCD())){
		response.setContentType("text/html;charset=euc-kr");
		out.println("<font size=15 color=red>접근 권한이 없습니다.</font>");
		return;
	}
%>
