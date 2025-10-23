import { useState, useRef, useEffect } from 'react';

export const highlightColors = [
    '#fd1d7eff', // Neon pink
    '#39FF14', // Neon green-yellow
    '#FF9933', // Neon coral
    '#00FFCC', // Neon turquoise
    '#FF3366', // Neon rose
    '#CC00FF', // Neon purple

];

export interface MainGameButtonProps {
    diameter: number
    recordPress: () => void
}

export let samples = ["./808.mp3", "./hihat.mp3", "./909.mp3"]

export const MainGameButton: React.FC<MainGameButtonProps> = (props: MainGameButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const [color] = useState(highlightColors[Math.floor(Math.random() * highlightColors.length)]);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [audioPath] = useState(samples[Math.floor(Math.random() * samples.length)]);

    // Initialize audio only once
    useEffect(() => {
        audioRef.current = new Audio(audioPath);
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
        style={{
            height: `${props.diameter}vw`,
            width: `${props.diameter}vw`,
            backgroundColor: color,
            borderRadius: "50%",
            filter: `${isPressed ? 'brightness(0.4)' : 'brightness(1)'}`,
            transition: 'all 0.1s ease',
            boxShadow: `0 0 ${isPressed ? '10px' : '20px'} ${color}`,
            cursor: 'pointer',
            border: 'none',
            outline: 'none'
        }}
        onMouseDown={start}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
    > </div>;
};
