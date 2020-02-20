
var docTitle = document.title;



 $(document).mouseup(function () {
   
 });


function ajax(t){
	var str = null;
	
	$.ajax({
		url:"projects/"+t+".html",
		dataType:'html',
		success:function(data){
			$("#experienceContainer").append($($.parseHTML(data)).filter('#code'));
		}, 
		error: function() {
			
		}
	});
	
};

function launcher(t){	
	setTimeout(function(){ 
		ajax(t);
	}, 300);
	
};
function grabber(t){
   	window.location.hash = t;
	
	
};
