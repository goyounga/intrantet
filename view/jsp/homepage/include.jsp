<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%!
/**
 * cleanXSS : 스트링 내용중 크로스 사이트 스크립팅(XSS) 관련 문자열 변경
 * 공통에서 약간 수정됨 : "("
 */
public String cleanXSS(String s)
{
    s = s.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    s = s.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
    s = s.replaceAll("eval\\((.*)\\)", "");
    s = s.replaceAll("[\\\"\\'][\\s]*javascript:(.*)[\\\"\\']", "\"\"");
    s = s.replaceAll("script", "_script_");
    return s;
}

public String getPageListEX(int page_row, int block_limit, int total_cnt, int cur_page)
{
	StringBuffer sb = new StringBuffer();
	int start_link;
	int total_page = total_cnt / page_row;    //전체 페이지
	int page_num;

	//전체 페이지 수
	if(total_cnt > page_row) 
	{
		if((total_cnt % page_row) != 0) total_page++; 
	} 
	else 
	{
		total_page = 1;
	}
	
	//시작 페이지 번호
	start_link = cur_page / block_limit;
	if(start_link == 0) {
		start_link = 1;
	} else if(cur_page % 10 ==0) {
		start_link = (start_link-1) * block_limit + 1;
    } else {
		start_link = (start_link * block_limit) + 1;
	}
	
	//끝 페이지 번호	
	int end_link = start_link-1 + block_limit < total_page ?  start_link-1 + block_limit : total_page;
	
	sb.append("<div class='paginate_q'>  \r\n");
	//맨처음 페이지로 이동
	/*if(cur_page != 1) {
		sb.append("<a href='javascript:goPage(" + 1 + ");'><img src=images/btn_calendar01.gif align=absmiddle border=0 alt='맨처음 페이지'></a>&nbsp;");
	} else {
		sb.append("<a href='javascript:'><img src=images/btn_calendar01.gif align=absmiddle border=0 alt='맨처음 페이지'></a>&nbsp;");	
	}	
	*/
	
	//이전 10 페이지
	page_num = start_link - 10;	
	if (cur_page > 10) {
		sb.append("<a href='javascript:goPage(" + page_num + ");' class='pre'>이전</a>\r\n");
	} else {
		sb.append("<a href='javascript:' class='pre'>이전</a>\r\n");
	}

	//리스트	
	for ( int i = start_link; i <= end_link; i++)
	{
		if(cur_page == i){
			sb.append("<strong>" + i +"</strong>\r\n");
		}else{
			sb.append("<a href='javascript:goPage(" + i + ");'>");
			sb.append("" + i +"");
			sb.append("</a>\r\n");
		}
	}

	//다음 10 페이지
	page_num = start_link + 10;
	if(total_page > page_num) {
		sb.append("<a href='javascript:goPage(" + page_num + ");' class='next'>다음</a>\r\n");
	} else {
		sb.append("<a href='javascript:' class='next' >다음</a>\r\n");
	}
	
	//맨마지막 페이지로 이동	
/*	if(cur_page != total_page) {
		sb.append("<a href='javascript:goPage(" + total_page + ");'><img src=images/btn_calendar04.gif align=absmiddle border=0 alt='맨마지막 페이지'></a>&nbsp;");
	} else {
		sb.append("<a href='javascript:'><img src=images/btn_calendar04.gif align=absmiddle border=0 alt='맨마지막 페이지'></a>&nbsp;");	
	}
*/
	sb.append("</div>  ");
	return sb.toString();	
}

public String convertBR(String s, int i)
{
    StringBuffer stringbuffer = new StringBuffer();
    int j = 0;
    int k = 0;
    if(s == null)
        return "";
    if(i > 0)
    {
        for(; j < s.length(); j++)
        {
            if(s.charAt(j) == '\r')
            {
                stringbuffer.append("<BR>");
                continue;
            }
            if(s.charAt(j) != '\n')
                stringbuffer.append(s.charAt(j));
        }

        return stringbuffer.toString();
    }
    for(j = s.indexOf("<BR>"); j != -1 && j < s.length(); j = s.indexOf("<BR>", k))
    {
        stringbuffer.append(s.substring(k, j));
        stringbuffer.append("\\r\\n");
        k = j += 4;
    }

    if(j < s.length())
        stringbuffer.append(s.substring(k, s.length()));
    return stringbuffer.toString();
}

String strList = "hpgClientBoardList.jsp";
String strView = "hpgClientBoardView.jsp";
String _PAGE_ROW = "10";	//한페이지당 개수
String _SELECT_ID_LIST	= "UCHPG001S";	//목록
String _SELECT_ID_PW 	= "UCHPG005S";	//비밀번호
String _SELECT_ID_VIEW	= "UCHPG002S";	//상세
String _UPDATE_ID_VIEW	= "UCHPG003U";	//조회건수
%>