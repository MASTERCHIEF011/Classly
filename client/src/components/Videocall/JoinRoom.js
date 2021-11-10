import React, { useState } from "react";

const JoinRoom = () => {
    const [roomId, setRoomId] = useState(null);
    const onSubmit = () => {
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