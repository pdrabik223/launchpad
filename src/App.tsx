import { useState, useRef, useEffect } from 'react';
import './App.css'
import { Column } from './coulmn';
import { Row } from './row';

const highlightColors = [
  '#fd1d7eff', // Neon pink
  '#00FF9F', // Neon aqua
  '#00FFFF', // Neon cyan
  '#FFD300', // Neon yellow
  '#FF3C00', // Neon orange
  '#7FFF00', // Neon green
  '#FF00FF', // Neon magenta
  '#00FF00', // Neon lime
  '#FF0077', // Hot pink
  '#39FF14', // Neon green-yellow
  '#FF9933', // Neon coral
  '#00FFCC', // Neon turquoise
  '#FF3366', // Neon rose
  '#CC00FF', // Neon purple
  '#FF6600', // Neon red-orange
  '#14F0FF', // Neon blue
];

function App() {
  // Create 16 buttons in a circle
  const buttonSize = 12; // Size in vw units


  return (
    <div style={{

    }}>
      <Column>
        <Row>
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
        </Row>
        <Row>
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
        </Row>
        <Row>
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
        </Row>
        <Row>
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
          <MainGameButton
            diameter={buttonSize}
          />
        </Row>
      </Column>
    </div>
  )
}

export default App


interface MainGameButtonProps {
  // highlightColor: string
  diameter: number

}

let samples = ["./808.mp3", "./hihat.mp3", "./909.mp3"]

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
  > </div>
}