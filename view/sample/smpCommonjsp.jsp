<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>사용자 JSP (commonjsp) 샘플</title>
<script language="javascript" src="js/smpCommonjsp.js"></script>
</head>
<body>
<form name="f" method="post" target="iLog">
<input type="hidden" name="date_from" value="20080101">
<input type="hidden" name="date_to" value="20081231">

<ucare:table type="detail" width="980">
	<tr>
		<td class="MANTDT" rowspan="2">JSP에서 쿼리사용</td>
		<td class="MANTDM">
			이름 : <input type="text" name="name" size="10">
			<ucare:imgbtn width="80" name="btnTest1" value="테스트1" onClick="callCommonjsp1()"/>
		</td>
	</tr>
	<tr>
		<td>
			<ucare:table id="samplemyjsp1" rows="13"  type="list" width="300" height="70" no="false" summary="true">
				<tr event="">
					<td width="60" column="no" title="번호" align="center"></td>
					<td width="80" column="name" title="이름" align="center"></td>
					<td width="100" column="regdt" title="등록일자" align="center" format="DATE"></td>
				</tr>
			</ucare:table>	
		</td>
	</tr>
	<tr>
		<td class="MANTDT" rowspan="2">JSP로 DataSet 보내기</td>
		<td class="MANTDM">
			번호 : <input type="text" name="no" size="10">
			<ucare:imgbtn width="80" name="btnTest2" value="테스트2" onClick="callCommonjsp2()"/>
		</td>
	</tr>
	<tr>
		<td>
			번호합계 : <input type="text" name="sumno" size="10">
		</td>
	</tr>
</ucare:table>	

</form>

<iframe name=iLog width=100% height=100></iframe>

</body>
</html>