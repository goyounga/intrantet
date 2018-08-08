<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>Tree(sample)</title>
<script language="javascript" src="js/smpTree.js"></script>
</head>
<body onLoad="eventGrid();setInit();">
<form name="f" target="iLog">

<ucare:table type="detail" width="980">
	<tr>
		<td class="MANTDM" colspan="5">
			<!-- Tree -->
			  
			<ucare:grid id="SMPTREES" width="200" height="370" tree="true">
            	<tr class="LIST" event="O">
                	<td  width="200" column="codenm" image="search" format="TREE"></td>
                </tr>
			</ucare:grid>
			
		</td>
	</tr>
</ucare:table>	

</form>




</body>
</html>