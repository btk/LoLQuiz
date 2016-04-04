function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}


var trueAns = 0; 
var usersChoiceRN = 0;
var questionTypeReturn = 0;
var questionCounter = 1;

function openCover() { 
	document.getElementById("cover").className = "cover";
	document.getElementById("share").style.display = "none";
	document.getElementById("skortab").style.display = "none";
	document.getElementById("hakkinda").style.display = "none";
    document.getElementById("cover").style.zIndex = "100";
}
function shareCover(){
openCover();
	document.getElementById("share").style.display = "block";
}
function hakkindaCover(){
openCover();
	document.getElementById("hakkinda").style.display = "block";
	getHakkinda();
}
function skortabCover(){ 
openCover();
	document.getElementById("skortab").style.display = "block";
	document.getElementById("skorO").style.display = "none";
	document.getElementById("skorC").style.display = "block";
	getSkorList(2);
}
function skortabClose(){
closeCover();
	document.getElementById("skorO").style.display = "block";
	document.getElementById("skorC").style.display = "none";
}
function switchBar() {
	if(document.getElementById("bardiv").className == "bardiv"){
	document.getElementById("bardiv").className = "bardiv bardiv-closed";
	}else{
	document.getElementById("bardiv").className = "bardiv";
	}
}

function closeCover() {
	document.getElementById("cover").className = "cover closed";
	document.getElementById("dogru").className = "dogru dogru-top";
	document.getElementById("yanlis").className = "yanlis yanlis-top";
	if(usersChoiceRN){ document.getElementById("c_"+usersChoiceRN+"li").className = ""; }
	document.getElementById("scroller").scrollTop = 0;
}
function trueAnswer(){
	document.getElementById("dogru").className = "dogru";
	updateUser("trueAns");
}
function wrongAnswer(){
	document.getElementById("yanlis").className = "yanlis";
	updateUser("wrongAns");
}
function skipQuestion(){
	updateUser("passQ");
	newQuestion();
}

function choice(c){
openCover();
    document.getElementById("cover").style.zIndex = "102";
	usersChoiceRN = c;
	document.getElementById("c_"+c+"li").className = "onclickChoice";
	if(trueAns == c){
	 trueAnswer();
	}else{
	 wrongAnswer();
	}
	setTimeout(function(){
		newQuestion();
	 }, 1500);
}

