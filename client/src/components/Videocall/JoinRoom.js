import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { joincall } from "../../actions/videoCall";

const JoinRoom = () => {
    const [formData, setFormData] = useState(null);
    const dispatch = useDispatch()
    const onSubmit = () => {
        // window.location.assign(`/video/${room}`);
        dispatch(joincall(formData))
    };

    return (
        <div>
            <input type="text" onChange={(e) => setFormData(e.target.value)} />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
}

export default JoinRoom