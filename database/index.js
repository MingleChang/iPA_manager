const path = require("path");
const Sequelize = require("sequelize");
const config = require('../utils/config');

const database = {};

const sequelize = new Sequelize(config.sqlite_config);

const ipa = sequelize.import(path.join(__dirname, 'ipa'));

sequelize.sync();

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.ipa = ipa;

module.exports = database;