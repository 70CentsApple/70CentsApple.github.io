// 控制台小彩蛋
const WATERMARK = " \
  _____ ___   ____           _          _                _       \n \
 |___  / _ \\ / ___|___ _ __ | |_ ___   / \\   _ __  _ __ | | ___  \n \
    / / | | | |   / _ \\ \'_ \\| __/ __| / _ \\ | \'_ \\| \'_ \\| |/ _ \\ \n \
   / /| |_| | |__|  __/ | | | |_\\__ \\/ ___ \\| |_) | |_) | |  __/ \n \
  /_/  \\___/ \\____\\___|_| |_|\\__|___/_/   \\_\\ .__/| .__/|_|\\___| \n \
                                            |_|   |_|            \
";
console.info('%c' + WATERMARK, 'color:#52733e;font-size:6px'); // 水印
console.info('%c欢迎来到苹果的小站(=^·v·^=)', 'color:#52733e;font-size:30px;font-weight: bold'); // 水印

// 计算时间差
function lastTime(date) {
	var s1 = new Date(date); // 获取过去时间
	s2 = new Date(); // 获取现在时间
	var days = s2.getTime() - s1.getTime(); // 获取时间差（毫秒）
	var time = parseInt(days / (1000 * 60 * 60 * 24)); // 时间差换算成天数
	return time;
}

// 生成随机数（在minNum和maxNum之间）
function randomNum(minNum, maxNum) { // 这部分是抄的
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}

// 控制网页播放背景音乐的Cookie

// 设置Cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date(); // 获取目前时间
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); // 目前时间加上exdays(过期天数)
	var expires = "expires=" + d.toGMTString(); // 格式化过期日期
	document.cookie = cname + "=" + cvalue + "; " + expires; // 设置Cookie
	bgMusic(); // 设置完成后刷新（大概）
	return 1; // 成功码
}

// 获取Cookie
function getCookie(cname) {  // 这部分是抄的，大概就是根据关键字从一长串字符串中提取数据（或许用正则表达式RegEx会方便一点（？））
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
	}
	return -1; // 失败码
}

// 删除Cookie
function delCookie(cname) {
	return setCookie(cname, null, -1); // 原理：把过期天数设置成过去的任何一天（相当于已过期）
}

function toggleBgMusic() {
	music = getCookie("music"); // 获取Cookie "music"的值，0为不播放，1为播放，-1为不存在
	if (music == 0 || music == -1) { // 如果Cookie为没有或不播放
		setCookie("music", 1, 30) // 如果没有播放，点击后Cookie设置成播放，开始播放
		t = setTimeout(function () {
			playMusic();
		}, 1000)
	}
	else {
		setCookie("music", 0, 30) // 如果正在播放，点击后停止播放
		t = setTimeout(function () {
			stopMusic();
		}, 1000)
	}
	bgMusic(); // 设置完成后刷新（大概）
}

function bgMusic() { // 检查Cookie并播放背景音乐
	// document.getElementById("headLogo").innerHTML = '<a class="icon remixicon ri-headphone-line" title="开/关背景音乐" href="javascript:void(0)" onclick="toggleBgMusic()"></a>'
	var music = getCookie("music"); // 获取Cookie "music"的值，0为不播放，1为播放，-1为不存在
	if (music != -1) { // 如果Cookie存在
		if (music == 1) { // 如果Cookie为播放音乐
			t = setTimeout(function () {
				playMusic();
			}, 1000)
		}
		else { // 如果Cookie为不播放音乐
			t = setTimeout(function () {
				stopMusic();
			}, 1000)
		}
	}
	else {
		window.location.href = "#bgm"; // 跳转到询问是否播放音乐的网页
	}
}

var music = []
initialMusic() // 加载时初始化音乐随机列表
var presentMusic;
pickRandomMusic() // 随机选择幸运歌曲

