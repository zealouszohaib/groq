# File Upload and Processing Application

This application allows users to upload images and process them using AI to extract organizational structures. The processed data can be viewed in both tree and table formats.

## Features

- File upload with drag-and-drop support
- Image processing using Groq AI
- Tree view visualization using react-d3-tree
- Table view with sorting capabilities
- Responsive design

## Tech Stack

### Frontend
- React
- Styled Components
- React D3 Tree
- TanStack Table (React Table)

### Backend
- Node.js
- Express
- Multer (File upload)
- Groq AI API

## Setup Instructions

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install backend dependencies:
```bash
cd back-end
npm install
```

3. Install frontend dependencies:
```bash
cd front-end
npm install
```

4. Create a `.env` file in the back-end directory with your Groq API key:
```
GROQ_API_KEY=your_api_key_here
```

5. Start the backend server:
```bash
cd back-end
npm start
```

6. Start the frontend development server:
```bash
cd front-end
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── back-end/
│   ├── controller/
│   ├── route/
│   ├── upload/
│   └── server.js
├── front-end/
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 