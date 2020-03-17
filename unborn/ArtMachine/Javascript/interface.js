 var rotating = false;
 var outerknob = $('#outerknob');
 var knob = $('#knob');
 var rad = knob.width() / 2;
 var elOfs = knob.offset();
 var elPos = {
 	x: elOfs.left,
 	y: elOfs.top
 }

 var i;
 var proj = [];
 var projLength = 8;
 var projStrength = 360 / projLength;
 var projDeg;
 var toDeg;
 var currentProj;

 var j;
 var lang = [];
 var langStrength;
 var currentLang;


 function getRandomColor() {
 	var letters = '0123456789ABCDEF';
 	var color = '#';
 	for (var k = 0; k < 6; k++) {
 		color += letters[Math.floor(Math.random() * 16)];
 	}
 	return color;
 }
 //var newHash;


 $(window).ready(function () {
	 
	 document.getElementById("audioRadio").volume = 0;
	setTimeout(function(){ $('body').css({'background-color': 'black'});}, 500); 
 	// newHash = window.location.hash.substring(1); //not working
 	for (i = 0; i < projLength + 1; i++) {
 		proj[i] = {
 			file: "project" + i,
 			angle: projStrength * i + 45, //proj perimeters + css div rotation
 			color: getRandomColor(),
 			langLength: 10,
			url: ""
 		};
 		if (proj[i].angle < 0) {
 			//proj[i].angle = 360 + proj[i].angle;
 		};
 		///////ROTATE KNOB FROM LOADING
 		//if(newHash == proj[i].file){ //newHash don't exist yet
 		//	toDeg = proj[i].angle;
 		//	alert(proj[i].file+':'+proj[i].angle);
 		//$('#outerknob').css({transform: 'rotate(' + toDeg + 'deg)'});
 		//$.launcher(proj[i].file);
 		//alert('prerotated');
 		//}
		
 	};
	 
	 
	 //LIST OF EXCEPTIONS
	 proj[1].file = 'decoder';
	 proj[1].color = 'black';
	 
	 proj[2].file = 'maslo';
	 proj[2].color = '#5ebafa';
	 proj[2].url = 'https://maslotalk.appspot.com/page';
	 
	 proj[3].file = 'secretmap';
	 proj[3].color = '#cac7cf';
	 proj[3].url = 'http://gregoiredavenas.com/secretmap/';
	 
	 proj[4].file = 'teleportal';
	 proj[4].color = 'black';
	 proj[4].url = 'https://teleportal.app/wip/';
	 
	 proj[5].file = 'bio';
	 proj[5].color = 'white';
	 proj[5].url = 'https://flickrembed.com/cms_embed.php?source=flickr&layout=responsive&input=www.flickr.com/people/biodivlibrary/&sort=0&by=user&theme=slider&scale=fill&speed=3000&limit=500&skin=default&autoplay=true';
	 
	 proj[6].file = 'wikipedia';
	 proj[6].color = 'white';
	 proj[6].url = 'https://en.wikipedia.org/wiki/Special:Random';
	
	 proj[7].file = 'meme';
	 proj[7].color = 'black';
	 proj[7].url = 'https://web.archive.org/web/19990125100147/http://www.immersive.com/';
	 
	 proj[8].file = 'itself';
	 proj[8].color = 'black';
	 proj[8].url = 'http://alivemachine.io/';
	 
	 for (i = 0; i < projLength; i++) {
		 if(window.location.hash.substring(1) == proj[i].file) {
			grabber(proj[i].file, proj[i].url);
	 	}
 	 }

 });


