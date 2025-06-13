const { Groq } = require('groq-sdk');
const fs = require('fs');


const groq = new Groq({ apiKey: "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" });

async function processImageWithGroq(imagePath) {
    try {
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      const dataUrl = `data:image/png;base64,${base64Image}`;
  
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this organizational chart image and return a tree structure in JSON format. The response should be a single JSON object with 'name' and 'children' properties. Each child should also have 'name' and 'children' properties. Example format: {\"name\": \"CEO\", \"children\": [{\"name\": \"CTO\", \"children\": []}]}. Return only the JSON, no explanation."
              },
              {
                type: "image_url",
                image_url: {
                  url: dataUrl
                }
              }
            ]
          }
        ],
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        temperature: 0.7,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });
  
      let raw = chatCompletion.choices[0].message.content;
      console.log('Raw Groq response:', raw);
  
      // Remove markdown formatting and any potential whitespace
      raw = raw.replace(/```json|```/g, '').trim();
  
      try {
        // Try to parse the response
        const parsedData = JSON.parse(raw);
  
        // Validate the structure
        if (!parsedData.name || !Array.isArray(parsedData.children)) {
          console.error('Invalid tree structure:', parsedData);
          return {
            name: "Invalid tree structure",
            children: []
          };
        }
  
        return parsedData;
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Problematic JSON string:', raw);
  
        // Try to fix common JSON issues
        try {
          // Replace single quotes with double quotes
          const fixedJson = raw.replace(/'/g, '"');
          const parsedData = JSON.parse(fixedJson);
  
          if (!parsedData.name || !Array.isArray(parsedData.children)) {
            throw new Error('Invalid structure after fixing');
          }
  
          return parsedData;
        } catch (fixError) {
          console.error('Failed to fix JSON:', fixError);
          return {
            name: "Error parsing response",
            children: []
          };
        }
      }
    } catch (error) {
      console.error('Error processing image with Groq:', error);
      throw error;
    }
  }

module.exports = { processImageWithGroq };