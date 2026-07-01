import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from "../styles/videoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import server from '../environment';
import { useLocation,useNavigate, useParams } from "react-router-dom";




const server_url = server;

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState(true);
    
    let [audio, setAudio] = useState(true);

    let [screen, setScreen] = useState(false);

    let [showModal, setModal] = useState(true);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(0);

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    const navigate = useNavigate();

    const location = useLocation();

    const {roomId} = useParams();

    const username = location.state?.username || "Guest";

    useEffect(() => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }, []);

    useEffect(() => {
        getPermissions();

    },[])




    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);

        }
    }, [video, audio])
   
    useEffect(() => {
    return () => {
            try {
                window.localStream
                    ?.getTracks()
                    ?.forEach(track => track.stop());

                socketRef.current?.disconnect();

            } catch (err) {
                console.log(err);
            }
        };
    }, []);




    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                console.log(description)
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }





    let getDislayMediaSuccess = (stream) => {
        console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            getUserMedia()

        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }




    let connectToSocketServer = () => {
        if (socketRef.current) return;
        socketRef.current = io.connect(server_url, {  transports: ["websocket"],secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', roomId)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on('chat-message', addMessage)

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {

                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    // Wait for their video stream
                    connections[socketListId].onaddstream = (event) => {
                        console.log("BEFORE:", videoRef.current);
                        console.log("FINDING ID: ", socketListId);

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            console.log("FOUND EXISTING");

                            // Update the stream of the existing video
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            // Create a new video
                            console.log("CREATING NEW");
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };


                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0])
    }
    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0])
    }

    let handleVideo = async () => {
        const videoTracks = window.localStream?.getVideoTracks();

        // 🎥 Case 1: Track exists and is alive → toggle
        if (videoTracks && videoTracks.length > 0) {
            const track = videoTracks[0];

            if (track.readyState === "live") {
                track.enabled = !track.enabled;
                setVideo(track.enabled);
                return;
            }
        }

        // 🎥 Case 2: Track was stopped → re-acquire camera
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: audio,
            });

            const newVideoTrack = stream.getVideoTracks()[0];
            const audioTrack = window.localStream?.getAudioTracks()[0];

            const newStream = new MediaStream([
                newVideoTrack,
                ...(audioTrack ? [audioTrack] : []),
            ]);

            window.localStream = newStream;
            localVideoref.current.srcObject = newStream;

            // 🔁 Replace track for every peer
            for (let id in connections) {
                const sender = connections[id]
                    .getSenders()
                    .find(s => s.track && s.track.kind === "video");

                if (sender) {
                    sender.replaceTrack(newVideoTrack);
                }
            }

            setVideo(true);
        } catch (err) {
            console.error("Failed to re-enable camera:", err);
        }
    };


    let handleAudio = async () => {
        const audioTracks = window.localStream?.getAudioTracks();

        // 🎤 Case 1: Audio track exists and is alive → toggle
        if (audioTracks && audioTracks.length > 0) {
            const track = audioTracks[0];

            if (track.readyState === "live") {
                track.enabled = !track.enabled;
                setAudio(track.enabled);
                return;
            }
        }

        // 🎤 Case 2: Track was stopped → re-acquire microphone
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: video,
            });

            const newAudioTrack = stream.getAudioTracks()[0];
            const videoTrack = window.localStream?.getVideoTracks()[0];

            const newStream = new MediaStream([
                ...(videoTrack ? [videoTrack] : []),
                newAudioTrack,
            ]);

            window.localStream = newStream;
            localVideoref.current.srcObject = newStream;

            // 🔁 Replace audio track for all peers
            for (let id in connections) {
                const sender = connections[id]
                    .getSenders()
                    .find(s => s.track && s.track.kind === "audio");

                if (sender) {
                    sender.replaceTrack(newAudioTrack);
                }
            }

            setAudio(true);
        } catch (err) {
            console.error("Failed to re-enable microphone:", err);
        }
    };


    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen])
    let handleScreen = () => {
        setScreen(!screen);
    }

    let handleEndCall = () => {
        // Stop local media
        try {
            let tracks = localVideoref.current?.srcObject?.getTracks();
            tracks?.forEach(track => track.stop());
        } catch (e) {}

        // Disconnect socket cleanly
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }

        // 🔑 Check login state via token
        const token = localStorage.getItem("token");

        if (token) {
            // Logged-in user → Home
            navigate("/home");
        } else {
            // Guest user → Landing page
            navigate("/");
        }
    };


    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };



    let sendMessage = () => {
        console.log(socketRef.current);
        socketRef.current.emit('chat-message', message, username)
        setMessage("");

        // this.setState({ message: "", sender: username })
    }



