
$('document').ready(
	function () {
		initTrainApp();
	});
var messageDisplay = '';
var displayDetails = {
	currentTrainNumber: 0,
	currentTrainName: '',
	status: '',
	timeGap: '',
	arrivalDate: '',
	weather: ''
};
var alreadyArrived = [];

var trains = {
	'00001': {
		trainName: 'Bangalore Express',
		actualhrs: 12,
		actualMin: 30,
		delayCount: 3,
		onTimeCount: 4,
		earlyCount: 5
	}, '00002': {
		trainName: 'Mumbai Express',
		actualhrs: 9,
		actualMin: 30,
		delayCount: 9,
		onTimeCount: 2,
		earlyCount: 5
	}, '00003': {
		trainName: 'Chennai Express',
		actualhrs: 1,
		actualMin: 30,
		delayCount: 3,
		onTimeCount: 7,
		earlyCount: 1
	}, '00004': {
		trainName: 'Coimbatore Express',
		actualhrs: 6,
		actualMin: 30,
		delayCount: 2,
		onTimeCount: 6,
		earlyCount: 5
	}, '00005': {
		trainName: 'Pune Express',
		actualhrs: 2,
		actualMin: 40,
		delayCount: 1,
		onTimeCount: 1,
		earlyCount: 0
	}, '00006': {
		trainName: 'Rajpur Express',
		actualhrs: 22,
		actualMin: 30,
		delayCount: 1,
		onTimeCount: 4,
		earlyCount: 5
	}
};
var datesArrival = {
	'11/12/2015': {
		'00001': {
			stated: 'delay',
			weatherCondition: 'sunny'
		}
	}
};
function initTrainApp() {
	var trainNo;
	function validateAll() {
		// Train number validation
		trainNo = $('#txtTrainNo').val();
		var dateArrival = $('#dateArrival').val();
		if (trainNo.length != 5 || isNaN(+trainNo)) {
			$('#txtTrainNo').addClass('error-border');
			$('.error-msg').text("train no invalid")
			return false;
		}
		else {
			var flag = false;
			for (var train in trains) {
				var crrTrain = train;
				if (crrTrain === trainNo) {
					calTrainTime(trainNo);
					flag = true;
					break;
				}
			}
			if (!flag) {
				$('#txtTrainNo').addClass('error-border');
				$('.error-msg').text("Train doesnot exist")
				return false;
			}
		}
		if (dateArrival === '') {
			$('#dateArrival').addClass('error-border');
			$('.error-msg').text("Enter the date");
		}
		return true;
	}
	var $dialogMessage = $("#dialog-form");
	$('form').submit(function (event) {
		event.preventDefault();
		$('.error-border').removeClass('error-border');
		$('.error-font').removeClass('error-font');
		$('.error-msg').hide();
		var valid = validateAll();
		var dataBasevalid = checkDateBase();
		messageDisplay = "<tr><td>" + displayDetails.currentTrainNumber + "</td><td>" + displayDetails.arrivalDate + "</td><td>" +
		displayDetails.currentTrainName + "</td><td>" + displayDetails.status + "</td><td>" + displayDetails.weather +
		"</td><td>" + displayDetails.timeGap + " [HH:MM]" + "</td></tr>";

		if (dataBasevalid && valid) {
			alreadyArrived.push(trainNo);
			$("#dialog-form").dialog('close');
			$("#trainUpdate tbody").append(messageDisplay);
		}
	});
	var delayListToDisplay = [];
	$('#ddlFilterTrainNo').change(function () {
		var delayCheckTrainNumber = $('#ddlFilterTrainNo option:selected').val();
		var currDelayCount = trains[delayCheckTrainNumber].delayCount;
		var currOnTimeCount = trains[delayCheckTrainNumber].onTimeCount;
		var currEarlyCount = trains[delayCheckTrainNumber].earlyCount;
		var messageDisplay = "<tr id="+"delay"+delayCheckTrainNumber+"><td>" + delayCheckTrainNumber + "</td><td>" +
			trains[delayCheckTrainNumber].trainName + "</td><td>" + currDelayCount + "</td><td>" + currOnTimeCount + "</td><td>"
			+ currEarlyCount + "</td></tr>";
		if (delayListToDisplay.indexOf(delayCheckTrainNumber) === -1) {
			$('#delayList tbody').append(messageDisplay);
			delayListToDisplay.push(delayCheckTrainNumber);
		}
		else{
			var deleteId="delay"+delayCheckTrainNumber;
			$('#'+deleteId).remove();
			$('#delayList tbody').append(messageDisplay);
		}
	});
	/*$('#fromDate').change(function(){
		changeDivData($('#fromDate').val());
	});
	$('#toDate').change(function(){
		changeDivData($('#toDate').val());
	});*/
	var filterArrayWeatherEffect=[]
	$('#ddlFilterTrainNo').change(function () {
		changeDivData($('#ddlFilterTrainNo option:selected').val(),filterArrayWeatherEffect );

	});
	$('.btn').button();
	$('#updateStatus').click(function () {
		$dialogMessage.dialog("open");
	});
	$('#clearBtn').click(function (event) {
		$('.error-border').removeClass('error-border');
		$('.error-font').removeClass('error-font');
		$(' .error-msg').hide();
	});
	/* jquery UI function starts here ..........*/
	$("#dialog-form").dialog({
		autoOpen: false,
		width: 750,
		modal: true
	});
	$("#arrivedDialog").dialog({
		autoOpen: false
	});
	$('#fromDate').datepicker({
		minDate:"-2M",
		maxDate:0
	});
	$('#dateArrival').datepicker({
		minDate: "-1M",
		maxDate: 0
	});
	$("#radio").buttonset();
	var $selectMinutes = $("#ddlMinutes");
    for (var i = 0; i <= 60; i++) {
        $selectMinutes.append($('<option></option>').val(i).html(i));
    }
	
	var $selectMenuFilterTrains = $("#ddlFilterTrainNo");
    for (var trainNum in trains) {
        $selectMenuFilterTrains.append($('<option></option>').val(trainNum.toString()).html(trainNum.toString() + "--" + trains[trainNum].trainName));
    }
	var $selectHours = $("#ddlHours");
    for (var i = 0; i <= 23; i++) {
        $selectHours.append($('<option></option>').val(i).html(i));
    }
	/*$('#dialog-form').on('dialogclose', function(event) {
    	$('#dialog-form tbody').children().remove();
 });*/
	$(document).tooltip();

}
function changeDivData(inputVal, filterArrayWeatherEffect) {
	var delayOnSunny = 0;
	var delayOnRainy = 0
	var delayOnOvercast = 0;
	if (filterArrayWeatherEffect.indexOf(inputVal) === -1) {
		for (var dateArr in datesArrival) {
			var tempDateOBj=datesArrival[dateArr];
			if (tempDateOBj[inputVal] === undefined) {
				continue;
			}
			else if (tempDateOBj[inputVal].stated === 'delayed') {
				if (tempDateOBj[inputVal].weatherCondition === 'sunny') {
					delayOnSunny += 1;
				}
				else if (tempDateOBj	[inputVal].weatherCondition === 'rainy') {
					delayOnRainy += 1;
				}
				else {
					delayOnOvercast += 1;
				}
			}
		}
		var weatherEffectMsg = "<tr><td>" + inputVal + "</td><td>" + (trains[inputVal]).trainName + "</td><td>" +
			delayOnSunny + "</td><td>" + delayOnRainy + "</td><td>" + delayOnOvercast + "</td></tr>";
		$('#weatherEffectTable').append(weatherEffectMsg);
		filterArrayWeatherEffect.push(inputVal);
	}
}


