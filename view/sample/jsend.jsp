<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%> 
<html>
<head>
  <title>jSMTP.jsp</title>
</head>
<body>
  <%@ page import="java.util.*" %>
  <%@ page import="javax.mail.*" %>
  <%@ page import="javax.mail.internet.*" %>
  <%@ page import="javax.activation.*" %>
<%
    try {
    String host = "mail.kmps.co.kr";
    String to = request.getParameter("to");
    String from = request.getParameter("from");
    String subject = request.getParameter("subject");
    String messagetext = request.getParameter("body");
    boolean sessionDebug = true;

    Properties props = new Properties();
    //props.put("mail.host",host);
    props.put("mail.smtp.host", "mail.kmps.co.kr");
    
    System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + props.get("mail.smtp.host"));
    props.put("mail.smtp.port", "25");
    props.put("mail.transport.protocol","smtp");

    Session mailSession = Session.getDefaultInstance(props,null);
    mailSession.setDebug(sessionDebug);

    Message msg = new MimeMessage(mailSession);

    msg.setFrom(new InternetAddress(from));
    InternetAddress[] address = {new InternetAddress(to)};
    msg.setRecipients(Message.RecipientType.TO,address);
    msg.setSubject(subject);
    msg.setSentDate(new Date());
    msg.setText(messagetext );

    Transport.send(msg);

    out.println("Mail Was Sent To:: " + to);
    out.println("Sender:: " + from);
    //out.println("Host:: " + host);
    
  }catch(Exception e)
  {
  out.println(e);
  }
  %>
</body>
</html>