// 初始化音乐列表
function initialMusic() { // push内分别为：歌曲id、音量、歌曲时间轴、时间轴对应译文
	// Can we kiss forever?
	// music.push([1306507078, 1, [0, 1, 9.23, 12.42, 18, 22.58, 26.81, 34.38, 39.53, 41.78, 104.82, 112.69, 121.93, 130.98], [['作词 : Kina/Adriana Proenza'], ['作曲 : Kina/Adriana Proenza'], ['I try to reach you', '我努力靠近你'], ["I can't hide how strong's the feeling when we dive", '与你共处时 情感无处隐藏'], ['I cross the ocean of my mind', '我只身一人游过心海'], ['Our wounds are healing with the salt', '用海盐痊愈伤口'], ['All my senses intensify whenever you and I', '与你共处时 所有感知被放大'], ['We dive across the ocean of my mind', '我们一起坠入心海'], ['But in the end I drown', '但到最后我溺死在你的深海'], ['You push me down,down', '你让我越陷越深'], ['All the shame', '所有的不堪'], ['When you called my name', '当你呼唤我的名字时'], ['I felt pain', '感觉痛苦降临'], ['When you came', '当你到来时']]
	// ])

	// world.execute(me) ; (Mili)
	music.push([435278010, 1, [0.1, 1.74, 2.92, 3.873, 5.491, 6.38, 7.446, 10.091, 11.095, 12.906, 13.891, 16, 29.709, 31.116, 32.682, 33.412, 34.646, 36.287, 37.067, 38.596, 40.049, 40.706, 42.346, 43.507, 44.452, 45.85, 47.672, 49.534, 51.363, 53.225, 55.083, 56.916, 59.223, 59.687, 61.958, 62.589, 63.535, 65.397, 66.601, 68.252, 69.259, 70.084, 71.764, 73.169, 74.045, 75.422, 76.959, 77.576, 79.226, 80.62, 81.351, 82.833, 84.268, 85.078, 86.538, 87.922, 88.587, 90.197, 92.015, 93.953, 95.465, 97.739, 99.349, 101.474, 103.489, 104.197, 106.293, 107.22, 107.903, 110.221, 110.9, 112.22, 113.1, 114.18, 114.92, 115.78, 117.274, 118.333, 118.979, 120.86, 121.728, 122.714, 124.89, 125.708, 128.661, 131.224, 147.66, 148.6, 149.52, 150.54, 151.52, 152.28, 153.16, 153.98, 155.2, 156.08, 157.04, 158, 158.9, 159.321, 159.657, 160.244, 160.693, 161.124, 161.584, 162.632, 163.315, 165.166, 166.016, 167.022, 168.911, 169.824, 171.868, 172.712, 173.643, 174.975, 177.246, 178.173, 179.929, 180.857, 181.901, 183.646, 184.54, 187.665, 188.483, 189.746, 190.801, 191.356, 205.811], [['Switch on the power line', '接上电源'], ['Remember to put on', '记得装备好'], ['PROTECTION', '绝缘护具'], ['Lay down your pieces', '摆好棋子'], ["And let's begin", '开始吧'], ['OBJECT CREATION', '对象生成'], ['Fill in my data parameters', '输入我的参数'], ['INITIALIZATION', '数据初始化'], ['Set up our new world', '设定好我们的新世界'], ["And let's begin the", '开始吧'], ['SIMULATION', '模拟程序'], ['world.execute(me);', '（间奏）'], ["If I'm a set of points", '如果我是一组点'], ['Then I will give you my', '那么我将献给你'], ['DIMENSION', '我的次元'], ["If I'm a circle", '如果我是一个圆'], ['Then I will give you my', '那么我将献给你'], ['CIRCUMFERENCE', '我的圆周'], ["If I'm a sine wave", '如果我是一条正弦波'], ['Then you can sit on all my', '那么请你坐上'], ['TANGENTS', '我的切线'], ['If I approach infinity', '如果我趋近于无穷'], ['Then you can be my', ' 那么你便可以成为'], ['LIMITATIONS', '我的极限'], ['Switch my current', '切换我的电流'], ['To AC to DC', '从交流到直流'], ['And then blind my vision', '然后蒙上我的眼睛'], ['So dizzy so dizzy', '头晕目眩'], ['Oh we can travel', '我们可以穿越时空'], ['To A.D to B.C', '从公元前到现代'], ['And we can unite', '然后成为一体'], ['So deeply so deeply', '深深入髓'], ['If I can', '如果我能'], ['If I can give you all the', '如果我能够献给你'], ['STIMULATIONS', '所有的刺激'], ['Then I can', '那么我就能够'], ['Then I can be your only', '那么我就能够成为你'], ['SATISFACTION', '唯一的满足'], ['If I can make you happy', '如果我能够让你开心'], ['I will run the', '那么我将'], ['EXECUTION', '执行指令'], ['Though we are trapped', '但我们被困'], ['In this strange strange', '在这个异乎寻常的'], ['SIMULATION', '模拟程序之中'], ["If I'm an eggplant", '如果我是一根茄子'], ['Then I will give you my', '那么我将献给你'], ['NUTRIENTS', '我的营养'], ["If I'm a tomato", '如果 我是一颗番茄'], ['Then I will give you', '那么我将献给你'], ['ANTIOXIDANTS', '我的抗氧化物'], ["If I'm a tabby cat", '如果我是一只花猫'], ['Then I will purr for your', '那么我将为你咕噜咕噜'], ['ENJOYMENT', '只要你喜欢'], ["If I'm the only god", '如果我是唯一的神'], ["Then you're the proof of my", '那么你将是我'], ['EXISTENCE', '存在的证明'], ['Switch my gender', '切换我的性别'], ['To F to M', '从女到男'], ['And then do whatever', '只做想做的事'], ['From AM to PM', '从早到晚'], ['Oh switch my role', '切换我的角色'], ['To S to M', '从施虐者到受虐者'], ['So we can enter', '这样我们就可以'], ['The trance the trance', '恍惚出神'], ['If I can', '如果我能'], ['If I can feel your', '如果我能够感受到'], ['VIBRATIONS', '你的振动'], ['Then I can', '那么我就能够'], ['Then I can finally be', '那么我就终于能够'], ['COMPLETION', '变为完全'], ['Though you have left', '但你还是走了'], ['You have left', '你走了'], ['You have left', '你走了'], ['You have left', ' 你走了'], ['You have left', '你走了'], ['You have left me in', '你离我而去'], ['ISOLATION', '在孤独之中'], ['If I can', '如果我能'], ['If I can erase all the pointless', '如果我能够消去'], ['FRAGMENTS', '这些无意义的碎片'], ['Then maybe', '那么我就可能'], ["Then maybe you won't leave me so", '那么我就可能不会'], ['DISHEARTENED', '如此失望'], ['Challenging your god', '与神做对'], ['You have made some', '你传给我的是'], ['ILLEGAL ARGUMENTS', '非法参数'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EXECUTION', '执行'], ['EIN', '一（德语）'], ['DOS', '二（西班牙语）'], ['TROIS', '三（法语）'], ['NE', '四（韩语）'], ['FEM', ' 五（瑞典语）'], ['LIU', '六（汉语）'], ['EXECUTION', '死刑'], ['If I can', '如果我能'], ['If I can give them all the', '如果我能够给所有人'], ['EXECUTION', '赐予死刑'], ['Then I can', '那么我就能够'], ['Then I can be your only', '那么我就能够成为'], ['EXECUTION', '你唯一的执行'], ['If I can have you back', '如果你能够回到我身边'], ['I will run the', '那么我 将'], ['EXECUTION', '执行指令'], ['Though we are trapped', '但我们始终被困'], ['We are trapped ah', '始终被困'], ["I've studied", '我学会了'], ["I've studied how to properly", '我学会了'], ['LO-O-OVE', '如何正确去爱'], ['Question me', '提问我吧'], ['Question me I can answer all', '我全都能答对'], ['LO-O-OVE', '只要是爱的问题'], ['I know the algebraic expression of', '就连爱的代数表达式'], ['LO-O-OVE', '我都知道'], ['Though you are free', '虽然你已自由'], ['I am trapped', '我 仍被困'], ['Trapped in', '我仍被困'], ['LO-O-OVE', '在爱之中'], ['EXECUTION', '执行死刑']]
	])

	// Lemonade (Mili)
	music.push([554245890, 0.5, [0, 1, 12.66, 16.46, 25.07, 31.54, 32.91, 36.38, 38.48, 39.32, 42.72, 44.94, 47.05, 47.81, 51.33, 53.44, 55.66, 56.32, 59.79, 62, 64.07, 68.3, 76.68, 85.25, 92.97, 100.1, 101.38, 104.9, 107.06, 107.86, 111.18, 113.44, 115.6, 116.36, 119.82, 121.98, 124.1, 124.86, 128.34, 130.5, 132.67, 136.81, 140.78, 143.35, 149.38, 151.9, 153.5, 162.18, 168.67, 169.98, 175.07, 179.34, 183.52], [['作词 : momocashew'], ['作曲 : momocashew/Yamato Kasai'], ['编曲 : Yamato Kasai'], ["Sparkling leftover lemonade you'll never touch", '杯中残留的柠檬水 闪闪发光 却无法触摸其形'], ['Tripped over my knock-off ittala cup', '仿制的伊塔拉杯 把我狠狠绊倒'], ['Lemonade', '柠檬水'], ['It spills all over (over and over)', '向四处飞溅开来 （不断溢出）'], ['Over (over and over)', '溢出 （流动不停）'], ['Over', '流动'], ['No matter how much I clean it up', '无论我 怎样清理 依然'], ['Over (over and over)', '流至 （不断溢出）'], ['Over (over and over)', '各处 （流动不停）'], ['Over', '角落'], ['Lemonade sinks into the floor', '柠檬水将地板浸透'], ['Over (over and over)', '流至 （不断溢出）'], ['Over (over and over)', '各处 （流动不停）'], ['Over', '角落'], ['No matter how much I lick it off', '无论我如何舔舐 依然'], ['Over (over and over)', '溢出 （不断溢出）'], ['Over (over and over)', '流淌 （流动不停）'], ['Over and over and over and over', '遍布于各个角落之中'], ['You said I make the best lemonade in the world', '你曾说过 我制作的柠檬水是天下绝品'], ['A little bitter, a little sweet, a little sour', '有一丝苦涩，一缕清甜，还略带酸香'], ["Now that you're gone so much lemonade gets left over", '自从你离开以后 很多的柠檬水都会浪费'], ['Waiting to be drank I wish that person could be you', '我多么希望 我所等待着的 能将它们一饮而尽的人是你啊'], ['Lemonade', '柠檬水'], ['It spills all over (over and over)', ' 向四处飞溅开来 （不断溢出）'], ['Over (over and over)', '溢出 （流动不停）'], ['Over', '流动'], ['No matter how much I want you back', '无论我多么企盼你能归来 依然'], ['Over (over and over)', '流至 （不断溢出）'], ['Over (over and over)', '各处 （流动不停）'], ['Over', '角落'], ['Lemonade stains my pillowcase', '柠檬水染脏了我的枕套'], ['Over (over and over)', '流至 （不断溢出）'], ['Over (over and over)', '各处 （流动不停）'], ['Over', '角落'], ['No matter how much I wipe it off', '无论我如何擦拭 依然'], ['Over (over and over)', '溢出 （不断溢出）'], ['Over (over and over)', '流淌 （流动不停 ）'], ['Over and over and over and over', '遍布于各个角落之中'], ['Over', '一而再'], ['And over', '再而三'], ['Over and over', '流动不停'], ['And over', '继续穿行'], ['And over', '不断流淌'], ["Sparkling leftover lemonade you'll never touch", '杯中残留的柠檬水 闪闪发光 却无法触摸其形'], ['Tripped over my knock-off ittala cup', '仿制的伊塔拉杯 把我狠狠绊倒'], ['Lemonade', '柠檬水'], ['It spills all over', '向四处飞溅开来'], ['And over', '不断溢出'], ['All over', '全部洒尽'], ['And over', '流动不停']]
	])

	// Aurora (Kirara Magic)
	music.push([1388770902, 0.6, [0, 1, 5.814, 8.958, 10.707, 12.207, 18.457, 25.957, 29.957, 36.206, 42.456, 49.206, 60.206, 87.204, 93.454, 100.203, 104.453, 110.703, 116.702, 123.202, 129.202, 134.702, 161.451, 167.7, 172.2, 174.95, 180.949, 187.449, 191.199], [['作词 : Kirara Magic'], ['作曲 : Kirara Magic'], ['Music：Kirara Magic', '作曲/编曲/混音/母带：Kirara Magic'], ['Lyrics：Kirara Magic', '作词：Kirara Magic'], ['Singer：Shion Lee', '演唱：李紫音'], ['静かな世界で 私だけ', '寂静的世界 只有我一人'], ['記憶の狭間に 君を探す', '在记忆的夹缝中 寻找着你'], ['ねえ 聞こえるかな', '呐 你听到了吗'], ['空中揺れてる 光が', '空 中摇曳着的 那道光'], ['歩いている 冷たい風の中', '向前一直走 在寒冷的风中'], ['雪の結晶が 空へ舞い落ちる', '雪的结晶 从 空中飘落'], ['星の光を集めて 思い重ねたある夢は', '星星的光聚集起来 思念重叠的那个梦境'], ['オーロラ', '极光'], ['海の彼方も\u3000空の向こうも', '海的另一边 天空的对面'], ['世界の果てにも 君はいない', '即使在世界的尽头 都没有你'], ['ねえ 夢は終わる', '呐 梦已经结束'], ['溢れていた 星の涙', '满溢出的 星之泪'], ['沈んている 深い闇の中', '缓缓地向下沉 在深深的 黑暗中'], ['遠くの声が 私を呼んでいだ', '遥远的声音 在呼唤着我'], ['その声を 辿れるなら', '那个声音 如果能达到的话'], ['冬の奇跡に祈る', '就向冬天的奇迹祈祷吧'], ['you and me', '你和我能再次相会'], ['愿いがかなあうなら', '愿望如果能够实现的话'], ['もう一度抱きしめて欲しい', '我想再一次拥抱你'], ['I miss you', '我想念你'], ['止まらないの\u3000 時の流れ', '停 不下来的 时间在流逝着'], ['全て忘れそう I need you', '一切都快忘记了一般 我需要你'], ['長くなれる 距離', '逐渐变长的 距 离'], ['目を閉じれば まだ戻れるのかな', '如果闭上眼睛的话 能否再回到过去呢']]
	])

	// Away with me
	music.push([1488808023, 1, [0, 1, 2.518, 4.555, 6.959, 9.409, 12.143, 14.494, 16.852, 19.192, 21.707, 26.386, 28.787, 31.248, 36.046, 38.182, 40.896, 43.173, 45.668, 48.008, 50.466, 52.643, 55.22, 57.562, 62.453, 64.928, 67.135, 69.608, 72.066, 74.434, 76.836, 79.225, 81.657, 86.455, 88.844, 91.297, 95.793, 98.371, 100.836, 101.574, 103.256, 107.298, 108.618, 109.407, 110.62, 119.297, 120.018, 124.899, 126.931, 129.617, 134.427, 136.533, 139.183, 141.371, 143.953, 146.223, 148.773, 150.99, 153.587, 155.807], [['作词 : Raychel Jay / Danny Moon'], ['作曲 : Tomggg / Raychel Jay / Danny Moon'], ['Walking through the park with a flower in my hand', '手拿鲜花穿过公园'], ["Got nothin' in my pocket but a dollar to spend", '我口袋里只有一美元可花'], ["Got your music in my phone and I'm playing it loud", '我手机里有你的音乐，我把它放得很响'], ["I think it's alright and a bunny in the clouds", '我觉得没关系，云中有一只兔子'], ['Falling in the grass that is suddenly green', '落在突然变绿的草地上'], ["This guy's looking bluer by the second he's seen", '这家伙一看到就脸色发青了'], ['The queen is on the throne with a crown on her head', '女王坐在王位上，头上戴着王冠'], ["I'm bouta take a nap when she suddenly say", '我正要小睡时，她突然说'], ['"Come away with me, forever', '永远跟我走吧'], ["There's a place I know where the flowers grow", '有一个地方我知道那里的花生长'], ['And everything is made of prune', '一切都是用李子做的'], ['Just stay with me, together', '跟我在一起，一起'], ["There's a million colours in my mind", '我脑子里有一百万种颜色'], ['And they all seem to want to find', '他们似乎都想找到'], ['Forever, together', '永远，在一起'], ["It's a long long time but it's whatever", '这是很长很长的时间，但不管怎样'], ['No matter the weather', '不管天气如何'], ["I'll be by your side till it gets better", '我会一直在你身边直到情况好转'], ['Together, forever', '一起，永远'], ["It's a long long time but it's whatever", '这是很长很长的时间，但不管怎样'], ['No matter the weather', '不管天气如何'], ['I\'ll be by your side forever."', '我会永远在你身边'], ["Sittin' by the pool with my troubles at my feet", '坐在池边，我的烦恼就在脚下'], ["Chillin' all alone but I'm feeling complete", '一个人冷着，但我感觉很完整'], ["I hear you say my name, now the sun's comin' out", '我听见你叫我的名字，现在太阳出来了'], ["I thought that you were gone but you were hidin' in the clouds", '我以为你走了，但你躲在云层里'], ["Let's go on a picnic, we can play hide and seek", '我们去野餐吧，我们可以玩捉迷藏'], ['And then we get tired we can nap in the trees', '然后我们累了，可以在树上小睡'], ["I'm singing with the birds yeah they taught me some tunes", '我和鸟儿一起唱歌是的它们教了我一些曲子'], ['I think after this summer, fly to the moon', '我想过了这个夏天，飞到月球上去吧'], ['Come away with me, forever', '永远跟我走吧'], ["There's a place I know where the flowers grow", '有一个地方我知道那里的花生长'], ['And everything is made of prune', '一切都是用李子做的'], ['Just stay with me, together', '跟我在一起，永远'], ["There's a million colours in my mind", '我脑子里有一百万种颜色'], ['And they all seem to want to find', '他们似乎都想找到'], ['(Forever)', '（永远）'], ['Ooh', '噢'], ["I know it's a long, long time", '我知道这是很长很长的时间'], ['But you know', '但你知道'], ['But you know', '但你知道'], ['Ooh', '噢'], ['I can see it in your smile', '我可以从你的微笑中看到'], ['So do you wanna', '所以你想'], ['Come away with me, forever', '永远跟我走吧'], ["There's a place I know where the flowers grow", '有一个地方我知道那里花生长'], ['And everything is made of prune', '一切都是用李子做的'], ['Just stay with me, together', '跟我一起，永远'], ["There's a million colours in my mind", '我脑子里有一百万种颜色'], ['And they all seem to want to find', '他们似乎都想找到'], ['Forever, together', '永远，在一起'], ["It's a long, long time but it's whatever", '这是很长很长的时间，但不管怎样'], ['No matter the weather', '不管天气如何'], ["I'll be by your side till it gets better", '我会一直在你身边直到情况好转'], ['Together, forever', '一起，永远'], ["It's a long, long time but it's whatever", '这是很长很长的时间，但不管怎样'], ['No matter the weather', '不管天气如何'], ["I'll be by your side forever", '我会永远在你身边']]
	])
}

musicLength() // 加载后将随机歌曲个数打印到网页上
// 将随机歌曲个数打印到网页上
function musicLength() {
	document.getElementById("musicLength").innerHTML = music.length
}

// 播放音乐 若initMusic为真则重新渲染歌词
function playMusic(initMusic = 0) {
	if (initMusic) { lyrics(); }
	document.getElementById("bgmusic").innerHTML = '<audio id="rawMusic" src="http://music.163.com/song/media/outer/url?id=' + presentMusic[0] + '.mp3" autoplay></audio>';
	document.getElementById("rawMusic").volume = presentMusic[1]
	// document.getElementById("headLogo").innerHTML = '<a class="icon remixicon ri-headphone-fill" title="开/关背景音乐" href="javascript:void(0)" onclick="toggleBgMusic()"></a>'
}

// 停止播放音乐
function stopMusic() {
	document.getElementById("bgmusic").innerHTML = '';
	// document.getElementById("headLogo").innerHTML = '<a class="icon remixicon ri-headphone-line" title="开/关背景音乐" href="javascript:void(0)" onclick="toggleBgMusic()"></a>'
}

// 随机选择幸运歌曲
function pickRandomMusic() {
	presentMusic = music[randomNum(0, music.length - 1)] // 将presentMusic设置为 0 ~ 歌词长度-1 随机一数
}

// 歌词功能
function lyrics() {
	pickRandomMusic()

	var t; // 时间轴object
	var timeStamp = presentMusic[2]; // 时间轴列表
	var lyrics = presentMusic[3]; // 歌词列表
	var lyricElement = document.getElementById("lyrics"); // 网页id为lyrics的对象（Footer）
	var i = 0; // 歌词播放进度（计数器）

	generateTimeStamp()
	// 生成时间轴
	function generateTimeStamp() {
		for (var j = 0; j < timeStamp.length; j++) { // 遍历时间轴
			t = setTimeout(function () { renderLyrics() }, timeStamp[j] * 1000); // 到对应时间轴就渲染一次歌词
		}

		t = setTimeout(function () { // 渲染最后一句完成后2500ms把对应文本渲染到Footer
			lyricElement.innerHTML = '七毛钱的苹果 背景图PixivID <a href="https://www.pixiv.net/artworks/83662289">83662289</a><br />如果想要再次听音乐请刷新(´·v·`)'
		}, timeStamp[j - 1] * 1000 + 2500)
	}

	// 渲染歌词到网页Footer
	function renderLyrics() {
		if (lyrics[i][1] != undefined) { // 双语
			lyricElement.innerHTML = lyrics[i][0] + "<br />" + lyrics[i][1]; // 双语
		}
		else { // 单语
			lyricElement.innerHTML = lyrics[i][0] + "<br />&nbsp"; // 单语（在第二行放空格）
		}
		i++; // 渲染完把进度i自增1（下次调用就是下一句）
	}
}
