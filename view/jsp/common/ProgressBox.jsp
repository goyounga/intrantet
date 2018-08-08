<script language="javascript">
function showProgressBox(sMsg, top, left)
{
	sMsg = HtmlUtil.decode(sMsg,undefined,"처리중입니다...", sMsg);	
	top = HtmlUtil.decode(top,undefined, document.body.scrollHeight / 2 - 50); 		//Box align center
	left = HtmlUtil.decode(left,undefined, document.body.scrollWidth / 2 - 180);	//박스의 크기가 width="360" height="100" 이므로 그값의 1/2인 180 과 50을 각각 적용
	var obj = parent;

	obj.divProgressBox.style.top = top;
	obj.divProgressBox.style.left= left;
	obj.divProgressBox.style.display="";
	obj.tblProgressBox.rows[1].cells[0].innerText = sMsg;
} 

function closeProgressBox()
{
	parent.divProgressBox.style.display="none";
}
</script>
<div id="divProgressBox" style="position:absolute;left:0;top:0px;z-index:10000;display:none;">
<table id="tblProgressBox" border="0" width="360" height="100" cellpadding="0" cellspacing="0" align="center" background="/html/images/common/ingbg.gif">		
	<tr><td align=right><a href='javascript:closeProgressBox();'><img src=/html/images/editimg/ed_format_sub.gif></a></td></Tr>
	<tr><td align="center" class="txt01" valign=bottom>처리중입니다...</td></tr>
	<tr><td align="center" valign=top><img src="/html/images/common/ingbar.gif" width="252" height="17" vspace="5"></td></tr>
</table>
<iframe frameborder=0 width="360" height="100" style="position:absolute;left:0px;top:0px;z-index:-100;"></iframe>
</div>