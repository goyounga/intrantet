/***-------------------------------------------------------------
 함수명 : ucareFormat.js
 인  자 :
 목  적 : 클라이언트 validation 체크 모듈
 플로우 :

 생성일 : 2007/01/ 김혜영
 수  정 :
 	2008.04.28		조익현		Float형 체크 오류 메시지 변경
'**-------------------------------------------------------------*/
//해당달(month)의 말일을 정의한다.
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
		
		//라디오버튼 체크------------------------------------------------
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
//  	if( !isNumber.test(sVal) ) { // true를 반환

		// 값이 없다면 형식을 체크할 필요가 없다.
		if ((!obj.required || obj.required == "false") && sVal == "")
		{
			continue;
		}

		if (obj.format != "")
		{
			switch (obj.format)
			{
				case "MONEY"://금액형태
					sVal = sVal.replace(/,/gi, "");	//콤마제거
					if (isOnlyNumberic(sVal) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "는(은) 유효하지 않은 형식입니다.");
						setFocus(obj);
						return false;
					}
					else obj.value = moneyMask(sVal);
					break;
				case "NUMBER"://숫자형태
					if (isOnlyNumberic(sVal) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "는(은) 유효하지 않은 형식입니다.");
						setFocus(obj);
						return false;
					}
					else obj.value = numberMask(sVal);
					break;
				case "DATE"://날짜형태
					if (checkDate(sVal, obj.pattern) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "는(은) 유효하지 않은 형식입니다.");
						setFocus(obj);
						return false;
					}
					else obj.value = checkDate(sVal, obj.pattern);
					break;
				case "TIME"://시간형태
					if (checkTime(sVal) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "는(은) 유효하지 않은 형식입니다.");
						setFocus(obj);
						return false;
					}
					else obj.value = checkTime(sVal);
					break;
				case "FLOAT"://float 형태  isFinite(sVal)로 사용 가능  isFinite(str)-수치가 무한 수치인가, 유효한 수치인가를 판명한다. 유효한 유한 수치이면 true 값을 반환(return)하고, 아니면 false 값을 반환한다.
					if (checkFloat(sVal) == false)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "는(은) 유효하지 않은 형식입니다.");	//2008.04.28 조익현 오류 메시지 변경   기존: "는(은) 사이즈 ["+ obj.maxsize+"] 를 초과하였습니다."
						setFocus(obj);
						return false;
					}
					break;
				case "SSN"://주민번호
					if (isOnlyNumberic(numberMask(sVal)) == false || numberMask(sVal).length != 13)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "는(은) 유효하지 않은 형식입니다.");
						setFocus(obj);
						return false;
					}
					else obj.value = sidMask(sVal);
					break;
				case "TNO"://전화번호
					if (numberMask(sVal).length < 7 )
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "는(은) 유효하지 않은 형식입니다.");
						setFocus(obj);
						return false;
					}
					else obj.value = telMask(sVal);
					break;
				case "EMAIL"://EMAIL 
					if (sVal.indexOf("@") == -1)
					{
						if (bMsg) MessageBox("Format", "I", sName);
						//if (bMsg) alert(sName + "는(은) 유효하지 않은 형식입니다.");
						setFocus(obj);
						return false;
					}

					break;
				default:
			}
		}

		// 최대값 설정
		if (obj.maxsize && obj.maxsize != "")
		{
			if (getByte(obj.value) > obj.maxsize)
			{
				//if (bMsg) MessageBox("Format", "I", sName);
				if (bMsg) alert(sName + "는(은) 사이즈 ["+ obj.maxsize+"] 를 초과하였습니다.");
				setFocus(obj);
				return false;
			}
		}
	}
	return true;
}

/**
 * 객체의 유효성을 검사한다.
 * obj : 객체
 * bMsg : 유효성에 걸렸을 경우 메세지 출력여부 (true/false)
 * bFocus : 유효성에 걸렸을 경우 focus 줄지여부 (true/false)
 */
