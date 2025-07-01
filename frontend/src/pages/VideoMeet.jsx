// import React, { useEffect, useRef, useState } from 'react'
// import io from "socket.io-client";
// import { Badge, IconButton, TextField, Button } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff'
// import CallEndIcon from '@mui/icons-material/CallEnd'
// import MicIcon from '@mui/icons-material/Mic'
// import MicOffIcon from '@mui/icons-material/MicOff'
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
// import ChatIcon from '@mui/icons-material/Chat'
// // import server from '../environment';
// // const server_url = server;

// var connections = {};

// const peerConfigConnections = {
//     "iceServers": [
//         { "urls": "stun:stun.l.google.com:19302" }
//     ]
// }

// export default function VideoMeetComponent() {

//     var socketRef = useRef();
//     let socketIdRef = useRef();

//     let localVideoref = useRef();

//     let [videoAvailable, setVideoAvailable] = useState(true);

//     let [audioAvailable, setAudioAvailable] = useState(true);

//     let [video, setVideo] = useState([]);

//     let [audio, setAudio] = useState();

//     let [screen, setScreen] = useState();

//     let [showModal, setModal] = useState(true);

//     let [screenAvailable, setScreenAvailable] = useState();

//     let [messages, setMessages] = useState([])

//     let [message, setMessage] = useState("");

//     let [newMessages, setNewMessages] = useState(3);

//     let [askForUsername, setAskForUsername] = useState(true);

//     let [username, setUsername] = useState("");

//     const videoRef = useRef([])

//     let [videos, setVideos] = useState([])

//     // TODO
//     // if(isChrome() === false) {


//     // }

//     useEffect(() => {
//         console.log("HELLO")
//         getPermissions();

//     })

//     let getDislayMedia = () => {
//         if (screen) {
//             if (navigator.mediaDevices.getDisplayMedia) {
//                 navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
//                     .then(getDislayMediaSuccess)
//                     .then((stream) => { })
//                     .catch((e) => console.log(e))
//             }
//         }
//     }

//     const getPermissions = async () => {
//         try {
//             const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoPermission) {
//                 setVideoAvailable(true);
//                 console.log('Video permission granted');
//             } else {
//                 setVideoAvailable(false);
//                 console.log('Video permission denied');
//             }

//             const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
//             if (audioPermission) {
//                 setAudioAvailable(true);
//                 console.log('Audio permission granted');
//             } else {
//                 setAudioAvailable(false);
//                 console.log('Audio permission denied');
//             }

//             if (navigator.mediaDevices.getDisplayMedia) {
//                 setScreenAvailable(true);
//             } else {
//                 setScreenAvailable(false);
//             }

//             if (videoAvailable || audioAvailable) {
//                 const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
//                 if (userMediaStream) {
//                     window.localStream = userMediaStream;
//                     if (localVideoref.current) {
//                         localVideoref.current.srcObject = userMediaStream;
//                     }
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (video !== undefined && audio !== undefined) {
//             getUserMedia();
//             console.log("SET STATE HAS ", video, audio);

//         }


//     }, [video, audio])
//     let getMedia = () => {
//         setVideo(videoAvailable);
//         setAudio(audioAvailable);
//         connectToSocketServer();

//     }




//     let getUserMediaSuccess = (stream) => {
//         try {
//             window.localStream.getTracks().forEach(track => track.stop())
//         } catch (e) { console.log(e) }

//         window.localStream = stream
//         localVideoref.current.srcObject = stream

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue

//             connections[id].addStream(window.localStream)

//             connections[id].createOffer().then((description) => {
//                 console.log(description)
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                     })
//                     .catch(e => console.log(e))
//             })
//         }

//         stream.getTracks().forEach(track => track.onended = () => {
//             setVideo(false);
//             setAudio(false);

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { console.log(e) }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//             window.localStream = blackSilence()
//             localVideoref.current.srcObject = window.localStream

//             for (let id in connections) {
//                 connections[id].addStream(window.localStream)

//                 connections[id].createOffer().then((description) => {
//                     connections[id].setLocalDescription(description)
//                         .then(() => {
//                             socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                         })
//                         .catch(e => console.log(e))
//                 })
//             }
//         })
//     }

//     let getUserMedia = () => {
//         if ((video && videoAvailable) || (audio && audioAvailable)) {
//             navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
//                 .then(getUserMediaSuccess)
//                 .then((stream) => { })
//                 .catch((e) => console.log(e))
//         } else {
//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { }
//         }
//     }





