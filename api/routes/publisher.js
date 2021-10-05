const express = require('express');
const router = express.Router({mergeParams:true});

const controller = require('../controller/publisherController');

router.route('/')
    .get(controller.getAll)
    .post(controller.addOne);


router.route('/')
    .put(controller.updateOne)
    .delete(controller.deleteOne);

module.exports = router;