
<%@ page contentType = "text/html; charset=euc-kr"%>
<%@ page import="java.io.*;"%>
<%
try
{

// ���� ��ü ����
 File file = new File("C:\\sample01.xls");

// ���� ����
 file.createNewFile();

// ���Ͼ��⸦ ���� ��ü ����

 BufferedWriter wt = new BufferedWriter(new FileWriter(file));

// ���Ͽ� �Ʒ� ���ڵ��� ��� \t �Ƕ��� \n ���๮��

 wt.write("<html>\n");
 wt.write("\t<tr>\n");
 wt.write("\t\t<td>\n");
 wt.write("\t\t\t���� ���� ���̺� ����\n");
 wt.write("\t\t</td>\n");
 wt.write("\t</tr>\n");
 wt.write("</html>");

// ���� �ڵ� ��ȯ
 wt.close();
}
catch (IOException e)
{
 e.printStackTrace();
}
%>
