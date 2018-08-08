<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="ucare.jaf.common.CUtil,ucare.biz.common.util.*"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no," />
<title>게시판 글쓰기</title>
<script type="text/javascript" language="javascript" src="js/mcommon.js"></script>
<script type="text/javascript" language="javascript" src="js/boardReg.js"></script>
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
	ucare.jaf.database.IDataSet dsData = null;
	
	String start_num = CUtil.nvl(request.getParameter("_START_ROW"), "1");
	String board_tp_seq = CUtil.nvl(request.getParameter("board_tp_seq"), "22");
	String board_seq = CUtil.nvl(request.getParameter("board_seq"), "0");
	String msearch = CUtil.nvl(request.getParameter("msearch"), "");
	String mode = CUtil.nvl(request.getParameter("mode"), "select");
	String board_sbjt = CUtil.nvl(request.getParameter("board_sbjt"), "제목을 입력해주세요.");
	String board_cont = CUtil.nvl(request.getParameter("board_cont"), "내용을 입력해주세요.");
	String userid = CUtil.nvl(request.getParameter("userid"), "");
	int success_cnt = 0;
	int reg_board_seq = 0;
	
	try {
		cParamSet =  new ucare.jaf.common.CParamSet();
		comDB = new ucare.jpattern.common.bean.ComDB();
		iQuery = comDB.createQuery();
		iQuery.setAutoCommit(false);
		iQuery.open();
		
		if("saveContent".equals(mode)){
			
			if (!CommandToken.isValid(request)) {
				_SERVICE_TYPE = "SQLSERVICE";
				_SERVICE_ID = "UCINF235S";
			}else{
				_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF214I,UCINF235S";
			}
			//게시글 저장
			cParamSet.setParam("_SERVICE_TYPE",_SERVICE_TYPE);
			cParamSet.setParam("_SERVICE_ID",_SERVICE_ID);
			cParamSet.setParam("board_sbjt", 	  board_sbjt);
			cParamSet.setParam("board_tp_seq", board_tp_seq);
			cParamSet.setParam("board_cont", board_cont);
			cParamSet.setParam("userid", userid);
			ucare.jpattern.service.ServiceManagerBean serviceManager=new ucare.jpattern.service.ServiceManagerBean();
			iDataSet=serviceManager.callService(cParamSet); 	//검색
			ds = iDataSet.getFindDataSet("UCINF214I");	
			dsData = iDataSet.getFindDataSet("UCINF235S");	
			ds.next();
			dsData.next();
			if(ds.getParam("SUCCESS_COUNT").asInt(0) == 1){
				success_cnt = ds.getParam("SUCCESS_COUNT").asInt(0);
				reg_board_seq = dsData.getParam("seq").asInt(0);
			}
		}else if("updateContent".equals(mode)){
			
			if (!CommandToken.isValid(request)) {
				_SERVICE_TYPE = "SQLSERVICE";
				_SERVICE_ID = "UCINF231S";
			}else{
				_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF214U,UCINF231S";
			}
			//게시글 변경 저장일 경우 
		
			cParamSet.setParam("board_seq", board_seq);
			cParamSet.setParam("userid", userid);
			cParamSet.setParam("board_sbjt", 	  board_sbjt);
			cParamSet.setParam("board_cont", board_cont);
			cParamSet.setParam("_SERVICE_TYPE",_SERVICE_TYPE);
			cParamSet.setParam("_SERVICE_ID",_SERVICE_ID);
			ucare.jpattern.service.ServiceManagerBean serviceManager=new ucare.jpattern.service.ServiceManagerBean();
			iDataSet=serviceManager.callService(cParamSet); 	//검색
			ds = iDataSet.getFindDataSet("UCINF231S");	
			dsData = iDataSet.getFindDataSet("UCINF214U");	
			ds.next();
			dsData.next();
			if(dsData.getParam("SUCCESS_COUNT").asInt(0) == 1){
				success_cnt = dsData.getParam("SUCCESS_COUNT").asInt(0);
				reg_board_seq = dsData.getParam("board_seq").asInt(0);
			}
		}else if("updateView".equals(mode)){
			//게시글 수정화면
			_SERVICE_TYPE = "SQLSERVICE";
			_SERVICE_ID = "UCINF231S";
			cParamSet.setParam("board_seq", board_seq);
			cParamSet.setParam("userid", userid);
			cParamSet.setParam("_SERVICE_TYPE",_SERVICE_TYPE);
			cParamSet.setParam("_SERVICE_ID",_SERVICE_ID);
			ucare.jpattern.service.ServiceManagerBean serviceManager=new ucare.jpattern.service.ServiceManagerBean();
			iDataSet=serviceManager.callService(cParamSet); 	//검색
			ds = iDataSet.getFindDataSet("UCINF231S");	
			ds.next();
			board_sbjt = ds.getParam("board_sbjt").asString("제목");
			board_cont = ds.getParam("board_cont").asString("내용을 입력해주세요.");
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
<%@ include file="sessionInfo.jsp"%>
<link rel = "stylesheet" href = "css/mobile.css" type = "text/css">
</head>
<body onload="init('<%=mode %>','<%=success_cnt %>','<%=reg_board_seq%>');">
<form id="f" method="post">
<input type="hidden" name="TOKEN" value="<%=CommandToken.set(request)%>">
<!-- 게시판 리스트 파라메터 -->
<input type="hidden" name="board_seq" value="<%=board_seq%>">
<input type="hidden" name="board_tp_seq" value="<%=board_tp_seq%>">
<input type="hidden" name="_START_ROW" value="<%=start_num%>">
<!-- 게시판 리스트 파라메터 -->
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="usernm" value="<%=sessioninfo.getUserName()%>">
<input type="hidden" name="gradecd" value="<%=sessioninfo.getUserGradeCD()%>">
<input type="hidden" name="mode" value="<%=mode%>">
<input type="hidden" name="reg_board_seq" value="<%=reg_board_seq%>">
<%@ include file="top.jsp"%>
<div id="contentArea">
	<div id="hd_sub_menu" class="hd_sub">
	  <div class="hd_sub_inr">
	    <h1>글쓰기</h1>
	    <div class="btn_l">
		  <a href="javascript:cancelReg();" class="btn_t" ><span>취소</span></a>
		</div>
		<div class="btn_r">
		  <a href="javascript:saveContent();" class="btn_t btn_t2"><span>저장</span></a>
	    </div>
	  </div>
	</div>
	<div class="post">
		<dl class="post_top">
		    <dt>제목</dt>
			<dd>
				<div class="inp">
					<input name="board_sbjt" id="subject" type="text" title="제목" value="<%=board_sbjt%>"  onfocus="clearText(this);">
				</div>
			</dd>
		</dl>
		<div class="post_wr"><textarea name="board_cont" id="content" rows="5" cols="30"  onfocus="clearText(this);"><%=board_cont%></textarea></div>
	</div>
	    
	<div class="post_btm"></div>
	<div class="post_btm3">
		<p>※ 모바일 게시판은 에디터를 지원하지 않습니다.</p>
	</div>
</div>
<div id="footerArea" ></div>
</form>
</body>
</html>