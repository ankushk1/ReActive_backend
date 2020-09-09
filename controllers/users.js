const User = require('../models/user');
const Payee = require('../models/payee');
const {accNumGen} = require('../utility/utility')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {sendMail}=require('../utility/nodemailer')

 //signup
exports.signup = function (req, res) { 
    const accnum = accNumGen();
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        blnc:1000,
        accountNo: accnum
    });
    user.save((err, user) => {
      if (err) {
          console.log(err)
        return res.status(400).json({
          err: 'NOT able to save user in DB',
        });
      } 
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
        accountNo:accnum,
        blnc:1000
      });
    });

    sendMail(req.body.email,'Sign up successful', ` You have been registered with ReActive bank, your account number is ${accnum}`)
}



//authenticate user
exports.login = function (req, res) {
    var accountNo=''
    User.findOne({
        email: req.body.email
    }, function (err, result) {
        if (result===null) {
            res.status(400).json({
                status:"no user found",
                message: "Invalid email / password"
            })
        } else {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                const token = jwt.sign({
                    id: result._id
                }, req.app.get('secretKey'), {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    status: "Success",
                    message: "Logged in",
                    data: {
                        name: result.name,
                        email: result.email,
                        blnc: result.blnc,
                        accountNo:result.accountNo,
                        id: result._id,
                        token: token
                    }
                });

            } else {
                res.status(400).json({
                    status: "error",
                    message: "Invalid email / password",
                });
            }
        }
    });
    sendMail(req.body.email,'Sign in successful', `You have signed in on your account`)
}

exports.getUserById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if (err || !user) {
                res.status(400).json({
                    error: 'No user was found in DB',
                });
            }
            req.profile = user;
            next();
        });
};

exports.getUser = (req, res) => { //get user data by id
    return res.json({
        "user": req.profile
    });
};


exports.transferMoney = async (req, res) => {

    //payee id
    try {
        let payeeId = await User.findOne({
            name: req.body.name,
            accountNo: req.body.accountNo
        });
        const userId = User.findById(req.params.userID)



        const transferAmount = req.body.amount
        const totalblnc = req.profile.blnc

        //check if not a user
        if (!payeeId) {
            res.status(400).json({
                error:1,
                message: 'No payee was found ',
            });
        }

        //check min balance
        else if (totalblnc < transferAmount || totalblnc<=0) {
            res.status(400).json({
                error:1,
                message: "Low balance, please add money to account"
            })
        }
       
        else {
            const user = await userId.updateOne({
                $inc: {
                    blnc: -transferAmount
                }
            })

            const payee = await payeeId.updateOne({
                $inc: {
                    blnc: transferAmount
                }
            })
            res.status(200).json({
                error:0,
                message: "transaction successful"
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "transaction failed"
        })
    }


};

//delete payee
exports.deletePayee = (req, res) => {
    try {
        User.findByIdAndRemove(req.params.userID,
            (err, user) => {
                if (err) {
                    res.status(400).json({
                        message: 'Failed to delete user',
                        error: err
                    });
                } else {
                    res.status(200).json({
                        message: `Successfully deleted payee`,
                    });
                }
            }
        )
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "cannot delete payee"
        })
    }
}

//update payee
exports.updatePayee = (req, res) => {

    try {
        User.findByIdAndUpdate(req.params.userID,{
            name: req.body.name,
            accountNo: req.body.accountNo},
            (err, result) =>{
            if (err)
                next(err);
            else {
                res.status(200).json({
                    status: "success",
                    message: "Payee updated successfully",
                });
            }
        });
    }
    catch (err) {
        res.status(500).json({
            error: err,
            message: "cannot update payee"
        })

    }

}