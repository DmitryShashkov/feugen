myApp.controller('TerminalsCtrl', ['$scope', '$http', '$uibModal', function ($scope, $http, $uibModal) {
    $scope.itemsPerPage = 10;
    $scope.totalItems = 0;
    
    function loadTerminals () {
        $http({
            url: '/rest/terminals',
            method: 'GET'
        }).then(function (res) {
            if (res.data.status === 'ok') {
                $scope.terminals = res.data.rows;
                $scope.filteredTerminals = res.data.rows;
                $scope.pagedTerminals = [];
                for (var i = 0; i < $scope.itemsPerPage; i++) {
                    $scope.pagedTerminals.push($scope.filteredTerminals[i]);
                }
                $scope.totalItems = $scope.filteredTerminals.length;
                $scope.currentPage = 1;
            }
        });
    }
    loadTerminals();
    
    $scope.pageChanged = function () {
        $scope.pagedTerminals = [];
        for (var i = $scope.itemsPerPage * ($scope.currentPage - 1); i < $scope.itemsPerPage * ($scope.currentPage - 1) + $scope.itemsPerPage; i++) {
            if ($scope.filteredTerminals[i]) {
                $scope.pagedTerminals.push($scope.filteredTerminals[i]);
            }
        }
    };
    
    $scope.$watch('filterQuery', function () {
        $scope.filteredTerminals = _.filter($scope.terminals, function(terminal) { 
            return (terminal['eng_spelling'].indexOf($scope.filterQuery) > -1) ||
                (terminal['rus_spelling'].indexOf($scope.filterQuery) > -1) ||
                (terminal['part_of_speech'].indexOf($scope.filterQuery) > -1); 
        });
        $scope.totalItems = $scope.filteredTerminals.length;
        $scope.pageChanged();
    });
    
    $scope.read = function (event, terminal, locale) {
        event.preventDefault();
        if ('speechSynthesis' in window) {
                var msg = new SpeechSynthesisUtterance(),
                    voices = window.speechSynthesis.getVoices();
                    
                msg.voice = voices[16]; 
                msg.voiceURI = 'native';
                msg.volume = 1;
                msg.rate = 1; 
                msg.pitch = 0;
                msg.text = terminal;
                msg.lang = locale;

                speechSynthesis.speak(msg);
            } else {
                console.log('Sorry, your browser doesn\'t support this feature');
            }
    };
    
    $scope.showRemoveModal = function (event, terminalID) {
        event.preventDefault();
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'removeModal.html',
            controller: 'RemoveModalCtrl',
            size: 'sm',
            resolve: {
                terminal: function () {
                    return _.findWhere($scope.terminals, {
                        id: terminalID
                    });
                }
            }
        });

        modalInstance.result.then(function (answer) {
            if (answer === 'ok') {
                $http({
                    url: '/rest/terminal/' + terminalID,
                    method: 'DELETE'
                }).then(function (res) {
                    if (res.data.status === 'ok') {
                        $scope.terminals = _.without($scope.terminals, _.findWhere($scope.terminals, {
                            id: terminalID
                        }));
                    }
                });
            }
        });
    };
    
    $scope.showAddModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addModal.html',
            controller: 'AddModalCtrl'
        });

        modalInstance.result.then(function (answer) {
            if (answer === 'ok') {
                loadTerminals(); // apply local change instead of loading everything once again
            }
        });
    };
    
    $scope.showEditModal = function (event, terminalID) {
        event.preventDefault();
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addModal.html',
            controller: 'EditModalCtrl',
            resolve: {
                terminal: function () {
                    return _.findWhere($scope.terminals, {
                        id: terminalID
                    });
                }
            }
        });
        
        modalInstance.result.then(function (answer) {
            if (answer === 'ok') {
                loadTerminals(); // apply local change instead of loading everything once again
            }
        });
    };
}]);

myApp.controller('RemoveModalCtrl', function ($scope, $uibModalInstance, terminal) {
    $scope.terminal = terminal;

    $scope.close = function (answer) {
        $uibModalInstance.close(answer);
    };
});

myApp.controller('AddModalCtrl', function ($scope, $http, $uibModalInstance) {
    // replace this with http-get
    $scope.partsOfSpeech = [{id: 0, title: 'существительное'},
        {id: 1, title: 'прилагательное'},
        {id: 2, title: 'глагол'},
        {id: 3, title: 'наречие'}];

    $scope.modalTitle = 'Добавление терминала';    
    $scope.modalAction = 'Добавить';
        
    $scope.confirm = function () {
        var partOfSpeech = _.findWhere($scope.partsOfSpeech, {
            title: $('#partOfSpeech').get(0).options[$('#partOfSpeech').get(0).selectedIndex].text
        });
        $http({
            url: '/rest/terminal',
            method: 'POST',
            data: {
                rusSpelling: $scope.rusSpelling,
                engSpelling: $scope.engSpelling,
                partOfSpeech: partOfSpeech.id
            }
        }).then(function (res) {
            $uibModalInstance.close(res.data.status);
        });
    };
});

myApp.controller('EditModalCtrl', function ($scope, $http, $uibModalInstance, terminal) {
    // replace this with http-get
    $scope.partsOfSpeech = [{id: 0, title: 'существительное'},
        {id: 1, title: 'прилагательное'},
        {id: 2, title: 'глагол'},
        {id: 3, title: 'наречие'}];

    $scope.modalTitle = 'Изменение терминала';    
    $scope.modalAction = 'Изменить';
    $scope.rusSpelling = terminal['rus_spelling'];
    $scope.engSpelling = terminal['eng_spelling'];
        
    $scope.confirm = function () {
        var partOfSpeech = _.findWhere($scope.partsOfSpeech, {
            title: $('#partOfSpeech').get(0).options[$('#partOfSpeech').get(0).selectedIndex].text
        });
        $http({
            url: '/rest/terminal/' + terminal['id'],
            method: 'PATCH',
            data: {
                rusSpelling: $scope.rusSpelling,
                engSpelling: $scope.engSpelling,
                partOfSpeech: partOfSpeech.id
            }
        }).then(function (res) {
            $uibModalInstance.close(res.data.status);
        });
    };
});

