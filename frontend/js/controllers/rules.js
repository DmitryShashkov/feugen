myApp.controller('RulesCtrl', ['$scope', '$http', '$uibModal', 'NodeService',
    function ($scope, $http, $uibModal, NodeService) {
        var types = NodeService.types;
        $scope.sequence = [];
        $scope.showAddingPanel = false;
        $scope.prepositions = [];
        $scope.pronouns = [];
        $scope.conjunctions = [];
        
        // should be in distinct service
        $http({
            method: 'GET',
            url: '/rest/prepositions'
        }).then(function (res) {
            if (res.data.status === 'ok') {
                $scope.prepositions = res.data.rows;
            }
        });
        $http({
            method: 'GET',
            url: '/rest/pronouns'
        }).then(function (res) {
            if (res.data.status === 'ok') {
                $scope.pronouns = res.data.rows;
            }
        });
        $http({
            method: 'GET',
            url: '/rest/conjunctions'
        }).then(function (res) {
            if (res.data.status === 'ok') {
                $scope.conjunctions = res.data.rows;
            }
        });
        
        $scope.remove = function (scope) {
            scope.remove();
        };

        $scope.newItem = function () {
            $scope.showAddingPanel = true;
        };
        
        $scope.addComponent = function () {
            $scope.showAddingPanel = false;
            var newRule = {};
            switch ($scope.selectedComponent.id) {
                case 1: newRule.title = 'Слово: ' + ($('#words_value').val() || '(не указано)');
                    newRule.value = $('#words_value').val();
                    newRule.type = types.WORD;
                    break;
                case 2: newRule.title = 'Часть речи: ' + ($('#partsOfSpeech').val());
                    newRule.value = $('#partsOfSpeech').val();
                    newRule.type = types.PART_OF_SPEECH;
                    break; 
                case 3: newRule.title = 'Предлог: ' + ($('#prepositions').val());
                    newRule.value = $('#prepositions').val();
                    newRule.type = types.PREPOSITION;
                    break;   
                case 4: newRule.title = 'Союз: ' + ($('#conjunctions').val());
                    newRule.value = $('#conjunctions').val();
                    newRule.type = types.CONJUNCTION;
                    break;     
                case 5: newRule.title = 'Местоимение: ' + ($('#pronouns').val());
                    newRule.value = $('#pronouns').val();
                    newRule.type = types.PRONOUN;
                    break;  
            }
            $scope.sequence.push(newRule);
        };
        
        $scope.possibleComponents = [
            {id: 1, title: 'Определённое слово'},
            {id: 2, title: 'Часть речи'},
            {id: 3, title: 'Предлог'},
            {id: 4, title: 'Союз'},
            {id: 5, title: 'Местоимение'}
        ];
        $scope.selectedComponent = $scope.possibleComponents[0];
        $scope.selectComponent = function (component) {
            $scope.selectedComponent = component;
        };
        
        $scope.addRule = function () {
            $http({
                url: '/rest/rule',
                method: 'POST',
                data: {
                    title: $scope.ruleName,
                    sequence: $scope.sequence
                }
            }).then(function (res) {
                if (res.data.status === 'ok') {
                    $scope.addingResult = 'Правило добавлено!';
                    setInterval(function () {
                        $scope.addingResult = '';
                        $scope.$apply();
                    }, 5000);
                }
            });
        };
    }]);





