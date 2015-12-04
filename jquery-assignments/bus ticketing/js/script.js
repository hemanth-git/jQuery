
$('document').ready(function () {
	bookingSeat();
});
var bookedSeats = {
	'11/29/2015': {
		'seatsSelected': [1, 3, 5, 7, 12, 13]
	},
	'11/30/2015': {
		'seatsSelected': [9, 20, 19, 14, 11, 13]
	},
	'12/01/2015': {
		'seatsSelected': [14, 3, 8, 7, 12, 13]
	},
	'12/02/2015': {
		'seatsSelected': [11, 3, 5, 7, 12, 13]
	},
	'12/03/2015': {
		'seatsSelected': [1, 3, 5, 7, 12, 13]
	}
};
var currentDate = '';
var seatCost=900;
var totalCost=0;
var currentUserTickets = [];
function bookingSeat() {
	$('.bookings-container').show();
	
	$('.seat').click(function () {
		$('#payNowError').hide();
		var selectedID = +($(this).attr('id'));
		console.log(selectedID);
		checkBooking(selectedID);
	});
	$('#submitBtn').click(function (event) {
		event.preventDefault();
		if (currentUserTickets.length === 0) {
			$('#payNowError').html("You need book atleast one ticket").show();
		}
		else {
			$('.bookings-container').hide();
			$('.booking-tab').addClass('nav-background');
			$('.payment-container').show();
		}
	});
	$('.btn').button();
	$("#datePicker").datepicker({
		'minDate': 0,
		'maxDate': '+1M'
	});
	$('#txtExpiryDate').datepicker({
		'minDate': 0,
		'maxDate': '+5Y',
		'changeMonth': true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: 'MM yy',
		onClose: function (dateText, inst) {
			var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
			$(this).datepicker('setDate', new Date(year, month, 1));
		}
	});
	$('#datePicker').change(function () {
		$('#payNowError').hide();
		currentDate = $('#datePicker').val();
		$('.seat').removeClass('already-booked').removeClass('current-booked');
		currentUserTickets = [];
		if (bookedSeats[currentDate] !== undefined) {
			$('.bus-container').show();
			var tempSeats = bookedSeats[currentDate].seatsSelected;
			for (var i = 0; i < tempSeats.length; i++) {
				$('#' + tempSeats[i]).addClass('already-booked');
			}
		}
		else {
			$('.bus-container').show();
			var tempDateObj;
			tempDateObj = {
				'seatsSelected': []
			}
			bookedSeats[currentDate] = tempDateObj;
		}

	});
	$('#clearBtn').click(function(event){
		$('.error-border').removeClass('error-border');
		 $('.error-font').removeClass('error-font');
		 $('.error-display').hide();
	});
	 $('#confirmBtn').click(function(event){
		 event.preventDefault();
		 $('.error-border').removeClass('error-border');
		 $('.error-font').removeClass('error-font');
		 $('.error-display').hide();
		if(validateFormFields()){
			 $('.payment-tab').addClass('nav-background');
			 $('.payment-container').hide();
			 $('.confirm-container').show();
			 var msg= '<div class="last-booked"> Your current booked seats are : '+currentUserTickets+'<br>Total Cost is : '+totalCost+'</div>';
			 $('.confirm-container').prepend(msg);
		}	 
	 });
	 $('#finalSubmit').click(function(){
		 $('.confirm-container').hide();
		 bookingSeat();
	 });
}
function validateFormFields(){
 		if(!validateText('#txtName')){
			 return false;
		 }
		 if(!validateCardNumber('#txtCardNmber')){
			 return false;
		 }
		 if(!validateDate('#txtExpiryDate')){
			 return false;
		 }
		 if(!validateCVVNumber('#txtCVVNumber')){
			 return false;
		 }
		 
		 return true;
}
function validateDate(expiryDate){
	var valueNumber=$(expiryDate).val();
	var $expiryDate=$(expiryDate);
	if(valueNumber.length ===0){
		$expiryDate.addClass('error-border');
		$expiryDate.parents('.form-element').addClass('error-font');
		$($expiryDate.parent()).append('<div class="error-display"><span>Please select a date</span></div>');
		return false;
	}
	return true;
}

function validateCVVNumber(cvvNumber){
	var valueNumber=$(cvvNumber).val();
	var $cvvNumber=$(cvvNumber);
	valueNumber=+valueNumber;
	if(isNaN(valueNumber)){
		$cvvNumber.addClass('error-border');
		$cvvNumber.parents('.form-element').addClass('error-font');
		$($cvvNumber.parent()).append('<div class="error-display"><span>Number should be valid</span></div>');
		return false;
	}
	if(valueNumber.toString().length!==4){
		  $cvvNumber.addClass('error-border');
		 $cvvNumber.parents('.form-element').addClass('error-font');
		  $($cvvNumber.parent()).append('<div class="error-display"><span>CVV should consist 4 digits</span></div>');
		  return false;
	}
	return true;
}
function validateText(textId){	
	var valueText=$(textId).val();
	var $textId=$(textId);
	if(valueText.length===0){
		  $textId.addClass('error-border');
		 $textId.parents('.form-element').addClass('error-font');
		  $($textId.parent()).append('<div class="error-display"><span>Name shold be valid</span></div>');
		  return false;
	}
	return true;
}
function validateCardNumber(CardNmber){
	var valueNumber=$(CardNmber).val();
	var $cardNumber=$(CardNmber);
	valueNumber=+valueNumber;
	if(isNaN(valueNumber)){
		$cardNumber.addClass('error-border');
		$cardNumber.parents('.form-element').addClass('error-font');
		$($cardNumber.parent()).append('<div class="error-display"><span>Card number should be valid</span></div>');
		return false;
	}
	if(valueNumber.toString().length!==14){
		  $cardNumber.addClass('error-border');
		 $cardNumber.parents('.form-element').addClass('error-font');
		  $($cardNumber.parent()).append('<div class="error-display"><span>Card  should consist 14 digits</span></div>');
		  return false;
	}
	return true;
}
function checkBooking(selectedID) {
	var parentClass=$('#' + selectedID).parent().attr('class');
	if (bookedSeats[currentDate].seatsSelected.indexOf(selectedID) === -1 && currentUserTickets.indexOf(selectedID) === -1) {
		$('#' + selectedID).addClass('current-booked');
		
		currentUserTickets.push(selectedID);
		if(parentClass === 'window-row'){
			totalCost+=(seatCost*1.1);
		}
		else if(parentClass === 'general-row'){
			totalCost+=(seatCost);
		}
		console.log(currentUserTickets);
	}
	else {
		$('#' + selectedID).removeClass('current-booked');
		if(parentClass === 'window-row'){
			totalCost-=(seatCost*1.1);
		}
		else if(parentClass === 'general-row'){
			totalCost-=(seatCost);
		}
		currentUserTickets = jQuery.grep(currentUserTickets, function (value) {
			return value != selectedID;
		});
		console.log(currentUserTickets);
	}
}


