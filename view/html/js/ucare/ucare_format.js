/***-------------------------------------------------------------
 �Լ��� : ucareFormat.js
 ��  �� :
 ��  �� : Ŭ���̾�Ʈ validation üũ ���
 �÷ο� :

 ������ : 2007/01/ ������
 ��  �� :
 	2008.04.28		������		Float�� üũ ���� �޽��� ����
'**-------------------------------------------------------------*/
//�ش��(month)�� ������ �����Ѵ�.
var aMaxDay = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var isNumber = /^[0-9]/;
var charset = "";
function getValidation(objForm, bMsg)
{
	var f = objForm;
	for (var i=0; i< f.elements.length; i++)
	{
		var obj  = f.elements[i];
		var sVal = obj.value;
		var sName = obj.requirednm;

		if (!sName || sName == "")
		{
			sName = obj.title;
		}

		if (obj.disabled == false && obj.required == "true" && sVal == "")
		{
			if (bMsg) MessageBox("Required", "I", sName);
			setFocus(obj);
			return false;
		}
		
		//������ư üũ------------------------------------------------
		if (obj.disabled == false && obj.required == "true")
		{		
			if((obj.type == "radio" || obj.type == "checkbox"))
			{
				var chked = false;
				var objs = document.getElementsByName(obj.name);
				var len = document.getElementsByName(obj.name).length;

				if(len)
				{
					for(var k=0; k<len; k++)
					{ 
						if(objs[k].checked==true) chked=true;
					}
				}

				if(chked==false)
				{
					if (bMsg) MessageBox("Required", "I", sName);
					setFocus(obj);
					return false;
				}
			}
		} 
		//-------------------------------------------------------------
//  	if( !isNumber.test(sVal) ) { // true�� ��ȯ

		// ���� ���ٸ� ������ üũ�� �ʿ䰡 ����.
		if ((!obj.required || obj.required == "false") && sVal == "")
		{
			continue;
		}

		if (obj.format != "")
		{
			switch (obj.format)
			{
				case "MONEY"://�ݾ�����
					sVal = sVal.replace(/,/gi, "");	//�޸�����
					if (isOnlyNumberic(sVal) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "��(��) ��ȿ���� ���� �����Դϴ�.");
						setFocus(obj);
						return false;
					}
					else obj.value = moneyMask(sVal);
					break;
				case "NUMBER"://��������
					if (isOnlyNumberic(sVal) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "��(��) ��ȿ���� ���� �����Դϴ�.");
						setFocus(obj);
						return false;
					}
					else obj.value = numberMask(sVal);
					break;
				case "DATE"://��¥����
					if (checkDate(sVal, obj.pattern) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "��(��) ��ȿ���� ���� �����Դϴ�.");
						setFocus(obj);
						return false;
					}
					else obj.value = checkDate(sVal, obj.pattern);
					break;
				case "TIME"://�ð�����
					if (checkTime(sVal) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "��(��) ��ȿ���� ���� �����Դϴ�.");
						setFocus(obj);
						return false;
					}
					else obj.value = checkTime(sVal);
					break;
				case "FLOAT"://float ����  isFinite(sVal)�� ��� ����  isFinite(str)-��ġ�� ���� ��ġ�ΰ�, ��ȿ�� ��ġ�ΰ��� �Ǹ��Ѵ�. ��ȿ�� ���� ��ġ�̸� true ���� ��ȯ(return)�ϰ�, �ƴϸ� false ���� ��ȯ�Ѵ�.
					if (checkFloat(sVal) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "��(��) ��ȿ���� ���� �����Դϴ�.");	//2008.04.28 ������ ���� �޽��� ����   ����: "��(��) ������ ["+ obj.maxsize+"] �� �ʰ��Ͽ����ϴ�."
						setFocus(obj);
						return false;
					}
					break;
				case "SSN"://�ֹι�ȣ
					if (isOnlyNumberic(numberMask(sVal)) == false || numberMask(sVal).length != 13)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "��(��) ��ȿ���� ���� �����Դϴ�.");
						setFocus(obj);
						return false;
					}
					else obj.value = sidMask(sVal);
					break;
				case "TNO"://��ȭ��ȣ
					if (numberMask(sVal).length < 7 )
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "��(��) ��ȿ���� ���� �����Դϴ�.");
						setFocus(obj);
						return false;
					}
					else obj.value = telMask(sVal);
					break;
				case "EMAIL"://EMAIL 
					if (sVal.indexOf("@") == -1)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "��(��) ��ȿ���� ���� �����Դϴ�.");
						setFocus(obj);
						return false;
					}

					break;
				default:
			}
		}

		// �ִ밪 ����
		if (obj.maxsize && obj.maxsize != "")
		{
			if (getByte(obj.value) > obj.maxsize)
			{
				//if (bMsg) MessageBox("Format", "I", sName);
				if (bMsg) alert(sName + "��(��) ������ ["+ obj.maxsize+"] �� �ʰ��Ͽ����ϴ�.");
				setFocus(obj);
				return false;
			}
		}
	}
	return true;
}

