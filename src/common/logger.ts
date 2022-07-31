const { createLogger, format, transports,winston } = require('winston');
export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf((info) =>
            JSON.stringify({
                t: info.timestamp,
                l: info.level,
                m: info.message,
                s: info.splat !== undefined ? `${info.splat}` : '',
            }) + ','
        )
    ),
});


    logger.add(new transports.File({ filename: 'logs/output/error.log', level: 'error' }));
    logger.add(new transports.File({ filename: 'logs/output/warn.log', level: 'warn' }));
    logger.add(new transports.File({ filename: 'logs/output/info.log', level: 'info' }));

