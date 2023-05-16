var Mail_Field_Validation_OK = 0;
var Mail_Field_Validation_Empty = 1;
var Mail_Field_Validation_Invalid = 2;
var Mail_Field_Validation_NotExist = 3;

function ValidateFieldById(fieldId, regex, frameId)
{
    var oFrame = (frameId == null) ? window : document.frames[frameId];
	var field = oFrame.document.getElementById(fieldId);
	if (field == null) return Mail_Field_Validation_NotExist;

	var val = field.value;
	if (val == null) return Mail_Field_Validation_Empty;

	// get rid of leading and ending write space
	var trim = /^(\s)*|(\s)*$/g;
	val = val.replace(trim, "");
	if (val.length == 0) return Mail_Field_Validation_Empty;
	field.value = val;

	// regular expression test
	if (regex != null)
	{
		var exp = new RegExp(regex);
		if (!exp.test(val)) return Mail_Field_Validation_Invalid;
	}

	return Mail_Field_Validation_OK;
}

function GetFieldValueById(frameId, fieldId)
{
	var oFrame = window;
	if (frameId != null)
	{
		oFrame = window.document.frames[frameId];
	}
	if (oFrame != null)
	{
		var oDoc = oFrame.document;
		if (oDoc != null)
		{
			var field = oDoc.getElementById(fieldId);
			if (field != null) return field.value;
		}
	}
	return null;
}

function SetFieldValueById(fieldId, value)
{
	var field = document.getElementById(fieldId);
	if (field != null) field.value = value;
}

function ValidateInputFolderName(fieldId, frameId)
{
	// illegal folder name characters: & ( ) + \ : ; " ' < > / * | ?
	return ValidateFieldById(fieldId, "^[^&\\(\\)\\+\\\\:;\"'<>/\\*\\|\\?]*$", frameId);
}

function HasMultipleChecked(formId, type, frameId)
{
	var oFrame = (frameId == null) ? window : document.frames[frameId];
	var oForm = oFrame.document.forms[formId];
	var cnt = 0;
	if (oForm != null)
	{
		for (var index=0; index<oForm.length; index++)
		{
			var e = oForm.elements[index];
			if (e.type == type && e.checked)
			{
				cnt++;
				if (cnt >= 2)
					return cnt;
			}
		}
	}
	return 0;
}

function HasChecked(formId, type, frameId)
{
	var oFrame = (frameId == null) ? window : document.frames[frameId];
	var oForm = oFrame.document.forms[formId];
	if (oForm != null)
	{
		for (var index=0; index<oForm.length; index++)
		{
			var e = oForm.elements[index];
			if (e.type == type && e.checked)
			{
				return true;
			}
		}
	}
	return false;
}

function IsChecked(checkId)
{
	return document.getElementById(checkId).checked;
}

function MarkAllCheckBox(frameId, formId, status)
{
	var oFrame = window;
	if (frameId != null) oFrame = window.document.frames[frameId];
	var oForm = oFrame.document.forms[formId]; 
	if (oForm != null)
	{
		for (var index=0; index<oForm.length; index++)
		{
			var e = oForm.elements[index];
			if (e.type == 'checkbox' && e.checked != status) e.click();
		}
	}
}

function MarkAllVisibleCheckBox(frameId, formId, status)
{
	var oFrame = (frameId == null) ? window : document.frames[frameId];
	var oForm = oFrame.document.forms[formId];
	if (oForm != null)
	{
		for (var index=0; index<oForm.length; index++)
		{
			var e = oForm.elements[index];
			if (e.type == 'checkbox' && e.checked != status)
			{
				var parent = e;
				for(var i=0; i<checkboxLevel && parent != null; i++) parent = parent.parentElement;
				if (parent != null && parent.style.display != "none") e.click();
			}
		}
	}
}

function HasVisibleCheckBox(formId, frameId)
{
	var oFrame = (frameId == null) ? window : document.frames[frameId];
	var oForm = oFrame.document.forms[formId];
	if (oForm != null)
	{
		for (var index=0; index<oForm.length; index++)
		{
			var e = oForm.elements[index];
			if (e.type == 'checkbox')
			{
				var parent = e;
				for(var i=0; i<checkboxLevel && parent != null; i++) parent = parent.parentElement;
				if (parent != null && parent.style.display != "none") return true;
			}
		}
	}
	return false;
}

