// models/CompanyStructure.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const CompanyStructure = sequelize.define('CompanyStructure', {
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  extractedData: {
    type: DataTypes.JSONB, // ✅ for PostgreSQL
    allowNull: false,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = CompanyStructure;
