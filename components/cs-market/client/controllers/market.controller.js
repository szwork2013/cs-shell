/**
 * initializes angular cs.market.controller.
 */
module.exports = function marketController($scope, marketService, $http, $){
    var market = this;  
    $http.get("http://api.randomuser.me/?results=20").success(function(data) {
        market.users = data.results;
        $("#loader").hide();
        $("#userList").show();
    }).error(function(data, status) {
        alert("get data error!");
    });
    
    market.showUserModal = function(idx){
        var user = market.users[idx].user;
        market.currUser = user;
        $("#myModalLabel").text(user.name.first
            + " " + user.name.last);
        $("#myModal").modal("show");
    }    
    // default view is list
    market.mode = 1;
}
module.exports.$inject = ["$scope", "MarketService","$http","$"];