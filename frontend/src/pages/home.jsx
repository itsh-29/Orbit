import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, History, LogOut } from "lucide-react";
import withAuth from "../utils/withAuth";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/dashboard.css";

function HomeComponent() {
const navigate = useNavigate();

const [meetingCode, setMeetingCode] = useState("");

const { addToUserHistory } = useContext(AuthContext);
const [loading,setLoading] = useState(false);
const [error,setError] = useState(""); 

const createNewMeeting = () => {
  setLoading(true);
  const roomId = Math.random()
  .toString(36)
  .substring(2, 8);
 
  setTimeout(() =>{
    navigate(`/lobby/${roomId}`);
  },1000);
  {
    error && 
      <p
         style={{
        color:"#ff6b6b",
        marginTop:"10px"
        }}
      >
        {error}
      </p>
  }
};

const handleJoinVideoCall = async () => {
if (!meetingCode.trim()) {
    setError("Please enter a Meeting ID");
    return;
}
try{
  setLoading(true);
  await addToUserHistory(
    meetingCode
  );
  navigate(`/lobby/${meetingCode}`);
}
finally{
  setLoading(false);
}
};


const logout = () => {
localStorage.removeItem("token");
navigate("/auth");
};

return ( <div className="dashboardPage">


  {/* Navbar */}

  <nav className="navbar">

    <div className="logo">
      ◎ Orbit
    </div>

    <div className="navActions">

      <button
        className="navBtn logoutBtn"
        onClick={logout}
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>

  </nav>

  <div className="dashboardContent">

    <div className="profileCard">

      <div className="profileAvatar">
          IM
        </div>

      <div className="profileInfo">

          <h2>
          Welcome Back
          </h2>

        <p>
          Ready to start collaborating?
        </p>

      </div>

    </div>
    {/* Hero */}

    <section className="workspaceHero">

      <h1>
        Your Collaboration Hub
      </h1>

      <p>
        Create meetings, collaborate with teammates,
        and manage conversations from one place.
      </p>

      <div className="heroBadgeContainer">

        <span className="heroBadge">
          Secure Meetings
        </span>

        <span className="heroBadge">
          Real-Time Chat
        </span>

        <span className="heroBadge">
          Screen Sharing
        </span>

      </div>

    </section>

    {/* Action Cards */}

    <div className="actionGrid">

      <div
        className="actionCard"
        onClick={createNewMeeting}
      >

        <Video size={30} />

        <h3>
          New Meeting
        </h3>

        <p>
          Start a meeting instantly and invite participants.
        </p>

      </div>

      <div
        className="actionCard"
        onClick={() => navigate("/history")}
      >

        <History size={30} />

        <h3>
          Meeting History
        </h3>

        <p>
          Access all previous meetings and room activity.
        </p>

      </div>

    </div>

    {/* Join Meeting */}

    <div className="joinCard">

      <h2>
        Join Existing Meeting
      </h2>

      <p className="sectionSubtitle">
        Paste a meeting code to connect instantly.
      </p>

      <input
        className="joinInput"
        placeholder="Enter Meeting ID"
        value={meetingCode}
        onChange={(e) =>{
          setMeetingCode(e.target.value);
          setError("");
        }}
      />
      {
          error && (
            <p
              style={{
              color:"#ff6b6b",
              marginTop:"10px"
              }}
            >
              {error}
            </p>
        )}

      <button
        className="orbitBtn"
        onClick={handleJoinVideoCall}
        disabled={loading}
      >
        {loading ? "Connecting..." : "Join Room"}
      </button>

    </div>

    {/* Recent Meetings */}

    <div className="recentSection">

      <h2>
        Recent Meetings
      </h2>

      <p className="sectionSubtitle">
        Meeting history and activity will appear here.
      </p>

    </div>

  </div>

</div>


);
}

export default withAuth(HomeComponent);
