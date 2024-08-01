import "./WebPlayback.css";
import React, { useState, useEffect } from "react";
import Spotify from "https://esm.sh/spotify-web-playback";

// const track = {
//   name: "",
//   album: {
//     images: [{ url: "" }],
//   },
//   artists: [{ name: "" }],
// };
// console.log(track);

// function WebPlayback(props) {
//   const [is_paused, setPaused] = useState(false);
//   const [is_active, setActive] = useState(false);
//   const [player, setPlayer] = useState(null);
//   const [current_track, setTrack] = useState(track);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;

//     document.body.appendChild(script);

//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const token = "[My Spotify Web API access token]";
//       const player = new Spotify({
//         name: "Web Playback SDK",
//         getOAuthToken: (cb) => {
//           cb(token);
//         },
//         volume: 0.5,
//       });

//       player.connect().then((success) => {
//         if (success) {
//           console.log("The web playback SDK successfully connected to spotify");
//         }
//       });

//       setPlayer(player);

//       player.addListener("ready", ({ device_id }) => {
//         console.log("The web playback SDK is ready to play music!");
//         console.log("Ready with Device ID", device_id);
//         // Transfer playback here
//         transferPlaybackHere(props.token, device_id);
//       });

//       player.addListener("not_ready", ({ device_id }) => {
//         console.log("Device ID has gone offline", device_id);
//       });

//       player.addListener("player_state_changed", (state) => {
//         if (!state) {
//           return;
//         }

//         setTrack(state.track_window.current_track);
//         setPaused(state.paused);

//         player.getCurrentState().then((state) => {
//           if (!state ? setActive(false) : setActive(true));
//         });
//       });

//       player.connect();
//     };
//   }, []);

//   const transferPlaybackHere = (token, deviceId) => {
//     fetch("https://api.spotify.com/v1/me/player", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         device_ids: [deviceId],
//         play: true,
//       }),
//     })
//       .then((response) => response.json)
//       .then((data) => console.log("Transfer Playback Response:", data))
//       .catch((error) => console.error("Transfer Playback Error:", error));
//   };

//   if (!is_active) {
//     return (
//       <>
//         <div className="container">
//           <div className="main-wrapper">
//             <b>
//               {" "}
//               Instance not active. Transfer your playback using your Spotify app{" "}
//             </b>
//           </div>
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <div className="container">
//           <div className="main-wrapper">
//             <img
//               src={current_track.album.images[0].url}
//               className="now-playing__cover"
//               alt=""
//             />

//             <div className="now-playing__side">
//               <div className="now-playing__name">{current_track.name}</div>
//               <div className="now-playing__artist">
//                 {current_track.artists[0].name}
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default WebPlayback;

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
            </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.previousTrack();
                }}
              >
                &lt;&lt;
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? "PLAY" : "PAUSE"}
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.nextTrack();
                }}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WebPlayback;
