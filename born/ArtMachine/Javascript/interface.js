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
 var projLength = 5;
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
 			langLength: 10
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
 		proj[3].color = 'transparent';
 		proj[4].langLength = 52;
	 String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

 });


var langDeg;
var encoder = document.getElementById('encoder');


 outerknob.mousedown(function () {
 	rotating = false;
 });

 $(document).mouseup(function (a) {
 	rotating = (rotating) ? true : rotating;
 });
 $(document).mousemove(function (e) {
	 rotating = true;
 	var mPos = {
 		x: e.pageX - elPos.x,
 		y: e.pageY - elPos.y
 	};
 	var getAtan = Math.atan2(mPos.x - rad, mPos.y - rad);
 	projDeg = -getAtan / (Math.PI / 180) + 225; //from 45 to 405deg

 	if (rotating) {
		
 		$('#outerknob').css({transform: 'rotate(' + projDeg + 'deg)'});
		$('#content').css({backgroundSize: langDeg +'%'});console.log(langDeg);
		
		
		
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
	 
 	$('#experienceContainer').css({'background-color': proj[i].color});
	 
 	//INIT LANGUAGES
 	langStrength = 360 / proj[i].langLength;
	  
 	for (j = 0; j < proj[i].langLength; j++) {
 		lang[j] = {
 			angle: langStrength * j,
 			color: getRandomColor()
 		};
		lang[0].color = proj[i].color;
 	};

 }

 function updateLang(j) {  //INNER-COMPASS
	 //$('#knob').css({'background-color': lang[j].color});	
	 //$('#header').text(j);
	 if(currentProj==4 && $('#the-canvas').length){
		queueRenderPage(j+1); 
	 }
	 

	 if(j==0){
	 $("#leftContainer, #nameContainer, #personalityContainer, #rightContainer").css({'opacity': 0});	
 	}else{
		$("#leftContainer, #nameContainer, #personalityContainer, #rightContainer").css({'opacity': 1});	
	}
 }
