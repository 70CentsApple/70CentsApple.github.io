// 计算时间差
function lastTime(date){
	var s1 = new Date(date);
	s2 = new Date();
	var days = s2.getTime() - s1.getTime();
	var time = parseInt(days / (1000 * 60 * 60 * 24));
	return time;
}

// 控制网页播放背景音乐的Cookies
function setCookie(cname,cvalue,exdays){ // 设置Cookie
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
	bgMusic();
	return 1;
}

function getCookie(cname){ // 获取Cookie
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
	}
	return -1;
}

function delCookie(cname){ // 删除Cookie
	status = setCookie(cname,null,-1)
	if (status == 1){
		return 1;
		}
}

function toggleBgMusic(){
	music = getCookie("music");
	if (music == 0 || music == -1){
		setCookie("music",1,30)
		document.getElementById("bgmusic").innerHTML = '<audio src="http://music.163.com/song/media/outer/url?id=1306507078.mp3" autoplay></audio>';
	}
	else{
		setCookie("music",0,30)
		document.getElementById("bgmusic").innerHTML = '';
	}
	bgMusic();
}

function bgMusic(){ // 检查Cookie并播放背景音乐
	document.getElementById("headLogo").innerHTML = '<a class="icon remixicon ri-headphone-line" title="开/关背景音乐" href="javascript:void(0)" onclick="toggleBgMusic()"></a>'
	var music = getCookie("music");
	if (music != -1){
		if (music == 1){
			document.getElementById("bgmusic").innerHTML = '<audio src="http://music.163.com/song/media/outer/url?id=1306507078.mp3" autoplay></audio>';
			document.getElementById("headLogo").innerHTML = '<a class="icon remixicon ri-headphone-fill" title="开/关背景音乐" href="javascript:void(0)" onclick="toggleBgMusic()"></a>'
		}
		else{
			document.getElementById("bgmusic").innerHTML = '';
		}
	}
	else {
		window.location.href="#bgmusic";
	}
}