/**
 * ��ü�� ��ȿ���� �˻��Ѵ�.
 * obj : ��ü
 * bMsg : ��ȿ���� �ɷ��� ��� �޼��� ��¿��� (true/false)
 * bFocus : ��ȿ���� �ɷ��� ��� focus �������� (true/false)
 */
function checkValidation(obj, bMsg, bFocus)
{
	var sVal = obj.value;
	var sName = obj.requirednm;

	if (!sName || sName == "")
	{
		sName = obj.title;
	}

	// ���� ���ٸ� ������ üũ�� �ʿ䰡 ����.
	if (sVal == "")
	{
		return;
	}

	if (bFocus == "")	bFocus = false;

	if (obj.format != "")
	{
		switch (obj.format)
		{
			case "MONEY"://�ݾ�����
				sVal = sVal.replace(/,/gi, "");	//�޸�����
				if (isOnlyNumberic(sVal) == false)
				{
					if (bMsg) MessageBox("Format", "I", sName);
					if (bFocus) setFocus(obj);
					return false;
				}
				else obj.value = moneyMask(sVal);
				break;
			case "NUMBER"://��������
				if (isOnlyNumberic(sVal) == false)
				{
					if (bMsg) MessageBox("Format", "I", sName);
					if (bFocus) setFocus(obj);
					return false;
				}
				else obj.value = numberMask(sVal);
				break;
			case "DATE"://��¥����
				if (checkDate(sVal, obj.pattern) == false)
				{
					if (bMsg) MessageBox("Format", "I", sName);
					if (bFocus) setFocus(obj);
					return false;
				}
				else
				{
					if(obj.pattern)
					{
						if(obj.pattern=="M")	 {obj.value = checkDate(sVal, obj.pattern).substr(0,7);}
						else if(obj.pattern=="Y"){obj.value = checkDate(sVal, obj.pattern).substr(0,4);}
						else if(obj.pattern=="D"){obj.value = checkDate(sVal, obj.pattern);}
					}
					else{obj.value = checkDate(sVal, obj.pattern);}
				}
				break;
			case "TIME"://�ð�����
				if (checkTime(sVal) == false)
				{
					if (bMsg) MessageBox("Format", "I", sName);
					if (bFocus) setFocus(obj);
					return false;
				}
				else obj.value = checkTime(sVal);
				break;
			case "FLOAT"://float ����  isFinite(sVal)�� ��� ����  isFinite(str)-��ġ�� ���� ��ġ�ΰ�, ��ȿ�� ��ġ�ΰ��� �Ǹ��Ѵ�. ��ȿ�� ���� ��ġ�̸� true ���� ��ȯ(return)�ϰ�, �ƴϸ� false ���� ��ȯ�Ѵ�.
				if (checkFloat(sVal) == false)
				{
					if (bMsg) MessageBox("Format", "I", sName);
					//if (bMsg) alert(sName + "��(��) ��ȿ���� ���� �����Դϴ�.");	//2008.04.28 ������ ���� �޽��� ����   ����: "��(��) ������ ["+ obj.maxsize+"] �� �ʰ��Ͽ����ϴ�."
					if (bFocus) setFocus(obj);
					return false;
				}
				break;
			default:
		}
	}

	// �ִ밪 ����
	if (obj.maxsize && obj.maxsize != "")
	{
		if (getByte(obj.value) > obj.maxsize)
		{
			//if (bMsg) MessageBox("Format", "I", sName);
			if (bMsg) alert(sName + "��(��) ������ ["+ obj.maxsize+"] �� �ʰ��Ͽ����ϴ�.");
			if (bFocus) setFocus(obj);
			return false;
		}
	}

	return true;
}

