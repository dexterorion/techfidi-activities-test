var express = require('express');
var router = express.Router();
var service = require('./../services/activity');
var validator = require('./validators/activity');
const { validationResult } = require('express-validator');

/* GET activities listing. */
router.get('/', function(req, res, next) {
  return service.findAll((err, result) => {
    if (err) {
      return res.status(500).send({error: err.toString()});
    }

    return res.status(200).send({data: result});
  })
});

/* POST acitivities create new */
router.post('/', validator.create, function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  return service.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).send({error: err.toString()});
    }

    return res.status(201).send({data: result});
  })
});

/* GET acitivities get by id */
// PS: Just adding this to validate the test for update status
router.get('/:id', function(req, res, next) {
  return service.getById({ id: req.params.id }, (err, result) => {
    if (err) {
      return res.status(500).send({error: err.toString()});
    }

    return res.status(200).send({data: result});
  })
});

/* PUT acitivities updates status */
router.put('/:id/status', validator.updateStatus, function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  return service.updateStatus({ status: req.body.status, id: req.params.id }, (err, result) => {
    if (err) {
      return res.status(500).send({error: err.toString()});
    }

    return res.status(201).send({data: result});
  })
});

module.exports = router;
