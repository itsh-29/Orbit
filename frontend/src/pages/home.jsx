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

const createNewMeeting = () => {
  const roomId = Math.random()
  .toString(36)
  .substring(2, 8);
  navigate(`/${roomId}`);


};

const handleJoinVideoCall = async () => {
if (!meetingCode.trim()) return;


await addToUserHistory(meetingCode);

navigate(`/${meetingCode}`);


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
        onChange={(e) =>
          setMeetingCode(e.target.value)
        }
      />

      <button
        className="orbitBtn"
        onClick={handleJoinVideoCall}
      >
        Join Room
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
