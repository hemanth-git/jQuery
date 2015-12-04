
$('document').ready(function () {
	chokhaCar();
});

var errorMessages = {
	text: {
		errornull: 'Name should not be null',
		errorMax: 'Name must not exceed 45 characters'
	}
};
var fullname, email, phoneNumber, dateOfDelivery, address, licenseNo, personDetailsDisplay;
var dataBase = {
	'2001': {
		'maruthi': {
			'sx4': [{
				'rate': 510000,
				'color': 'red',
				'km': 20000,
				'carId': 9
			}, {
					'rate': 620000,
					'color': 'red',
					'km': 20000,
					'carId': 13
				}

			],
			'sy8': [{
				'rate': 620000,
				'color': 'red',
				'km': 10000,
				'carId': 10
			}]
		},
		'honda': {
			'city': [{
				'rate': 920000,
				'color': 'red',
				'km': 50000,
				'carId': 11
			}],
			'amaze': [{
				'rate': 2220000,
				'color': 'red',
				'km': 30000,
				'carId': 12
			}]
		}
	},
	'2002': {
		'maruthi': {
			'sx4': [{
				'rate': 520000,
				'km': 20000,
				'color': 'red',
				'carId': 1
			}],
			'sy8': [{
				'rate': 620000,
				'km': 10000,
				'color': 'red',
				'carId': 2
			}]
		},
		'honda': {
			'city': [{
				'rate': 920000,
				'km': 50000,
				'color': 'red',
				'carId': 3
			}],
			'amaze': [{
				'rate': 2220000,
				'km': 30000,
				'color': 'red',
				'carId': 4
			}]
		}
	},
	'2003': {
		'maruthi': {
			'sx4': [{
				'rate': 520000,
				'km': 20000,
				'color': 'red',
				'carId': 5
			}],
			'sy8': [{
				'rate': 620000,
				'km': 10000,
				'color': 'red',
				'carId': 6
			}]
		},
		'honda': {
			'city': [{
				'rate': 920000,
				'km': 50000,
				'color': 'red',
				'carId': 7
			}],
			'amaze': [{
				'rate': 2220000,
				'km': 30000,
				'color': 'red',
				'carId': 8
			}]
		}
	}
}

var ddlYearSelected, ddlCarMakeSelected, ddlCarModelSelected;