//     let getDislayMediaSuccess = (stream) => {
//         console.log("HERE")
//         try {
//             window.localStream.getTracks().forEach(track => track.stop())
//         } catch (e) { console.log(e) }

//         window.localStream = stream
//         localVideoref.current.srcObject = stream

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue

//             connections[id].addStream(window.localStream)

//             connections[id].createOffer().then((description) => {
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                     })
//                     .catch(e => console.log(e))
//             })
//         }

//         stream.getTracks().forEach(track => track.onended = () => {
//             setScreen(false)

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { console.log(e) }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//             window.localStream = blackSilence()
//             localVideoref.current.srcObject = window.localStream

//             getUserMedia()

//         })
//     }

//     let gotMessageFromServer = (fromId, message) => {
//         var signal = JSON.parse(message)

//         if (fromId !== socketIdRef.current) {
//             if (signal.sdp) {
//                 connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//                     if (signal.sdp.type === 'offer') {
//                         connections[fromId].createAnswer().then((description) => {
//                             connections[fromId].setLocalDescription(description).then(() => {
//                                 socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
//                             }).catch(e => console.log(e))
//                         }).catch(e => console.log(e))
//                     }
//                 }).catch(e => console.log(e))
//             }

//             if (signal.ice) {
//                 connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
//             }
//         }
//     }




//     let connectToSocketServer = () => {
//       // FIX: initialize the socket connection
//       socketRef.current = io.connect("http://localhost:5000"); // or your server URL
  
//       socketRef.current.on('signal', gotMessageFromServer);
  
//       socketRef.current.on('connect', () => {
//           socketRef.current.emit('join-call', window.location.href);
//           socketIdRef.current = socketRef.current.id;
  
//           socketRef.current.on('chat-message', addMessage);
  
//           socketRef.current.on('user-left', (id) => {
//               setVideos((videos) => videos.filter((video) => video.socketId !== id));
//           });
  
//           socketRef.current.on('user-joined', (id, clients) => {
//               clients.forEach((socketListId) => {
//                   connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
  
//                   connections[socketListId].onicecandidate = function (event) {
//                       if (event.candidate != null) {
//                           socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
//                       }
//                   };
  
//                   connections[socketListId].onaddstream = (event) => {
//                       let videoExists = videoRef.current.find(video => video.socketId === socketListId);
  
//                       if (videoExists) {
//                           setVideos(videos => {
//                               const updatedVideos = videos.map(video =>
//                                   video.socketId === socketListId ? { ...video, stream: event.stream } : video
//                               );
//                               videoRef.current = updatedVideos;
//                               return updatedVideos;
//                           });
//                       } else {
//                           let newVideo = {
//                               socketId: socketListId,
//                               stream: event.stream,
//                               autoplay: true,
//                               playsinline: true
//                           };
  
//                           setVideos(videos => {
//                               const updatedVideos = [...videos, newVideo];
//                               videoRef.current = updatedVideos;
//                               return updatedVideos;
//                           });
//                       }
//                   };
  
//                   if (window.localStream !== undefined && window.localStream !== null) {
//                       connections[socketListId].addStream(window.localStream);
//                   } else {
//                       let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//                       window.localStream = blackSilence();
//                       connections[socketListId].addStream(window.localStream);
//                   }
//               });
  
//               if (id === socketIdRef.current) {
//                   for (let id2 in connections) {
//                       if (id2 === socketIdRef.current) continue;
  
//                       try {
//                           connections[id2].addStream(window.localStream);
//                       } catch (e) {}
  
//                       connections[id2].createOffer().then((description) => {
//                           connections[id2].setLocalDescription(description)
//                               .then(() => {
//                                   socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }));
//                               })
//                               .catch(e => console.log(e));
//                       });
//                   }
//               }
//           });
//       });
//   };
  

//     let silence = () => {
//         let ctx = new AudioContext()
//         let oscillator = ctx.createOscillator()
//         let dst = oscillator.connect(ctx.createMediaStreamDestination())
//         oscillator.start()
//         ctx.resume()
//         return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
//     }
//     let black = ({ width = 640, height = 480 } = {}) => {
//         let canvas = Object.assign(document.createElement("canvas"), { width, height })
//         canvas.getContext('2d').fillRect(0, 0, width, height)
//         let stream = canvas.captureStream()
//         return Object.assign(stream.getVideoTracks()[0], { enabled: false })
//     }

