import { MeetingProvider } from "@videosdk.live/react-sdk";

import MeetingView from "./components/MeetingView";
import { authToken, createMeeting } from "./API";
import { useState } from "react";
import JoinScreen from "./components/JoinScreen";

const App = () => {
  const [meetingId, setMeetingId] = useState(null);

  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId: meetingId || "lt08-ljs2-k5ps",
        micEnabled: true,
        webcamEnabled: true,
        // name: "Clever Akanimoh",
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
};

export default App;
