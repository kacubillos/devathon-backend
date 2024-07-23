const info= (...params: any[]) => {
    if (process.env.NODE_ENV !== 'test'){
        console.log(...params)
    }
}

const error = (...params: any[]) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params)
    }
}

interface Logger {
    info: (...params: any[]) => void;
    error: (...params: any[]) => void;
}

const logger: Logger = {
    info: info,
    error: error
};

export default logger;