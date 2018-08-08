<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ page import =  "ucare.jpattern.common.bean.*,
					ucare.jaf.common.*,
					ucare.jaf.exception.*,
					ucare.jpattern.common.actionform.ComActionForm" %>
<%@ taglib uri = "/WEB-INF/ucare-html.tld"   prefix = "ucare" %>
<%
	String title_width = CUtil.nvl(request.getParameter("title_width"), "");
	String fileBox_width = CUtil.nvl(request.getParameter("fileBox_width"), "");
	String fileListBox_width = CUtil.nvl(request.getParameter("fileListBox_width"), "");
	String fileListBox_height = CUtil.nvl(request.getParameter("fileListBox_height"), "");
	String ftp_send = CUtil.nvlNequal(request.getParameter("ftp_send"), "false");
	String minus_width = CUtil.nvl(request.getParameter("minus_width"), "1");
%>
<script language="javascript">
defaultBoxHeight = <%=Integer.parseInt(fileListBox_height) + 1 %>;
</script>
<script language="javascript" src="/html/js/common/comUploadForm.js"></script>
<input type="hidden" name="minus_width" value="<%=minus_width %>"/>
	<table border=0 cellpadding=0 cellspacing=0 width=100% height=<%=fileListBox_height%>>
		<tr>
			<td class=MANTDT width="<%=title_width%>">
				<table border=0 cellpadding=0 cellspacing=0>
					<tr height="25" valign="bottom">
						<td align=center>첨부파일</td>
						<td width=30 align=right>
							<span id="icoUploadFiles" style="display:none" class="search" onclick="uploadFileDisabled(true);"></span>
							<span id="icoShowFiles" style="display:" class="doc" onclick="uploadFileDisabled(false);"></span>
						</td>
					</tr>
					<tr>
						<td align=center>
							<span id="icoBig" class="big" onclick="expandUploadFile()"></span>
							<span id="icoSmall" class="small" onclick="contractUploadFile()"></span>
						</td>
					</tr>
				</table>
			</td>
			<td class=MANTDM id="uploadFileArea" rowspan="2">
				<!-- 첨부파일이 없을 경우 첨부파일 선택 폼 보이기-->
				<div id="divUploadFile" style="position:absolute;top:0;left:-1000;">
					<table border=0 cellpadding=0 cellspacing=0>
						<tr>
							<td><iframe name="iUpload" height="50" width="<%=fileBox_width%>" src="/jsp/common/multiUpload.jsp?ftp_send=<%= ftp_send %>" frameborder="0" scrolling="yes" style="border:1px solid #CCCCCC;padding-left:1px"></iframe></td>
							<td valign=top style="padding:1 0 0 0">
								<span class="plus" onclick="addFileBox();"></span><br>
								<span class="minus" onclick="removeFileBox();"></span></td>
						</tr>
					</table>
				</div>
				
				<!-- 첨부파일이 있을 경우 첨부파일 다운로드 폼 보이기 -->
				<div id="divUploadFile" style="display:none;position:absolute;top:0;left:-1000;overflow-y:scroll;width:<%=fileListBox_width%>;background-Color:white"><iframe frameborder=0 width=100% height=100%></iframe></div>
				<div id="divUploadFile" style="display:none;position:absolute;top:0;left:-1000;overflow-y:scroll;width:<%=fileListBox_width%>;background-Color:white;border:1px solid #CCCCCC"></div>
				<iframe name="iDownFile" width=0 height=0></iframe>
			</td>
		</tr>
	</table>