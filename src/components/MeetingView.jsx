import React, { useState } from "react";
import ParticipantView from "./ParticipantView";
import { useMeeting } from "@videosdk.live/react-sdk";
import JoinScreen from "./JoinScreen";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function MeetingView() {
  const [joined, setJoined] = useState(null);

  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
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
          {/* For rendering all the participants in the meeting */}
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
          <Controls />
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
    <div className="mt-3 flex gap-2 flex-wrap">
      <ControlBtn
        fn={() => leave()}
        text="Leave"
        Icon={ArrowLeftEndOnRectangleIcon}
      />
      <ControlBtn
        fn={() => toggleMic()}
        text="toggleMic"
        Icon={ArrowLeftEndOnRectangleIcon}
      />
      <ControlBtn
        fn={() => toggleWebcam()}
        text="toggleWebcam"
        Icon={ArrowLeftEndOnRectangleIcon}
      />
      <ControlBtn
        fn={() => toggleScreenShare()}
        text="toggleScreenShare"
        Icon={ArrowLeftEndOnRectangleIcon}
      />
      <ControlBtn
        fn={() => enableScreenShare()}
        text="enableScreenShare"
        Icon={ArrowLeftEndOnRectangleIcon}
      />
    </div>
  );
}

const ControlBtn = ({ text, fn, Icon }) => {
  return (
    <button
      onClick={() => fn()}
      className="bg-white text-black hover:bg-gray-300 min-w-14 rounded p-2 text-sm inline-flex justify-center items-center capitalize transition-all duration-300 group"
    >
      <Icon className="w-5" />
      <span className="hiddn">{text}</span>
    </button>
  );
};
