<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>HashTable ����</title>
<script language="javascript" src="js/smpHashTable.js"></script>
</head>
<body>
<form name="f">

<ucare:table>
	<tr>
		<td>
			<ucare:imgbtn width="60" name="btnTest1" value="�׽�Ʈ1" onClick="testHashTable()"/>
			<ucare:table id="samplemytest1" rows="13"  type="list" width="550" height="50" no="true">
				<tr event="O">
					<td width="60" column="code" title="�ҷ��ڵ�" align="center"></td>
					<td width="80" column="codenm" title="����(����)" length="6"></td>
					<td width="80" column="useyn" title="��뿩��(combo)"><ucare:select name="combo0" brcode="USEYN" width="80" option="4"/></td>
					<td width="80" column="useyn2" title="��뿩��(checkbox)"><input type="checkbox" value="Y"/></td>
					<td width="0" column="uppercd" title="��з�" style="display:none"></td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	<tr>		
		<td>
			<textarea name="log" rows="" format="" cols="" class="Input_luac" style="width:600;height:500px"></textarea>
		</td>
	</tr>
</ucare:table>

</form>

</body>
</html>