function checkDateBase() {
	var dateArrival = $('#dateArrival').val();
	var trainNo = $('#txtTrainNo').val();
	var tempDateObj = {
		tempObjTrain: {
			stated: '',
			weatherCondition: ''
		}
	};
	if (datesArrival[dateArrival] === undefined) {

		tempDateObj.tempObjTrain.stated = displayDetails.status;
		tempDateObj.tempObjTrain.weatherCondition = displayDetails.weather;
		datesArrival[dateArrival] = tempDateObj;
		datesArrival[dateArrival][trainNo] = tempDateObj.tempObjTrain;
		return true;
	}
	else if (datesArrival[dateArrival][trainNo] === undefined) {
		tempDateObj.stated = displayDetails.status;
		tempDateObj.weatherCondition = displayDetails.weather;
		datesArrival[dateArrival] = tempDateObj;
		datesArrival[dateArrival][trainNo] = tempDateObj.tempObjTrain;
		return true;
	}
	else {
		$("#dialog-form").dialog('close');
		$("#arrivedDialog").text("Train alredy arrived");
		$("#arrivedDialog").dialog('open');
		return false;
	}
}
function calTrainTime(trainNo) {
	var currTrainName = trains[trainNo].trainName;
	displayDetails.currentTrainName = currTrainName;
	displayDetails.currentTrainNumber = trainNo;
	displayDetails.arrivalDate = $('#dateArrival').val();

	var currentWeatherCondition = $("input[name='radio']:checked").val();
	displayDetails.weather = currentWeatherCondition;
	var ActHrs = trains[trainNo].actualhrs;
	var ActMin = trains[trainNo].actualMin;
	var currHrs = $("#ddlHours option:selected").val();
	currHrs = +currHrs;
	var currMin = $("#ddlMinutes option:selected").val();
	currMin = +currMin;
	var tempMinCurr = currHrs * 60;
	tempMinCurr += currMin;
	var tempMinAct = ActHrs * 60;
	tempMinAct += ActMin;
	var timerhrs = Math.floor(Math.abs(tempMinAct - tempMinCurr) / 60);
	var timermin = Math.abs(tempMinAct - tempMinCurr) % 60;
	displayDetails.timeGap = timerhrs + ':' + timermin;
	var graceTime = 10;

	if (tempMinAct + graceTime < tempMinCurr) {
		//delay
		messageDisplay = "train delay by" + (tempMinAct - tempMinCurr) + " train name" + currTrainName;
		displayDetails.status = "delayed";
		trains[trainNo].delayCount++;
	}
	else if (tempMinAct - graceTime > tempMinCurr) {
		//early
		messageDisplay = "train early by" + Math.abs(tempMinAct - tempMinCurr) + " train name" + currTrainName;
		displayDetails.status = "early";
		trains[trainNo].earlyCount++;
	}
	else {
		//ontime
		messageDisplay = "train running on time" + " train name" + currTrainName;
		displayDetails.status = "ontime";
		trains[trainNo].onTimeCount++;
	}
}
