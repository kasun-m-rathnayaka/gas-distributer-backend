const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err}
        error.message = error.message || 'Something went wrong';

        if(error.name === 'ValidationError') {
            error.statusCode = 404;
            const message = "Resource not found";
            error = new Error(message);
        }

        if(error.code === 11000) {
            error.statusCode = 400;
            const message = "Duplicate field value entered";
            error = new Error(message);
        }

        // mongoose bad object id
        if (error.name === 'CastError') {
            error.statusCode = 404;
            const message = `Resource not found. Invalid: ${error.path}`;
            error = new Error(message);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Something went wrong'
        });
    }
    catch (error) {
        next(error);
    }
}

export default errorMiddleware;