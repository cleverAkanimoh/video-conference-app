import React, { useState } from "react";
import ParticipantView from "./ParticipantView";
import { useMeeting } from "@videosdk.live/react-sdk";
import JoinScreen from "./JoinScreen";
import {
  ArrowLeftEndOnRectangleIcon,
  CameraIcon,
  MicrophoneIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

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
    <div className="container px-2">
      {joined !== "JOINING" && (
        <>
          <h2 className="text-5xl font-bold mb-5">Let's Video Chat</h2>
          <h3 className="my-3 text-right font-bold">
            Meeting Id: lt08-ljs2-k5ps
          </h3>
        </>
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
        <div className="flex gap-3 items-center justify-center">
          <p className="text-lg text-center">Joining the meeting... </p>
          <div className="size-6 rounded-full border-b-2 border border-gray-300 border-b-white animate-spin" />
        </div>
      ) : (
        <JoinScreen join={join} setJoined={setJoined} />
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam, toggleScreenShare } = useMeeting();
  return (
    <div className="mt-3 flex gap-2 flex-wrap items-center justify-center">
      <ControlBtn
        fn={() => leave()}
        text="Leave call"
        Icon={ArrowLeftEndOnRectangleIcon}
      />
      <ControlBtn fn={() => toggleMic()} text="Mic" Icon={MicrophoneIcon} />
      <ControlBtn fn={() => toggleWebcam()} text="Webcam" Icon={CameraIcon} />
      <ControlBtn
        fn={() => toggleScreenShare()}
        text="Present"
        Icon={PresentationChartBarIcon}
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
      <span className="hidden group-hover:flex">{text}</span>
    </button>
  );
};
