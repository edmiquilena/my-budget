import 'dotenv/config' 
import Sequelize from 'sequelize'
import Movement from '../models/Movement';
import User from '../models/User';

const db = new Sequelize(process.env.DATABASE_URL,{
    logging: false
  });
 Movement(db)
User(db)



module.exports = {
    ... db.models, db
  };
