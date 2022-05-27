import bcrypt from "bcrypt"
import {Model, DataTypes}  from 'sequelize'
const SALT_WORK_FACTOR = 10;
const User = async(sequelize) => {  class User extends Model {
    async generateHash(password) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        return bcrypt.hash(password, salt);
    }
    async validPassword(password) {
        return await bcrypt.compare(password, this.password);
    }

}
  User.init(
    {
    id: { 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
    primaryKey: true},
    email: {type: DataTypes.STRING, isEmail: true},
        password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
     
    }
  );
  User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});
  try{ 
  await User.sync()
  } catch(e) {
    console.log(e)
  }
  return User;
  }
export default User;

