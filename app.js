var app = angular.module('app', ['ngParse', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'generalController'
        })
        .when('/newPost', {
            templateUrl: 'newPost.html',
            controller: 'entryController'
        })
        .when('/post/:id', {
            templateUrl: 'generalPost.html',
            controller: 'detailsController'
        })
        .when('/generalForum', {
            templateUrl: 'generalForum.html',
            controller: 'generalController'
        })
        .when('/personalForum', {
            templateUrl: 'forumPersonal.html',
            controller: 'personalController'
        })
        .when('/educationalForum', {
            templateUrl: 'forumEducational.html',
            controller: 'educationalController'
        })
        .when('/patrickForum', {
            templateUrl: 'patrickForum.html',
            controller: 'generalController'
        })
        .when('/history', {
            templateUrl: 'alenaHistory.html',
            controller: 'dummyController'
        })
        .when('/staff', {
            templateUrl: 'alenaStaff.html',
            controller: 'dummyController'
        })
        .when('/services', {
            templateUrl: 'patrickServicesAndResources.html',
            controller: 'dummyController'
        })
        .when('/links', {
            templateUrl: 'links.html',
            controller: 'dummyController'
        })
        .when('/contact', {
            templateUrl: 'alenaContact.html',
            controller: 'dummyController'
        })
        .when('/getInvolved', {
            templateUrl: 'alenaGetInvolved.html',
            controller: 'dummyController'
        })
        .when('/preventionPre', {
            templateUrl: 'patrickPreventionPreEval.html',
            controller: 'dummyController'
        })
        .when('/preventionPost', {
            templateUrl: 'patrickPreventionPostEval.html',
            controller: 'dummyController'
        })
        .when('/workshopEval', {
            templateUrl: 'patrickWorkshopEval.html',
            controller: 'dummyController'
        })
        .when('/imagine', {
            templateUrl: 'patrickImagine.html',
            controller: 'dummyController'
        })
        .when('/definitions', {
            templateUrl: 'patrickDefinitions.html',
            controller: 'dummyController'
        })
        .when('/media.html', {
            templateUrl: '/',
            conroller: 'dummyController'
        })
});


angular.module('app')
    .config(['ParseProvider', (ParseProvider) => {
        ParseProvider.initialize("WXh6FMIyi8T1oNYks1rbe93kypWJjOilO5YZStC6", "gjqGO7tI7vGlOgin8jP2GHYn2elgMs9SOE8incRv");
        ParseProvider.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
  }]);


app.controller('dummyController', ['$scope', function ($scope) {

}]);


//app.controller('definitionController', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
//    $scope.gotoAnchor = function (x) {
//        var newHash = 'anchor' + x;
//        if ($location.hash() !== newHash) {
//            $location.hash('anchor' + x);
//        } else {
//            $anchorScroll();
//        }
//    }
//}]);


app.controller('entryController', ['$scope', 'Parse', 'EntryModel', '$http', '$window', function ($scope, Parse, EntryModel, $http, $window) {
    $scope.makeEntry = function (title, name, msg, section) {

        var Entry = Parse.Object.extend('Entry');
        var entry = new Entry();

        entry.save('title', title);
        entry.set('msg', msg);
        entry.set('author', name);
        entry.set('section', section);

        entry.save()
            .then(e => {
                console.log('Saved')
                $window.location.href = `#/${section}Forum`;
                $window.location.reload();
            }).catch(error => console.log('Error: ', error));
        console.log('Working');
    }
}]);

app.controller('generalController', ['$scope', '$window', function ($scope, $window) {
    $scope.dataLoaded = false;
    $scope.threads = [];
    var Entry = Parse.Object.extend('Entry');
    var entry = new Entry();

    var query = new Parse.Query(Entry);
    query.equalTo('section', 'general');
    query.find().then(e => {
        $scope.threads = e;
        $scope.dataLoaded = true;
        $scope.$apply();
    }).catch(e => console.log('Error', error));
}]);

app.controller('personalController', ['$scope', '$window', function ($scope, $window) {
    $scope.dataLoaded = false;
    $scope.threads = [];
    var Entry = Parse.Object.extend('Entry');
    var entry = new Entry();

    var query = new Parse.Query(Entry);
    query.equalTo('section', 'personal');
    query.find().then(e => {
        $scope.threads = e;
        $scope.dataLoaded = true;
        $scope.$apply();
    }).catch(e => console.log('Error', error));
}]);

app.controller('educationalController', ['$scope', '$window', function ($scope, $window) {
    $scope.dataLoaded = false;
    $scope.threads = [];

    var Entry = Parse.Object.extend('Entry');
    var entry = new Entry();

    var query = new Parse.Query(Entry);
    query.equalTo('section', 'educational');
    query.find().then(e => {
        $scope.threads = e;
        $scope.dataLoaded = true;
        $scope.$apply();
    }).catch(e => console.log('Error', error));
}]);



app.controller('detailsController', ['$scope', '$routeParams', '$window', function ($scope, $routeParams, $window) {
    $scope.dataLoaded = false;
    $scope.id = $routeParams.id;
    $scope.replies = [];

    // Set up post
    $scope.title = '';
    $scope.message = '';
    $scope.author = '';
    $scope.timestamp = '';

    var Entry = Parse.Object.extend('Entry');
    var entry = new Entry();

    var query = new Parse.Query(Entry);
    query.equalTo('objectId', $scope.id);
    query.first().then(e => {
        $scope.title = e.attributes.title;
        $scope.message = e.attributes.msg;
        $scope.author = e.attributes.author;
        $scope.replies = e.attributes.children;
        $scope.timestamp = e.attributes.createdAt.toString();
        $scope.dataLoaded = true;
        $scope.$apply();
    }).catch(e => console.log('Error: ', error));

    // Make reply
    $scope.makeReply = function (name, msg) {
        var reply = {
            'Name': name,
            'Message': msg
        };

        var Entry = Parse.Object.extend('Entry');
        var entry = new Entry();
        var query = new Parse.Query(Entry);
        query.equalTo('objectId', $scope.id);
        query.first().then(e => {
            $scope.section = e.attributes.section;
            console.log($scope.section);
            e.add('children', reply);
            e.save()
                .then(e => {
                    console.log('Reply successful.');
                    //$window.location.href=`#/post/${$scope.id}`;
                    $window.location.reload();
                }).catch(e => console.log('Error: ', e));
        }).catch(e => console.log('Error: ', error));
    }
}]);




function EntryModel(Parse) {
    this.Parse = Parse;
    this.data = {};
    this.collection = [];
    this.name = 'Entry';
    this.fields = [
        'msg',
        'section',
        'children',
        'timestamp',
        'author'
    ];
    this.New = New;
    this.getById = getById;


    function New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name);
            this.Parse.defineAttributes(parseObject, this.fields);
            return ParseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }

    function getById(obj) {
        return new this.Parse.Query(this.New()).get(id)
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                return Promise.resolve(result);
            }).catch(error => Promise.reject(error));
    }

}


angular
    .module('app')
    .service('EntryModel', EntryModel)