import React,{useState} from 'react'
import toast from 'react-hot-toast';
import { v4 as uuid} from 'uuid'
import { useNavigate } from 'react-router-dom';

function Home() {
  
  const [roomId, setRoomId] = useState("");
 const[username, setUsername] = useState("");
 const navigate = useNavigate();

const generateRoomId = (e) => {

  e.preventDefault();
  const id=uuid();
  setRoomId(id);
  toast.success("room is created");
};

const joinRoom = () => {

  if(!roomId || !username){
    toast.error("both are field required");
    return;
  }


  navigate(`/editor/${roomId}` ,{ 
    state : {username},
  }) 
 toast.success("Room is created");
}


  return (
    <div className='container-fuuid'>
     
     <div className='row justify-content-center align-items-center min-vh-100'>
     
    

<div className='card shadow-sm p-2 mb-5 bg-secondary rounded col-12 col-md-6'>
<div className='card-body text-center br-dark'>
    <h1>LIVE CODE EDITOR</h1>
    <h2>login</h2>
   <div className='row'>
    <input type='text' placeholder='enter room id'
    value={roomId}
    onChange={(e) => setRoomId(e.target.value)}
    ></input>



     <input type='text' placeholder='your username'
     
     value={username}
     onChange={(e) => setUsername(e.target.value)}
     
     ></input>
      
 </div>

<button className='btn btn btn-info btn-block'
onClick={joinRoom}
>join</button>

<h6>create room fro clicked ! <span style={{cursor: "pointer"}}

onClick={generateRoomId}

> NewRoom</span></h6>

</div>


</div>

     </div>
       
     </div>
   
  )
}

export default Home
