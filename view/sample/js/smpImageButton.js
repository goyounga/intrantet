var toggle = 0;

function setInit()
{
	setButtonByAuth();	// ��ư ���Ѽ���
}

function imageButtonTest()
{
	if (toggle == 0)
	{
		setButton(f.btnActive[0], false);	// ��ư Ȱ��ȭ
		setButton(f.btnActive[1], true);	// ��ư ��Ȱ��ȭ
		toggle = 1;
	}
	else
	{
		setButton(f.btnActive[0], true);
		setButton(f.btnActive[1], false);
		toggle = 0;
	}
}