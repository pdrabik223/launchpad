import { useState, useRef, useEffect } from 'react';


export interface MainGameButtonProps {
    diameter: number,
    color: string,
    recordPress: () => void
    samplePath: string
    style?: React.CSSProperties
}


export const MainGameButton: React.FC<MainGameButtonProps> = (props: MainGameButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const [color] = useState(props.color);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio only once
    useEffect(() => {
        audioRef.current = new Audio(props.samplePath);
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const start = () => {
        setIsPressed(true);
        props.recordPress();
        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Reset audio to start
            audioRef.current.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    };

    const end = () => {
        setIsPressed(false);
    };

    return <div

        style={
            (() => {
                const baseStyle: React.CSSProperties = {
                    height: `${props.diameter}vw`,
                    width: `${props.diameter}vw`,
                    backgroundColor: color,
                    borderRadius: "50%",
                    filter: `${isPressed ? 'brightness(0.4)' : 'brightness(1)'}`,
                    transition: 'all 0.1s ease',
                    boxShadow: `0 0 ${isPressed ? '10px' : '20px'} ${color}`,
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    margin: 'auto'
                };
                return { ...baseStyle, ...(props.style || {}) } as React.CSSProperties;
            })()}

        onMouseDown={start}
        onMouseUp={end}
        onMouseLeave={end}
    > </div>;
};
