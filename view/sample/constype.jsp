<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>고객상담</title>
<script language="javascript">
function init()
{
	//전체
	makeLCombo(f);
	
	//Q&A
	makeLCombo(f2, '', '', 1);
	
	//불만
	makeLCombo(f3, '', '', 2);
}
</script>
</head>
<body onload="init();">
	<%=sessioninfo.getUserID()%>
<form name="f">
	<select name="constypel" style="width:100" class="frm_select" onChange="makeMCombo(this.form);" required="true" requirednm="상담유형(대)"><option value="">== 선택 ==</option></select>
	<select name="constypem" style="width:150" class="frm_select" onChange="makeSCombo(this.form)" required="true" requirednm="상담유형(중)"><option value="">== 선택 ==</option></select>
	<select name="constypes" style="width:200" class="frm_select" required="true" requirednm="상담유형(소)"><option value="">== 선택 ==</option></select>
	전체
</form>
<form name="f2">
	<select name="constypel" style="width:100" class="frm_select" onChange="makeMCombo(this.form, '', '', 1);" required="true" requirednm="상담유형(대)"><option value="">== 선택 ==</option></select>
	<select name="constypem" style="width:150" class="frm_select" onChange="makeSCombo(this.form, '', '', 1)" required="true" requirednm="상담유형(중)"><option value="">== 선택 ==</option></select>
	<select name="constypes" style="width:200" class="frm_select" required="true" requirednm="상담유형(소)"><option value="">== 선택 ==</option></select>
	Q&A
</form>
<form name="f3">
	<select name="constypel" style="width:100" class="frm_select" onChange="makeMCombo(this.form, '', '', 2);" required="true" requirednm="상담유형(대)"><option value="">== 선택 ==</option></select>
	<select name="constypem" style="width:150" class="frm_select" onChange="makeSCombo(this.form, '', '', 2)" required="true" requirednm="상담유형(중)"><option value="">== 선택 ==</option></select>
	<select name="constypes" style="width:200" class="frm_select" required="true" requirednm="상담유형(소)"><option value="">== 선택 ==</option></select>
	불만
</form>
</body>
</html>