/**
 * ��ü�� fucus�� �� �� readonly, disabled�� �˻��� �� �ش�.
 * obj : ��ü
 */
function setFocus(obj)
{
	if (obj.readOnly || obj.disabed)
	{
		return;
	}
	else
	{
		obj.focus();
	}
}

//�����ֱ�
function getFormatData(sVal, sPattern, iSize)
{
	var sRet = "";
	if (sVal.length ==0 ) return sVal;
	switch (sPattern)
	{
		case "MONEY":	//�ݾ�ǥ��
		case "MONEY2":
			sRet = moneyMask(sVal);
			break;
		case "POST":  //�����ȣ
		case "ZIP":  //�����ȣ
			sRet = zipMask(sVal);
			break;
		case "SID":		//�ֹι�ȣ
		case "SSN":		//�ֹι�ȣ
			sRet = sidMask(sVal);
			break;
		case "DATE":	//��¥ - LIG��
			//sRet = dateMaskLogic(sVal,"/");
			sRet = dateMaskLogic(sVal,"-");
			break;
		case "DATE2":
			sRet = dateMaskLogic(sVal,"-");
			break;
		case "TIME":	//�ð�
			sRet = timeMask(sVal, ":");
			break;
		case "DATET":	//��¥�ð�
			sRet = dateMaskLogic(sVal.substring(0,8),"-");
			if (sVal.substring(8).length > 7)
			{
				sRet += "~" + dateMaskLogic(sVal.substring(8),"-");
			}
			else
			{
				sRet += " "+ timeMask(sVal.substring(8), ":");
			}
			break;
		case "TEL":		//��ȭ��ȣ
		case "TNO":		//��ȭ��ȣ
			sRet = telMask(sVal);
			break;
		case "WISEGRID":
			sRet = sVal;
			break;
		case "USER":
		case "CUST":
			break	;
		case "ENTER":	//enter key ->''
			sRet = makeEnterStr(sVal,'');
			break;
		default:			//enter key ->'<br>'
			sRet = makeEnterStr(sVal,'<br>');
			break;
	}

	if (sPattern != "WISEGRID" && sPattern != "HTML" && isNaN(sRet)) sRet = replaceStr(sRet, "<br>", "\n");
	if ((iSize >0) && (iSize < sRet.length) )
	{
		sRet = sRet.substring(0, iSize) + (sRet.length>iSize?"...":"");
	}

	return sRet;
}

// float ������ üũ
function checkFloat(sValue)
{
	if (sValue.substring(0,1) == "-")
	{
		sValue = sValue.substring(1);
	}

	len = sValue.length;
	stat = true;
	var i, chr, point=0;
	for (i=0; i<len; i++)
	{
		chr = sValue.substring(i,i+1);
		if (chr == '.')
		{
		  point+=1;
		  continue;
		}
		if (chr < '0' || chr > '9')
		{
		  stat='x';
		  break;
		}
	}
	if ((stat==true) && (point<=1)) return true;
	else
		return false;
}

//��¥�� üũ
function checkDate(sValue, sPattern)
{
	if(!sPattern) sPattern = "D";

	sValue = numberMask(sValue);
	if ((sValue.length != 8 && sValue.length != 6 && sValue.length != 4 )|| sValue=="")  return "";

	var sYear;
	var sMonth;
	var sDay;
	var sMax;

	if( (sPattern == "D" && sValue.length != 8) || (sPattern == "M" && sValue.length != 6) 
		||(sPattern == "Y" && sValue.length != 4) )
	{
		return "";
	}
	
	switch  (sValue.length)
	{
		case 8: //YYYY/MM/DD
			sYear = sValue.substring(0,4);
			sMonth = sValue.substring(4,6);
			sDay = sValue.substring(6,8);
			break;
		case 6: //YYYY/MM
			sYear = sValue.substring(0,4);
			sMonth = sValue.substring(4,6);
			break;
		case 4: //YYYY
			sYear = sValue.substring(0,4);
			break;			
		/*case 4: //MM/DD--old version
			sMonth = sValue.substring(0,2);
			sDay = sValue.substring(2,4);
			break;*/
		default:
			break;
	}
	
	if(sPattern!="Y")
	{
		if (parseNumeric(sMonth) <= 0 || parseNumeric(sMonth) > 12)  return false;
	
		if (sMonth == "02")
		{
			var iCheckYear = parseNumeric(sYear);
			if ((iCheckYear % 4 == 0) && (iCheckYear % 100 != 0) || (iCheckYear % 400 == 0))
			{
				sMax = "29";
			}
			else
			{
				sMax = "28";
			}
		}
		else
		{
			sMax = aMaxDay[parseNumeric(sMonth)-1];
		}
	
		if (sDay && parseNumeric(sDay) > sMax)  return false;
	}
	
	var ret="";
	
	//if (sYear) ret += sYear + "-" ;
	//ret += sMonth;
	
	if (sYear)  ret += sYear;
	if (sMonth) ret +=  "-" + sMonth;
	if (sDay)   ret +=  "-" + sDay;

//(sYear + "/" + sMonth + "/" + sDay)
	return ret;
}

