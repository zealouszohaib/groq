const CompanyStructure = require('../models/CompanyStructure');

const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Company ID is required' });
        }

        const companyStructure = await CompanyStructure.findByPk(id);

        if (!companyStructure) {
            return res.status(404).json({ error: 'Company structure not found' });
        }

        return res.status(200).json({
            success: true,
            data: companyStructure
        });

    } catch (error) {
        console.error('Error getting company:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};

module.exports = {
    getCompanyById
};
