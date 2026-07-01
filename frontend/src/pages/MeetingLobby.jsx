import React, { useRef, useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff
} from "lucide-react";


import styles from "../styles/lobby.module.css";

export default function MeetingLobby() {

  const navigate = useNavigate();
  const { roomId } = useParams();

  const [username, setUsername] = useState("");
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [error, setError] = useState("");
  const videoRef = useRef(null);

useEffect(() => {

    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true
        })
        .then((stream) => {

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

        })
        .catch((err) => {
            console.log(err);
        });
}, []);




  const joinMeeting = () => {

    if (!username.trim()) {
      setError("Please enter your display name");
      return;
    }

    navigate(`/room/${roomId}`, {
      state: {
        username,
        micEnabled,
        cameraEnabled
      }
    });
  };





return (

<div className={styles.lobbyPage}>
    <div className={styles.lobbyCard}>

        <div className={styles.lobbyLogo}>
            ◎ Orbit
        </div>

        <h1>
            Meeting Lobby
        </h1>

        <p className={styles.lobbySubtitle}>
            Prepare before joining the meeting
        </p>

        <div className={styles.previewContainer}>
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={styles.previewVideo}
            />
        </div>

        <div className={styles.roomCard}>
            <span>Room ID</span>
            <h2>{roomId}</h2>
        </div>

        <input
            className={styles.lobbyInput}
            placeholder="Enter your display name"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
                setError("");
            }}
        />

        {error && (
            <p className={styles.lobbyError}>
                {error}
            </p>
        )}

        <div className={styles.deviceChecks}>
            <div className={styles.deviceStatus}>
                🎤 Microphone Ready
            </div>

            <div className={styles.deviceStatus}>
                🎥 Camera Ready
            </div>

        </div>

        <div className={styles.lobbyControls}>

            <button
                className={`${styles.controlBtn} ${
                    micEnabled ? styles.active : ""
                }`}
                onClick={() =>
                    setMicEnabled(!micEnabled)
                }
            >
                {micEnabled
                    ? <Mic size={20}/>
                    : <MicOff size={20}/>
                }
            </button>

            <button
                className={`${styles.controlBtn} ${
                    cameraEnabled ? styles.active : ""
                }`}
                onClick={() =>
                    setCameraEnabled(!cameraEnabled)
                }
            >
                {cameraEnabled
                    ? <Video size={20}/>
                    : <VideoOff size={20}/>
                }
            </button>

        </div>

        <button
            className={styles.joinMeetingBtn}
            onClick={joinMeeting}
            disabled={!username.trim()}
        >
            Join Meeting
        </button>

    </div>
</div>
  
)
}