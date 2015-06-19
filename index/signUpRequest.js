$(document).ready(function(){
    $("#get-app-button").click(function () {
	
	var opts = {
	    lines: 8, // The number of lines to draw
	    length: 6, // The length of each line
	    width: 1, // The line thickness
	    radius: 1, // The radius of the inner circle
	    corners: 1, // Corner roundness (0..1)
	    rotate: 0, // The rotation offset
	    direction: 1, // 1: clockwise, -1: counterclockwise
	    color: '#e96125', // #rgb or #rrggbb or array of colors
	    speed: 1, // Rounds per second
	    trail: 60, // Afterglow percentage
	    shadow: false, // Whether to render a shadow
	    hwaccel: false, // Whether to use hardware acceleration
	    className: 'spinner', // The CSS class to assign to the spinner
	    zIndex: 2e9, // The z-index (defaults to 2000000000)
	    //top: '50%', // Top position relative to parent
	    //left: '50%' // Left position relative to parent
	};

	// $(".intl-tel-input").append("<div id='wheel-container' style='position: relative;top: -20px;left: 200px;'></div>");
	// var target = document.getElementById('wheel-container');
	// var spinner = new Spinner(opts).spin(target);

	$('.loader').css('visibility', 'visible');

	url = 'https://api.grofers.com/v2/accounts/sms_sign_up/'
	if (window.location.search!=undefined && window.location.search!=""){
	    var campaignCode = window.location.search;
	    url = 'https://api.grofers.com/v2/' + 'accounts/sms_sign_up/' + campaignCode;
	}
	$.ajax(
	    {
		//url : API_HOST + '/v2/accounts/sms_sign_up' + campaignCode,
		url : url,
		type : 'POST',
		data :{
		    phone_number : $('#user-phone-value').val()
		},
		success : function(data) {
		    $('.loader').css('visibility', 'hidden');
		    console.log(data);
		    $("#child-append-data").remove();
		    if (data.message!='Enter a valid phone number'){
			// $('#user-phone-value').hide();
			// $('#phone-number-container').hide();
			$('.error-msgs').append('<div id="child-append-data" class="alert alert-success top-buffer text-center">' + data.message +'</div>')
		    }
		    else{
			
			$('.error-msgs').append('<div id="child-append-data" class="alert alert-danger top-buffer  text-center">' + data.message +'</div>')
		    }
		    $('section').css('margin-top' , '-40px');
		},
		error : function(request,status,error) {
		    $('.loader').css('visibility', 'hidden');
		    $("#child-append-data").remove();
		    $('.error-msgs').append('<div id="child-append-data" class="alert alert-danger top-buffer  text-center">' + status + ' Please Try Again' + '</div>')
		}
	    })
    });
});