/**
 * �ð� ��ȿ���� üũ�Ѵ�.
 * sValue : �ð�
 */
function checkTime(sValue)
{
	sValue = numberMask(sValue);

	if ((sValue.length != 4 && sValue.length != 6)) return "";

	var sHour = "";
	var sMinute = "";
	var sSecond = "";

	var nHour = 0;
	var nMinute = 0;
	var nSecond = 0;

	switch  (sValue.length)
	{
		case 6: // hhmmss
			sHour = sValue.substring(0, 2);
			sMinute = sValue.substring(2, 4);
			sSecond = sValue.substring(4, 6);
			break;
		case 4: // hhmm
			sHour = sValue.substring(0, 2);
			sMinute = sValue.substring(2, 4);
			break;
		default:
			break;
	}

	nHour = parseInt(sHour, 10);
	nMinute = parseInt(sMinute, 10);
	nSecond = parseInt(nvl(sSecond, "0"), 10);

	if (nHour >= 24)  	return false;
	if (nMinute >= 60) 	return false;
	if (nSecond >= 60) 	return false;

	var ret = "";
	if (sSecond == "")	ret = sHour + ":" + sMinute;
	else 				ret = sHour + ":" + sMinute + ":" + sSecond;

	return ret;
}

// ���ڿ����� &nbsp;�� �����Ѵ�.
function removeHTMLSPACE(str)
{
	var val	= "";
	var len = str.length;

	for (var i = 0; i < len; i++)
	{
		if (str.substr(i, 6) == "&nbsp;")
			i += 5;
		else
			val += str.charAt(i);
	}

	return val;
}

// ������ &nbsp�� ��ȯ
function makeSPACEHTML(str)
{
	var val	= "";

	if (str == "") return "&nbsp;";

	for (var i = 0; i < str.length; i++)
	{
		if (str.charAt(i) == " ")
			val += "&nbsp;";
		else
			val += str.charAt(i);
	}

	return val;
}
// ������ &nbsp�� ��ȯ
function makeSPACEHTML(str)
{
	var val	= "";

	if (str == "") return "&nbsp;";

	for (var i = 0; i < str.length; i++)
	{
		if (str.charAt(i) == " ")
			val += "&nbsp;";
		else
			val += str.charAt(i);
	}

	return val;
}


// enter��
function makeEnterStr(str, sReplace)
{
	var val	= "";

	if (str == "") return "";

	for (var i = 0; i < str.length; i++)
	{
		if (str.charCodeAt(i) == 13 || str.charCodeAt(i) == 10)
			val += sReplace==undefined?"&nbsp;":sReplace;
		else
			val += str.charAt(i);
	}

	return val;
}
// LEFT TRIM
function lTrim(str)
{
	var val = "";

	if (typeof(str) == "undefined" || str == "") return "";

	for (var i = 0; i < str.length; i++)
	{
		if (str.charAt(i) != " ")
		{
			val = str.substr(i, str.length);
			break;
		}
	}

	return val;
}
// RIGHT TRIM
function rTrim(str)
{
	var val = "";

	if (typeof(str) == "undefined" || str == "") return "";

	for (var i = str.length; i > 0; i--)
	{
		if (str.charAt(i - 1) != " ")
		{
			val = str.substr(0, i);
			break;
		}
	}

	return val;
}

function trim(str) {
	return lTrim(rTrim(str));
}


//���ڿ� �޸����
function enterComma(obj)
{
	var keyCode = window.event.keyCode;

	if(keyCode < 37 || keyCode > 40)
	{
		obj.value = insertComma(obj);
	}
}

