
$('document').ready(function () {
	payRoll();
});
var works = {
	roadsCleaning: {
		basic: 9000
	},
	waterSupply: {
		basic: 10000
	},
	sanitation: {
		basic: 11000
	},
	construction: {
		basic: 12500
	},
	fire: {
		basic: 10000
	},
	wasteManagement: {
		basic: 10000
	}
};
var tiersCategory = {
	1: ['delhi', 'mumbai'],
	2: ['hyderabad', 'calcutta'],
	3: ['vijayawada', 'visakhapatnam']
}

var workers = [
	{
		name: 'naresh',
		work: 'roadsCleaning',
		city: 'calcutta',
		workerId: 1
	},
	{
		name: 'prakashraj',
		work: 'sanitation',
		city: 'delhi',
		workerId: 2
	},
	{
		name: 'kajal',
		work: 'construction',
		city: 'delhi',
		workerId: 3
	},
	{
		name: 'rajini',
		work: 'sanitation',
		city: 'visakhapatnam',
		workerId: 4
	},
	{
		name: 'ramcharan',
		work: 'roadsCleaning',
		city: 'vijayawada',
		workerId: 5
	},
	{
		name: 'pavankalyan',
		work: 'sanitation',
		city: 'mumbai',
		workerId: 6
	}
];
var multipliers = [1, 1.3, 1.7];
var toModifyWorkerId;
function payRoll() {

	displayCities();
	displayWorks();
	$('#addWorkerBtn').click(function () {
		var validWorker = validateWorkerDetails();
		if (validWorker) {
			var tempObjWorker = {
				name: '',
				work: '',
				city: '',
				workerId: 0
			}
			var workerName = $('#txtName').val();
			var ddlCitySelected = $('#ddlCity option:selected').val();
			var ddlWorkSselected = $('#ddlWork option:selected').val();
			tempObjWorker.city = ddlCitySelected;
			tempObjWorker.name = workerName;
			tempObjWorker.work = ddlWorkSselected;
			tempObjWorker.workerId = workers.length + 1;
			workers.push(tempObjWorker);
			var workerSalary = calculateSalary(ddlCitySelected, ddlWorkSselected);
			$('#addNewWorker').trigger("reset");
			var strSalaryDisplay = workerName + " " + ddlCitySelected + " " + ddlWorkSselected + " <br>" + workerSalary;
			$('#salaryDisplay').html(strSalaryDisplay);
			$('#salaryDisplay').dialog("open");
		}
	});
	$('#ddlViewCity').change(function () {
		$("#muncipalityDisplay tbody").children().remove();
		var ddlViewCitySelected = $('#ddlViewCity option:selected').val();
		if (ddlViewCitySelected === -1) {
			$('#ddlViewCity').addClass('error-border');
		}
		else {
			for (var i = 0; i < workers.length; i++) {
				if (workers[i].city === ddlViewCitySelected) {
					var displayRowSalary = calculateSalary(workers[i].city, workers[i].work);
					var filterDisplayCity = '<tr><td>' + workers[i].name + '</td><td>' + workers[i].work + '</td><td>'
						+ displayRowSalary + '</td><td>' + workers[i].city + '</td><td><input type="button" value="modify" id="' + workers[i].workerId + '" class="change-worker-city">' +
						'</td><td><input type="button" value="delete worker" name="' + workers[i].workerId + '" class="delete-worker"></td></tr>';
					$("#muncipalityDisplay tbody").append(filterDisplayCity);
				}
			}
		}
	});

	$('#modifyCityId').click(function () {
		var optionSelected = $('#ddlModifiedCity option:selected').val();
		if (optionSelected === -1) {
			$('#ddlModifiedCity').addClass('error-border');
		}
		else {
			for (var i = 0; i < workers.length; i++) {
				if (workers[i].workerId === (+toModifyWorkerId)) {
					workers[i].city = optionSelected;
					$('#dialogModifyWorker').dialog("close");
					break;
				}
			}
		}
		$('#ddlViewCity').trigger("change");
	});

	$('.muncipal-list').on('click', '.change-worker-city', function () {
		toModifyWorkerId = $(this).attr('id');
		displayFormWorkerCity(toModifyWorkerId);
		$('#dialogModifyWorker').dialog("open");
		
	});

	$('.muncipal-list').on('click', '.delete-worker', function () {
		var toDelete = $(this).attr('name');
		for (var i = 0; i < workers.length; i++) {
			if (workers[i].workerId === (+toDelete)) {
				workers.splice(i, 1);
				break;
			}
		}
		$('#ddlViewCity').trigger("change");
	});

	$("#salaryDisplay").dialog({
		autoOpen: false,
		width: 750,
		modal: true
	});
	$('#dialogModifyWorker').dialog({
		autoOpen: false,
		width: 750,
		modal: true
	});
	$("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
}

function displayFormWorkerCity(toModifyWorkerId) {
	var workerName, workerWork;
	for (var i = 0; i < workers.length; i++) {
		if (workers[i].workerId === (+toModifyWorkerId)) {
			workerName = workers[i].name;
			workerWork = workers[i].work;
			break;
		}
	}
	$('.worker-details-confirm').html("name : " + workerName + "<br>work : " + workerWork + "<br>");
}

function displayWorks() {
	var $selectWork = $("#ddlWork");
	$selectWork.append('<option value="-1">--Select--</option>');
    for (var work in works) {
		var tempObj = work;
        $selectWork.append($('<option></option>').val(tempObj.toString()).html(tempObj.toString()));
    }
}

function displayCities() {
	var $selectcity = $('.ddl-cities');
	$selectcity.append('<option value="-1">--Select--</option>');
	for (var tier in tiersCategory) {
		var tempObj = tiersCategory[tier];
		for (var i = 0; i < tempObj.length; i++) {
			$selectcity.append($('<option></option>').val(tempObj[i]).html(tempObj[i]));
		}
	}
}
function validateWorkerDetails() {
	if ($('#txtName').val() === '') {
		$('#txtName').addClass('error-border');
		return false;
	}
	var ddlCitySelected = $('#ddlCity option:selected').val();
	if (ddlCitySelected === -1) {
		$('#ddlCity').addClass('error-border');
		return false;
	}
	var ddlWorkSselected = $('#ddlWork option:selected').val();
	if (ddlWorkSselected === -1) {
		$('#ddlWork').addClass('error-border');
		return false;
	}
	return true;
}
function calculateSalary(citySelected, workSelected) {
	var tierFound, salaryFound;
	for (var tier in tiersCategory) {
		var tempObj = tiersCategory[tier];
		for (var i = 0; i < tempObj.length; i++) {
			if (citySelected === tempObj[i]) {
				tierFound = +tier;
				break;
			}
		}
	}
	for (var work in works) {
        if (workSelected === work) {
			salaryFound = works[work].basic;
			break;
		}
    }
	var mul = multipliers[tierFound - 1];
	var totalSalary = mul * salaryFound;
	return totalSalary;
}