function chokhaCar() {
	$('.choose-tab').addClass('onclick-decorate');
	var $selectYearManu = $("#ddlYearManu");
	$selectYearManu.append('<option value="-1">--Select--</option>');
    for (var year in dataBase) {
		var tempObj = year;
        $selectYearManu.append($('<option></option>').val(tempObj.toString()).html(tempObj.toString()));
    }
	ddlYearSelected = $('#ddlYearManu option:selected').val();

	$('#ddlYearManu').change(function () {
		$('#ddlYearManu').removeClass('error-border');
		$('#ddlCarMake').children().remove();
		$("#ddlCarModel").children().remove();
		ddlYearSelected = $('#ddlYearManu option:selected').val();
		if (ddlYearSelected === -1) {
			$('#ddlYearManu').addClass('error-border');
		}
		else {
			changeCarMake($('#ddlYearManu option:selected').val());
		}
	});
	var colour, CarPrice, kmdriven, carid;
	$('#filterBtn').click(function () {
		var tempObjFilterArr = dataBase[ddlYearSelected][ddlCarMakeSelected][ddlCarModelSelected];
		var objLength = tempObjFilterArr.length;
		/*colour = dataBase[ddlYearSelected][ddlCarMakeSelected][ddlCarModelSelected].color;
		CarPrice = dataBase[ddlYearSelected][ddlCarMakeSelected][ddlCarModelSelected].rate;
		kmdriven = dataBase[ddlYearSelected][ddlCarMakeSelected][ddlCarModelSelected].km;
		carid = dataBase[ddlYearSelected][ddlCarMakeSelected][ddlCarModelSelected].carId;*/
		$('#filteredCars tbody').children().remove();
		for (var i = 0; i < objLength; i++) {
			colour = tempObjFilterArr[i].color;
			CarPrice = tempObjFilterArr[i].rate;
			kmdriven = tempObjFilterArr[i].km;
			carid = tempObjFilterArr[i].carId;
			var filterRows = '<tr><td><input type=radio id="' + carid + '" name="carSelectdetails"></td><td>' +
				ddlYearSelected + " - " + ddlCarMakeSelected + " - " + ddlCarModelSelected + "</td><td>" + colour + "</td><td>" + CarPrice + "</td><td>" + kmdriven + "</td></tr>"
			$('#filteredCars tbody').append(filterRows);
		}
	});

	$('#nextBtn').click(function (event) {
		event.preventDefault();
		var purchsedetailsMsg = '';
		var finalPaymentcarId = $('input[name="carSelectdetails"]:checked').attr('id');
		finalPaymentcarId = +finalPaymentcarId;
		if (isNaN(finalPaymentcarId)) {
			$('#nextBtn').addClass('error-border');
		}
		else {
			$('.choose-your-car').hide();
			$('.enter-details').show();
			$('.details-tab').addClass('onclick-decorate');

			var tempObjFilterArr = dataBase[ddlYearSelected][ddlCarMakeSelected][ddlCarModelSelected];
			var objLength = tempObjFilterArr.length;
			for (var i = 0; i < objLength; i++) {
				if ((tempObjFilterArr[i].carid) === finalPaymentcarId) {
					colour = tempObjFilterArr[i].color;
					CarPrice = tempObjFilterArr[i].rate;
					kmdriven = tempObjFilterArr[i].km;
					carid = tempObjFilterArr[i].carId;
					break;
				}
			}
			purchsedetailsMsg = ddlYearSelected + " - " + ddlCarMakeSelected + " - " + ddlCarModelSelected +
			" car colour- " + colour + " Car price- " + CarPrice + " - kilometers driven " + kmdriven;
			$('#purchaseCarDetails').html(purchsedetailsMsg);

		}
	});
	
	// date picker Jquery Ui widgets
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
	$('#previousBtn').click(function () {
		$('.enter-details').hide();
		$('.choose-your-car').show();
		$('.details-tab').removeClass('onclick-decorate');
	});
	$('#previousCheckOutBtn').click(function () {
		$('.checkOut-details').hide();
		$('.enter-details').show();
		$('.checkout-tab').removeClass('onclick-decorate');
	});
	$("#txtDelivery").datepicker({
		'minDate': '+3M',
		'maxDate': '+7M'
	});
	$('.btn').button();
	$("#dialog-confirm").dialog({
		autoOpen: false,
		width: 750,
		modal: true
	});
	// jquery ui ends
	$('#submitBtn').click(function (event) {
		event.preventDefault();
		$('.error-border').removeClass('error-border');
		$('.error-font').removeClass('error-font');
		$('.error-display').hide();
		var valid = validateAll();
		if (valid) {
			$('.checkout-tab').addClass('onclick-decorate');
			$('.checkOut-details').show();
			$('.enter-details').hide();
			$('.choose-your-car').hide();
			personDetailsDisplay='<tr><td>Full Name:</td><td>'+ fullname +'</td></tr><tr><td>Email :</td><td>'
			+ email +'</td></tr><tr><td>Phone Number :</td><td>'+ phoneNumber +'</td></tr><tr><td>Date of delivery :</td><td>'+ dateOfDelivery +
			'</td></tr><tr><td>licenseNo :</td><td>'+ licenseNo +'</td></tr>';
			$('#personDetails tbody').append(personDetailsDisplay);
		}
	});
	$('#payBtn').click(function (event) {
		event.preventDefault();
		$('.error-border').removeClass('error-border');
		$('.error-font').removeClass('error-font');
		$('.error-display').hide();

		if (validateFormFields()) {
			$('.checkout-tab').addClass('onclick-decorate');
			$('.checkOut-details').hide();
			$('.choose-your-car').hide();
			$('.confirm-container').show();
			$("#dialog-confirm").html("Our sales rep will get in touch with you very soon to verify your details");
			$("#dialog-confirm").dialog("open");
		}
	});
}


function validateAll() {
	// name field
		
	if ($('#txtFullName').val() === '') {
		$('#txtFullName').addClass('error-border');
		return false;
	}
	fullname = $('#txtFullName').val();
	// email validation
	email = $('#txtEmail').val();
	var emailRegex = "[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+";
	var result = (new RegExp(emailRegex)).test(email);
	if (!result) {
		$('#txtEmail').addClass('error-border');
		return false;
	}
	phoneNumber = $('#txtPhone').val();
	//phoneNumber=+phoneNumber;
	if (phoneNumber.length != 10 || isNaN(+phoneNumber)) {
		$('#txtPhone').addClass('error-border');
	}
	address = $('#txtAddress').val();
	if (address.length === 0) {
		return false;
	}
	dateOfDelivery = $('#txtDelivery').val();
	licenseNo = $('#txtLicense').val();
	//license validation
	var licenseRegex = "[a-zA-Z]+[a-zA-Z0-9]+[0-9]";
	var licenseResult = (new RegExp(licenseRegex)).test(licenseNo);
	if (licenseNo.length !== 12 || !(licenseResult)) {
		$('#txtLicense').addClass('error-border');
		return false;
	}
	return true;
}

