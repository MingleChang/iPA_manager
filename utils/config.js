const config = {
    host: '172.16.40.216',
    port: 8000,//http端口
    ports:8001,//https端口

    sqlite_config: {
        database: 'ipa',
		dialect: 'sqlite',
		storage: 'ipa.sqlite'
    },

    mysql_config: {
        
    }
};

module.exports = config;