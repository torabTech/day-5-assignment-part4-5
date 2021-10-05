const express = require('express');
const router = express.Router({mergeParams:true});

const controller = require('../controller/reviewController');

router.route('/')
    .get(controller.getAll)
    .post(controller.addOne);

router.route('/:rid')
    .put(controller.updateOne)
    .delete(controller.deleteOne)
    .get(controller.getOne);


module.exports = router;