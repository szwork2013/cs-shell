
/**
 * Module dependencies.
 */
var base = require("./control.base.controller");

/**
* Initializes module Control.
*/
module.exports = function($scope, $http, shell, service) {
	// sets the viewmodel variables;
	var vm = base(this, shell, service);

	var columnDefs = [
		// this row just shows the row index, doesn"t use any data from the row
		{ headerName: "#", width: 50, cellRenderer: function(params) {
			return params.node.id + 1;
		}},
        { headerName: "Id", field: "id", width: 100},
        { headerName: "Name", field: "name", width: 100},
        { headerName: "Is active", field: "isActive", width: 100},
        { headerName: "Type", field: "type", width: 100},
        { headerName: "Extra 1", field: "extra1", width: 100},
        { headerName: "Extra 2", field: "extra2", width: 100},
	];

	vm.pageSize = "500";

	vm.gridOptions = {
		// note - we do not set "virtualPaging" here, so the grid knows we are doing standard paging
		enableSorting: true,
		enableFilter: true,
		enableColResize: true,
		columnDefs: columnDefs
	};

	vm.onPageSizeChanged = function() {
		createNewDatasource();
	};

	$http.get("api/controls")
		.then(function(result){
			vm.shell.control.models = result.data;
			createNewDatasource();
		});

	function createNewDatasource() {
		if (!vm.shell.control.models) {
			// in case user selected "onPageSizeChanged()" before the json was loaded
			return;
		}

		var dataSource = {
			//rowCount: ???, - not setting the row count, infinite paging will be used
			pageSize: parseInt(vm.pageSize), // changing to number, as scope keeps it as a string
			getRows: function (params) {
				// this code should contact the server for rows. however for the purposes of the demo,
				// the data is generated locally, a timer is used to give the experience of
				// an asynchronous call
				console.log("asking for " + params.startRow + " to " + params.endRow);
				setTimeout( function() {
					// take a chunk of the array, matching the start and finish times
					var rowsThisPage = vm.shell.control.models.slice(params.startRow, params.endRow);
					// see if we have come to the last page. if we have, set lastRow to
					// the very last row of the last page. if you are getting data from
					// a server, lastRow could be returned separately if the lastRow
					// is not in the current page.
					var lastRow = -1;
					if (vm.shell.control.models.length <= params.endRow) {
						lastRow = vm.shell.control.models.length;
					}
					params.successCallback(rowsThisPage, lastRow);
				}, 500);
			}
		};

		vm.gridOptions.api.setDatasource(dataSource);
	}
}
module.exports.$inject = ["$scope","$http", "Shell", "ControlService"];