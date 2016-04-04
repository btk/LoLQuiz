     openFB.init({appId: '423894357806639'});

    function loginButton() {
        openFB.login(
                function(response) {
                    if(response.status === 'connected') {
                        getLogin();
                    } else { 
                        alert('Facebook login failed: ' + response.error);
                    }
                }, {scope: 'email'});
    }
        
 function setLoggedUser(theID){ 
  window.userID = theID;
     localStorage.setItem("userID", theID); 
  }
  function getLoggedUserId(){
          return window.userID;
  }
        
     function updateUser(thing){
	 var theUserId = getLoggedUserId();
	 if(theUserId){
		 var currP = document.getElementById("currentPoint");
		 var tP = document.getElementById("tPoint");
		 var fP = document.getElementById("fPoint");
		 var pP = document.getElementById("pPoint");
		if((parseInt(currP.innerHTML) <= 2) && (thing!="trueAns")){
		
		}else{
		 var updateReq = new XMLHttpRequest();
		 updateReq.open("GET", "http://www.lolquiz.org/app/user.php?fb_id="+theUserId+"&update="+thing, true);
		 updateReq.send();
		 }
		 
		 if(thing=="trueAns"){
			currP.innerHTML = parseInt(currP.innerHTML) + 2;  
			tP.innerHTML = parseInt(tP.innerHTML) + 1; 
		}else if(thing=="wrongAns"){ 
			if((parseInt(currP.innerHTML) >= 2)){ 
			currP.innerHTML = parseInt(currP.innerHTML) - 2;
			} 
			fP.innerHTML = parseInt(fP.innerHTML) + 1; 
		}else if(thing=="passQ"){ 
			if(parseInt(currP.innerHTML) >= 2){
			currP.innerHTML = parseInt(currP.innerHTML) - 1;
			} 
			pP.innerHTML = parseInt(pP.innerHTML) + 1; 
		}
		}
	}
        
        
          function getLogin(sit) {
              if(sit==2){
                  var theUserId = localStorage.getItem("userID");
                document.getElementById("kullaniciAvatar").src = 'http://graph.facebook.com/' + theUserId + '/picture?width=100&height=100';
                
              var userxhttp = new XMLHttpRequest();
				userxhttp.onreadystatechange=function() {
				if (userxhttp.readyState == 4 && userxhttp.status == 200) {
				  userObj = JSON.parse(userxhttp.responseText);
				  document.getElementById("currentPoint").innerHTML = userObj.point;
				  document.getElementById("tPoint").innerHTML = userObj.t;
				  document.getElementById("fPoint").innerHTML = userObj.f;
				  document.getElementById("pPoint").innerHTML = userObj.p;
				  document.getElementById("gPoint").innerHTML = userObj.g;
				  document.getElementById("hPoint").innerHTML = userObj.h;
                  document.getElementById("kullaniciIsim").innerHTML = userObj.data;
				 }
				};
			  userxhttp.open("GET", "http://www.lolquiz.org/app/user.php?fb_id="+theUserId, true);
			  userxhttp.send();
			  setLoggedUser(theUserId);
					  
			document.getElementById("game").style.display = "block";
			document.getElementById("login").style.display = "none";
			newQuestion();
          
              }else{
                 
          openFB.api({
            path: '/me',
            success: function(data) {
                console.log(JSON.stringify(data)); 
                document.getElementById("kullaniciAvatar").src = 'http://graph.facebook.com/' + data.id + '/picture?width=100&height=100';
                document.getElementById("kullaniciIsim").innerHTML = data.name;
                
              var userxhttp = new XMLHttpRequest();
				userxhttp.onreadystatechange=function() {
				if (userxhttp.readyState == 4 && userxhttp.status == 200) {
				  userObj = JSON.parse(userxhttp.responseText);
				  document.getElementById("currentPoint").innerHTML = userObj.point;
				  document.getElementById("tPoint").innerHTML = userObj.t;
				  document.getElementById("fPoint").innerHTML = userObj.f;
				  document.getElementById("pPoint").innerHTML = userObj.p;
				  document.getElementById("gPoint").innerHTML = userObj.g;
				  document.getElementById("hPoint").innerHTML = userObj.h;
				 }
				};
			  userxhttp.open("GET", "http://www.lolquiz.org/app/user.php?fb_id="+data.id+"&data="+data.name, true);
			  userxhttp.send();
			  setLoggedUser(data.id);
					  
			document.getElementById("game").style.display = "block";
			document.getElementById("login").style.display = "none";
			newQuestion();
                
                
            },
            error: errorHandler});
              }
		
  }

    function loginNo(){
        newQuestion();					  
			document.getElementById("game").style.display = "block";
			document.getElementById("login").style.display = "none";
        
    }

  function getLogout(){
	 openFB.logout(function(response) {
        localStorage.removeItem("userID");
		loginScreen();
	}); 
  }
        
    function errorHandler(error) {
        alert(error.message);
    }
        