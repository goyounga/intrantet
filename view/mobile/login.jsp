<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="ucare.jaf.common.CUtil"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no," />
<title>NEXFRON - INTRANET</title>
<script type="text/javascript" language="javascript" src="js/login.js"></script>
<%	
	ucare.jaf.common.CParamSet 	  cParamSet = null;
	response.setContentType("text/html;charset=euc-kr");
	response.setHeader("Cache-Control","no-chace");
	request.setCharacterEncoding("euc-kr");
	
	String _SERVICE_TYPE;
	String _SERVICE_ID;
	ucare.jaf.database.IDataSet  iDataSet = null;
	ucare.jpattern.common.bean.ComDB comDB	= null;
	ucare.jaf.database.IQuery iQuery = null;
	ucare.jaf.database.IDataSet ds = null;
	
	String user_id = CUtil.nvl(request.getParameter("user_id"), "");
	String user_pwd = CUtil.nvl(request.getParameter("user_pwd"), "");
	String mode = CUtil.nvl(request.getParameter("mode"), "init");
	String save_chk = CUtil.nvl(request.getParameter("save_chk"), "Y");
	int row_cnt = 0;
	String use_f = "N";
	
	try {
		if(mode.equals("loginSend")){
			cParamSet =  new ucare.jaf.common.CParamSet();
			_SERVICE_TYPE = "SQLSERVICE,";
			_SERVICE_ID = "UCCOMLOGINCHECK";
			comDB = new ucare.jpattern.common.bean.ComDB();
			iQuery = comDB.createQuery();
			iQuery.setAutoCommit(false);
			iQuery.open();
			
			cParamSet.setParam("_SERVICE_TYPE",_SERVICE_TYPE);
			cParamSet.setParam("_SERVICE_ID",_SERVICE_ID);
			cParamSet.setParam("user_id", 	  user_id);
			cParamSet.setParam("user_pwd", user_pwd);
			
			ucare.jpattern.service.ServiceManagerBean serviceManager=new ucare.jpattern.service.ServiceManagerBean();
			iDataSet=serviceManager.callService(cParamSet); 	//검색
			
			ds = iDataSet.getFindDataSet("UCCOMLOGINCHECK");	//내용
			ds.next();
			row_cnt = ds.getRowCount();
			use_f = ds.getParam("use_f").asString("N");
		}
	}	
	catch (Exception e) {
		if(iQuery != null) iQuery.rollback();
		ucare.jaf.common.ILogger.log.error(e.getMessage());
	}
	finally {
		if (iQuery != null)	iQuery.close();
		if (comDB != null)	comDB.close();
	}
%>
<link rel = "stylesheet" href = "css/mobile.css" type = "text/css">
</head>
<body onload="init('<%=mode%>');">
<form id="f" method="post">
<input type=hidden name="mode" value="init">
<input type=hidden name="row_cnt" value="<%=row_cnt%>">
<input type=hidden name="use_f" value="<%=use_f%>">
<input type=hidden name="save_chk" value="<%=save_chk%>">

<div id="headerArea" class="hd_title">
	NEXFRON INTRANET
</div>

<div id="contentArea">
	<div class="ct_wrap">
		<fieldset class="input_area input_area_v1">
			<legend class="u_hc">로그인</legend>
			<dl class="in_area in_area_v1">
			<dd>
				<span id="id_area" class="input_txt_area">
					<input type="text" id="id" name="user_id" title="id" maxlength="25" placeholder="아이디" class="int" value="<%=user_id%>">
				</span>
			</dd>
			<dt class="u_hc">비밀번호</dt>
			<dd>
				<span id="pw_area" class="input_txt_area">
					<input type="password" id="pw" name="user_pwd" title="password" maxlength="16" placeholder="비밀번호" class="int" value="<%=user_pwd%>">
				</span>
			</dd>
			</dl>
			<span class="input_chb" >
					<input type="checkbox" id="saveid" name="saveid" value="Y" class="chb" >
					<label for="saveid" style="cursor:pointer">아이디 기억하기</label>
<!-- 				<input type="checkbox" name="nvlong" id="stay_signe_in" value="on" checked="" class="chb"> -->
<!-- 				<label for="stay_signe_in">로그인 상태 유지</label> -->
			</span>
			<span class="ls ls_v1"><input type="button" title="로그인" value="로그인" class="btn_sl" onclick="setLogin();"></span>
		</fieldset>
	</div>
</div>
<div id="footerArea">
	<div align="center"><img src="/html/images/login/pop_footer.gif"></div>
</div>
</form>
</body>
</html>