var express = require('express');
var router = express.Router();
const cm = require('../controllers/customers');
const mwAuth = require('../middleware/auth');

router.get('/customers', mwAuth, cm.getCustomers);
router.put('/customers/:id', mwAuth, cm.editCustomer);
router.delete('/customers/:id', mwAuth, cm.deleteCustomer);
router.post('/customers', mwAuth, cm.addCustomer);

<<
<< << < HEAD

module.exports = router; ===
=== =
module.exports = router; >>>
>>> > e726a2575182d38bd3f2bbbe40fdf8cb29b541b6