var express = require('express');
var router = express.Router();
const cm = require('../controllers/customers');
const mwAuth = require('../middleware/auth');

router.get('/customers', mwAuth, cm.getCustomers);
router.put('/customers/:id', mwAuth, cm.editCustomer);
router.delete('/customers/:id', mwAuth, cm.deleteCustomer);


//router.delete('/cards/:id', mwAuth, cardsM.deleteCard);
//router.get('/courses/sorted', fm.getSortedCoursesDetails);

//router.get('/courses/export', fm.exportCourses);
//router.get('/courses/export/filtered', fm.exportFilteredCourses);


module.exports = router;