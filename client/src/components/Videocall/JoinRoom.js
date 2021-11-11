import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState(null);
    const onSubmit = () => {
        // navigate(`/video/${roomId}`)
        window.location.assign(`/video/${roomId}`);
    };

    return (
        <div>
            <input type="text" onChange={(e) => setRoomId(e.target.value)} />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
}

export default JoinRoom