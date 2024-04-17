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
    <div className="container max-[480px]:w-screen px-2">
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
  const {
    leave,
    toggleMic,
    toggleWebcam,
    toggleScreenShare,
    enableScreenShare,
  } = useMeeting();
  return (
    <div className="flex gap-2 flex-wrap">
      <ControlBtn fn={() => leave()} text="Leave" />
      <ControlBtn fn={() => toggleMic()} text="toggleMic" />
      <ControlBtn fn={() => toggleWebcam()} text="toggleWebcam" />
      <ControlBtn fn={() => toggleScreenShare()} text="toggleScreenShare" />
      <ControlBtn fn={() => enableScreenShare()} text="enableScreenShare" />
    </div>
  );
}

const ControlBtn = ({ text, fn }) => {
  return (
    <button
      onClick={() => fn()}
      className="bg-white text-black hover:bg-gray-300 min-w-20 rounded p-2 text-sm inline-grid place-items-center capitalize transition-colors duration-300"
    >
      {text}
    </button>
  );
};
