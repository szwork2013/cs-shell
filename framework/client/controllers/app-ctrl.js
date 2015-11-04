/**
 * initializes angular module cs-app-ctrl.
 */
module.exports = function appCtrl($scope){
    var vm = this;
        
    var columnDefs = [
        {headerName: "Make", field: "make"},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
    ];

    var rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];

    vm.gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData
    };	
}
module.exports.$inject = ["$scope"];