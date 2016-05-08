myApp.controller('GenerationCtrl', ['$scope', '$http', '$uibModal', 'NodeService',
    function ($scope, $http, $uibModal, NodeService) {
        function loadRules () {
            $http({
                url: '/rest/rules',
                method: 'GET'
            }).then(function (res) {
                if (res.data.status === 'ok') {
                    $scope.rules = res.data.rows;
                    $scope.selectedRule = $scope.rules[0];
                }
            });
        }
        
        $scope.selectRule = function (rule) {
            $scope.selectedRule = rule;
        };
        
        $scope.generate = function () {
            $http({
                url: '/rest/phrase/' + $scope.selectedRule.id,
                method: 'GET'
            }).then(function (res) {
                if (res.data.status === 'ok') {
                    $scope.generatedPhrase = res.data.phrase;
                }
            });
        };
        
        $scope.read = function (event, phrase, locale) {
            event.preventDefault();
            if ('speechSynthesis' in window) {
                var msg = new SpeechSynthesisUtterance(),
                    voices = window.speechSynthesis.getVoices();
                    
                msg.voice = voices[16]; 
                msg.voiceURI = 'native';
                msg.volume = 1;
                msg.rate = 1; 
                msg.pitch = 0;
                msg.text = phrase;
                msg.lang = locale;

                speechSynthesis.speak(msg);
            } else {
                console.log('Sorry, your browser doesn\'t support this feature');
            }
        };
        
        $scope.removeRule = function (event, rule) {
            event.preventDefault();
            $http({
                url: '/rest/rule/' + rule.id,
                method: 'DELETE'
            }).then(loadRules);
        };
        
        loadRules();
    }]);





