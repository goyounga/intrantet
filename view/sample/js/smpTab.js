function tabsample1_onclick(index)
{
	for (var i=0; i < tabview.length; i++)
	{	
		tabview[i].style.display = "none";
	}
		
	tabview[index].style.display = "";
}

function tabsample2_onclick(index)
{
	for (var i=0; i < vtabview.length; i++)
	{	
		vtabview[i].style.display = "none";
	}
		
	vtabview[index].style.display = "";
}