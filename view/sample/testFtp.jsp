<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>

<%!
	public static int uploadFile(String fileNm)
    {
    	try{
	    	int ftp			= -1;
	    	String ip = "192.168.100.159";
	    	
			String user = "ftp";
			String pass = "ftp";
			//String remotepath = "/weblogic/daehan_dev/webapps/fileupload/";
			
			//String file = del_doc;
				
	        int exit;
	        String cmds[] = new String[6];
	        cmds[0] = "ftp -n";
	        cmds[1] = "open " + ip + "\n";
	        cmds[2] = "user " + user + " " + pass + "\n";
	        cmds[3] = "bin\n";
	        cmds[4] = "put " + fileNm + "\n";
	        cmds[5] = "bye\n";
	        
	        Runtime run = Runtime.getRuntime();
	        Process proc = run.exec(cmds[0]);
	        OutputStream out = proc.getOutputStream();
	        
	        out.write(cmds[1].getBytes());
	        out.write(cmds[2].getBytes());
	        out.write(cmds[3].getBytes());
	        out.write(cmds[4].getBytes());
	        out.write(cmds[5].getBytes());
	        out.close();
	        
	        exit = proc.waitFor();
	        System.out.println(cmds[0]);
	        System.out.println(cmds[1]);
	        System.out.println(cmds[2]);
	        System.out.println(cmds[3]);
	        System.out.println(cmds[4]);
	        System.out.println(cmds[5]);
	        
	        System.out.println("exitValue>>" + exit);
	        return exit;
        }
        catch(Exception e)
        {
        	e.printStackTrace();
       		return -1;
       	}
    }
%>  

<% 
	uploadFile(request.getParameter("mail_file"));
%>