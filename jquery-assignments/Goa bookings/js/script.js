
$('document').ready(
	function () {
		eventListnersCustom();
	});
function eventListnersCustom() {

	var username,email,phoneNumber,dateOfBirth,time,premim,food;
	function validateAll() {
		// name field
		
		if ($('#txtName').val() === '') {
			$('#txtName').addClass('error-border');
			return false;
		}
		username=$('#txtName').val();
		// email validation
		email = $('#txtEmail').val();
		var emailRegex = "[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+";
		var result = (new RegExp(emailRegex)).test(email);
		if (!result) {
			$('#txtEmail').addClass('error-border');
			return false;
		}
		phoneNumber=$('#txtPhone').val();
		//phoneNumber=+phoneNumber;
		if(phoneNumber.length != 10 || isNaN(+phoneNumber)){
			$('#txtPhone').addClass('error-border');
		}
		
		dateOfBirth=$('#txtDob').val();
		if(dateOfBirth.length === 0){
			$('#txtDob').addClass('error-border');
		}
		time=$('#txtTime').val();
				
		if(time === ''){
			$('#txtTime').addClass('error-border');
		}
		else{
			time=+time;
		}
		premim=$('[name=seat]:checked').val();
		food =$('[name=food]:checked').val();
		
		return true;
	}
	function addUser(valid) {
		if (valid) {
			$('.students-list tbody').append("<tr><td>"+username+"</td><td>"+email+"</td><td>"
			+phoneNumber+"</td><td>"+dateOfBirth+"</td><td>"+time+"</td><td>"+
				premim+"</td><td>"+food+"</td><td><button class='btn-delete'>Delete</button></td></tr>");
			$("#btnClear").trigger("click");
			$("#dialog-form").dialog("close");
		}
	}
	$('form').submit(function(event){
		 event.preventDefault();
		 $('.error-border').removeClass('error-border');
		 $('.error-font').removeClass('error-font');
		 $('.error-display').hide();
		 var valid= validateAll();
		 addUser(valid);
	});
	

		 
	/* jquery function starts here ..........*/
	$(function () {
		$("#txtDob").datepicker({
			'minDate': '-50Y',
			'maxDate': '-18Y'
		});
		$("#radio").buttonset();
		$("#radioTwo").buttonset();
		$('.students-list').on('click','.btn-delete',function(){
			$(this).parent().parent().remove();
		})
	});
	$("#dialog-form").dialog({
		autoOpen: false,
		width: 750,
		modal: true
	});
	$("#btnRegister").click(function () {
		 $('.error-border').removeClass('error-border');
		 $('.error-font').removeClass('error-font');
		 $('.error-display').hide();
		$("#dialog-form").dialog("open");
	});
	$(document).tooltip();

}
