<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>�����</title>
<script language="javascript">
function init()
{
	//��ü
	makeLCombo(f);
	
	//Q&A
	makeLCombo(f2, '', '', 1);
	
	//�Ҹ�
	makeLCombo(f3, '', '', 2);
}
</script>
</head>
<body onload="init();">
	<%=sessioninfo.getUserID()%>
<form name="f">
	<select name="constypel" style="width:100" class="frm_select" onChange="makeMCombo(this.form);" required="true" requirednm="�������(��)"><option value="">== ���� ==</option></select>
	<select name="constypem" style="width:150" class="frm_select" onChange="makeSCombo(this.form)" required="true" requirednm="�������(��)"><option value="">== ���� ==</option></select>
	<select name="constypes" style="width:200" class="frm_select" required="true" requirednm="�������(��)"><option value="">== ���� ==</option></select>
	��ü
</form>
<form name="f2">
	<select name="constypel" style="width:100" class="frm_select" onChange="makeMCombo(this.form, '', '', 1);" required="true" requirednm="�������(��)"><option value="">== ���� ==</option></select>
	<select name="constypem" style="width:150" class="frm_select" onChange="makeSCombo(this.form, '', '', 1)" required="true" requirednm="�������(��)"><option value="">== ���� ==</option></select>
	<select name="constypes" style="width:200" class="frm_select" required="true" requirednm="�������(��)"><option value="">== ���� ==</option></select>
	Q&A
</form>
<form name="f3">
	<select name="constypel" style="width:100" class="frm_select" onChange="makeMCombo(this.form, '', '', 2);" required="true" requirednm="�������(��)"><option value="">== ���� ==</option></select>
	<select name="constypem" style="width:150" class="frm_select" onChange="makeSCombo(this.form, '', '', 2)" required="true" requirednm="�������(��)"><option value="">== ���� ==</option></select>
	<select name="constypes" style="width:200" class="frm_select" required="true" requirednm="�������(��)"><option value="">== ���� ==</option></select>
	�Ҹ�
</form>
</body>
</html>