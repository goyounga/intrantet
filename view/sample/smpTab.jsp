<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>ÅÇ(Tab) »ùÇÃ</title>
<script language="javascript" src="js/smpTab.js"></script>
</head>
<body>
<form name="f">

<ucare:table type="border" width="980">
	<tr>
		<td class="MANTDT">tab</td>
		<td>
		
			
			<!-- Tab Sample -->		
			<ucare:table id="tabsample1" type="tab" tabType="_g" name="ÅÇ1,ÅÇ2" width="70">
				<tr id="tabview">
					<td>
						<div style="width:500; height:100">
							<br><br><br>
							<font color=red size=10>Ã¹ ¹øÂ° ÅÇ</font>
						</div>
					</td>
				</tr>
				<tr id="tabview" style="display:none;">
					<td>
						<div style="width:500; height:100">
							<br><br><br>
							<font color=blue size=10>µÎ ¹øÂ° ÅÇ</font>
						</div>
					</td>
				</tr>
			</ucare:table>
		
		
		</td>
		<td>
			&nbsp;
		</td>
	</tr>
	<tr>
		<td class="MANTDT">vtab</td>
		<td>
		
			
			<!-- VTab Sample -->
			<ucare:table type="detail">
				<tr>
					<td>
						<div id="vtabview" style="display:; width:470; height:100">
							<br><br><br>
							<font color=red size=10>Ã¹ ¹øÂ° ÅÇ</font>		
						</div>
						<div id="vtabview" style="display:none; width:470; height:100">
							<br><br><br>
							<font color=blue size=10>µÎ ¹øÂ° ÅÇ</font>				
						</div>
						<div id="vtabview" style="display:none; width:470; height:100">
							<br><br><br>
							<font color=green size=10>¼¼ ¹øÂ° ÅÇ</font>				
						</div>
					</td>
					<td>
						<ucare:table id="tabsample2" type="vtab" name="ÅÇ<br>1,ÅÇ<br>2,ÅÇ<br>3" height="60">
						</ucare:table>
					</td>
				</tr>
			</ucare:table>
		
		
		</td>
		<td>
			&nbsp;
		</td>
	</tr>
</ucare:table>	

</form>

</body>
</html>