// For Multiple Combobox onDbClick Test
function onDbClickMultiple(obj)
{
	// ���� Ŭ���� option�� Text�� �о�� �����ش�.
 	var msg = "[" + obj.value + "] " + getSelectedText(f.multiple1);
	alert(msg);
}

// getSelectedText �Լ� Test�� : �޺��ڽ��� Text�� �����´�.
function getComboText(obj)
{
	alert(getSelectedText(obj));
}

// combobox�� �����.
// parentcombo1�� onChange�� �� mycombo1�� option�� ���� ����� �ش�.
function makeMyCombo(obj)
{
	var tran = new Trans();
	tran.setSvc("samplemycombo1");
	tran.setUserParams("id=mycombo1");	// option�� ���� combobox name�� �Ѱ��ش�.
	tran.open("f","f","/common.do");
}

function getMyCombo1Value(obj)
{
	alert(obj.value);
}

// makeMyCombo ���� �� ȣ��ȴ�.
function callback(dsnm)
{
	if (dsnm == "samplemycombo1")
	{
		f.mycombo1.selectedIndex = 1;
	}
}