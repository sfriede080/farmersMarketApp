import { Sequelize} from 'sequelize';
import { config } from './database.js';

const sequelize = new Sequelize(config.database, config.username, config.password, 
      {
            host: config.host,
            dialect: config.dialect,
            define: {
                  timestamps: false
            }    
      }
 );
// Test the connection 
async function testConnection() {   
      sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err); 
      });
}
testConnection();
  
export default sequelize;
