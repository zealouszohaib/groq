import { Groq } from 'groq-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const groq = new Groq({ apiKey: "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" });
async function main() {




   const imagePath = path.join(__dirname, 'image.png');
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`; 



    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Extract all data inside the node for react-d3-tree. No explanation"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": dataUrl
                        }
                    }
                ]
            }
        ],
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
    });

    
    let raw = chatCompletion.choices[0].message.content;

// Remove markdown formatting
raw = raw.replace(/```json|```/g, '').trim();

// Parse it
    console.log("__________________________");
    console.log("Raw Response:", raw);
}

main();