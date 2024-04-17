import React, { useState } from "react";
import ParticipantView from "./ParticipantView";
import { useMeeting } from "@videosdk.live/react-sdk";
import JoinScreen from "./JoinScreen";

export default function MeetingView() {
  const [joined, setJoined] = useState(null);

  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const {
    join,
    participants,
    enableScreenShare,
    enableWebcam,
    disableScreenShare,
    disableWebcam,
    leave,
    activeSpeakerId,
  } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      setJoined(null);
    },
  });

  return (
    <div className="container">
      {joined !== "JOINING" && (
        <h3 className="my-3">Meeting Id: lt08-ljs2-k5ps</h3>
      )}
      {joined && joined === "JOINED" ? (
        <div>
          <Controls />
          {/* For rendering all the participants in the meeting */}
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined && joined === "JOINING" ? (
        <p className="text-lg">Joining the meeting...</p>
      ) : (
        <JoinScreen join={join} setJoined={setJoined} />
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div className="space-x-3">
      <ControlBtn fn={() => leave()} text="Leave" />
      <ControlBtn fn={() => toggleMic()} text="toggleMic" />
      <ControlBtn fn={() => toggleWebcam()} text="toggleWebcam" />
    </div>
  );
}

const ControlBtn = ({ text, fn }) => {
  return (
    <button
      onClick={() => fn()}
      className="bg-white hover:bg-gray-300 min-w-20 rounded p-2 text-sm inline-grid place-items-center capitalize transition-colors duration-300"
    >
      {text}
    </button>
  );
};
