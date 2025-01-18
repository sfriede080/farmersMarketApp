import { Sequelize } from 'sequelize'; 
const db_config = require('./database'); 

const sequelize = new Sequelize(db_config.development);
// Test the connection 
async function testConnection() {   
try {     
      await sequelize.authenticate();
      console.log('Database connected succefully');
} catch (error) {
      //ensure you created the database 
      //check database credentials
      console.error('Unable to connect to the database:', error);
   }
}
testConnection();
  
module.exports = sequelize;