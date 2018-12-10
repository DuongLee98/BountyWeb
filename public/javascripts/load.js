function showPage()
{
	document.getElementById("load").style.display = "none";
	document.getElementById("check_mark").style.display = "none";
	document.getElementById("myDiv").style.display = "block";
}
function loadPage()
{
	document.getElementById("load").style.display = "block";
	document.getElementById("myDiv").style.display = "none";
	document.getElementById("check_mark").style.display = "none";
}
function Success()
{
	document.getElementById("load").style.display = "none";
	document.getElementById("myDiv").style.display = "none";
	document.getElementById("check_mark").style.display = "block";
}