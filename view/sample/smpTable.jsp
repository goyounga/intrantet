<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>테이블(Table) 샘플</title>
<script language="javascript" src="js/smpTable.js"></script>
</head>
<body>
<form name="f">

<ucare:table type="border" width="980">
	<tr>
		<td class="MANTDT">query</td>
		<td height="30">
		
			
			<!-- Table Tag Sample -->		
			<ucare:table type="query" width="400">
				<tr>
					<td>&nbsp;</td>
				</tr>		
			</ucare:table>
		
		
		</td>
		<td>
			&nbsp;
		</td>
	</tr>
	<tr>
		<td class="MANTDT">list</td>
		<td height="150">
			
			
			<!-- Table Tag Sample -->
			<ucare:table id="samplemytable1" rows="13"  type="list" width="550" height="100" no="true">
				<tr event="O">
					<td width="60" column="code" title="불량코드" align="center"></td>
					<td width="80" column="codenm" title="내용(간략)" length="6"></td>
					<td width="80" column="useyn" title="사용여부(combo)"><ucare:select name="combo0" brcode="USEYN" width="80" option="4" event="true"/></td>
					<td width="80" column="useyn2" title="사용여부(checkbox)"><input type="checkbox" value="Y" title="true"/></td>
					<td width="0" column="uppercd" title="대분류" style="display:none"></td>
				</tr>
			</ucare:table>
			
			
		</td>
		<td>
			<ucare:imgbtn width="60" name="btnTest13" value="테스트1" onClick="selectMyTable1()"/>
		</td>
	</tr>
	<tr>
		<td class="MANTDT">detail</td>
		<td height="150">
			
			
			<!-- Table Tag Sample -->
			<ucare:table width="550">
				<tr>
					<td class=MANTDT width=80>대분류코드</td>
					<td class=MANTDM>
						<input type=text class=TXT name=uppercd style="width:100">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>불량코드</td>
					<td class=MANTDM>
						<input type=text class=TXT name=code style="width:100">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>내용</td>
					<td class=MANTDM>
						<input type=text class=TXT name=codenm style="width:200">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>사용여부 (combobox)</td>
					<td class=MANTDM>
						<ucare:select name="useyn" brcode="USEYN" width="60" option="-1" styleClass="Input_mb05"/>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>사용여부 (checkbox)</td>
					<td class=MANTDM>
						<input type=checkbox name"useyn2" value="Y">
					</td>
				</tr>	
			</ucare:table>
			
			
		</td>
		<td>
		</td>
	</tr>
	<tr>
		<td class="MANTDT">list2</td>
		<td>
		
			
			<!-- Table Tag Sample -->
			<ucare:table id="samplemytable2" rows="20"  type="list" width="650" height="100" no="true" pageman="true" fixed="2">
				<tr event="B">
					<td width="60" column="contractornm" title="성명" align="center" format="HTML"></td>
					<td width="90" column="contractorrid" title="주민번호" align="center" format="SID" sortable="true"></td>
					<td width="60" column="payamt" title="금액" align="right" format="MONEY" sortable="true"></td>
					<td width="60" column="homezipcd" title="우편번호" align="center" format="POST"></td>					
					<td width="80" column="firstregdt" title="날짜" align="center" format="DATE"></td>
					<td width="80" column="firstregdt" title="날짜2" align="center" format="DATE2"></td>
					<td width="60" column="firstregtm" title="시간" align="center" format="TIME"></td>
					<td width="120" column="firstregtime" title="날짜시간" align="center" format="DATET"></td>
					<td width="80" column="hometelno" title="전화번호" align="center" format="TEL"></td>
				</tr>
			</ucare:table>
			
			
		</td>
		<td>
			<ucare:imgbtn width="60" name="btnTest2" value="테스트2" onClick="selectMyTable2()"/>
		</td>
	</tr>
	<tr>
		<td>&nbsp;</td>
		<td>
			onClick : <span class="txt02"><label id="amtlabel"></label></span>
		</td>
		<td></td>
	</tr>
	<tr>
		<td>&nbsp;</td>
		<td>
			onDbClick : <span class="txt01"><label id="sidlabel"></label></span>
		</td>
		<td></td>
	</tr>
	<tr>
		<td class="MANTDT">list3</td>
		<td><table border="0"><tr><td>
		
			
			<!-- Table Tag Sample -->
			<ucare:table id="samplemytable3" rows="20"  type="list" width="400" height="90" no="flase" pageman="true" fixed="2" summary="true" style="table-layout:fixed;">
				<tr event="O">
					<td width="80" column="uppercd" title="대분류" align="center" format="HTML"></td>
					<td width="80" column="code" title="코드" align="center"></td>
					<td width="80" column="codenm" title="코드명" align="left"></td>
					<td width="80" column="etc1" title="기타1" align="left"></td>					
					<td width="80" column="etc2" title="기타2" align="left"></td>
					<td width="80" column="etc3" title="기타3" align="left"></td>
					<td width="80" column="useyn" title="사용여부" align="center"></td>
					<td width="80" column="sort" title="정렬" align="center"></td>
				</tr>
			</ucare:table>
			
			
		</td>
		<td>
		
			<!-- Table Tag Sample -->
			<ucare:table id="samplemytable4" rows="20"  type="list" width="400" height="90" no="flase" pageman="true" title="no">
				<tr event="">
					<td width="80" column="uppercd" title="대분류" align="center" format="HTML"></td>
					<td width="80" column="code" title="코드" align="center"></td>
					<td width="80" column="codenm" title="코드명" align="left"></td>
					<td width="80" column="etc1" title="기타1" align="left"></td>					
					<td width="80" column="etc2" title="기타2" align="left"></td>
					<td width="80" column="etc3" title="기타3" align="left"></td>
					<td width="80" column="useyn" title="사용여부" align="center"></td>
					<td width="80" column="sort" title="정렬" align="center"></td>
				</tr>
			</ucare:table>


		
		</td></tr></table>
		</td>
		<td>
			<ucare:imgbtn width="60" name="btnTest3" value="테스트3" onClick="selectMyTable3()"/>
		</td>
	</tr>
</ucare:table>	

</form>

</body>
</html>