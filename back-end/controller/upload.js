const multer = require('multer');
const path = require('path');
const { processImageWithGroq } = require('../helper/processImageWithGroq');
const CompanyStructure = require('../models/CompanyStructure');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});



// Single file upload endpoint
const uploadFile = async (req, res) => {
  // Use multer middleware
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Process the uploaded image with Groq
      const imagePath = path.join(__dirname, '..', req.file.path);
      const processedData = await processImageWithGroq(imagePath);

      // Save the response to database
      const savedStructure = await CompanyStructure.create({
        fileName: req.file.originalname,
        extractedData: processedData
      });

      res.json({
        message: 'File uploaded and processed successfully',
        savedStructureId: savedStructure.id,
        file: {
          originalname: req.file.originalname,
          filename: req.file.filename,
          size: req.file.size,
          path: req.file.path
        },
        processedData: processedData,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error processing image with Groq' });
    }
  });
};

exports.uploadFile = uploadFile;
