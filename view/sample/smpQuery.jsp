<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>쿼리(Query) 샘플</title>
<script language="javascript" src="js/smpQuery.js"></script>
</head>
<body>
<form name="f" target="iLog">

<ucare:table type="detail" width="980">
	<tr>
		<td class="MANTDT" rowspan="6">exec</td>
		<td class="MANTDM">
			<ucare:imgbtn width="80" name="btnSelect" value="SELECT" onClick="selectSample()"/>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:imgbtn width="80" name="btnPage" value="PAGE" onClick="pageSample()"/>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:imgbtn width="80" name="btnUpdate" value="UPDATE" onClick="updateSample()"/>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:imgbtn width="80" name="btnBatch" value="BATCH" onClick="batchSample()"/>
			<select name="employee" style="width:100; height:50" multiple ondblclick="addEmployee(this)">
				<option value="1">김은수</option>
				<option value="2">김정균</option>
				<option value="3">김택수</option>
				<option value="4">김형주</option>
				<option value="5">김혜영</option>
			</select>
			<textarea name="batchData" rows="" cols="" class="Input_luac" style="width:300;height:50"></textarea>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:imgbtn width="80" name="btnMulti" value="MULTI" onClick="multiSample()"/>
		</td>
	</tr>
	<tr>
		<td class="MANTDM"><table border="0"><tr><td>
				<ucare:imgbtn width="100" name="btnMultiSelect" value="MULTISELECT" onClick="multiselectSample()"/>
			</td>
			<td>
				<ucare:table id="samplemymultiselect1" rows="13"  type="list" width="300" height="70" no="false">
					<tr event="">
						<td width="60" column="index" title="INDEX" align="center"></td>
						<td width="60" column="no" title="번호" align="center"></td>
						<td width="80" column="name" title="이름"></td>
					</tr>
				</ucare:table>
			</td></tr></table>
		</td>
	</tr>
	<tr>
		<td class="MANTDT">view</td>
		<td class="MANTDM">
			GRID, FREE, NONE, CODE, TREE
		</td>
	</tr>
	<tr>
		<td class="MANTDT">argument</td>
		<td class="MANTDM"><table border="0"><tr><td>
			<ucare:table type="query" width="100%">
				<tr>
					<td width="60" align="right">번호 :&nbsp;</td>
					<td align="left">
						<input type="text" name="qno" style="width:80"/>
					</td>
					<td width="70" align="right">이름 :&nbsp;</td>
					<td align="left">
						<input type="text" name="name" style="width:80"/>
					</td>
					<td width="60" align="right">쿼리 :&nbsp;</td>
					<td align="left">
						<input type="text" name="name2" style="width:100"/>
					</td>
					<td width="80" align=right>등록일자 :&nbsp;</td>
					<td width="220">
						<input type=text class=TXT name=date_from size=10 title="등록일자" value="<%=CUtil.getMyDate(-1, "yyyy/MM/dd") %>"><span class=calendar onclick="openCalendar('f.date_from',f.date_from.value)"></span>&nbsp; 
						~
						<input type=text class=TXT name=date_to size=10 title="등록일자" value="<%=CDateUtil.getDateString() %>"><span class=calendar onclick="openCalendar('f.date_to',f.date_to.value)"></span>
					</td>
					<td align="left"><ucare:imgbtn width="40" name="btnSearch" value="조회" onClick="makeQuery()"/></td>
				</tr>		
			</ucare:table>
		</td></tr>
		<tr><td>
			<ucare:table id="samplemyquery1" rows="13"  type="list" width="300" height="70" no="false">
				<tr event="">
					<td width="60" column="no" title="번호" align="center"></td>
					<td width="80" column="name" title="이름" align="center"></td>
					<td width="100" column="regdt" title="등록일자" align="center" format="DATE"></td>
				</tr>
			</ucare:table>	
		</td></tr></table>
		</td>
	</tr>
</ucare:table>	

</form>




</body>
</html>