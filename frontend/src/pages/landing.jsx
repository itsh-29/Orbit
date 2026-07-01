import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/landing.css";

export default function LandingPage() {
const navigate = useNavigate();


const startInstantMeeting = () => {
  const roomId = Math.random()
    .toString(36)
    .substring(2, 8);

  navigate(`/${roomId}`);
};

return ( <div className="orbitLanding"> <nav className="orbitNavbar"> <div className="orbitLogo">◎ Orbit</div>

    <div className="orbitNavLinks">
      <div
        className="orbitLoginBtn"
        onClick={() => navigate("/auth")}
      >
        Get Started
      </div>
    </div>
  </nav>

  <section className="heroSection">
    <div className="heroLeft">

      <div className="orbitBadge">
        🚀 AI-Powered Collaboration Platform
      </div>

        <h1>
        Modern Collaboration
        <br />
        for Modern Teams.
        </h1>

      <p>
        Orbit is a modern collaboration platform for teams,
        creators and students. Host HD meetings, share your
        screen, chat in real-time and collaborate effortlessly.
      </p>

      <div className="heroButtons">
        <Link className="primaryBtn" to={`/${Math.random().toString(36).substring(2, 8)}`}>
          Start Meeting
        </Link>
  
        <Link className="secondaryBtn" to="/auth">
          Sign In
        </Link>
      </div>

      <div className="heroStats">
        <span>✓ HD Meetings</span>
        <span>✓ Screen Sharing</span>
        <span>✓ Real-Time Chat</span>
        <span>✓ Meeting History</span>
      </div>

    </div>

    <div className="heroRight">

      <div className="meetingMockup">

        <div className="mockupHeader">
          Orbit Meeting
        </div>

        <div className="mockupGrid">

          <div className="mockUser">
            <div className="avatarCircle">IM</div>
            <span>Ishan</span>
          </div>

          <div className="mockUser">
            <div className="avatarCircle">SJ</div>
            <span>Sarah</span>
          </div>

          <div className="mockUser">
            <div className="avatarCircle">AR</div>
            <span>Alex</span>
          </div>

          <div className="mockUser">
            <div className="avatarCircle">MK</div>
            <span>Mike</span>
          </div>

        </div>

        <div className="mockControls">
          <span>🎤</span>
          <span>📹</span>
          <span>🖥</span>
          <span>💬</span>
          <span>❌</span>
        </div>

        <div className="meetingFooter">
          <span>Participants: 4</span>
          <span>Live</span>
        </div>

      </div>

    </div>
  </section>

  <section className="featuresSection">
    <h2 className="featuresTitle">
      Everything you need to collaborate
    </h2>

    <div className="featureGrid">

      <div className="featureCard">
        <h3>🎥 HD Meetings</h3>
        <p>
          Crystal-clear video communication powered by WebRTC.
        </p>
      </div>

      <div className="featureCard">
        <h3>💬 Real-Time Chat</h3>
        <p>
          Collaborate instantly without leaving the meeting.
        </p>
      </div>

      <div className="featureCard">
        <h3>🖥 Screen Sharing</h3>
        <p>
          Present ideas, demos and walkthroughs effortlessly.
        </p>
      </div>

      <div className="featureCard">
        <h3>📜 Meeting History</h3>
        <p>
          Access and track your previous sessions easily.
        </p>
      </div>

    </div>
  </section>

  <footer className="orbitFooter">
    Built with React • WebRTC • Socket.io • MongoDB
  </footer>
</div>


);
}
