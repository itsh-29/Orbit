import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff
} from "lucide-react";

import "../styles/lobby.css";

export default function MeetingLobby() {

  const navigate = useNavigate();
  const { roomId } = useParams();

  const [username, setUsername] = useState("");
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [error, setError] = useState("");

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
    <div className="lobbyPage">

      <div className="lobbyCard">

        <div className="lobbyLogo">
          ◎ Orbit
        </div>

        <h1>
          Meeting Lobby
        </h1>

        <p className="lobbySubtitle">
          Prepare before joining the meeting
        </p>

        <div className="cameraPreview">

          <div className="previewAvatar">
            {username
              ? username.charAt(0).toUpperCase()
              : "O"}
          </div>

        </div>

        <div className="meetingInfo">

          <span>
            Room ID
          </span>

          <strong>
            {roomId}
          </strong>

        </div>

        <input
          className="lobbyInput"
          placeholder="Display Name"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />

        {error && (
          <p className="lobbyError">
            {error}
          </p>
        )}

        <div className="lobbyControls">

          <button
            className={`controlBtn ${
              micEnabled ? "active" : ""
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
            className={`controlBtn ${
              cameraEnabled ? "active" : ""
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
          className="joinMeetingBtn"
          onClick={joinMeeting}
        >
          Join Meeting
        </button>

      </div>

    </div>
  );
}