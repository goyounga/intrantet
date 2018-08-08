<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="ucare.jaf.common.CUtil,ucare.biz.common.util.*"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no," />
<title>�Խ��� ��</title>
<script type="text/javascript" language="javascript" src="js/mcommon.js"></script>
<script type="text/javascript" language="javascript" src="js/boardDtl.js"></script>
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
	ucare.jaf.database.IDataSet dsBord = null;
	ucare.jaf.database.IDataSet dsRply = null;
	ucare.jaf.database.IDataSet dsList = null;
	ucare.jaf.database.IDataSet ds = null;
	
	String start_num = CUtil.nvl(request.getParameter("_START_ROW"), "1");
	String board_tp_seq = CUtil.nvl(request.getParameter("board_tp_seq"), "22");
	String board_seq = CUtil.nvl(request.getParameter("board_seq"), "0");
	String msearch = CUtil.nvl(request.getParameter("msearch"), "");
	String userid = CUtil.nvl(request.getParameter("userid"), "");
	String mode = CUtil.nvl(request.getParameter("mode"), "select");
	String rply_cont = CUtil.nvl(request.getParameter("content"), "");
	String rply_seq = CUtil.nvl(request.getParameter("rply_seq"), "");
	int success_cnt = 0;
	
	try {
		cParamSet =  new ucare.jaf.common.CParamSet();
		comDB = new ucare.jpattern.common.bean.ComDB();
		iQuery = comDB.createQuery();
		iQuery.setAutoCommit(false);
		iQuery.open();
	
		if("insertRply".equals(mode)){
			if (!CommandToken.isValid(request)) {
				_SERVICE_TYPE = ",SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF231S,UCINF233U";
			}else{
				_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF215I,UCINF231S,UCINF233U";
			}
			cParamSet.setParam("rply_cont", rply_cont);
		}else if("deleteRply".equals(mode)){
			
			if (!CommandToken.isValid(request)) {
				_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF231S,UCINF233U";
			}else{
				_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF215D,UCINF231S,UCINF233U";
			}
			cParamSet.setParam("rply_seq", rply_seq);
		}else if("updateRply".equals(mode)){
			
			if (!CommandToken.isValid(request)) {
				_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF231S,UCINF233U";
			}else{
				_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF215U,UCINF231S,UCINF233U";
			}
			cParamSet.setParam("rply_seq", rply_seq);
			cParamSet.setParam("rply_cont", rply_cont);
		}else if("deleteBord".equals(mode)){
			
			if (!CommandToken.isValid(request)) {
				_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF216D,UCINF231S,UCINF233U";
			}else{
				_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE,SQLSERVICE,SQLSERVICE";
				_SERVICE_ID = "UCINF214D,UCINF216D,UCINF231S,UCINF233U";
			}
			cParamSet.setParam("board_seq", board_seq);
		}else{
			_SERVICE_TYPE = "SQLSERVICE,SQLSERVICE";
			_SERVICE_ID = "UCINF231S,UCINF233U";
		}
		
		cParamSet.setParam("_SERVICE_TYPE",_SERVICE_TYPE);
		cParamSet.setParam("_SERVICE_ID",_SERVICE_ID);
		cParamSet.setParam("board_seq", 	  board_seq);
		cParamSet.setParam("board_tp_seq", board_tp_seq);
		cParamSet.setParam("userid", userid);
		cParamSet.setParam("msearch", 	  msearch);
		
		ucare.jpattern.service.ServiceManagerBean serviceManager=new ucare.jpattern.service.ServiceManagerBean();
		iDataSet=serviceManager.callService(cParamSet); 	//�˻�
		dsBord = iDataSet.getFindDataSet("UCINF231S");	//����
		dsBord.next();
		//dsList = iDataSet.getFindDataSet("UCINF230S");		//����, ������
		dsList = queryList(iQuery, cParamSet, start_num).getFindDataSet("UCINF230S"); 	//����, ������
		//dsRply = iDataSet.getFindDataSet("UCINF234S");		//��۸���Ʈ 
		dsRply = queryRplyList(iQuery, cParamSet);	   //���
		ds = iDataSet.getFindDataSet("UCINF214D");
		ds.next();
		if(ds.getParam("SUCCESS_COUNT").asInt(0) == 1){
			success_cnt = ds.getParam("SUCCESS_COUNT").asInt(0);
		}
		CommandToken.set(request);
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
<%!
	//��� ����Ʈ 
	public ucare.jaf.database.IDataSet queryRplyList(ucare.jaf.database.IQuery iQuery, ucare.jaf.common.CParamSet cParamSet) throws Exception{
		ucare.jaf.database.IDataSet  iDataSetTmp = null;
		String	SQL_ID			= null;
		String	SQL_STATEMENT	= null;
		int index = 0;
		cParamSet.setParam("_PAGE_ROW", 	 "9999");
		cParamSet.setParam("_PAGE", 	 	 "1");	
		try{
			SQL_ID = (String)ucare.jpattern.xmlhandler.CXmlParser.getQuery("UCINF234S", "query-id");
			SQL_STATEMENT	= (String)ucare.jpattern.xmlhandler.CXmlParser.getQuery(SQL_ID, "query-statement");
			iQuery.setSQL(SQL_STATEMENT);
			iQuery.setInt(++index, cParamSet.getParam("board_seq").asInt());	//�Խñ� ��ȣ
			iDataSetTmp = iQuery.select().getDataSet();
			iQuery.sqlClose();
			return iDataSetTmp;		//���
		}catch(Exception e){
			throw new Exception(e);
		}
	}

	//����/���� ����Ʈ 
	public ucare.jaf.database.IDataSet queryList(ucare.jaf.database.IQuery iQuery, ucare.jaf.common.CParamSet cParamSet, String start_num) throws Exception{
		ucare.jaf.database.IDataSet  iDataSetTmp = null;
		cParamSet.setParam("_SERVICE_TYPE","SQLSERVICE");
		cParamSet.setParam("_SERVICE_ID","UCINF230S");
		cParamSet.setParam("_PAGE_ROW", 	 "15");
		cParamSet.setParam("_PAGE", 	 	 start_num);	
		try{
			ucare.jpattern.service.ServiceManagerBean serviceManager2=new ucare.jpattern.service.ServiceManagerBean();
			iDataSetTmp = serviceManager2.callService(cParamSet); 	//�˻�
			return iDataSetTmp;		//���
		}catch(Exception e){
			throw new Exception(e);
		}
	}	 
%>
<%@ include file="sessionInfo.jsp"%>
<link rel = "stylesheet" href = "css/mobile.css" type = "text/css">
</head>
<body onload="init('<%=mode %>','<%=success_cnt %>');">
<form id="f" method="post">
<input type="hidden" name="TOKEN" value="<%=CommandToken.set(request)%>">
<!-- �Խ��� ����Ʈ �Ķ���� -->
<input type="hidden" name="board_seq" value='<%=board_seq%>' >
<input type="hidden" name="board_tp_seq" value='<%=board_tp_seq%>' >
<input type="hidden" name="_START_ROW" value='<%=start_num%>' >
<!-- �Խ��� ����Ʈ �Ķ���� -->
<input type="hidden" name="rply_seq" value='' >
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="usernm" value="<%=sessioninfo.getUserName()%>">
<input type="hidden" name="gradecd" value="<%=sessioninfo.getUserGradeCD()%>">
<input type="hidden" name="mode" value="<%=mode%>">

<%@ include file="top.jsp"%>
<div id="contentArea">
	<div class="post_tit">
		<h2>
			<%=dsBord.getParam("board_sbjt").asString("") %>
        </h2>
		<p class="if">
			<span class="if_inr">
              <span class="im">
					<%=dsBord.getParam("rg_nm").asString("") %>
				  <span class="bar">|</span><span class="hc">�ۼ���</span> <%=dsBord.getParam("rg_dtm").asString("") %> 
			  </span>
			  <span class="nowp">
			    <span class="bar">|</span> ��ȸ <%=dsBord.getParam("qry_cnt").asString("") %>
			  </span>
            </span> 
		</p>
		<a href="#" class="cmt_num">
            <span class="hc">���</span> <%=dsBord.getParam("rply_cnt").asString("0") %>
        </a>
	</div>
	<% if(dsBord.getParam("rg_id").asString("").equals(sessioninfo.getUserID())) {%>
	<div class="set" >
   		<a href="javascript:updateBord();" class="btn_t3" ><span>����</span></a>
		<a href="javascript:deleteBord();" class="btn_t3" ><span>����</span></a>
	</div>
	<%} %>
	<div id="content">
		<div id="postContent" class="post_cont">
			<%=CUtil.convertBR(dsBord.getParam("board_cont").asString(""), 1) %>
		</div>
		<div class="post_spi" style="display:none;">
			<div class="app_view">
				<p></p>
			</div>
		</div>
		<div class="post_ext post_ext_v1">
<!-- 			<ul class="post_bset"> -->
<!-- 				<li><a href="#" class="btn_t4" onclick="nclk(this,'art.bcmt','','');"><span>���<em>0</em></span></a></li> -->
<!-- 				<li><a href="#" class="btn_t4" onclick="nclk(this,'art.breplyno','','');"><span>���<em>0</em></span></a></li> -->
<!-- 				<li><a href="#" class="btn_t4" onclick="nclk(this,'art.breply','','');"><span>��۾���</span></a></li> -->
<!-- 			</ul> -->
		</div> 	
		<div class="cmt_tit">
			���&nbsp;<em><%=dsBord.getParam("rply_cnt").asString("0") %></em>
			<span class="btn_cmt2"><button type="button" class="_click" onclick="goRply()">����</button></span>
		</div>
		<ul class="cmt_lst">
			<%
				StringBuffer rplySb = new StringBuffer();
				while (dsRply.next())
				{
					rplySb.append("<input type='hidden' id='cont_"+dsRply.getParam("rply_seq").asString("")+"' value='"+dsRply.getParam("rply_cont").asString("")+"'>");
					rplySb.append("<li");
					if(dsRply.getParam("rg_id").asString("").equals(sessioninfo.getUserID())) rplySb.append(" class='my'");
					rplySb.append(">");
					rplySb.append("		<div class='lst_wp'>");
					rplySb.append("			<strong>"+dsRply.getParam("rply_rg_nm").asString(""));
					rplySb.append("				<span class='bar'>|</span> <em>"+dsRply.getParam("rply_rg_dtm").asString("")+"</em></strong>");
					rplySb.append("			</strong>");
					rplySb.append("			<div class='clst_cont'>");
					rplySb.append("				<span>").append(CUtil.convertBR(dsRply.getParam("rply_cont").asString(""), 1)).append("</span>");
					if(dsRply.getParam("rg_id").asString("").equals(sessioninfo.getUserID())){
						rplySb.append("				<div class='lst_btn' id='lst_btn'>");
						rplySb.append("				<span class='btn_cmt'><button type='button' class='_click' onclick='updateRply("+dsRply.getParam("rply_seq").asString("")+")'>����</button></span>");
						rplySb.append("				<span class='btn_cmt'><button type='button' class='_click' onclick='deleteRply("+dsRply.getParam("rply_seq").asString("")+")'>����</button></span>");
						rplySb.append("				</div>");
					}
					rplySb.append("			</div>");
					rplySb.append("		</div>");
					rplySb.append("</li>");
				}	
				

			%>
			<%=rplySb.toString()%>
		</ul>
		<div class="lev_cmt_wp">
			<fieldset>
			<legend class="hc">��� �ۼ�</legend>
			<div class="lev_cmt">
				<textarea name="content" id="commentContent" cols="30" rows="1" title="����ۼ�"></textarea>
			</div>
			<div class="lev_btn" id="rply_wrt">
				<span class="btn_cmt2"><button type="button" class="_click" onclick="saveRply('INSERT');">����Է�</button></span>
			</div>
			<div class="lev_btn" id="rply_upt" style="display:none;">
				<span class="btn_cmt2"><button type="button" class="_click" onclick="saveRply('UPDATE');">�����Ϸ�</button></span>
				<span class="btn_cmt2"><button type="button" class="_click" onclick="cancelRply();">���</button></span>
			</div>
			</fieldset>
		</div>
	</div>
</div>
<div id="footerArea" >
	<!-- ��� ����Ʈ -->
	<div class="post_nav">
		<%
			StringBuffer listSb = new StringBuffer();
			while (dsList.next())
			{
				listSb.append("<a href=\"javascript:openDetail('").append(dsList.getParam("board_tp_seq").asString("")).append("','").append(dsList.getParam("board_seq").asString("")).append("');\" class='");
				listSb.append(				board_seq.equals(dsList.getParam("board_seq").asString(""))?"current":"next1");
				listSb.append("'>");
				listSb.append("	<span class='inr' >");
				listSb.append("		<span class='bu'>&nbsp;");
// 				listSb.append(				"next1".equals(dsList.getParam("type").asString(""))?"������":"������");
				listSb.append("		</span>");
				listSb.append("		<strong>"+ dsList.getParam("board_sbjt").asString("") +"</strong>");
				if(0 != dsList.getParam("rply_cnt").asInt(0)) listSb.append("<em>["+dsList.getParam("rply_cnt").asInt(0)+"]</em>");
				listSb.append("	</span>");
				listSb.append("</a>");
			}	
		%>
		<%=listSb.toString()%>
	</div>
	<div class="post_ext4">
		<a href="javascript:goList();" class="btn_lst" ><span>�������</span></a>
	</div>
</div>
</form>
</body>
</html>