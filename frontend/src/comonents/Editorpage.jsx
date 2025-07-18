
import Client from './client';
import Editor from './Editor';
import './editor.css';
import React,{ useState } from 'react';
import { initSocket } from '../socket';
import {  useNavigate ,useLocation , useParams} from 'react-router-dom';
import { useEffect ,useRef } from 'react';
import toast from 'react-hot-toast';




function Editorpage() {

  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [clients, setClient] = useState([]);

  useEffect(() => {

    const init = async () => {
         socketRef.current = await initSocket();
         socketRef.current.on('connect_erro' , (err) => handleError(err));
         socketRef.current.on('connect_faild' , (err) => handleError(err));
         const handleError = (e) => {

          console.log('socket errp' ,e);
          toast.error("Socket connection faild");
               navigate('/');
         }




         socketRef.current.emit('join' , {
          roomId,
          username: location.state?.username,
         });

         

         socketRef.current.on('joined' ,({ clients , username , socketId })=>{

            if(username !== location.state?.username){

              toast.success(`${username} joined`);
            }

             setClient(clients);
             
         }); 


         socketRef.current.on('disconnected' , ({socketId , username}) => {
 
          toast.success(`${username} leaved`);
          setClient((pre) => {
            return pre.filter((client) => client.socketId != socketId)
          })

         });

    };
   init();

  //  return () =>{
  //   socketRef.current.disconnect();
  //   socketRef.current.off('joined');
  //    socketRef.current.off('disconnected');
  //  };
  },[]);

 

  if(!location.state){
    return navigate('/');
  }


  const copyRoomId = async () => {
try {
  await navigator.clipboard.writeText(roomId);
  toast.success("roomid is copy");
} catch (error) {
  toast.error("unable to room id");
}

  }



  const leaveRoom= () =>{
   navigate("/"); 
  }


  return (
    <div className='row editpage' >
     
<div className='col-md-2 bg-dark text-light memberpage'>

<div className='header'> <center> <h1>LIVE </h1><h3>CODE EDITOR</h3> </center></div>

<hr></hr>

<div className='btn'>
  <button className='btn btn-success' 
  style={{  margin:"5px" }}
  onClick={copyRoomId}
  
  >
   copy id
  </button>

  <button className='btn btn-success'
  onClick={leaveRoom}
  >
leave
  </button>


   </div>

   <hr></hr>

<div className='d-flex flex-column overflow-auto text-light'>

  {clients.map((client) => (
      <Client key={client.socketId} username={client.username} />
    ))
  }
</div>

</div>
 

<div className='col-md-10  text-light codepage'>

<Editor socketRef={socketRef} roomId={roomId} oncodechange= {(code) => codeRef.current = code} />

</div>
 
    </div>
  )
}

export default Editorpage