function newQuestion() {
     questionCounter++;
    if(questionCounter == 10){ questionCounter = 1; 
     createInterstitial(); }
    openCover();
  var xhttp = new XMLHttpRequest();
  var questionObj;
  xhttp.onreadystatechange=function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      questionObj = JSON.parse(xhttp.responseText);
		
		document.getElementById("itemHolder").style.display = "none";
		
	var questionAskStyle = randomInt(1,3);
	var questionStyle;
	var theQuestionImage;	
	questionTypeReturn = questionObj.type;
	if(questionObj.type==0){
	
	questionStyle = questionObj.data1;
	theQuestionImage = "img/jenerik/"+randomInt(1,12)+".jpg"; //changable
	
	}else if(questionObj.type==1){
	
	data1Split = questionObj.data1.split("|");
	var champName = data1Split[0];
	var champPerma;
		if(!data1Split[1]){ champPerma = data1Split[0]; }else{ champPerma = data1Split[1];  }
		
	if(questionAskStyle == 1){ questionStyle = ""+champName+" şampiyonunun takma ismi, aşağıdaki şıklardan hangisidir?"; }else 
	if(questionAskStyle == 2){ questionStyle = ""+champName+" şampiyonunun takma ismi, aşağıdaki seçeneklerden hangisidir?"; }else
	if(questionAskStyle == 3){ questionStyle = "Aşağıdaki seçeneklerden hangisi "+champName+" şampiyonunun takma ismi olarak kullanılır?";	}
	
	theQuestionImage = "img/sampiyon/"+champPerma+".jpg";
	
	}else if(questionObj.type==2){
	
	var champSub = questionObj.data1;
	if(questionAskStyle == 1){ questionStyle = champSub+ " takma adı, aşağıdaki şampiyonlardan hangisi için kullanılır?";}else 
	if(questionAskStyle == 2){ questionStyle = champSub+ " takma adı, aşağıdaki şıklardaki hangi şampiyon için kullanılır?";}else 
	if(questionAskStyle == 3){ questionStyle = "Aşağıdaki şampiyonlardan hangisi için "+champSub+" takma adı kullanılır?";}
	
	theQuestionImage = "img/jenerik/"+randomInt(1,12)+".jpg"; //changable
	
	}else if(questionObj.type==3){
	
	var champPerma = questionObj.data1;
	if(questionAskStyle == 1){ questionStyle = "Resimde gördüğünüz silüet hangi LOL şampiyonuna aittir?";}else 
	if(questionAskStyle == 2){ questionStyle = "Yukarıdaki resimde gördüğünüz negatif resim aşağıdakilerden hangisine aittir?";}else 
	if(questionAskStyle == 3){ questionStyle = "Aşağıdaki şampiyonlardan hangisi yukarıdaki resimdeki silütte sahiptir?"; }
	
	theQuestionImage = "img/siluet/"+champPerma+".jpg";
	
	}else if(questionObj.type==4){
	
	var factionID = questionObj.data1;
	var factionName = questionObj.data2;
	if(questionAskStyle == 1){ questionStyle = "Aşağıdaki şampiyonlardan hangisi "+factionName+" krallığına bağlıdır?";}else 
	if(questionAskStyle == 2){ questionStyle = "Aşağıdakilarden hangisi "+factionName+" krallığına bağlı bir şampiyondur?";}else 
	if(questionAskStyle == 3){ questionStyle = "Aşağıda verilen şampiyonlardan hangisi "+factionName+" krallığı adına savaşmaktadır?";}
	
	theQuestionImage = "img/krallik/"+factionID+".jpg";
	
	}else if(questionObj.type==5){
	
	var champName = questionObj.data1;
	var champPerma = questionObj.data2;
	if(!champPerma){ champPerma = champName; }
	if(questionAskStyle == 1){ questionStyle = champName + " aşağıdaki seçeneklerdeki hangi krallığa bağlı olarak savaşmaktadır?";}else 
	if(questionAskStyle == 2){ questionStyle = champName + " aşağıdaki krallıklardan hangisine bağlıdır?"; }else 
	if(questionAskStyle == 3){ questionStyle = "Aşağıdaki krallıklardan hangisi "+champName+" şampiyonunun bağlı olduğu krallıktır?";}
	
	theQuestionImage = "img/sampiyon/"+champPerma+".jpg";
	
	}else if(questionObj.type==6){
	
	var factionID = questionObj.data1;
	var factionName = questionObj.data2;
	if(questionAskStyle == 1){ questionStyle = "Aşağıdaki şampiyonlardan hangisi "+factionName+" bölgesinde/krallığında doğmuştur?";}else 
	if(questionAskStyle == 2){ questionStyle = "Aşağıdakilarden hangisi "+factionName+" bölgesinde/krallığında doğmuş bir şampiyondur?";}else 
	if(questionAskStyle == 3){ questionStyle = "Aşağıda verilen şampiyonlardan hangisinin doğum yeri "+factionName+" krallığı/bölgesidir?";}
	
	theQuestionImage = "img/krallik/"+factionID+".jpg";
	
	}else if(questionObj.type==7){
	
	var champName = questionObj.data1;
	var champPerma = questionObj.data2;
	if(!champPerma){ champPerma = champName; }
	if(questionAskStyle == 1){ questionStyle = champName + " aşağıdaki seçeneklerdeki hangi krallıkta/bölgede doğmuştur?";}else 
	if(questionAskStyle == 2){ questionStyle = champName + " aşağıdaki krallıklardan/bölgelerden hangisinde doğmuştur?"; }else 
	if(questionAskStyle == 3){ questionStyle = "Aşağıdaki krallıklardan/bölgelerden hangisi "+champName+" şampiyonunun doğum yeridir?";}
	
	theQuestionImage = "img/sampiyon/"+champPerma+".jpg";
	
	}else if(questionObj.type==8){
	
	var champName = questionObj.data1;
	var champPerma = questionObj.data2;
	if(!champPerma){ champPerma = champName; }
	if(questionAskStyle == 1){ questionStyle = champName + " aşağıdaki şampiyonlardan hangisi ile arkadaştır?";}else 
	if(questionAskStyle == 2){ questionStyle = champName + " şampiyonu seçeneklerdeklerden hangisi ile arkadaştır?"; }else 
	if(questionAskStyle == 3){ questionStyle = "Aşağıdaki şampiyonlardan hangisi "+champName+" ile arkadaştır?";}
	
	theQuestionImage = "img/sampiyon/"+champPerma+".jpg";
	
	}else if(questionObj.type==9){
	
	var champName = questionObj.data1;
	var champPerma = questionObj.data2;
	if(!champPerma){ champPerma = champName; }
	if(questionAskStyle == 1){ questionStyle = champName + " aşağıdaki şampiyonlardan hangisi ile düşmandır?";}else 
	if(questionAskStyle == 2){ questionStyle = champName + " şampiyonu seçeneklerdeklerden hangisi ile düşmandır?"; }else 
	if(questionAskStyle == 3){ questionStyle = "Aşağıdaki şampiyonlardan hangisi "+champName+" ile düşmandır?";}
	
	theQuestionImage = "img/sampiyon/"+champPerma+".jpg";
	
	}else if(questionObj.type==10){
	if(questionAskStyle == 1){ questionStyle = "Şıklardaki şampiyon ikililerinden hangisi arkadaştır?";}else 
	if(questionAskStyle == 2){ questionStyle = "Aşağıdaki şampiyon ikililerinden hangileri birbiri ile arkadaştır?"; }else 
	if(questionAskStyle == 3){ questionStyle = "Verilen şampiyon ikililerinden hangi ikili arkadaştır?";}
	 
	theQuestionImage = "img/jenerik/"+randomInt(1,12)+".jpg"; //changable
	
	}else if(questionObj.type==11){
	if(questionAskStyle == 1){ questionStyle = "Şıklardaki şampiyon ikililerinden hangisi düşmandır?";}else 
	if(questionAskStyle == 2){ questionStyle = "Aşağıdaki şampiyon ikililerinden hangileri birbiri ile düşmandır?"; }else 
	if(questionAskStyle == 3){ questionStyle = "Verilen şampiyon ikililerinden hangi ikili düşmandır?";}
	 
	theQuestionImage = "img/jenerik/"+randomInt(1,12)+".jpg"; //changable
	
	}else if(questionObj.type==12){
	var data2sp = questionObj.data2.split(",");
	document.getElementById("itemHolder").style.display = "block";
	document.getElementById("itemIcon").src = "img/beceri/"+data2sp[0]+".jpg";
	document.getElementById("itemName").innerHTML = questionObj.data1;
	var borp;
	if(data2sp[1]=="P"){ borp = "pasifi"; }else{ borp = "becerisi"; }
	if(questionAskStyle == 1){ questionStyle = "Yukarıda resmini gördüğünüz "+questionObj.data1+" "+borp+" hangi şampiyona aittir?";}else 
	if(questionAskStyle == 2){ questionStyle = "İkon resmi görülen "+questionObj.data1+" "+borp+" hangi şampiyona aittir?"; }else 
	if(questionAskStyle == 3){ questionStyle = "İkonu yukarıda bulunan "+questionObj.data1+" "+borp+" hangi şampiyonundur?"; }
	 
	theQuestionImage = "img/jenerik/1.jpg"; //changable
	
	}else if(questionObj.type==13){
	var borp;
	if(questionAskStyle == 1){ questionStyle = "Aşağıdaki beceri ya da pasiflerden hangisi "+questionObj.data1+" şampiyonuna aittir?";}else 
	if(questionAskStyle == 2){ questionStyle = "Seçeneklerdeki becerilerin/pasiflerin hangisi "+questionObj.data1+" şampiyonuna aittir?"; }else 
	if(questionAskStyle == 3){ questionStyle = "Aşağıdaki Seçeneklerdeki beceri veya pasiflerin hangisi "+questionObj.data1+" şampiyonunundur?";  }
	 
	theQuestionImage = "img/sampiyon/"+questionObj.data2+".jpg"; //changable
	}else if(questionObj.type==14){
	
	var quote = questionObj.data1;
	if(questionAskStyle == 1){ questionStyle = '"' + quote+ '" sözünü hangi şampiyon söyler?'; }else 
	if(questionAskStyle == 2){ questionStyle = '"' + quote+ '" sözü hangi şampiyon tarafından söylenir?';}else 
	if(questionAskStyle == 3){ questionStyle = '"' + quote+ '" sözlerini hangi şampiyon kullanır?';}
	
	theQuestionImage = "img/jenerik/"+randomInt(1,12)+".jpg"; //changable
	
	}
		
		
	// On every question tasks
	var img = new Image();
		img.onload = function(){
			setTimeout(function(){
				document.getElementById("questionImage").src = theQuestionImage;
				closeCover();
			}, 200); 
		};
	img.src = theQuestionImage;
		
		setTimeout(function(){
			document.getElementById("questionText").innerHTML = questionStyle;
			trueAns = questionObj.t;
			document.getElementById("c_1").innerHTML = questionObj.a;
			document.getElementById("c_2").innerHTML = questionObj.b;
			document.getElementById("c_3").innerHTML = questionObj.c;
			document.getElementById("c_4").innerHTML = questionObj.d;
		}, 200); 
    }
  };
  xhttp.open("GET", "http://www.lolquiz.org/app/randq.php?nottype="+questionTypeReturn, true);
  xhttp.send();
  
}

