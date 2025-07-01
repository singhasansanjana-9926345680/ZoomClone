
import React, { useRef, useEffect } from 'react';

export default function VideoPlayer({ stream, muted = false }) {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            ref={ref}
            autoPlay
            playsInline
            muted={muted}
            style={{ width: "300px", height: "200px", margin: "10px", borderRadius: "10px" }}
        />
    );
}