var langDeg;
var encoder = document.getElementById('encoder');


 outerknob.mousedown(function () {
 	rotating = true;
	$('#iFrameInput').css({'z-index': '0'}); 
 });

 $(document).mouseup(function (a) {
 	rotating = (rotating) ? false : rotating;
	 $('#iFrameInput').css({'z-index': '1'});
 });
 $(document).mousemove(function (e) {
 	var mPos = {
 		x: e.pageX - elPos.x,
 		y: e.pageY - elPos.y
 	};
 	var getAtan = Math.atan2(mPos.x - rad, mPos.y - rad);
 	projDeg = -getAtan / (Math.PI / 180) + 225; //from 45 to 405deg

 	if (rotating) {
		
 		$('#outerknob').css({transform: 'rotate(' + projDeg + 'deg)'});
		
		
		
		
 		for (i = 0; i < projLength; i++) { //PROJECT SELECTOR 
 			if (projDeg >= proj[i].angle && projDeg < proj[i + 1].angle && i != currentProj) { //selected project
 				updateProj(i);
 				currentProj = i;
 			}
 		};
		//$('#info1').text(langDeg);
		for (j = 0; j < proj[currentProj].langLength-1; j++) { //LANGUAGE SELECTOR 
 			if (langDeg >= lang[j].angle && langDeg < lang[j + 1].angle && j != currentLang) { //selected lang
 				updateLang(j);
 				currentLang = j;
				
 			}
 		};
		
		
 	}
 });


 function updateProj(i) { //OUTER-COMPASS
	 
 	$('#content').css({'background-color': proj[i+1].color});
 	grabber(proj[i + 1].file, proj[i + 1].url);
	 
 	//INIT LANGUAGES
 	langStrength = 360 / proj[i].langLength;
	  
 	for (j = 0; j < proj[i].langLength; j++) {
 		lang[j] = {
 			angle: langStrength * j,
 			color: getRandomColor()
 		};
		lang[0].color = proj[i].color;
 	};
	 setTimeout(function(){ 
		 
	 if(i==0){//LOAD INVITATION
		 $('#knob').css({'border': '2px solid yellow', 'background-color':'transparent'});
		 $('#handleout').css({'opacity': '1', 'background-color':'yellow'});
		 $('#handlein').css({'opacity': '1', 'background-color':'yellow'});
		 $('#iFrameInput').css({'-moz-transform': '', '-webkit-transform': '', '-o-transform': ''});
	 }else if(i==1){ // MASLO
		 $('#knob').css({'border': '0px solid white', 'background-color':'transparent'});
		 $('#handleout').css({'opacity': '1', 'background-color':'white'});
		 $('#handlein').css({'opacity': '0', 'background-color':''});
		 $('#iFrameInput').css({'-moz-transform': '', '-webkit-transform': '', '-o-transform': ''});
	 }else if(i==2){   //SECRETMAP
		  $('#knob').css({'border': '2px solid white', 'background-color':'transparent'});
		 $('#handleout').css({'opacity': '1', 'background-color':''});
		 $('#handlein').css({'opacity': '0', 'background-color':''});
		 $('#iFrameInput').css({'-moz-transform': '', '-webkit-transform': '', '-o-transform': ''});
		//setTimeout(function(){ $.getScript("Javascript/input.js", function() {}); }, 500); 
		 //setTimeout(function(){ $.getScript("Javascript/input.js", function() {}); }, 1000); 
	 }else if(i==3){ //DREAM JOURNAL
		 $('#knob').css({'border': '2px solid white', 'background-color':'transparent'});
		 $('#handleout').css({'opacity': '1', 'background-color':''});
		 $('#handlein').css({'opacity': '0', 'background-color':''});
		 $('#iFrameInput').css({'-moz-transform': '', '-webkit-transform': '', '-o-transform': ''});
		 //$('#knob').css({'border': '0px solid white', 'background-color':'#0F0041'});
	 }else if(i==4){ //BIO
		 $('#knob').css({'border': '2px solid black', 'background-color':'transparent'});
		 $('#handleout').css({'opacity': '1', 'background-color':'black'});
		 $('#handlein').css({'opacity': '0', 'background-color':'black'});
		 $('#iFrameInput').css({'-moz-transform': 'scale(2)', '-webkit-transform': 'scale(2)', '-o-transform': 'scale(2)'});
	 }else if(i==5){ //WIKI
		 $('#knob').css({'border': '2px solid black', 'background-color':'transparent'});
		 $('#handleout').css({'opacity': '1', 'background-color':'black'});
		 $('#handlein').css({'opacity': '0', 'background-color':'black'});
		 $('#iFrameInput').css({'-moz-transform': '', '-webkit-transform': '', '-o-transform': ''});
	 }else if(i==6){ //MEME
		 $('#knob').css({'border': '2px solid white', 'background-color':'transparent'});
		 $('#handleout').css({'opacity': '1', 'background-color':'white'});
		 $('#handlein').css({'opacity': '0', 'background-color':'black'});
		 $('#iFrameInput').css({'-moz-transform': '', '-webkit-transform': '', '-o-transform': ''});
	 }else if(i==7){ //itself
		 $('#knob').css({'border': '2px solid white', 'background-color':'transparent'});
		 $('#handleout').css({'opacity': '1', 'background-color':'white'});
		 $('#handlein').css({'opacity': '0', 'background-color':'black'});
		 $('#iFrameInput').css({'-moz-transform': 'scale(.99)', '-webkit-transform': 'scale(.99)', '-o-transform': 'scale(.99)'});

	 }else{
		 simspeed=5; 
		 $('#knob').css({'border': '', 'background-color':''});
		 $('#handleout').css({'opacity': '1', 'background-color':''});
		 $('#handlein').css({'opacity': '', 'background-color':''});
		
	 }
		}, 300); 
 }

 function updateLang(j) {  //INNER-COMPASS
	 //$('#knob').css({'background-color': lang[j].color});	
	 //$('#header').text(j);
	 if(currentProj==4 && $('#the-canvas').length){
		queueRenderPage(j+1); 
	 }
 }
