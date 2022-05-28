import {Model, DataTypes}  from 'sequelize'
const Movement = async(sequelize) => {  class Movement extends Model {}
  Movement.init(
    {
    id: { 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
    primaryKey: true},
    type: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    concept: {
      type:  DataTypes.STRING,
      defaultValue: null
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
    amount: DataTypes.DECIMAL,
    creator: {
      type: DataTypes.UUID
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
    },
    {
      sequelize,
      modelName: 'Movement',
    }
  );
  try{ 
  await Movement.sync()
  } catch(e) {
    console.log(e)
  }
  return Movement;
  }
export default Movement;