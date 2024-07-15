
import axios from 'axios';
import { useState } from 'react';
import { AppBar, Toolbar, Typography ,Box} from '@mui/material';
import { useDropzone } from 'react-dropzone';

const App = () => {
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [introText, setIntroText] = useState('Welcome! This project uses machine learning models to classify diamonds.');

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post('http://localhost:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPrediction(response.data.predicted_class);
            setError('');
            setImageUrl(URL.createObjectURL(file));
        } catch (error) {
            setError('Error uploading the image');
            setPrediction('');
        }
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', minWidth:'211vh',display: 'flex', backgroundImage: 'url("https://cdn.pixabay.com/photo/2023/03/27/18/28/moss-7881439_1280.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
                        <style>
                {`
                @keyframes gradientAnimation {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 100% 50%;
                    }
                }
                `}
            </style>
            <AppBar position="fixed" style={{ background: 'linear-gradient(to right, #ff758c, #ff7eb3, #647dee, #7a76c2)', animation: 'gradientAnimation 10s linear infinite' }}>
                <Toolbar>
                    <Typography variant="h6">
                        Diamond Classification
                    </Typography>
                </Toolbar>
            </AppBar>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ fontSize: '18px' }}>{introText}</p>
<div>
<Box
                sx={{
                  height: 65,
                  //  margin: 4.5,
                  //  marginLeft: 2,
                  borderRadius: 5,
                  border: "red",
                  backgroundColor: "white",
                  opacity: 0.55,
                  "&:hover": {
                    backgroundColor: "white",
                    opacity: 0.89,
                  },
                }}
              >
                <div {...getRootProps()} style={{ outline: 'none' }}>
                    <input {...getInputProps()} />
                    <div style={{ border: '2px dashed #cccccc', padding: '20px', cursor: 'pointer' }}>
                        <Typography>Drag & Drop or Click to Upload</Typography>
                    </div>
                  
                </div>
                
                </Box>
                {prediction &&                 <Box
                sx={{
                  height: 50,
                  //  margin: 4.5,
                  //  marginLeft: 2,
                  borderRadius: 5,
                  border: "red",
                  backgroundColor: "white",
                  opacity: 0.60,
                  "&:hover": {
                    backgroundColor: "white",
                    opacity: 0.89,
                  },
                }}
              >
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Prediction: {prediction}</p> </Box>}
                {error && 
                 <Box
                 sx={{
                   height: 50,
                   //  margin: 4.5,
                   //  marginLeft: 2,
                   borderRadius: 5,
                   border: "red",
                   backgroundColor: "white",
                   opacity: 0.60,
                   "&:hover": {
                     backgroundColor: "white",
                     opacity: 0.89,
                   },
                 }}
               > <p style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>Error: {error}</p> </Box>}
                </div>

                {imageUrl && <img src={imageUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '20px' }} />}

              
               
            </div>
        </div>
    );
};

export default App;
