var app = angular.module('MenuApp', []);

app.controller('MenuController', function ($scope) {
    var count = 0;
    $scope.myFunc = function (event) {
        count++;
        if (count === 1) {
            event.currentTarget.className += " active";
            event.currentTarget.parentNode.parentNode.className += " item-active";
        }else{
            count = 0;
            var classP = event.currentTarget.parentNode.parentNode.className ;
            var classC = event.currentTarget.className;

            classP = classP.replace(' item-active', '');
            classC = classC.replace(' active', '');

            event.currentTarget.className = classC;
            event.currentTarget.parentNode.parentNode.className = classP;
        }
    }
})