return (
    <div className={styles.meetVideoContainer}>

        {/* Top Bar */}

        <div className={styles.topBar}>

            <div>
                <h2
                    style={{
                        color: "#C08B5C",
                        margin: 0
                    }}
                >
                    ◎ Orbit
                </h2>

                <span
                    style={{
                        color: "#B0B0B0"
                    }}
                >
                    Room: {roomId}
                </span>
            </div>

            <div className={styles.participantInfo}>
                👥 {videos.length + 1} Participants
            </div>

            <div className={styles.topActions}>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(roomId);
                    }}
                >
                    Copy Room ID
                </button>
            </div>

        </div>

        {/* Main Content */}

        <div className={styles.mainContent}>

            {/* Video Area */}

            <div className={styles.videoGrid}>

                {videos.length === 0 && (
                    <div className={styles.emptyMeeting}>
                    
                        <h2>
                            Meeting Ready
                        </h2>

                        <p>
                            Waiting for participants to join.
                        </p>

                        <div className={styles.roomCodeCard}>

                            <div className={styles.roomCodeLabel}>
                                Room ID
                            </div>

                            <div className={styles.roomCodeValue}>
                                {roomId}
                            </div>

                        </div>
                         <div className={styles.shareHint}>
                            Share this Room ID with teammates to start collaborating.
                        </div>

                    </div>
                )}

                {videos.map((video) => (

                    <div
                        key={video.socketId}
                        className={styles.videoCard}
                    >

                        <video
                            data-socket={video.socketId}
                            ref={(ref) => {
                                if (ref && video.stream) {
                                    ref.srcObject = video.stream;
                                }
                            }}
                            autoPlay
                        />

                        <div className={styles.participantTag}>
                            Participant
                        </div>

                    </div>

                ))}

            </div>

        {/* Chat Sidebar */}
        
        {showModal && (

            <div className={styles.chatRoom}>

                <div className={styles.chatContainer}>

                    <div className={styles.chatHeader}>

                        <div className={styles.chatTitle}>
                            Orbit Chat
                        </div>

                        <div className={styles.chatSubtitle}>
                            Real-time meeting conversation
                        </div>

                    </div>

                    <div className={styles.chattingDisplay}>

                        {messages.length > 0 ? (

                            messages.map((item, index) => (

                                <div
                                    key={index}
                                    className={styles.messageBubble}
                                >

                                    <div className={styles.messageSender}>
                                        {item.sender}
                                    </div>

                                    <div className={styles.messageText}>
                                        {item.data}
                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className={styles.emptyChat}>

                                <h3>
                                    No messages yet
                                </h3>

                                <p>
                                    Start the conversation.
                                </p>

                            </div>

                        )}

                    </div>

                    <div className={styles.chattingArea}>

                        <TextField
                            className={styles.chatInput}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            label="Type a message"
                            variant="outlined"
                            fullWidth
                        />

                        <Button
                            className={styles.sendBtn}
                            variant="contained"
                            onClick={sendMessage}
                        >
                            Send
                        </Button>

                    </div>

                </div>

            </div>

        )}

        {/* Self Video */}

        <div className={styles.selfViewCard}
            style={{
                    right: showModal ? "340px" : "25px"
                }}
        >

            <video
                className={styles.meetUserVideo}
                ref={localVideoref}
                autoPlay
                muted
            />

            <div className={styles.selfLabel}>
                You
            </div>

        </div>

        {/* Controls */}

        <div className={styles.buttonContainers}>

            <IconButton
                onClick={handleVideo}
                style={{ color: "white" }}
            >
                {video
                    ? <VideocamIcon />
                    : <VideocamOffIcon />
                }
            </IconButton>

            <IconButton
                onClick={handleEndCall}
                style={{ color: "red" }}
            >
                <CallEndIcon />
            </IconButton>

            <IconButton
                onClick={handleAudio}
                style={{ color: "white" }}
            >
                {audio
                    ? <MicIcon />
                    : <MicOffIcon />
                }
            </IconButton>

            {screenAvailable && (

                <IconButton
                    onClick={handleScreen}
                    style={{ color: "white" }}
                >
                    {screen
                        ? <StopScreenShareIcon />
                        : <ScreenShareIcon />
                    }
                </IconButton>

            )}

            <Badge
                badgeContent={newMessages}
                max={999}
                color="error"
            >
                <IconButton
                    onClick={() => {
                        setModal(!showModal);

                        if (!showModal) {
                            setNewMessages(0);
                        }
                    }}
                    style={{ color: "white" }}
                >
                    <ChatIcon />
                </IconButton>
            </Badge>

        </div>
    </div>

    </div>
)
}