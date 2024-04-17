import { useState } from "react";

export default function JoinScreen({
  getMeetingAndToken,
  setDisplayName,
  displayName,
}) {
  const [meetingId, setMeetingId] = useState("lt08-ljs2-k5ps");

  const [error, setError] = useState("");

  const onClick = async () => {
    if (meetingId === null) {
      setError("meeting Id cannot be unknown");
      return;
    }

    // if (meetingId !== "lt08-ljs2-k5ps") {
    //   setError("please enter the correct meeting Id - lt08-ljs2-k5ps");
    //   return;
    // }

    localStorage.setItem("username", displayName);

    try {
      await getMeetingAndToken(meetingId);
    } catch (error) {
      setError("An Unknown Error occurred");
      console.error("Failed to create meeting ", error);
    }
  };

  return (
    <div className="max-w-[500px] w-full flex flex-col items-center justify-center gap-4">
      <h2 className="text-5xl font-bold mb-5 text-center">Let's Video Chat</h2>

      <h4 className="text-gray-500">
        use <span className="text-white">lt08-ljs2-k5ps</span> to join meeting
      </h4>
      <div className="w-full">
        <input
          type="text"
          className="w-full bg-transparent border border-b-0 rounded-t p-2 text-sm focus:outline-none"
          placeholder="Enter Display Name"
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
        <input
          type="text"
          id="join-input"
          value={meetingId}
          className="w-full bg-transparent border rounded-b p-2 text-sm focus:outline-none"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <p className="text-xs text-red-600 mt-1">{error}</p>
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
