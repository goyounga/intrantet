package ucare.biz.common.util;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class EncodingFilter implements Filter {
	//instance field
	private FilterConfig config = null;
	private String encoding = null;

	public void init(FilterConfig filterConfig) throws ServletException {
		this.config=filterConfig;
		this.encoding=filterConfig.getInitParameter("encoding");
	}
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException{
		String temp = request.getCharacterEncoding();
		if(temp==null){
			if(this.encoding!=null){
				request.setCharacterEncoding(encoding);
			}
		}
		chain.doFilter(request,response);
	}

	public void destroy(){
		this.config=null;
		this.encoding=null;
	}
}