//�޸��־��ֱ�
function insertComma(obj)
{
	var arr_val = obj.value.split(',');
	var str 	= arr_val[0].replace(/[^0123456789]/g, '');
	var i,result = '',cnt = 0;

	for(i=str.length -1;i>=0;i--,cnt++)
	{
		if(cnt > 0 && (cnt % 3) == 0)
			result = ',' +result;
		result = str.substring(i,i+1) + result;
	}

	if(arr_val.length > 1)
	{
		for(i=1;i<arr_val.length;i++)
		{
			result += '.' +arr_val[i].replace(/[^0123456789]/g,'');
		}
	}

	return result;
}

//��¥�� ����ũ�ɱ� "-"
function dateMask(date)
{
	return dateMaskLogic(date,"-");
}
//��¥�� ����ũ�ɱ� "/"
function dateMask2(date)
{
	return dateMaskLogic(date,"/");
}

//��¥�� ����ũ�ɱ�
function dateMaskLogic(date,format)
{
	date = numberMask(date);

	if (date.length == 4)
		return date.substring(0,2)+format+date.substring(2,4);
	else if (date.length == 6)
		return date.substring(0,4)+format+date.substring(4,6);
	else (date.length > 7)
		return date.substring(0,4)+format+date.substring(4,6)+format+date.substring(6,8);
	return false;
}

// �ð� ����ũ
function timeMask(time)
{
	var str = numberMask(time);

	if (str.length < 4) return str;

	if (str.length == 4)
	{
		return str.substring(0, 2) + ":" + str.substring(2, 4);
	}
	else
	{
		if (str.length < 6) time = paddingStr(str, "R", "0", 6);

		return str.substring(0, 2) + ":" + str.substring(2, 4) + ":" + str.substring(4, 6);
	}
}

//�����ȣ����ũ
function zipMask(zipData)
{
	if(zipData.length < 6) return zipData;

	return zipData.substring(0,3)+"-"+zipData.substring(3,6);
}

//�ֹι�ȣ����ũ
function sidMask(sidData)
{
	var strSid	= numberMask(sidData);

	if(strSid.length < 13) return sidData;

	return strSid.substring(0,6)+"-"+strSid.substring(6,13);
}

//�ֹι�ȣ ��ȿ��üũ
function sidValidation(sid)
{
	if(sid.length < 13) return false;

	var DATA = new Array();

	for(var i=0;i<sid.length;i++)
		DATA[i] = sid.charAt(i);

	sum = DATA[0]*2 + DATA[1]*3 + DATA[2]*4 + DATA[3]*5 + DATA[4]*6 + DATA[5]*7 + DATA[6]*8 + DATA[7]*9 + DATA[8]*2 + DATA[9]*3 + DATA[10]*4 + DATA[11]*5;
	N 	= sum % 11;
	ModValue = 11 - N;
	LastVal = ModValue % 10;

	if(DATA[12] == LastVal) return true;
	else return false;
}

//��ȭ��ȣ ����ũ
function telMask(oldtel)
{
	var tel = oldtel;
	if(tel == "") return tel;

	tel = numberMask(tel);

	var DDD1 		= new Array("02");
	var DDD2 		= new Array("010","011","017","016","018","019"
													,"031","032","033"
													,"041","042","043"
													,"061","062","063","064"
													,"051","052","053","054","055"
													,"060","070","080"
													);
	var DDD3 		= new Array("0505","0130");												
	var DDD4 		= new Array("1588","1577","1544","1566","1644","1688","1599","1666"
													);
	
	var lstrThrNo 	= "";
	var lstrSecNo 	= "";

	if(tel.length < 7) return oldtel;

	lstrThrNo = tel.substring(tel.length -4);
	lstrSecNo = tel.substring(0,tel.length -4);

	//���ڸ� ������ȣ
	for(var i=0;i<DDD1.length;i++)
	{
		if(lstrSecNo.substring(0,2) == DDD1[i])
		{
			if(lstrSecNo.substring(2,lstrSecNo.length).length < 3 || lstrSecNo.substring(2,lstrSecNo.length).length > 4)
				return oldtel;
			else
				return DDD1[i] + "-" + lstrSecNo.substring(2,lstrSecNo.length) + "-" + lstrThrNo;
			break;
		}
	}
	
	//���ڸ� ������ȣ, �ڵ���
	for(var i=0;i<DDD2.length;i++)
	{
		if(lstrSecNo.substring(0,3) == DDD2[i])
		{
			if(lstrSecNo.substring(3,lstrSecNo.length).length < 3 || lstrSecNo.substring(3,lstrSecNo.length).length > 4)
				return oldtel;
			else			
				return DDD2[i] + "-" + lstrSecNo.substring(3,lstrSecNo.length) + "-" + lstrThrNo;
			break;
		}
	}
	
	//���ڸ� ������ȣ, �Ŀ���
	for(var i=0;i<DDD3.length;i++)
	{
		if(lstrSecNo.substring(0,4) == DDD3[i])
		{
			if(lstrSecNo.substring(4,lstrSecNo.length).length < 3 || lstrSecNo.substring(4,lstrSecNo.length).length > 4)
				return oldtel;
			else					
				return DDD3[i] + "-" + lstrSecNo.substring(4,lstrSecNo.length) + "-" + lstrThrNo;
			break;
		}
	}
	
	//��ǥ��ȣ
	if(lstrSecNo.length == 4)
	{
		for(var i=0;i<DDD4.length;i++)
		{
			if(lstrSecNo == DDD4[i])
			{				
				return DDD4[i] + "-" + lstrThrNo;
				break;
			}
		}
	}
	
	//������ȣ ���� ��ȭ��ȣ �ڵ� ������ȣ �ο�
	if(lstrSecNo.length == 3 || lstrSecNo.length == 4)
	{
		return "02" + "-" + lstrSecNo + "-" + lstrThrNo;
	}
	
	return oldtel;
}

