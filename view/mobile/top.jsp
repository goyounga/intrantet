<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<div id="headerArea" class="hd_title">
	모바일 게시판
</div>
<% 
	String pageInfo = request.getRequestURI();
	if(pageInfo.indexOf("Reg") < 0){
%>
	<div class="nav">
		<ul>
	<!-- 		<li id="ArticleList"><a href="/sunmysqlcokr" onclick="nclk(this, 'ctp.article', '', '')">최신글</a></li> -->
			<li id="MenuList"><a href="javascript:goPage('0');">게시판</a></li>
		  	<li class="ic"><a href="javascript:goWrite();" ><span class="wrt">글쓰기</span></a></li>
		</ul>
		<div class="btn_r">
			<a id="searchBtn" href="#" class="btn_nv" onclick="showKywd()"><span class="srch">검색창</span></a>
		</div>
	</div>
	
	<div class="nav_srch" style="display:none" id="searchBox" >
		<fieldset>
		<legend class="hc">검색</legend>
			<span class="txt">
	 		   	<input type="text" title="검색어 입력" id="inputBox" name="msearch" class="_keydown" autocomplete="off" maxlength="255" value="<%=msearch%>">
				<input type="button"  class="clrt" onclick="clearSearch();" title="입력 내용 삭제">
			</span>
			<input type="button"  class="srch" onclick="querySearch();" title="검색">
		</fieldset>
	</div>
<%
	}
%>