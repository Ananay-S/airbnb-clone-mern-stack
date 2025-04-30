const errorHandler = (err, req, res, next) => {
    let {status=500, message="Something went wrong"} = err;
    res.status(status).json({ success: false, message: message, source: "server-error" });
};

module.exports = errorHandler;