import React, {
useContext,
useEffect,
useState
} from "react";

import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import "../styles/history.css";

export default function History() {

const { getHistoryOfUser } =
useContext(AuthContext);

const [meetings, setMeetings] =
useState([]);

const navigate = useNavigate();

useEffect(() => {


const fetchHistory = async () => {

  try {

    const history =
      await getHistoryOfUser();

    setMeetings(history);

  } catch (e) {

    console.log(e);

  }
};

fetchHistory();


}, []);

const formatDate = (dateString) => {


const date =
  new Date(dateString);

const day =
  date.getDate()
  .toString()
  .padStart(2, "0");

const month =
  (date.getMonth() + 1)
  .toString()
  .padStart(2, "0");

const year =
  date.getFullYear();

return `${day}/${month}/${year}`;


};

return ( <div className="historyPage">


  <nav className="historyNavbar">

    <div className="historyLogo">
      ◎ Orbit
    </div>

    <button
      className="backBtn"
      onClick={() =>
        navigate("/home")
      }
    >
      Dashboard
    </button>

  </nav>

  <div className="historyContent">

    <h1 className="historyTitle">
      Meeting History
    </h1>

    <p className="historySubtitle">
      Access and rejoin your
      previous meetings.
    </p>

    {meetings.length > 0 ? (

      meetings.map((meeting, index) => (

        <div
          key={index}
          className="meetingHistoryCard"
        >

          <div className="meetingInfo">

            <h3>
              {meeting.meetingCode}
            </h3>

            <p>
              {formatDate(
                meeting.date
              )}
            </p>

          </div>

          <button
            className="rejoinBtn"
            onClick={() =>
              navigate(
                `/${meeting.meetingCode}`
              )
            }
          >
            Rejoin
          </button>

        </div>

      ))

    ) : (

      <p className="historySubtitle">
        No meetings found.
      </p>

    )}

  </div>

</div>


);
}
