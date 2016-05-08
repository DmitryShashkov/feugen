var express = require('express');
var router = express.Router();

var stat = require('../controllers/static');
var data = require('../controllers/data');
var phraseGen = require('../controllers/generator');

// static file
router.get('/', stat.index);

// rest requests
router.get('/rest/terminals', data.getTerminals);
router.get('/rest/terminals/:query', data.getTerminals);
router.delete('/rest/terminal/:id', data.removeTerminal);
router.post('/rest/terminal', data.addTerminal);
router.patch('/rest/terminal/:id', data.editTerminal);

router.get('/rest/prepositions', data.getPrepositions);
router.get('/rest/conjunctions', data.getConjunctions);
router.get('/rest/pronouns', data.getPronouns);

router.post('/rest/rule', data.addRule);
router.get('/rest/rules', data.getRules);
router.delete('/rest/rule/:id', data.removeRule);

router.get('/rest/phrase/:id', phraseGen.generate);

router.get('/*', stat.index);

module.exports = router;