function changeCarMake(year) {
	var $selectCarMake = $("#ddlCarMake");
	$selectCarMake.append('<option value="-1">--Select--</option>');
	for (var carMake in dataBase[year]) {
		var tempObj = carMake;
		$selectCarMake.append($('<option></option>').val(tempObj.toString()).html(tempObj.toString()));
	}
	ddlCarMakeSelected = $('#ddlCarMake option:selected').val();
	$('#ddlCarMake').change(function () {
		$('#ddlCarMake').removeClass('error-border');
		$("#ddlCarModel").children().remove();
		ddlCarMakeSelected = $('#ddlCarMake option:selected').val();
		if ($('#ddlCarMake option:selected').val() === -1) {
			$('#ddlCarMake').addClass('error-border');
		}
		else {
			changeCarModel(year, ddlCarMakeSelected);
		}
	});
}

function changeCarModel(year, carMake) {
	var $selectCarModel = $("#ddlCarModel");
	for (var carModel in dataBase[year][carMake]) {
		var tempObj = carModel;
		$selectCarModel.append($('<option></option>').val(tempObj.toString()).html(tempObj.toString()));
	}
	ddlCarModelSelected = $('#ddlCarModel option:selected').val();
	$selectCarModel.append('<option value="-1">--Select--</option>');
	$('#ddlCarModel').change(function () {
		$('#ddlCarModel').removeClass('error-border');
		ddlCarModelSelected = $('#ddlCarModel option:selected').val();
		if (ddlCarModelSelected == -1) {
			$('#ddlCarModel').addClass('error-border');
		}
		else {
			ddlCarModelSelected = $('#ddlCarModel option:selected').val();
		}
	});
}

function validateFormFields() {
	if (!validateCardNumber('#txtCardNmber')) {
		return false;
	}
	if (!validateDate('#txtExpiryDate')) {
		return false;
	}
	if (!validateCVVNumber('#txtCVVNumber')) {
		return false;
	}
	return true;
}

function validateDate(expiryDate) {
	var valueNumber = $(expiryDate).val();
	var $expiryDate = $(expiryDate);
	if (valueNumber.length === 0) {
		$expiryDate.addClass('error-border');
		$expiryDate.parents('.form-element').addClass('error-font');
		$($expiryDate.parent()).append('<div class="error-display"><span>Please select a date</span></div>');
		return false;
	}
	return true;
}

function validateCVVNumber(cvvNumber) {
	var valueNumber = $(cvvNumber).val();
	var $cvvNumber = $(cvvNumber);
	valueNumber = +valueNumber;
	if (isNaN(valueNumber)) {
		$cvvNumber.addClass('error-border');
		$cvvNumber.parents('.form-element').addClass('error-font');
		$($cvvNumber.parent()).append('<div class="error-display"><span>Number should be valid</span></div>');
		return false;
	}
	if (valueNumber.toString().length !== 4) {
		$cvvNumber.addClass('error-border');
		$cvvNumber.parents('.form-element').addClass('error-font');
		$($cvvNumber.parent()).append('<div class="error-display"><span>CVV should consist 4 digits</span></div>');
		return false;
	}
	return true;
}

function validateCardNumber(CardNmber) {
	var valueNumber = $(CardNmber).val();
	var $cardNumber = $(CardNmber);
	valueNumber = +valueNumber;
	if (isNaN(valueNumber)) {
		$cardNumber.addClass('error-border');
		$cardNumber.parents('.form-element').addClass('error-font');
		$($cardNumber.parent()).append('<div class="error-display"><span>Card number should be valid</span></div>');
		return false;
	}
	if (valueNumber.toString().length !== 14) {
		$cardNumber.addClass('error-border');
		$cardNumber.parents('.form-element').addClass('error-font');
		$($cardNumber.parent()).append('<div class="error-display"><span>Card  should consist 14 digits</span></div>');
		return false;
	}
	return true;
}