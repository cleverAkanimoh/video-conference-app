import React, { useEffect, useMemo, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

export default function ParticipantView(props) {
  const micRef = useRef(null);
  //   const webcamRef = useRef(null);

  const {
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    displayName,
    isActiveSpeaker,
  } = useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center">
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn ? (
        <ReactPlayer
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"300px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      ) : (
        <div className="w-full flex flex-col gap-2 items-center justify-center h-[190px] bg-black text-white my-2">
          <div className="size-10 bg-white rounded-full" />
          <span className="font-bold capitalize text-lg">no video</span>
        </div>
      )}

      <p className=" max-w-[200px]">
        <span className="capitalize font-bold font-serif">
          {displayName
            .substring(0, 15)
            .concat(displayName > 15 ? "..." : "")
            .toLowerCase()}
        </span>
        ({isActiveSpeaker ? "speaking..." : ""}) - Webcam:{" "}
        {webcamOn ? "ON" : "OFF"} - Mic: {micOn ? "ON" : "OFF"}
      </p>
    </div>
  );
}
