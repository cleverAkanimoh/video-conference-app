//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlNzA1M2NmNS03YTE1LTQ0M2ItYTU3Zi00YjBjYmQ2ZDUwMWIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMzMwNjMwMSwiZXhwIjoxNzEzMzkyNzAxfQ.IBFXoIg53zxNEo2Z4_CRJ0KnRGm9gwicUhzaiBjht4I";
// API call to create a meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  console.log("api response: ", res);
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  console.log("room id: ", roomId);
  return roomId;
};
