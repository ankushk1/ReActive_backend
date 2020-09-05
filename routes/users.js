const express = require('express');
const router = express.Router();
const {signup,login,getUser,getUserById,transferMoney,deletePayee,updatePayee} = require('../controllers/users');
const {validateUser}=require('../utility/utility') //jwt token required

router.param('userID',getUserById)

router.post('/user/signup', signup); //signup
router.post('/user/login', login); //login
router.post('/user/transfer/:userID',validateUser, transferMoney); //transfer monet(jwt required)
router.get('/user/:userID',validateUser, validateUser,getUser) //get user(jwt required)
router.delete('/user/delete/:userID',validateUser,deletePayee) //delete payee(jwt required)
router.put('/user/update/:userID',validateUser,updatePayee) //update payeet(jwt required)
//export router
module.exports = router;