window.onload = onloadFunction;

function onloadFunction(){
        checkAndroid();
        var theUserId = localStorage.getItem("userID");
        if(theUserId){
            getLogin(2);
        }else{
            loginScreen();
        }
}

function loginScreen(){
	document.getElementById("game").style.display = "none";
	document.getElementById("login").style.display = "block";
}

function getSkorList(page){
var userxhttp = new XMLHttpRequest();
				userxhttp.onreadystatechange=function() {
				if (userxhttp.readyState == 4 && userxhttp.status == 200) {
				  document.getElementById("skorlist").innerHTML = userxhttp.responseText + "<div id='menu'><li onclick='getSkorList(2)'>Haftalık Sıralama</li><li class='cikis' onclick='getSkorList(1)'>Genel Sıralama</li></div>";
				 }
				};
			  userxhttp.open("GET", "http://www.lolquiz.org/app/skor.php?page="+page, true);
			  userxhttp.send();
}

function getHakkinda(){
var userxhttp = new XMLHttpRequest();
				userxhttp.onreadystatechange=function() {
				if (userxhttp.readyState == 4 && userxhttp.status == 200) {
				  document.getElementById("hakkinda").innerHTML = userxhttp.responseText+ '<div class="cclose" id="coverClose" onclick="closeCover()">Sayfayı Kapat</div>';
				 }
				};
			  userxhttp.open("GET", "http://www.lolquiz.org/app/hakkinda.php", true);
			  userxhttp.send();
}

function checkAndroid(){
    user_agent = navigator.userAgent.toLowerCase();
    if(!(user_agent.indexOf('chrome') > -1)){
	    link = document.createElement( "link" );
        link.href = "android.css";
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";
        document.getElementsByTagName("head")[0].appendChild( link );
    }
}