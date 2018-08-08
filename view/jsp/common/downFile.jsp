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

	//폴더명이 있을 경우 경로에 폴더명 추가
	if(!folderName.equals(""))
	{
		path += "/" + folderName;
	}

	//String fileFullPath = path + "/" + CUtil.KscToUni(newFileName);
	String fileFullPath = path + "/" + newFileName;
	ucare.jaf.common.ILogger.log.debug("@@@ File Path : "  + fileFullPath );

	//파일명에 "/"가 있을 경우 폴더로 간주하고 파일명만 뽑아서 다운받을 수 있도록 한다.(LIG 용)
	String[] arrFilePath = new String[10];  		//여유있게 배열 크기를 잡아준다.
	arrFilePath = fileName.split("/");				// "/"로 짜른다.

	//배열 크기를 구해서 1보다 큰 경우 즉 "/"가 있을 경우
	if(arrFilePath.length > 1)
	{
		//배열의 마지막 값을 파일명으로 저장한다.
		fileName = arrFilePath[arrFilePath.length - 1];
	}

	ucare.jaf.common.ILogger.log.debug("@@@ File Name : "  + fileName );

	//확장자 구하기
	String[] arrFileName = fileName.split("\\.");
	String fileType = "";

	if(arrFileName.length > 1)
	{
		fileType = arrFileName[arrFileName.length - 1];
	}

	File file = new File(fileFullPath);

    if (file.isFile())
	{
		//저장될 파일명이 한글인 경우 깨지는 것을 방지하기 위해 인코딩 함.
		String encodedFileName = java.net.URLEncoder.encode(fileName, "UTF-8");
		encodedFileName = encodedFileName.replace('+', ' ');	//'+' 를 ' '으로 바꾼다.
		ucare.jaf.common.ILogger.log.debug("@@@ Encoded File Name : " + encodedFileName);
		
		response.reset();
		response.setContentType("application/x-msdownload;charset=EUC-KR");
		response.setHeader("Content-Disposition","attachment; filename=" + encodedFileName);

    	out.clear();
	    out = pageContext.pushBody();

		BufferedInputStream fin 	= new BufferedInputStream(new FileInputStream(file));
		BufferedOutputStream outs 	= new BufferedOutputStream(response.getOutputStream());

		int read = 0;
		byte buffer[] = new byte[1024];			//1024 Byte 씩 버퍼에서 읽어서 전송한다.

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

		//파일 삭제 여부가 Y 일경우 파일을 삭제한다.
		if(fileDelete.equals("Y"))
		{
			file.delete();

			ucare.jaf.common.ILogger.log.debug("@@@ File is Deleted.");
		}

	}
	else
	{
		out.println("<meta http-equiv='Content-Type' content='text/html; charset=EUC-KR'>");
		out.println("<title>파일 다운로드</title>");
		out.println("<script language=javascript>alert('파일이 존재하지 않습니다.');");

		//확장자가 HTML, HTM인 경우 새창을 띄우기 때문에 파일이 없으면 닫아준다.
		if(fileType.toUpperCase().equals("HTML") || fileType.toUpperCase().equals("HTM"))
		{
			out.println("window.close();");
		}

		out.println("</script>");

		ucare.jaf.common.ILogger.log.debug("@@@ File Not Found.");
	}

%>