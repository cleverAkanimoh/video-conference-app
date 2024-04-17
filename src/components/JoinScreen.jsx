import { useState } from "react";

export default function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const [error, setError] = useState("");

  const onClick = async () => {
    if (meetingId === null) {
      setError("meeting Id cannot be unknown");
      return;
    }

    // if (meetingId !== getMeetingAndToken) {
    //   setError("please enter the correct meeting Id");
    //   return;
    // }

    try {
      await getMeetingAndToken(meetingId);
    } catch (error) {
      setError("An Unknown Error occurred");
      console.error("Failed to create meeting ", error);
    }
  };

  return (
    <div className="max-w-[500px] w-full flex flex-col items-center justify-center gap-4">
      <h2 className="text-5xl font-bold mb-5">Let's Video Chat</h2>
      <div className="w-full space-y-1">
        <input
          type="text"
          id="join-input"
          className="w-full bg-transparent border rounded p-2 text-sm"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <p className="text-xs text-red-600">{error}</p>
      </div>

      <button
        onClick={onClick}
        className="min-w-full bg-blue-600 hover:bg-blue-400 p-2 text-white rounded"
      >
        Join
      </button>
      {" or "}
      <button onClick={onClick} className="hover:underline">
        Create a Meeting
      </button>
    </div>
  );
}