//     let handleVideo = () => {
//         setVideo(!video);
//         // getUserMedia();
//     }
//     let handleAudio = () => {
//         setAudio(!audio)
//         // getUserMedia();
//     }

//     useEffect(() => {
//         if (screen !== undefined) {
//             getDislayMedia();
//         }
//     }, [screen])
//     let handleScreen = () => {
//         setScreen(!screen);
//     }

//     let handleEndCall = () => {
//         try {
//             let tracks = localVideoref.current.srcObject.getTracks()
//             tracks.forEach(track => track.stop())
//         } catch (e) { }
//         window.location.href = "/"
//     }

//     let openChat = () => {
//         setModal(true);
//         setNewMessages(0);
//     }
//     let closeChat = () => {
//         setModal(false);
//     }
//     let handleMessage = (e) => {
//         setMessage(e.target.value);
//     }

//     const addMessage = (data, sender, socketIdSender) => {
//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: sender, data: data }
//         ]);
//         if (socketIdSender !== socketIdRef.current) {
//             setNewMessages((prevNewMessages) => prevNewMessages + 1);
//         }
//     };



//     let sendMessage = () => {
//         console.log(socketRef.current);
//         socketRef.current.emit('chat-message', message, username)
//         setMessage("");

//         // this.setState({ message: "", sender: username })
//     }

    
//     let connect = () => {
//         setAskForUsername(false);
//         getMedia();
//     }
// return (
//     <div>

//         {askForUsername === true ?

//             <div>
//                 <h2>Enter into Lobby </h2>
//                 <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
//                 <Button variant="contained" onClick={connect}>Connect</Button>

//                 <div>
//                     <video ref={localVideoref} autoPlay muted></video>
//                 </div>
//             </div> :

//             <div>
//                 {showModal ? <div>
//                     <div>
//                         <h1>Chat</h1>
//                         <div>
//                             {messages.length !== 0 ? messages.map((item, index) => {
//                                 return (
//                                     <div style={{ marginBottom: "20px" }} key={index}>
//                                         <p style={{ fontWeight: "bold" }}>{item.sender}</p>
//                                         <p>{item.data}</p>
//                                     </div>
//                                 )
//                             }) : <p>No Messages Yet</p>}
//                         </div>

//                         <div>
//                             <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic" label="Enter Your chat" variant="outlined" />
//                             <Button variant='contained' onClick={sendMessage}>Send</Button>
//                         </div>
//                     </div>
//                 </div> : <></>}

//                 <div>
//                     <IconButton onClick={handleVideo} style={{ color: "white" }}>
//                         {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
//                     </IconButton>
//                     <IconButton onClick={handleEndCall} style={{ color: "red" }}>
//                         <CallEndIcon />
//                     </IconButton>
//                     <IconButton onClick={handleAudio} style={{ color: "white" }}>
//                         {audio === true ? <MicIcon /> : <MicOffIcon />}
//                     </IconButton>

//                     {screenAvailable === true ?
//                         <IconButton onClick={handleScreen} style={{ color: "white" }}>
//                             {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
//                         </IconButton> : <></>}

//                     <Badge badgeContent={newMessages} max={999} color='orange'>
//                         <IconButton onClick={() => setModal(!showModal)} style={{ color: "white" }}>
//                             <ChatIcon />
//                         </IconButton>
//                     </Badge>
//                 </div>

//                 <video ref={localVideoref} autoPlay muted></video>

//                 <div>
//                     {videos.map((video) => (
//                         <div key={video.socketId}>
//                             <video
//                                 data-socket={video.socketId}
//                                 ref={ref => {
//                                     if (ref && video.stream) {
//                                         ref.srcObject = video.stream;
//                                     }
//                                 }}
//                                 autoPlay
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         }

//     </div>
// )
// }



import React,{useRef,useState,useEffect} from 'react';
import { io } from 'socket.io-client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';

