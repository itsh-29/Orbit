let IS_PROD = true; 

const server =  IS_PROD ?
    "https://apna-video-call-4c77.onrender.com":
    "http://localhost:8000"


export default server;