//�ݾ�ǥ�� ����ũ ","
function moneyMask(money)
{
	return moneyImpl(money,",");
}
//�ݾ�ǥ�� ����ũ
function moneyImpl(moneyval,delimeter)
{
	if(moneyval.length == 0) return moneyval;

	if(parseInt(moneyval, 10) == 0) return 0;

	moneyval = ""+(moneyval);
	var decimal = moneyval.split(".");
	moneyval	= "" + numberMask(""+parseInt(decimal[0],10));


	var temp 	= "";
	var money 	= "";
	var ret		= "";

	for(var i = moneyval.length; i > 0; i -= 3)
	{
		if((i-3) <= 0)
		{
			temp 	= moneyval.substring(0,i);
			money 	= temp;
			ret		= money + ret;
		}
		else
		{
			temp 	= moneyval.substring(i-3,i);
			money	= delimeter + temp;
			ret		= money + ret;
		}
	}

	if((ret.charAt(0) == "+") || (ret.charAt(0) == "-"))
	{
		if(ret.charAt(1) == delimeter.charAt(0))
		{
			tempMoneyStr = ret.substring(0,1) + ret.substring(2,ret.length);
			ret = "";
			ret = tempMoneyStr;
		}
	}
	if (decimal.length >1) ret = ret+"."+decimal[1];
	return ret;
}

//��ȭ��ȣ ������
function telDelimeter(tel,pos)
{
	if(tel == "" || pos > 3) return tel;

	var tel 	= tel+"-";
	var RTN 	= new Array();
	var rtnVal 	= "";
	var index	= 0;

	for(var i=0;i<tel.length;i++)
	{
		if(index == pos) break;

		rtnVal += tel.charAt(i);

		if(tel.charAt(i+1) == "-")
		{
			RTN[index] = rtnVal;
			rtnVal = "";
			index++;
			i++;
		}
	}

	return RTN[index-1];
}

// ���峻���� "," Comma�� �����Ѵ�.
function removeComma(str)
{
	var rtnstr	= "";

	for (var i = 0; i < str.length; i++)
	{
		if (str.charAt(i) != ',')
			rtnstr += str.charAt(i);
	}

	return rtnstr;
}

// ���峻���� """, "'"�� �����Ѵ�.
function removeSpecialChar(str)
{
	var rtnstr	= "";

	for (var i = 0; i < str.length; i++)
	{
		if (str.charAt(i) != '\"' && str.charAt(i) != '\'')
			rtnstr += str.charAt(i);
	}

	return rtnstr;
}

// ���峻���� ":", "-" ����ũ ����
function removeMask(str)
{
	var sPattern 	= /[:/-]/g;
	sRet = str.replace(sPattern,'');
	return sRet;
}

//�����߿� 0�� �����Ѵ�.
function zeroDefect(str)
{
	var notZero = "";

	if(isOnlyNumberic(str))
	{
		for(var i=0;i<str.length;i++)
		{
			if(str.charAt(i) == "0") continue;
			else notZero += str.charAt(i);
		}
	}

	return notZero;
}