import '../styles/videoComponent.css';
const server_url="http://localhost:8000";
var connections={};
const peerConfigConnections={
    "iceServers":[
        {"urls":"stun:stun.l.google.com:19302"}
    ]
}
const configuration = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};
export default function VideoMeetComponent(){

    var socketRef=useRef();
    let socketIdRef=useRef();
    
    const [socketId, setSocketId] = useState(null);

    let localVideoRef=useRef();
    let [videoAvailable,setVideoAvailable]=React.useState(true);
    let [audioAvailable,setAudioAvailable]=React.useState(true);
   
    let [video, setVideo] = useState([]);
    let [audio,setAudio]=React.useState();
    let [screen,setScreen]=React.useState();
    let [showModal,setModal]=React.useState();
    let [screenAvailable,setScreenAvailable]=React.useState();
    let [messages,setMessages]=React.useState([]);
    let [message,setMessage]=React.useState("");
    let [newMessages,setNewMessages]=React.useState(0);
    let [askForUsername,setAskForUsername]=React.useState(true);
    let [username,setUsername]=React.useState("");

    const videoRef=useRef([]);
    let [videos,setVideos]=useState([]);


    // if(isChrome()===false){

    // }

    const getPermissions=async()=>{
        try{
            const videoPermission=await navigator.mediaDevices.getUserMedia({video:true});
            if(videoPermission){
                setVideoAvailable(true);
            }
            else{
                setVideoAvailable(false);
            }

            const audioPermission=await navigator.mediaDevices.getUserMedia({audio:true});
            if(audioPermission){
                setAudioAvailable(true);
            }
            else{
                setAudioAvailable(false);
            }

            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailable(true);
            }
            else{
                setScreenAvailable(false);
            }

            if(videoAvailable || audioAvailable){
                const userMediaStream=await navigator.mediaDevices.getUserMedia({video:videoAvailable,audio:audioAvailable});

                if(userMediaStream){
                    window.localStream=userMediaStream;
                    if(localVideoRef.current){
                        localVideoRef.current.srcObject=userMediaStream;
                    }
                }
            }
     

        }catch(err){
        console.log(err);
        }
    }

    useEffect(()=>{
        getPermissions();
    },[])


    let getUserMediaSuccess = (stream) => {
      
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream;
        localVideoRef.current.srcObject = stream;
        // localVideoRef.current.srcObject = window.localStream;

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketIdRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false)
            setAudio(false);

            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence=(...args)=>new MediaStream([black(...args),silence()]);
            window.localStream=blackSilence();
            localVideoRef.current.srcObject=window.localStream;
         
        for (let id in connections) {
            connections[id].addStream(window.localStream)
            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })}
        })}

        let silence=()=>{
        let ctx=new AudioContext()
        let oscillator=ctx.createOscillator()
        let dst=oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0],{enabled:false})

    }

    let black=({width=640,height=480}={})=>{
        let canvas=Object.assign(document.createElement("canvas"),{width,height});

        canvas.getContext('2d').fillRect(0,0,width,height);
        let stream =canvas.captureStream();
        return Object.assign(stream.getVideoTracks()[0],{enabled:false}) 
    }

    
    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }

    
    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            // console.log("SET STATE HAS ", video, audio);

        }}, [video, audio]);

            
        useEffect(() => {
            console.log("📸 Updated videos array:", videos);
        }, [videos]);

               
