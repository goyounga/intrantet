<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<div id="headerArea" class="hd_title">
	����� �Խ���
</div>
<% 
	String pageInfo = request.getRequestURI();
	if(pageInfo.indexOf("Reg") < 0){
%>
	<div class="nav">
		<ul>
	<!-- 		<li id="ArticleList"><a href="/sunmysqlcokr" onclick="nclk(this, 'ctp.article', '', '')">�ֽű�</a></li> -->
			<li id="MenuList"><a href="javascript:goPage('0');">�Խ���</a></li>
		  	<li class="ic"><a href="javascript:goWrite();" ><span class="wrt">�۾���</span></a></li>
		</ul>
		<div class="btn_r">
			<a id="searchBtn" href="#" class="btn_nv" onclick="showKywd()"><span class="srch">�˻�â</span></a>
		</div>
	</div>
	
	<div class="nav_srch" style="display:none" id="searchBox" >
		<fieldset>
		<legend class="hc">�˻�</legend>
			<span class="txt">
	 		   	<input type="text" title="�˻��� �Է�" id="inputBox" name="msearch" class="_keydown" autocomplete="off" maxlength="255" value="<%=msearch%>">
				<input type="button"  class="clrt" onclick="clearSearch();" title="�Է� ���� ����">
			</span>
			<input type="button"  class="srch" onclick="querySearch();" title="�˻�">
		</fieldset>
	</div>
<%
	}
%>