var SboxKeySearch = function(obj)
{
	// for all select box
	if (typeof(obj) == "undefined" || obj == null) {
		var objs = document.getElementsByTagName("select");
		
		for (var i=0; i<objs.length; i++) {
			new SboxKeySearch(objs[i]);
		}
		return;
	}

	try {
		obj.attachEvent("onkeydown", SboxKeySearch.keyHook);
	} catch(e) {
		try {
			obj.addEventListener("keydown", SboxKeySearch.keyHook, false);
		} catch(ee) {
		return;
		}
	} finally {
		obj.keySearchObject = this;
	}
}

SboxKeySearch.keyHook = function(oEvent)
{
	var target = oEvent.srcElement || oEvent.target;
	var sindex = target.selectedIndex+1;
	var code = 0;
	
	if (oEvent.keyCode < 32 || oEvent.keyCode > 128) return;
	
	for (var i=sindex; i < target.options.length; i++) 
	{
		code = SboxKeySearch.getCode(target.options[i].text);
		if (oEvent.keyCode == code || oEvent.keyCode == code-1000) 
		{
			target.selectedIndex = i;
			return;
		}
	}

	for (i=0; i < sindex; i++) 
	{
		code = SboxKeySearch.getCode(target.options[i].text);
		if (oEvent.keyCode == code || oEvent.keyCode == code-1000) {
		target.selectedIndex = i;
		return;
		}
	}
}

SboxKeySearch.layout = {
0:82,2:83,3:69,5:70,6:65,7:81,9:84,11:68,12:87,14:67,15:90,16:88,17:86,18:71,
8:81,13:87,4:69,1:82,10:84
}

SboxKeySearch.getCode = function(txt) 
{
	var layout = SboxKeySearch.layout;
	var ch = txt.charCodeAt(0);
	
	// english or number?
	if (ch < 128) return ch;
	
	// only jaum (12593 <= ch <= 12622)
	if (ch > 12592 && ch < 12623) return SboxKeySearch.jaumCode(ch);
	
	ch -= 44032;
	if (ch < 0 || ch > 11171) return 0;
	ch = Math.floor(Math.floor(ch/28)/21);
	
	return layout[ch];
}
SboxKeySearch.jaumCode = function(jaum) 
{
	var conv = {0:0,3:2,6:3,8:5,16:6,17:7,20:9,22:11,23:12,
	25:14,26:15,27:16,28:17,29:18,18:8,24:13,7:4,1:1,21:10};
	
	return conv[jaum-12593];
}
