const config = {
    host: (process.env.NODE_ENV=='production')?'ipa.minglechang.com':'192.168.199.103',
    port: (process.env.NODE_ENV=='production')?9001:8000,//http端口
    ports: (process.env.NODE_ENV=='production')?9002:8001,//https端口

    sqlite_config: {
        database: 'ipa',
		dialect: 'sqlite',
		storage: 'ipa.sqlite'
    },

    mysql_config: {
        
    }
};

module.exports = config;