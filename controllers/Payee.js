const Payee = require('../models/payee');
const User = require('../models/user');

exports.getPayeeById = (req, res, next, id) => {

    Payee.findById(id)
    .populate('users', 'id name email accountNo')
    .exec((err, payee) => {
    if (err) {
      res.status(400).json({
        error: 'Payee not found',
      });
    }
    req.payee = payee;
    next();
  });
};

exports.getPayee = (req, res) => {
  return res.json(req.payee);
};

