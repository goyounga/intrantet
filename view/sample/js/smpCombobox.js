// For Multiple Combobox onDbClick Test
function onDbClickMultiple(obj)
{
	// 더블 클릭한 option의 Text를 읽어와 보여준다.
 	var msg = "[" + obj.value + "] " + getSelectedText(f.multiple1);
	alert(msg);
}

// getSelectedText 함수 Test용 : 콤보박스의 Text를 가져온다.
function getComboText(obj)
{
	alert(getSelectedText(obj));
}

// combobox를 만든다.
// parentcombo1가 onChange할 때 mycombo1의 option을 새로 만들어 준다.
function makeMyCombo(obj)
{
	var tran = new Trans();
	tran.setSvc("samplemycombo1");
	tran.setUserParams("id=mycombo1");	// option을 만들 combobox name을 넘겨준다.
	tran.open("f","f","/common.do");
}

function getMyCombo1Value(obj)
{
	alert(obj.value);
}

// makeMyCombo 실행 후 호출된다.
function callback(dsnm)
{
	if (dsnm == "samplemycombo1")
	{
		f.mycombo1.selectedIndex = 1;
	}
}