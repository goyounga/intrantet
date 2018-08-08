<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%!
/**
 * cleanXSS : ��Ʈ�� ������ ũ�ν� ����Ʈ ��ũ����(XSS) ���� ���ڿ� ����
 * ���뿡�� �ణ ������ : "("
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
	int total_page = total_cnt / page_row;    //��ü ������
	int page_num;

	//��ü ������ ��
	if(total_cnt > page_row) 
	{
		if((total_cnt % page_row) != 0) total_page++; 
	} 
	else 
	{
		total_page = 1;
	}
	
	//���� ������ ��ȣ
	start_link = cur_page / block_limit;
	if(start_link == 0) {
		start_link = 1;
	} else if(cur_page % 10 ==0) {
		start_link = (start_link-1) * block_limit + 1;
    } else {
		start_link = (start_link * block_limit) + 1;
	}
	
	//�� ������ ��ȣ	
	int end_link = start_link-1 + block_limit < total_page ?  start_link-1 + block_limit : total_page;
	
	sb.append("<div class='paginate_q'>  \r\n");
	//��ó�� �������� �̵�
	/*if(cur_page != 1) {
		sb.append("<a href='javascript:goPage(" + 1 + ");'><img src=images/btn_calendar01.gif align=absmiddle border=0 alt='��ó�� ������'></a>&nbsp;");
	} else {
		sb.append("<a href='javascript:'><img src=images/btn_calendar01.gif align=absmiddle border=0 alt='��ó�� ������'></a>&nbsp;");	
	}	
	*/
	
	//���� 10 ������
	page_num = start_link - 10;	
	if (cur_page > 10) {
		sb.append("<a href='javascript:goPage(" + page_num + ");' class='pre'>����</a>\r\n");
	} else {
		sb.append("<a href='javascript:' class='pre'>����</a>\r\n");
	}

	//����Ʈ	
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

	//���� 10 ������
	page_num = start_link + 10;
	if(total_page > page_num) {
		sb.append("<a href='javascript:goPage(" + page_num + ");' class='next'>����</a>\r\n");
	} else {
		sb.append("<a href='javascript:' class='next' >����</a>\r\n");
	}
	
	//�Ǹ����� �������� �̵�	
/*	if(cur_page != total_page) {
		sb.append("<a href='javascript:goPage(" + total_page + ");'><img src=images/btn_calendar04.gif align=absmiddle border=0 alt='�Ǹ����� ������'></a>&nbsp;");
	} else {
		sb.append("<a href='javascript:'><img src=images/btn_calendar04.gif align=absmiddle border=0 alt='�Ǹ����� ������'></a>&nbsp;");	
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
String _PAGE_ROW = "10";	//���������� ����
String _SELECT_ID_LIST	= "UCHPG001S";	//���
String _SELECT_ID_PW 	= "UCHPG005S";	//��й�ȣ
String _SELECT_ID_VIEW	= "UCHPG002S";	//��
String _UPDATE_ID_VIEW	= "UCHPG003U";	//��ȸ�Ǽ�
%>