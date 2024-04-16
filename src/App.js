import { MeetingProvider } from "@videosdk.live/react-sdk";

import MeetingView from "./components/MeetingView";

const App = () => {
  return (
    <MeetingProvider
      config={{
        meetingId: "lt08-ljs2-k5ps",
        micEnabled: true,
        webcamEnabled: true,
        name: "Clever's Org",
      }}
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlNzA1M2NmNS03YTE1LTQ0M2ItYTU3Zi00YjBjYmQ2ZDUwMWIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMzMwNjMwMSwiZXhwIjoxNzEzMzkyNzAxfQ.IBFXoIg53zxNEo2Z4_CRJ0KnRGm9gwicUhzaiBjht4I"
    >
      <MeetingView />
    </MeetingProvider>
  );
};

export default App;