function ClearHideCheckedRow(formId, type, frameId)
{
	var oFrame = (frameId == null) ? window : document.frames[frameId];
	var oForm = oFrame.document.forms[formId];
	if (oForm != null)
	{
		for (var index=0; index<oForm.length; index++)
		{
			var e = oForm.elements[index];
			if (e.type == type && e.checked)
			{
				var parent = e;
				for(var i=0; i<checkboxLevel && parent != null; i++) parent = parent.parentElement;
				if (parent != null)
				{
					parent.style.display = "none";
					e.click();
				}
			}
		}
	}
}

function SetFirstRowBorder(formId, frameId)
{
	var oFrame = (frameId == null) ? window : document.frames[frameId];
	var oForm = oFrame.document.forms[formId];
	if (oForm != null)
	{
		for (var index=0; index<oForm.length; index++)
		{
			var e = oForm.elements[index];
			if (e.type == 'checkbox')
			{
				var parent = e;
				for(var i=0; i<checkboxLevel && parent != null; i++) parent = parent.parentElement;
				if (parent != null && parent.style.display != "none")
				{
					parent.style.borderTop = "2px solid #97B7D3";
					break;
				}
			}
		}
	}
}

function C(me)
{
	var parent = me.parentElement;
	if (parent != null)
	{
		parent = parent.parentElement;
		if (parent != null)
		{
			var hasCheck = false;
			var node = parent.firstChild;
			while (node != null)
			{
				var childNode = node.firstChild;
				if (childNode != null && childNode.tagName == "INPUT" && childNode.type == "checkbox" && childNode.checked == true){hasCheck = true;break;}
				node = node.nextSibling;
			}
			var color = hasCheck ? "#bcdee5" : "";
			parent.style.backgroundColor = color;
		}
	}
}

function L(me)
{
	var parent = me.parentElement;
	for (var index=0; index<3; index++)
	{
		parent = parent.parentElement;
		if (parent == null) break;
	}
	if (parent != null)
	{
		parent.style.backgroundColor = me.checked ? "#bcdee5" : parent.style.color;
	}
}

function SubmitFormById(formId, formAction, frameId)
{
	var oFrame = (frameId == null) ? window : document.frames[frameId];
	var oForm = oFrame.document.forms[formId];
	if (oForm != null)
	{
		if (formAction != null) oForm.action = formAction;
		oForm.submit();
	}
}

function FocusById(elementId, frameId)
{
    var oFrame = (frameId == null) ? window : document.frames[frameId];
    var element = oFrame.document.getElementById(elementId);
	if (element != null) element.focus();
}

function ShowCTag(image)
{
	var div = document.createElement("DIV");
	div.style.position = "absolute";
	div.style.top = "0px";
	div.style.left = "0px";
	div.style.zIndex = "-99";
	div.id = "animationpannel";
	div.innerHTML = image;
	document.body.appendChild(div);
}

function ShowAnimation(message, image, sound, time)
{
	if (navigator.userAgent.indexOf("STB") != -1)
	{
		window.external.AnimationMessageBox(message, image, sound, time);
	}
}

function ShowMoveAnimation(message)
{
	ShowAnimation(message, "msntv:/Panels/Images/MailMove.gif", "", 2000);
}

function ShowTaskCompleteAnimation(message)
{
	ShowAnimation(message, "msntv:/Panels/Images/TaskCompleted.gif", "", 2000);
}

function ShowBlockSenderAnimation(message)
{
	ShowAnimation(message, "msntv:/Panels/Images/TaskCompleted.gif", "Block", 2000);
}

function MailAlert(msg, iconType, focusId)
{
	if (navigator.userAgent.indexOf("STB") == -1)
	{
		alert(msg);
	}
	else
	{
		if (msg.length < 130) window.external.MessageBox(msg, "", "OK", 0, iconType, 1);
		else window.external.MessageBox(msg, "", "OK", 0, iconType, 0);
	}

	if (focusId != null && focusId.length > 0)
	{
		var obj = document.getElementById(focusId);
		if (obj != null) obj.focus();
	}
}
function MailInfo(msg, focusId) { MailAlert(msg, 0x40, focusId); }
function MailError(msg, focusId) { MailAlert(msg, 0x10, focusId); }
function MailWarning(msg, focusId) { MailAlert(msg, 0x30, focusId); }

