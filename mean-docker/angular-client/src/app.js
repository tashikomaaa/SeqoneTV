var app = angular.module('MenuApp', []);

app.controller('MenuController', function ($scope) {
    
    //For twitter API
    !function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0],
            p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");

    

    //For dropdown side menu
    var count = 0;
    $scope.myFunc = function (event) {
        count++;
        if (count === 1) {
            event.currentTarget.className += " active";
            event.currentTarget.parentNode.parentNode.className += " item-active";
        } else {
            count = 0;
            var classP = event.currentTarget.parentNode.parentNode.className;
            var classC = event.currentTarget.className;

            classP = classP.replace(' item-active', '');
            classC = classC.replace(' active', '');

            event.currentTarget.className = classC;
            event.currentTarget.parentNode.parentNode.className = classP;
        }
    }
})