const gotMessageFromServer = (fromId, message) => {
    let signal = JSON.parse(message);
    console.log("🛠 Before updating, existing connections:", Object.keys(connections));


    if (!(fromId in connections)) {
        console.warn(`Received signal from unknown peer: ${fromId}`);
        return;
    }

    let peer = connections[fromId];

    if (signal.sdp) {
        console.log(`Setting remote description for ${fromId}`);
        
        peer.setRemoteDescription(new RTCSessionDescription(signal.sdp))
            .then(() => {
                console.log(`Remote description set for ${fromId}`);

                // ✅ Apply any queued ICE candidates
                if (peer.iceCandidatesQueue) {
                    console.log(`Applying queued ICE candidates for ${fromId}`);
                    peer.iceCandidatesQueue.forEach((candidate) => {
                        peer.addIceCandidate(new RTCIceCandidate(candidate))
                            .catch((error) => console.error("Error adding queued ICE candidate:", error));
                    });
                    peer.iceCandidatesQueue = []; // Clear queue after applying
                }
            })
            .catch((error) => console.error("Error setting remote description:", error));
    }

    if (signal.ice) {
        if (peer.remoteDescription && peer.remoteDescription.type) {
            console.log(`Adding ICE candidate immediately for ${fromId}`);
            peer.addIceCandidate(new RTCIceCandidate(signal.ice))
                .catch((error) => console.error("Error adding ICE candidate:", error));
        } else {
            console.warn(`Remote description not set yet for ${fromId}, queueing ICE candidate`);
            if (!peer.iceCandidatesQueue) peer.iceCandidatesQueue = [];
            peer.iceCandidatesQueue.push(signal.ice);
        }
    }
    console.log("🔗 Active connections after processing:", Object.keys(connections));
};


    

        let addMessage=()=>{

        }
        let connectToSocketServer=()=>{
            socketRef.current=io.connect(server_url,{secure:false})
          
          
            socketRef.current.on('signal',gotMessageFromServer)
            socketRef.current.on('connect', () => {
                console.log("Connected to socket server, ID:", socketRef.current.id);
                
                // setSocketId(socketRef.current.id);
                socketIdRef.current = socketRef.current.id
             
          
                if (socketRef.current) {
                    socketRef.current.emit("join-call", window.location.href);
                } else {
                    console.error("SocketRef is undefined before emitting join-call");
                }
          

    
                socketRef.current.on('chat-message', addMessage)
    
                socketRef.current.on('user-left', (id) => {
                    setVideos((videos) => videos.filter((video) => video.socketId !== id))
                })
                socketRef.current.on('user-joined', (id, clients) => {
                    //change2
                  
                    console.log("New user joined:", id);
                    clients.forEach((socketListId) => {
                         // ✅ Ensure a new peer connection is only created once per socket ID
                      
   
                        connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                        //Wait for their ice candidate       
                        connections[socketListId].onicecandidate = function (event) {
                            if (event.candidate != null) {
                                socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                            }
                        }
                      
                      
                        
                        connections[socketListId].onaddstream = (event) => {
                            console.log("BEFORE:", videoRef.current);
                            console.log("FINDING ID: ", socketListId);
                        
                            if (!videoRef.current) {
                                videoRef.current = [];
                            }
                           
                            
                        
                            let videoExists = videoRef.current.find(video => video.socketId === socketListId);
                        
                            if (videoExists) {
                                console.log("FOUND EXISTING");
                        
                                // Update the stream of the existing video
                                setVideos((prevVideos) => {
                                    const updatedVideos = prevVideos.map(video =>
                                        video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                    );
                                    videoRef.current = updatedVideos;
                                    return updatedVideos;
                                });
                            } else {
                                console.log("CREATING NEW");
                        
                                let newVideo = {
                                    socketId: socketListId,
                                    stream: event.stream,
                                    autoplay: true,
                                    playsinline: true
                                };
                        
                                setVideos((prevVideos) => {
                                    const updatedVideos = [...prevVideos, newVideo];
                                    videoRef.current = updatedVideos;
                                    return updatedVideos;
                                });
                            }
                        };
                      
                       
                        
                           
                    
    
                    
                      
            
                        if(window.localStream!==undefined && window.localStream!==null){
                            connections[socketListId].addStream(window.localStream);
                        }
                        else{
                           let blackSilence=(...args)=>new MediaStream([black(...args),silence()]);
                           window.localStream=blackSilence();
                           connections[socketListId].addStream(window.localStream);
                        }
                    })
                 
   
                    if(id===socketIdRef.current){
                        for (let id2 in connections) {
                            if (id2 === socketId) continue;

                            // if (id2 === socketIdRef.current) continue
                           try{
                            connections[id2].addStream(window.localStream)
                           }catch(e){}
                
                            connections[id2].createOffer().then((description) => {
                                connections[id2].setLocalDescription(description)
                                    .then(() => {
                                        socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                    })
                                    .catch(e => console.log(e))
                            })
                        }
                    }
                })
              
                        
            })
           
        }
    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }
    let connect=()=>{
        setAskForUsername(false);
        getMedia();
    }

     return (
        <div>{
            askForUsername===true?
            <div>
              <h2>Enter into Lobby</h2>
              <TextField id="outlined-basic" label="Username" value={username} onChange={e=>setUsername(e.target.value)}variant="outlined" />
              <Button variant="contained" onClick={connect}>Connect</Button>  

              <div>
                <video ref={localVideoRef} autoPlay muted ></video></div> 
                

            </div>:<>
            <video ref={localVideoRef}  autoPlay muted ></video>

           
            {videos.map((video) => (
    <div key={video.socketId}>
        <h2>Socket ID: {video.socketId}</h2>
        <video
            data-socket={video.socketId}
            ref={(ref) => {
                if (ref && video.stream) {
                    ref.srcObject = video.stream;
                }
            }}
            autoPlay
            playsInline
        />
    </div>
))}

           
           

            
            </>
            }
            
        </div>
    )

}