function MailConfirm(msg)
{
	if (navigator.userAgent.indexOf("STB") == -1)
	{
		return confirm(msg);
	}
	else
	{
		var result = 0;
		if (msg.length < 130) result = window.external.MessageBox(msg, "", "OK;Cancel", 0, 0x30, 1);
		else result = window.external.MessageBox(msg, "", "OK;Cancel", 0, 0x30, 0);
		if (result == 0) return true;
		else return false;
	}
}

function GetFormPostData(formId, frameId)
{
	var oFrame = (frameId == null) ? window : document.frames[frameId];
	var oForm = oFrame.document.forms[formId];
	if (oForm == null) return null;
	var postdata = "";
	var isFirst = true;
	for (i=0; i<oForm.length; i++)
	{
		var e = oForm.elements[i];
		if ((e.type == 'text') || (e.type == 'hidden') ||
			(e.type == 'textarea') || (e.type == 'submit') ||
			(e.type == 'password') || (e.type == 'button') ||
			(e.type == 'checkbox' && e.checked) ||
			(e.type == 'radio' && e.checked))
		{
			var item = "";
			if (!isFirst) item = "&";
			else isFirst = false;
			item += encodeURIComponent(e.name);
			item += "=";
			item += encodeURIComponent(e.value);
			postdata += item; 
		}
	}
	return postdata;
}

