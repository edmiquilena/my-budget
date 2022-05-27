import 'dotenv/config' 
import Sequelize from 'sequelize'
import Movement from '../models/Movement';
import User from '../models/User';

const db = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  });
 Movement(db)
User(db)



module.exports = {
    ... db.models, db
  };