function checkValidation(obj, bMsg, bFocus)
{
	var sVal = obj.value;
	var sName = obj.requirednm;

	if (!sName || sName == "")
	{
		sName = obj.title;
	}

	// 값이 없다면 형식을 체크할 필요가 없다.
	if (sVal == "")
	{
		return;
	}

	if (bFocus == "")	bFocus = false;

	if (obj.format != "")
	{
		switch (obj.format)
		{
			case "MONEY"://금액형태
				sVal = sVal.replace(/,/gi, "");	//콤마제거
				if (isOnlyNumberic(sVal) == false)
				{
					if (bMsg) MessageBox("Format", "I", sName);
					if (bFocus) setFocus(obj);
					return false;
				}
				else obj.value = moneyMask(sVal);
				break;
			case "NUMBER"://숫자형태
				if (isOnlyNumberic(sVal) == false)
				{
					if (bMsg) MessageBox("Format", "I", sName);
					if (bFocus) setFocus(obj);
					return false;
				}
				else obj.value = numberMask(sVal);
				break;
			case "DATE"://날짜형태
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
			case "TIME"://시간형태
				if (checkTime(sVal) == false)
				{
					if (bMsg) MessageBox("Format", "I", sName);
					if (bFocus) setFocus(obj);
					return false;
				}
				else obj.value = checkTime(sVal);
				break;
			case "FLOAT"://float 형태  isFinite(sVal)로 사용 가능  isFinite(str)-수치가 무한 수치인가, 유효한 수치인가를 판명한다. 유효한 유한 수치이면 true 값을 반환(return)하고, 아니면 false 값을 반환한다.
				if (checkFloat(sVal) == false)
				{
					if (bMsg) MessageBox("Format", "I", sName);
					//if (bMsg) alert(sName + "는(은) 유효하지 않은 형식입니다.");	//2008.04.28 조익현 오류 메시지 변경   기존: "는(은) 사이즈 ["+ obj.maxsize+"] 를 초과하였습니다."
					if (bFocus) setFocus(obj);
					return false;
				}
				break;
			default:
		}
	}

	// 최대값 설정
	if (obj.maxsize && obj.maxsize != "")
	{
		if (getByte(obj.value) > obj.maxsize)
		{
			//if (bMsg) MessageBox("Format", "I", sName);
			if (bMsg) alert(sName + "는(은) 사이즈 ["+ obj.maxsize+"] 를 초과하였습니다.");
			if (bFocus) setFocus(obj);
			return false;
		}
	}

	return true;
}

/**
 * 객체에 fucus를 줄 때 readonly, disabled를 검사한 후 준다.
 * obj : 객체
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

//포맷주기
function getFormatData(sVal, sPattern, iSize)
{
	var sRet = "";
	if (sVal.length ==0 ) return sVal;
	switch (sPattern)
	{
		case "MONEY":	//금액표시
		case "MONEY2":
			sRet = moneyMask(sVal);
			break;
		case "POST":  //우편번호
		case "ZIP":  //우편번호
			sRet = zipMask(sVal);
			break;
		case "SID":		//주민번호
		case "SSN":		//주민번호
			sRet = sidMask(sVal);
			break;
		case "DATE":	//날짜 - LIG용
			//sRet = dateMaskLogic(sVal,"/");
			sRet = dateMaskLogic(sVal,"-");
			break;
		case "DATE2":
			sRet = dateMaskLogic(sVal,"-");
			break;
		case "TIME":	//시간
			sRet = timeMask(sVal, ":");
			break;
		case "DATET":	//날짜시간
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
		case "TEL":		//전화번호
		case "TNO":		//전화번호
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

// float 형인지 체크
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

//날짜를 체크
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
 * 시간 유효성을 체크한다.
 * sValue : 시간
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

// 문자열에서 &nbsp;를 제거한다.
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

// 공백을 &nbsp로 변환
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
// 공백을 &nbsp로 변환
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


// enter변
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


//숫자에 콤마찍기
function enterComma(obj)
{
	var keyCode = window.event.keyCode;

	if(keyCode < 37 || keyCode > 40)
	{
		obj.value = insertComma(obj);
	}
}

//콤마넣어주기
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

//날짜에 마스크걸기 "-"
function dateMask(date)
{
	return dateMaskLogic(date,"-");
}
//날짜에 마스크걸기 "/"
function dateMask2(date)
{
	return dateMaskLogic(date,"/");
}

//날짜에 마스크걸기
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

// 시간 마스크
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

//우편번호마스크
function zipMask(zipData)
{
	if(zipData.length < 6) return zipData;

	return zipData.substring(0,3)+"-"+zipData.substring(3,6);
}

//주민번호마스크
function sidMask(sidData)
{
	var strSid	= numberMask(sidData);

	if(strSid.length < 13) return sidData;

	return strSid.substring(0,6)+"-"+strSid.substring(6,13);
}

//주민번호 유효성체크
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

//전화번호 마스크
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

	//두자리 지역번호
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
	
	//세자리 지역번호, 핸드폰
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
	
	//네자리 지역번호, 파워텔
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
	
	//대표번호
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
	
	//지역번호 없는 전화번호 자동 지역번호 부여
	if(lstrSecNo.length == 3 || lstrSecNo.length == 4)
	{
		return "02" + "-" + lstrSecNo + "-" + lstrThrNo;
	}
	
	return oldtel;
}

//금액표시 마스크 ","
function moneyMask(money)
{
	return moneyImpl(money,",");
}
//금액표시 마스크
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

//전화번호 나누기
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

// 문장내에서 "," Comma를 제거한다.
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

// 문장내에서 """, "'"를 제거한다.
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

// 문장내에서 ":", "-" 마스크 제거
function removeMask(str)
{
	var sPattern 	= /[:/-]/g;
	sRet = str.replace(sPattern,'');
	return sRet;
}

//숫자중에 0을 제외한다.
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

//byte 수 계산
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
  * charset에 따라 한글 byte계산할 값 return
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
  * 실수형태 마스크를 생성해준다.
  * targetNumber    : 마스크 타겟 숫자
  * count           : 소수점 이하 표현할 자리수
  * moneyMaskFlagYN : 머니마스크셋팅유무
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
  * 실수형태 마스크해제
  * targetNumber    : 마스크 타겟 숫자
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
 * 마지막 일자 가져오기
 * yyyymm : 년월
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