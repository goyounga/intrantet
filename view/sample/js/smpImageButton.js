var toggle = 0;

function setInit()
{
	setButtonByAuth();	// 버튼 권한설정
}

function imageButtonTest()
{
	if (toggle == 0)
	{
		setButton(f.btnActive[0], false);	// 버튼 활성화
		setButton(f.btnActive[1], true);	// 버튼 비활성화
		toggle = 1;
	}
	else
	{
		setButton(f.btnActive[0], true);
		setButton(f.btnActive[1], false);
		toggle = 0;
	}
}