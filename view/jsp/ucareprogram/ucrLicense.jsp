<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>Ucare License</title>
	<%@ include file="/jsp/include/include.jsp"%>
</head>
<%   
     //��ȣȭ Ű
     String sVal = "";
	if (request.getParameter("ip") != null)
	{
       String code = request.getParameter("ip");
       String strkey = "NEXFRONGHKDLXLD";           // ��ȣȭ Ű NE&SH#!K
       byte keyChar[] = new byte[strkey.getBytes().length];
       keyChar = strkey.getBytes();
       
       //��ȣȭ�� ��� 
       byte codeChar[] = new byte[code.getBytes().length]; 
       codeChar = code.getBytes(); 
       
       //XOR ����
       for(int i=0, j=0; i< code.getBytes().length; i++)
       {
          codeChar[i] = (byte) (codeChar[i] ^ keyChar[j]); 
          j = (++j < keyChar.length ? j : 0); 
       }
       sVal = new String(codeChar);

	}
%>

  <form method="post">
			<table class="tblSearch" cellspacing="0" border="0" width="100%">
				<tr>
		  		<th>����� IP</th>
		  		<td> <input name=ip value=<%=request.getParameter("ip")%>></td>
			  	<td><input type=submit value="���̼��� �ޱ�"></td>
			  </tr>
			  <tr>	
  				<th>���̼��� Ű </th>
  				<td><input name=key value="<%=sVal%>"></td>
  			</tr>
  		</table>		
  				
  </form>
</html>