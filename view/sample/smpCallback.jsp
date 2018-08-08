<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%> 
<html>
<head>
<title>콜백테스트(sample)</title>
<script language="javascript" src="js/smpCallback.js"></script>
</head>
<body onLoad="">
<form name="f">

<ucare:table type="detail" width="980">
	<tr>
		<td class=MANTDT width=100>대분류코드</td>
		<td class=MANTDM width=150><input class=input_required name=myuppercd size=20 required=true title=대분류코드 ></td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode()" /></td>
		<td align="right">
			<ucare:table type="border" cellspacing="0">
				<tr>
					<td align="right"><ucare:imgbtn name="btnAdd" value="추가" onClick="lineInsert()" /></td>
					<td align="right"><ucare:imgbtn name="btnCancel" value="취소" onClick="cancel()"/></td>
					<td align="right"><ucare:imgbtn name="btnDel" value="삭제" onClick="removeCode()"/></td>					
					<td align="right"><ucare:imgbtn name="btnSave" value="저장" onClick="saveCode()"/></td>
				</tr>
			</ucare:table>	
		</td>
	</tr>
	<tr>
		<td class="MANTDM" colspan="5">
			<!-- 리스트  -->
			<ucare:grid id="SMPCODEBOOKS" width="980" height="220" crud="true" no="true">
				<tr event="L">
					<td  width="100" column="up_cd" title="대분류" editable="true"></td>
					<td  width="100" column="code" title="소분류" editable="true"></td>
					<td  width="100" column="code_nm" title="코드명" editable="true"></td>
					<td  width="100" column="etc1" title="기타1" editable="true"></td>
					<td  width="100" column="etc2" title="기타2" editable="true"></td>
					<td  width="100" column="etc3" title="기타3" editable="true"></td>
					<td  width="100" column="lup_ord" title="정렬" editable="true"></td>
					<td  width="100" column="use_f" title="사용여부" editable="true" format="COMBO" brcode="USEYN"></td>
				</tr>
			</ucare:grid>		
			
			<ucare:grid id="grid2" width="980" height="220" crud="true" no="true">
				<tr event="O,L">
					<td  width="100" column="up_cd" title="대분류" editable="true"></td>
					<td  width="100" column="code" title="소분류" editable="true"></td>
					<td  width="100" column="code_nm" title="코드명" editable="true"></td>
					<td  width="100" column="etc1" title="기타1" editable="true"></td>
					<td  width="100" column="etc2" title="기타2" editable="true"></td>
					<td  width="100" column="etc3" title="기타3" editable="true"></td>
					<td  width="100" column="lup_ord" title="정렬" editable="true"></td>
					<td  width="100" column="use_f" title="사용여부" editable="true" format="COMBO" brcode="USEYN"></td>
				</tr>
			</ucare:grid>	
		</td>
	</tr>
</ucare:table>	

</form>




</body>
</html>