
/**
 * Module dependencies.
 */
var base = require("./organisation.base.controller");

/**
* Initializes module Organisation.
*/
module.exports = function($scope, $http, shell, service) {
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
	vm.name = "organisation:grid:controller";
	var columnDefs = [
		// this row just shows the row index, doesn"t use any data from the row
		{ headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			}
		},
        { headerName: "Id", field: "id", width: 100},
        { headerName: "Name", field: "name", width: 100},
        { headerName: "Is active", field: "isActive", width: 100},
	]
	vm.pageSize = 500;
	vm.gridOptions = {
		// note - we do not set "virtualPaging" here, so the grid knows we are doing standard paging
		enableSorting: true,
		enableFilter: true,
		enableColResize: true,
		columnDefs: columnDefs,
		rowSelection: "single",
		onRowSelected: function(event){
			vm.shell.debug(vm.name + ":select:"+ event.node.data.id);
			vm.selectOrganisation(event.node.data);			
		},
		onReady: function(event) {
			event.api.sizeColumnsToFit();
		}
	};
	vm.onPageSizeChanged = onPageSizeChanged;
	vm.onGridRefreshOrganisation = onGridRefreshOrganisation;
	
	/**
	 * Initializes the organisation grid controller
	 */
	function initialize(){
		vm.shell.debug(vm.name + ":initializing");
		vm.shell.organisation.service.getOrganisations(function(models){
			// sets the event subscriptions;
			organisationEvents();		
			// sets the datagrid's datasource;
			vm.shell.organisation.models = models;	
			// creates the grid datasource;
			createDatasource();
			vm.shell.debug(vm.name + ":initialized:" + models.length);		
		});
	}

	/**
	 * refreshes the grid datasource;
	 */	
	function onGridRefreshOrganisation(){
		createDatasource();
		vm.shell.debug(vm.name + ":grid:refresh");
	}
	
	/**
	 * When the page sizes is changed this will be triggered;
	 */
	function onPageSizeChanged() {
		vm.shell.debug(vm.name + ":pagesize:changed");
		createDatasource();
	};
	
	/**
	 * Creates datasource
	 */
	function createDatasource() {
		if (!vm.shell.organisation.models) {
			// in case organisation selected "onPageSizeChanged()" before the json was loaded
			vm.shell.debug(vm.name + ":rows:count:0");
			return;
		}

		vm.shell.debug(vm.name + ":datasource:creating");
		var dataSource = {
			//rowCount: ???, - not setting the row count, infinite paging will be used
			pageSize: parseInt(vm.pageSize), // changing to number, as scope keeps it as a string
			getRows: function (params) {
				// this code should contact the server for rows. however for the purposes of the demo,
				// the data is generated locally, a timer is used to give the experience of
				// an asynchronous call
				vm.shell.debug(vm.name + ":datasource:rows:start:" + params.startRow + ":to:" + params.endRow);
				setTimeout( function() {
					// take a chunk of the array, matching the start and finish times
					var rowsThisPage = vm.shell.organisation.models.slice(params.startRow, params.endRow);
					// see if we have come to the last page. if we have, set lastRow to
					// the very last row of the last page. if you are getting data from
					// a server, lastRow could be returned separately if the lastRow
					// is not in the current page.
					var lastRow = -1;
					if (vm.shell.organisation.models.length <= params.endRow) {
						lastRow = vm.shell.organisation.models.length;
					}
					params.successCallback(rowsThisPage, lastRow);
				}, 500);
			}
		};

		vm.gridOptions.api.setDatasource(dataSource);
		vm.shell.debug(vm.name + ":datasource:created");
	}
	
	/**
	 * organisation events
	 */
	function organisationEvents(){
		var organisationUpdateSubscription = vm.shell.postal.subscribe({
			channel: "organisation",
			topic: "update:event",
			callback: function(data, envelope) {
				vm.onGridRefreshOrganisation();
				vm.shell.debug(vm.name + ":update:event:received:"+data.id);
			}
		});
		vm.shell.debug(vm.name + ":update:event:subscribed");
		var organisationCreateSubscription = vm.shell.postal.subscribe({
			channel: "organisation",
			topic: "create:event",
			callback: function(data, envelope) {
				vm.onGridRefreshOrganisation();
				vm.shell.debug(vm.name + ":create:event:received:"+data.id);
			}
		});
		vm.shell.debug(vm.name + ":create:event:subscribed");
		var organisationRemoveSubscription = vm.shell.postal.subscribe({
			channel: "organisation",
			topic: "remove:event",
			callback: function(data, envelope) {
				vm.onGridRefreshOrganisation();
				vm.shell.debug(vm.name + ":remove:event:received:"+data.id);
			}
		});
		vm.shell.debug(vm.name + ":remove:event:subscribed");
		$scope.$on("$destroy",function(){
			organisationUpdateSubscription.unsubscribe();
			vm.shell.debug(vm.name + ":update:event:unsubscribed");
			organisationCreateSubscription.unsubscribe();
			vm.shell.debug(vm.name + ":create:event:unsubscribed");
		});
	}
	
	/**
	 * Intialize organisation grid controller
	 */
	initialize();
}
module.exports.$inject = ["$scope","$http", "Shell", "OrganisationService"];