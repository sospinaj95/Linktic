let env = {
    development: {
        dbMongo: {
            mongo_host: 'localhost',
            mongo_port: '27017',
            mongo_database: 'bi-catalogo'
        },
        keyAuth: '35975f6e4ea9bf0cafd12bc0aaea64c0',
    },
    qa: {},
    production: {}
};

export default env[process.env.ENV||'development'];