//byte �� ���
function getByte(str)
{
    var t;
    var msglen;
    msglen = 0;
    var l = str.length;

    for( k = 0; k < l; k++ )
    {
        t = str.charAt( k );
        if ( escape( t ).length > 4 )
        {
        	msglen += getCharsetByte();
        }
        else
        {
        	msglen++;
        }
    }
    return msglen;
}

/**
  * charset�� ���� �ѱ� byte����� �� return
  */
function getCharsetByte()
{
	if (charset == "utf-8")
	{
		return 3;
	}
	else
	{
		return 2;
	}
}

/**
  * �Ǽ����� ����ũ�� �������ش�.
  * targetNumber    : ����ũ Ÿ�� ����
  * count           : �Ҽ��� ���� ǥ���� �ڸ���
  * moneyMaskFlagYN : �Ӵϸ���ũ��������
  * ex              : maskFloat('-123456.4',3,'Y') -> "-123,456.400"
  */
function maskFloat( targetNumber, count, moneyMaskFlagYN)
{
	var strNum = ""+targetNumber;
	var arrNum = strNum.split(".",2);
	var sign   = "";
	var retVal = "";

	arrNum[0] = numberMask(arrNum[0]);
	arrNum[1] = numberMask(arrNum[1]);

	if( (arrNum[0]=="") || (arrNum[0]=="-") || (arrNum[0]=="-0") )
	{
		arrNum[0]="0";
	}

	if( (typeof(arrNum[1])=="undefined") ||(arrNum[1] == "") )
	{
		arrNum[1]="0";
	}

	if( moneyMaskFlagYN=="Y" )
	{
		arrNum[0] = moneyMask(arrNum[0]);
	}
	retVal = sign + arrNum[0] + "." + rpad(arrNum[1],'0',count);
	return retVal;
}

/**
  * �Ǽ����� ����ũ����
  * targetNumber    : ����ũ Ÿ�� ����
  */
function unMaskFloat(targetNumber)
{
	var strNum = ""+targetNumber;
	var arrNum = strNum.split(".",2);
	var retVal = "";

	arrNum[0] = numberMask(arrNum[0]);
	arrNum[1] = numberMask(arrNum[1]);

	if( isNaN(arrNum[0]) || arrNum[0]=="" ){ arrNum[0]=0; }
	if( isNaN(arrNum[1]) || arrNum[0]=="" ){ arrNum[1]=0; }

	retVal = Number(arrNum[0] + "." + arrNum[1]);
	return retVal;
}

/**
 * ������ ���� ��������
 * yyyymm : ���
 */
function lastDay(yyyymm)
{
	yyyymm	   = numberMask(yyyymm);
	var sYear  = yyyymm.substring(0,4);
	var sMonth = yyyymm.substring(4,6);
	var sMax = "";
	  
	if (sMonth == "02")
	{
		var iCheckYear = parseNumeric(sYear);
		if ((iCheckYear % 4 == 0) && (iCheckYear % 100 != 0) || (iCheckYear % 400 == 0))
		{
			sMax = "29";
		}
		else
		{
			sMax = "28";
		}
	}
	else
	{
		sMax = aMaxDay[parseNumeric(sMonth)-1];
	}
	
	return sMax;
}


function convertStrToSec(sSec)
{
	var iSec =0;
	var sTmp = removeMask(sSec);

	iSec = parseInt(sTmp.substring(0,2),10)*3600+parseInt(sTmp.substring(2,4),10)*60+parseInt(sTmp.substring(4,6),10);
	return iSec;
}

function convertSecToStr(iVal)
{
	if (isNaN(iVal)  ||iVal == 0) return "00:00:00";

	var sRet;
	var iHour	 = Math.floor(iVal / 3600); 
	var iMinute  = Math.floor((iVal- 3600*iHour)/60); 
	var iSec     = iVal - (3600*iHour) - (60*iMinute);
    
	sRet =  (iHour<10?"0":"")  +   iHour + ":";
	sRet += (iMinute<10?"0":"") +  iMinute + ":";
	sRet += (iSec<10?"0":"")    +  iSec;

	return sRet;
}

function setObjFormat(obj, val)
{
	 var sRet = getFormatData(val,obj.format, obj.length);
	 if (sRet == "") return;

	 obj.value = sRet;
}