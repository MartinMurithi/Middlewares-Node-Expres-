const { logEvents } = require("./logger")

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name} : ${err.message}\t${req.method}\t${req.url}\t${req.header.origin}`, 'errLog.log');
    const errStatus = res.errStatus || 500;
    const errMessage = res.message || 'Something went wrong';

    console.log(err.stack);

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage
    });
    next();
};

module.exports = errorHandler;