function WriteListHeaders()
{
	if (ids == null || ids.length == 0) return;
	var butterfly = false;
	var unknowsdr = false;
	for (var i=0; i<knwn.length; i++)
	{
		if (knwn[i]=="0") unknowsdr = true;
		else if (knwn[i]=="2") butterfly = true;
	}
	var lines = new Array(ids.length);
	for (var i=0; i<lines.length; i++)
	{
		lines[i] = "<div class=r";
		if (i==0) lines[i] += "1";
		if (read[i]=="1") lines[i] += " style='background-color:#adcff6;color:#adcff6'";
		lines[i] += "><div class=k";
		if (butterfly) lines[i] += "f";
		else if (unknowsdr) lines[i] += "u";
		if (knwn[i]=="0") lines[i] += " align=center><div class=unkimg></div>";
		else if (knwn[i]=="2") lines[i] += "><div class=bfly></div>";
		else lines[i] += ">";
		lines[i] += "</div><div class=m id='" + ids[i];
		lines[i] += "' onclick=\"parent.GoRead('" + ids[i];
		lines[i] += "')\"><div class=m2>";
		lines[i] += "<div class=";
		if (read[i]=="1") lines[i] += "u";
		lines[i] += "f>" + from[i];
		lines[i] += "</div></div><div class=m2><div class=s>" + subj[i];
		lines[i] += "</div></div></div><div class=o><div class=m2><div class=c><input onclick='parent.L(this)' type=checkbox name=";
		lines[i] += "'" + ids[i] + "'></div><div class=a>";
		if(atch[i]=="1") lines[i] += "<div class=atcimg></div>";
		lines[i] += "</div></div><div class=m2><div class=d>" + date[i];
		lines[i] += "</div></div></div></div>";
	}
	content.mailpanel.innerHTML = lines.join("");
	content.markall.checked = false;
	checkAll = true;
}
function WriteListDraftHeaders()
{
	if (ids == null || ids.length == 0) return;
	var lines = new Array(ids.length);
	for (var i=0; i<lines.length; i++)
	{
		lines[i] = "<div class=r";
		if (i==0) lines[i] += "1";
		lines[i] += "><div class=s id='" + ids[i] + "' onclick=\"parent.Draft('";
		lines[i] += ids[i]+ "')\"><pre>" + subj[i] + "</pre></div>";;
		lines[i] += "<div class=c><input type=checkbox onclick='parent.C(this)' name='" + ids[i] + "'></div>";
		lines[i] += "<div class=a>";
		if(atch[i]==1) lines[i] += "<div class=atcimg></div>";
		lines[i] += "</div>";
		lines[i] += "<div class=d>" + date[i] + "</div></div>";
	}
	content.mailpanel.innerHTML = lines.join("");
	content.markall.checked = false;
	checkAll = true;
}
function ShowMessages(flag)
{
	document.all.content.style.display = flag ? "inline" : "none";
	noMailMsg.style.display = flag ? "none" : "inline";
}
function GetUrlPrefix()
{
    var url = "getheaders.aspx?folder=" + foldername;
	if (currentTop != null && currentTop.length > 0) url += "&ctop=" + currentTop;
	return url;
}
function GetMailHeaders(sortOrder, pagination)
{
	var url = GetUrlPrefix();
	if (pagination != null && pagination.length > 0) url += "&action=" + pagination;
	if (sortOrder != null && sortOrder.length == 2) url += "&sort=" + sortOrder;
	listmail = new ActiveXObject("Microsoft.XMLHTTP");
	listmail.Open("GET", url);
	listmail.onreadystatechange = OnGetHeaderComplete;
	listmail.send();
}
var getHdrResp = null;
function OnGetHeaderComplete()
{
	if (listmail.readyState != 4) return;
	getHdrResp = listmail.responseText;
	if (getHdrResp.substr(0, 8) == "//Script")
	{
		OnGetHeaderCompleteEx();
	}
	else
	{
		getHdrResp = null;
		MailError(defaultError, null);
		history.back();
	}
}
function OnGetHeaderCompleteEx()
{
	if (document.readyState != "complete" || content.document.readyState != "complete")
	{
		setTimeout(OnGetHeaderCompleteEx, 50);
	}
	else
	{
        var hc = parent.document.getElementById("headerscomplete");
        if (hc != null)
        {
              hc.value = "true";
        }
	
		eval(getHdrResp);
		HideProgress();
	}
}
function MarkAll()
{
	MarkAllVisibleCheckBox('content', 'maillist', checkAll);
	checkAll = !checkAll;
}
function GoRead(id)
{
	SetReadCookie("folder=" + foldername + "&id=" + id);
	window.location = "readmail.aspx?folder=" + foldername;
}
function Draft(id)
{
	window.location = "writemail.aspx?action=continue&draft=" + id;
}
function SetTitle(titleString)
{
	title.innerHTML = titleString;
}
function HidePageNumber()
{
	content.multipage.style.display = "none";
	content.multipage1.style.display = "none";
}
function UpdatePageNumber(numString, allowPrev, allowNext)
{
	content.msgRange.innerText = numString;
	if (allowPrev)
	{
		content.prev.onclick = RefreshPrevMailList;
		content.prev.disabled = false;
		content.prev1.onclick = RefreshPrevMailList;
		content.prev1.disabled = false;
	}
	else
	{
		content.prev.onclick = null;
		content.prev.disabled = true;
		content.prev1.onclick = null;
		content.prev1.disabled = true;
	}
	if (allowNext)
	{
		content.next.onclick = RefreshNextMailList;
		content.next.disabled = false;
		content.next1.onclick = RefreshNextMailList;
		content.next1.disabled = false;
	}
	else
	{
		content.next.onclick = null;
		content.next.disabled = true;
		content.next1.onclick = null;
		content.next1.disabled = true;
	}
	content.multipage.style.display = "inline";
	content.multipage1.style.display = "inline";
}
function RefreshPrevMailList()
{
    RefreshMailList(null, 'prev');
}
function RefreshNextMailList()
{
    RefreshMailList(null, 'next');
}
function RefreshMailList(sortOrder, pagination)
{
	loadpanel.style.display = "inline";
	document.getElementById("content").style.display = "none";
	pgdots.innerText = "";
	UpdateProgress();
	GetMailHeaders(sortOrder, pagination);
}
function ST(src)
{
	content.sort.innerText = labels[src];
	content.sortdiv.style.display = "none";
	RefreshMailList(shortlabels[src]);
}
function HideProgress()
{
    loadpanel.style.display = "none";
}
function UpdateProgress()
{
	if (loadpanel.style.display == "none") return;
	var len = (pgdots.innerText.length + 1) % 7;
	var dots = "";
	for (var i=0; i<len; i++) dots += ".";
	pgdots.innerText = dots;
	window.setTimeout(UpdateProgress, 800);
}
function WriteListMailFrame()
{
	loadingpannel.style.pixelHeight = document.body.clientHeight - 76;
	document.getElementById("content").style.pixelHeight = document.body.clientHeight - 76;
	var s = "<body style='background-color:transparent;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#cbe0f3,endColorstr=#acc6dc)' onkeydown='if((event.keyCode==36)||(event.altKey&&event.keyCode==33)){window.scrollTo(0, 0);return false;}else if((event.keyCode==35)||(event.altKey&&event.keyCode==34)){window.scrollTo(0, document.body.scrollHeight);return false;}else return true;'>";
	s += cssSource + username.outerHTML + hiddenDiv.innerHTML + "</body>";
	content.document.write(s);
	content.document.close();
	s = "";
	for (var i=0; i<labels.length; i++)
	{
		s += "<div class=sort id=st" + i + " onclick='parent.ST(" + i + ")'" + " onkeydown='KD(event.keyCode," + i + ")'>" + labels[i] + "</div>";
	}
	content.sortdiv.innerHTML = s;
}
function WriteMoveMailFrame()
{
	document.getElementById("movemailframe").style.pixelHeight = document.body.clientHeight - 76;
	var s = "<body style='background-color:transparent;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#cbe0f3,endColorstr=#acc6dc)' onkeydown='if((event.keyCode==36)||(event.altKey&&event.keyCode==33)){window.scrollTo(0, 0);return false;}else if((event.keyCode==35)||(event.altKey&&event.keyCode==34)){window.scrollTo(0, document.body.scrollHeight);return false;}else return true;' onmouseleave='if(event.offsetX>450)parent.continu.focus()'>";
	s += cssSource + hiddenMoveDiv.innerHTML + "</body>";
	movemailframe.document.write(s);
	movemailframe.document.close();
}
function PostSelections(action)
{
	var postdata = GetFormPostData("maillist", "content");
	listmail = new ActiveXObject("Microsoft.XMLHTTP");
	listmail.Open("POST", GetUrlPrefix() + "&action=" + action);
	listmail.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	listmail.onreadystatechange = OnGetHeaderComplete;
	listmail.send(postdata);
	ClearHideCheckedRow("maillist", "checkbox", "content");
	SetFirstRowBorder("maillist", "content");
}
function EmptyView()
{
	ShowMessages(false);
	var button = document.getElementById("delete");
	if (button != null) button.style.display = "none";
	button = document.getElementById("empty");
	if (button != null) button.style.display = "none";
	button = document.getElementById("notjunk");
	if (button != null) button.style.display = "none";
	button = document.getElementById("report");
	if (button != null) button.style.display = "none";
	button = document.getElementById("move");
	if (button != null) button.style.display = "none";
	button = document.getElementById("mntip");
	if (button != null) button.style.display = "none";
	button = document.getElementById("done");
	if (button != null) button.focus();
	else writeheader.focus();
}
function Empty()
{
	if (!MailConfirm(emptyConfirm)) return;
	ShowTaskCompleteAnimation(emptyAnimation);
	listmail = new ActiveXObject("Microsoft.XMLHTTP");
	listmail.Open("GET", GetUrlPrefix() + "&action=empty");
	listmail.onreadystatechange = OnGetHeaderComplete;
	listmail.send();
	EmptyView();
}
function Delete()
{
	if (isListMail && !HasChecked("maillist", "checkbox", "content")) MailWarning(deleteNoSelection, null);
	else
	{
		if (deleteConfirm.length > 0 && !MailConfirm(deleteConfirm)) return;
		if (deleteConfirm.length > 0) ShowTaskCompleteAnimation(deleteAnimation);
		else ShowMoveAnimation(deleteAnimation);
		if (isListMail) PostSelections("delete");
		else GetMessage("&action=delete");
		ShowCTag(deleteCTag);
	}
}
function Move(target)
{
	if (!HasChecked("maillist", "checkbox", "content")) MailWarning(moveNoSelection, null);
	else ShowMove();
}
function DoMove()
{
	var targetFolder = null;
	if (!HasChecked("movemail", "radio", "movemailframe"))
	{
		MailWarning(moveNoFolderSelection, null);
		return false;
	}
	if (movemailframe.document.all.newtarget.checked)
	{
		// a special case: NO folder name with only dots(.) is allowed.
		var result = ValidateFieldById("newfolder", "^[\.]+$", "movemailframe");
		if ( result == Mail_Field_Validation_OK )
		{
			MailWarning(moveInvalidFolderName, null);
			return false;
		}
		result = ValidateInputFolderName("newfolder", "movemailframe");
		if (result == Mail_Field_Validation_Empty)
		{
			MailWarning(moveEmptyFolderName, null);
			return false;
		}
		else if (result == Mail_Field_Validation_Invalid)
		{
			MailWarning(moveInvalidFolderName, null);
			return false;
		}
		targetFolder = encodeURIComponent(GetFieldValueById("movemailframe", "newfolder"));
	}
	else
	{
		var oForm = movemailframe.document.forms["movemail"];
		if (oForm != null)
		{
			for (var index=0; index<oForm.length; index++)
			{
				var e = oForm.elements[index];
				if (e.type == "radio" && e.checked)
				{
					targetFolder = e.value;
					break;
				}
			}
		}
	}
	ShowMoveAnimation(moveAnimation);
	if (isListMail) PostSelections("move&target=" + targetFolder);
	else GetMessage("&action=move&target=" + targetFolder);
	HideMove();
	ShowCTag(moveCTag);
	return false;
}
function Report()
{
	if (isListMail && !HasChecked("maillist", "checkbox", "content")) MailWarning(junkNoSelection, null);
	else
	{
		var result = window.external.MessageBox(junkConfirm, "", junkButtons, 0, 0x30, 0);
		if (result == 0)
		{
			ShowMoveAnimation(junkAnimation);
			if (isListMail) PostSelections("report");
			else GetMessage("&action=report");
		}
	}
}
function NotJunk()
{
	if (isListMail && !HasChecked("maillist", "checkbox", "content")) MailWarning(junkNoSelection, null);
	else
	{
		var result = window.external.MessageBox(junkConfirm, "", junkButtons, 0, 0x30, 0);
		if (result <= 1)
		{
			var action = "notjunk";
			var cmsg = junkAnimation;
			if (result == 0)
			{
				cmsg = junkAnimationEx;
				action += "&add=y";
			}
			ShowMoveAnimation(cmsg);
			if (isListMail) PostSelections(action);
			else GetMessage("&action=" + action + "&from=" + GetFromAddr());
		}
	}
}
function ShowMove()
{
	UpdateFolderList();
	document.all.movemailpannel.style.display = "inline";
	document.all.mainmenu.style.display = "none";
	document.all.content.style.display = "none";
	var oForm = movemailframe.document.forms["movemail"];
	if (oForm != null) oForm.elements[0].focus();
	else this.continu.focus();
}
function HideMove()
{
	document.all.mainmenu.style.display = "inline";
	document.all.content.style.display = "inline";
	document.all.movemailpannel.style.display = "none";
	this.move.focus();
}
function UpdateFolderList()
{
	if (folderListURL == null || folderListURL.length == 0) return;
	var lines = new Array(folderListURL.length);
	for (var i=0; i<folderListURL.length; i++)
	{
		lines[i] = "<div style='width:100%;height:26px'><input style='float:left' type=radio name=targetfolder onclick='newfolder.value=\"\"' value=\""
		+ folderListURL[i] + "\" id=\""+folderListName[i].substr(0,1)+i +"\"><pre class=n>" + folderListName[i] + "</pre></div>"
	}
	movemailframe.folders.innerHTML = lines.join("");
}
function GetCookieValue(sName)
{
	if (document.cookie == null || document.cookie.length == 0) return;
	sName += "=";
	var cookies = document.cookie.split(";");
	for (var i=0; i<cookies.length; i++)
	{
		var c = cookies[i];
		if (c != null && c.length >= sName.length)
		{
			c = c.replace(/^(\s)*|(\s)*$/g, "");
			var name = c.substr(0, sName.length);
			if (name == sName) return c.substr(sName.length, c.length - sName.length);
		}
	}
	return null;
}
function DelReadCookie()
{
	document.cookie = "readmail=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
}
function GetReadCookieValue(sName)
{
	var c = GetCookieValue("readmail");
	if (c == null || c.length == 0) return null;
	sName += "=";
	var cookies = c.split("&");
	for (var i=0; i<cookies.length; i++)
	{
		c = cookies[i];
		if (c != null && c.length >= sName.length)
		{
			var name = c.substr(0, sName.length);
			if (name == sName) return c.substr(sName.length, c.length - sName.length);
		}
	}
	return null;
}
function SetReadCookieValue(sName, sValue)
{
	sName += "=";
	var c = GetCookieValue("readmail");
	if (c == null || c.length == 0)
	{
		document.cookie = "readmail=" + sName + sValue;
		return;
	}

	var needAdd = true;
	var cookies = c.split("&");
	for (var i=0; i<cookies.length; i++)
	{
		if (cookies[i] != null && cookies[i].length >= sName.length)
		{
			var name = cookies[i].substr(0, sName.length);
			if (name == sName)
			{
				cookies[i] = sName + sValue;
				needAdd = false;
			}
		}
	}
	if (needAdd) document.cookie = "readmail=" + c + "&" + sName + sValue;
	else document.cookie = "readmail=" + cookies.join("&");
}
function SetReadCookie(sValue)
{
	document.cookie = "readmail=" + sValue;
}
function GetReadCookie()
{
	return GetCookieValue("readmail");
}
function SaveAddress()
{
	var addr = GetFieldValueById("content", "fromaddr");
	if (addr == null || addr == "")
	{
		MailError(noaddressToSave, null);
	}
	else
	{
		SubmitFormById("goto", "editaddr.aspx?action=save&address=" + addr);
	}
}
function GetFromAddr()
{
	var addr = GetFieldValueById("content", "fromaddr");
	if (addr != null && addr != "") {
		addr = unescape(addr);
		var bracket = addr.indexOf("<");
		if (bracket != -1) {
			var endbr = addr.indexOf(">");
			if ((endbr != -1) && (bracket+1 < addr.length)) {
				addr = addr.substring(bracket+1, endbr);
			}
		}
		return escape(addr);
	}
	return null;
}
function GetMessage(extra)
{
	var readframe = document.getElementById("content");
	if (!fullScreenView)
	{
		loadpanel.style.display = "inline";
		readframe.style.display = "none";
		pgdots.innerText = "";
		UpdateProgress();
	}
	var url = "readmailx.aspx?" + GetReadCookie();
	if (extra != null && extra.length > 0)
	{
		url += extra;
		prevNextFocus = null;
	}
	readframe.src = url;
}
function Prev()
{
	if (prevId == null) return;
	prevNextFocus = "prev";
	SetReadCookie("folder=" + GetReadCookieValue("folder") + "&id=" + prevId);
	GetMessage();
}
function Next()
{
	if (nextId == null) return;
	prevNextFocus = "next";
	SetReadCookie("folder=" + GetReadCookieValue("folder") + "&id=" + nextId);
	GetMessage();
}
function FullScreen()
{
	fullScreenView = true;
	var readframe = document.getElementById("content");
	readframe.style.top = "0px";
	readframe.style.width = "100%";
	readframe.style.pixelHeight = document.body.clientHeight;
	readframe.style.height = "100%";
	content.AdjustHeight();
	content.full.focus();
	document.body.disabled = true;
}
function NormalView()
{
	fullScreenView = false;
	document.body.disabled = false;
	var readframe = document.getElementById("content");
	readframe.style.width = "73%";
	readframe.style.pixelHeight = document.body.clientHeight - 72;
	readframe.style.top = "72px";
	content.AdjustHeight();
	full.focus();
}
function GoWrite(action)
{
	window.location = "writemail.aspx?action=" + action + "&" + GetReadCookie();
}
function UpdatePrevNext()
{
	if (prevId == null)
	{
		prev.disabled = true;
		content.prev.disabled = true;
		if (prevNextFocus == "prev") prevNextFocus = "full";
	}
	else prev.disabled = false;
	if (nextId == null)
	{
		next.disabled = true;
		content.next.disabled = true;
		if (prevNextFocus == "next") prevNextFocus = "full";
	}
	else next.disabled = false;
}
function SetReadFocus()
{
	if (prevNextFocus == null) FocusById("content");
	else if (fullScreenView)
	{
		content._fp.style.display = "inline";
		content._mh.style.top = "35px";
		content.document.getElementById(prevNextFocus).focus();
	}
}
function ShowMail()
{
	document.getElementById("content").style.display = "inline";
	HideProgress();
}