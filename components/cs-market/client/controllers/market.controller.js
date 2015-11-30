/**
 * initializes angular cs.market.controller.
 */
module.exports = function marketController($scope, marketService, $http, $, $timeout){
    var market = this;  
    $("#loader").hide();
    
    $timeout(function(){       
        market.items = [
            {id:1, name:"Business App: NodeJS", price:"99.99", image:"http://placehold.it/400x250/000/fff", description: "Lorem ipsum dolor sit amet, id virtute vulputate nec, justo paulo euismod mea ad."},
            {id:2, name:"Business App: MVC 5", price:"99.99", image:"http://placehold.it/400x250/000/fff", description: "Lorem ipsum dolor sit amet, id virtute vulputate nec, justo paulo euismod mea ad."},
            {id:3, name:"Business App: Rails", price:"99.99", image:"http://placehold.it/400x250/000/fff", description: "Lorem ipsum dolor sit amet, id virtute vulputate nec, justo paulo euismod mea ad."},
            {id:4, name:"Business App: React", price:"99.99", image:"http://placehold.it/400x250/000/fff", description: "Lorem ipsum dolor sit amet, id virtute vulputate nec, justo paulo euismod mea ad."},
            {id:5, name:"Business App: Ionic Android", price:"99.99", image:"http://placehold.it/400x250/000/fff", description: "Lorem ipsum dolor sit amet, id virtute vulputate nec, justo paulo euismod mea ad."},
            {id:6, name:"Business App: Ionic IoS", price:"99.99", image:"http://placehold.it/400x250/000/fff", description: "Lorem ipsum dolor sit amet, id virtute vulputate nec, justo paulo euismod mea ad."},
            {id:7, name:"Business App: Windows 10 Phone", price:"99.99", image:"http://placehold.it/400x250/000/fff", description: "Lorem ipsum dolor sit amet, id virtute vulputate nec, justo paulo euismod mea ad."},
            {id:8, name:"Business App: Windows 10", price:"99.99", image:"http://placehold.it/400x250/000/fff", description: "Lorem ipsum dolor sit amet, id virtute vulputate nec, justo paulo euismod mea ad."}
        ];
        $("#userList").show();
    }, 1000);
    
    market.showUserModal = function(idx){
        var user = market.users[idx].user;
        market.currUser = user;
        $("#myModalLabel").text(user.name.first
            + " " + user.name.last);
        $("#myModal").modal("show");
    }    
    
    // default view is list
    market.mode = 2;
}
module.exports.$inject = ["$scope", "MarketService","$http","$", "$timeout"];