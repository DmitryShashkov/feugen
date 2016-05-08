myApp.service('NodeService', function() {
    var types = {
        'WORD': 1,
        'PART_OF_SPEECH': 2,
        'PREPOSITION': 3,
        'CONJUNCTION': 4,
        'PRONOUN': 5
    };
    
    return {
        types: types
    };
});