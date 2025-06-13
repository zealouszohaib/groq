// sync.js
const sequelize = require('./db');
const CompanyStructure = require('./models/CompanyStructure');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB Connected');

    await sequelize.sync({ alter: true }); // use { force: true } for dev resets
    console.log('✅ Models Synced');
  } catch (err) {
    console.error('❌ Failed to connect or sync', err);
  } finally {
    await sequelize.close();
  }
})();
