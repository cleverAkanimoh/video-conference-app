import { useState } from "react";

export default function JoinScreen({ setJoined, join }) {
  const [meetingId, setMeetingId] = useState(null);
  const [error, setError] = useState("");

  const onClick = async () => {
    if (meetingId === null) {
      setError("meeting Id cannot be unknown");
      return;
    }

    if (meetingId !== "lt08-ljs2-k5ps") {
      setError("please enter the correct meeting Id");
      return;
    }
    setJoined("JOINING");
    join();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full space-y-1">
        <input
          type="text"
          id="join-input"
          className="w-full rounded p-2 text-sm"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <p className="text-xs text-red-600">{error}</p>
      </div>

      <button
        onClick={onClick}
        className="min-w-full bg-blue-600 hover:bg-blue-400 text-white rounded"
      >
        Join
      </button>
      {" or "}
      <button onClick={onClick} id="create-meeting-btn">
        Create Meeting
      </button>
    </div>
  );
}
