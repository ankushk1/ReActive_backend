const express = require('express');
const router = express.Router();
const {validateUser}=require('../utility/utility')
const {getUserById} = require('../controllers/users');


const {getPayee,getPayeeById}=require('../controllers/Payee')

router.param('userID',getUserById) 
router.param('payeeId',getPayeeById); 

router.get('/payee/:payeeId/',validateUser,getPayeeById,getPayee); //get payee

module.exports = router;
