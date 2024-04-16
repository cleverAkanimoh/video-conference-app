import React, { useState } from "react";
import ParticipantView from "./ParticipantView";
import { useMeeting } from "@videosdk.live/react-sdk";

export default function MeetingView() {
  const [joined, setJoined] = useState(null);

  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  console.log(join, participants);

  return (
    <div className="container">
      {joined && joined === "JOINED" ? (
        <div>
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined && joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button id="join-meeting-btn" onClick={joinMeeting}>
          Join the meeting
        </button>
      )}
    </div>
  );
}
