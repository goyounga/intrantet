<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>HashTable 샘플</title>
<script language="javascript" src="js/smpHashTable.js"></script>
</head>
<body>
<form name="f">

<ucare:table>
	<tr>
		<td>
			<ucare:imgbtn width="60" name="btnTest1" value="테스트1" onClick="testHashTable()"/>
			<ucare:table id="samplemytest1" rows="13"  type="list" width="550" height="50" no="true">
				<tr event="O">
					<td width="60" column="code" title="불량코드" align="center"></td>
					<td width="80" column="codenm" title="내용(간략)" length="6"></td>
					<td width="80" column="useyn" title="사용여부(combo)"><ucare:select name="combo0" brcode="USEYN" width="80" option="4"/></td>
					<td width="80" column="useyn2" title="사용여부(checkbox)"><input type="checkbox" value="Y"/></td>
					<td width="0" column="uppercd" title="대분류" style="display:none"></td>
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