
<%@ page contentType = "text/html; charset=euc-kr"%>
<%@ page import="java.io.*;"%>
<%
try
{

// 파일 객체 생성
 File file = new File("C:\\sample01.xls");

// 파일 생성
 file.createNewFile();

// 파일쓰기를 위한 객체 생성

 BufferedWriter wt = new BufferedWriter(new FileWriter(file));

// 파일에 아래 문자들을 출력 \t 탭띄우기 \n 개행문자

 wt.write("<html>\n");
 wt.write("\t<tr>\n");
 wt.write("\t\t<td>\n");
 wt.write("\t\t\t파일 내부 테이블 생성\n");
 wt.write("\t\t</td>\n");
 wt.write("\t</tr>\n");
 wt.write("</html>");

// 파일 핸들 반환
 wt.close();
}
catch (IOException e)
{
 e.printStackTrace();
}
%>
