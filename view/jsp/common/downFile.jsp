<%@ page language="java" contentType="text/html;charset=EUC-KR"%>
<%@ page import =  "java.io.File,
					java.io.FileInputStream,
					java.io.BufferedInputStream,
					java.io.BufferedOutputStream" %>
<%
	//EUC-KR Encoding (Post)
	//request.setCharacterEncoding("EUC-KR");
	//response.setCharacterEncoding("EUC-KR");
%>
<%@ include file="/jsp/include/include.jsp"%>
<%
	String path 			= "";
	String fileName			= CUtil.nvl(URLDecoder.decode(request.getParameter("filename"), "UTF-8"));
	String newFileName		= CUtil.nvl(URLDecoder.decode(request.getParameter("newfilename"), "UTF-8"));
	String fileDelete  		= CUtil.nvl(request.getParameter("delete"));
	String filePath			= CUtil.nvl(request.getParameter("filepath"));
	String folderName		= CUtil.nvl(request.getParameter("foldername"));
	
	

	ucare.jaf.common.ILogger.log.debug("@@@ File Download Start !!!");
	ucare.jaf.common.ILogger.log.debug("@@@ Character Encoding : " + request.getCharacterEncoding());
	ucare.jaf.common.ILogger.log.debug("@@@ New FileName : "  + newFileName );
	
	//File Path
	if ("".equals(filePath))
	{
		filePath = "UPLOAD_PATH";
	}

	if ("mypath".equals(CUtil.nvl(request.getParameter("flag"))))
	{
		path = filePath;
	}
	else {
		path = CIni.getParam(filePath).asString();
	}

	//�������� ���� ��� ��ο� ������ �߰�
	if(!folderName.equals(""))
	{
		path += "/" + folderName;
	}

	//String fileFullPath = path + "/" + CUtil.KscToUni(newFileName);
	String fileFullPath = path + "/" + newFileName;
	ucare.jaf.common.ILogger.log.debug("@@@ File Path : "  + fileFullPath );

	//���ϸ� "/"�� ���� ��� ������ �����ϰ� ���ϸ� �̾Ƽ� �ٿ���� �� �ֵ��� �Ѵ�.(LIG ��)
	String[] arrFilePath = new String[10];  		//�����ְ� �迭 ũ�⸦ ����ش�.
	arrFilePath = fileName.split("/");				// "/"�� ¥����.

	//�迭 ũ�⸦ ���ؼ� 1���� ū ��� �� "/"�� ���� ���
	if(arrFilePath.length > 1)
	{
		//�迭�� ������ ���� ���ϸ����� �����Ѵ�.
		fileName = arrFilePath[arrFilePath.length - 1];
	}

	ucare.jaf.common.ILogger.log.debug("@@@ File Name : "  + fileName );

	//Ȯ���� ���ϱ�
	String[] arrFileName = fileName.split("\\.");
	String fileType = "";

	if(arrFileName.length > 1)
	{
		fileType = arrFileName[arrFileName.length - 1];
	}

	File file = new File(fileFullPath);

    if (file.isFile())
	{
		//����� ���ϸ��� �ѱ��� ��� ������ ���� �����ϱ� ���� ���ڵ� ��.
		String encodedFileName = java.net.URLEncoder.encode(fileName, "UTF-8");
		encodedFileName = encodedFileName.replace('+', ' ');	//'+' �� ' '���� �ٲ۴�.
		ucare.jaf.common.ILogger.log.debug("@@@ Encoded File Name : " + encodedFileName);
		
		response.reset();
		response.setContentType("application/x-msdownload;charset=EUC-KR");
		response.setHeader("Content-Disposition","attachment; filename=" + encodedFileName);

    	out.clear();
	    out = pageContext.pushBody();

		BufferedInputStream fin 	= new BufferedInputStream(new FileInputStream(file));
		BufferedOutputStream outs 	= new BufferedOutputStream(response.getOutputStream());

		int read = 0;
		byte buffer[] = new byte[1024];			//1024 Byte �� ���ۿ��� �о �����Ѵ�.

		try
		{
			ucare.jaf.common.ILogger.log.debug("file size=>"+file.length());
			while ((read = fin.read(buffer)) != -1)
			{
				outs.write(buffer, 0, read);
				outs.flush();
			}

			ucare.jaf.common.ILogger.log.debug("@@@ File Downloading is Completed.");
		}
		catch(Exception e)
		{
			ucare.jaf.common.ILogger.log.debug(e.getMessage());
		}
		finally
		{
			if(outs != null)
			{
				outs.close();
			}
			if(fin != null)
			{
				fin.close();
			}
		}

		//���� ���� ���ΰ� Y �ϰ�� ������ �����Ѵ�.
		if(fileDelete.equals("Y"))
		{
			file.delete();

			ucare.jaf.common.ILogger.log.debug("@@@ File is Deleted.");
		}

	}
	else
	{
		out.println("<meta http-equiv='Content-Type' content='text/html; charset=EUC-KR'>");
		out.println("<title>���� �ٿ�ε�</title>");
		out.println("<script language=javascript>alert('������ �������� �ʽ��ϴ�.');");

		//Ȯ���ڰ� HTML, HTM�� ��� ��â�� ���� ������ ������ ������ �ݾ��ش�.
		if(fileType.toUpperCase().equals("HTML") || fileType.toUpperCase().equals("HTM"))
		{
			out.println("window.close();");
		}

		out.println("</script>");

		ucare.jaf.common.ILogger.log.debug("@@@ File Not Found.");
	}

%>