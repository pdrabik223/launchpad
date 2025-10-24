import { useState, useEffect, type JSX } from 'react';
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FullScreenOverlay } from './FullScreenOverlay';
import { Peg } from './Peg';
import { ButtonsOverlay } from './ButtonsOverlay';
import { TwoStateButton } from './TwoStateButton';
import { Playback } from './Playback';
import { TimerDisplay } from './TimerDisplay';
import { Column } from './coulmn';

export const buttonColors = [
  "#e63946",
  "#f77f00",
  "#ffd166",
  "#8ac926",
  "#2a9d8f",
  "#00b4d8",
  "#48cae4",
  "#4361ee",
  "#3a0ca3",
  "#8338ec",
  "#ff006e",
  "#fb6f92",
  "#ff595e",
  "#ffb5a7",
  "#9ef01a",
  "#00f5d4"
];

export const buttonSamples = [
  "./808.mp3",
  "./hihat.mp3",
  "./909.mp3",
  "./808.mp3",
  "./hihat.mp3",
  "./909.mp3",
  "./808.mp3",
  "./hihat.mp3",
  "./909.mp3",
  "./808.mp3",
  "./hihat.mp3",
  "./909.mp3",
  "./808.mp3",
  "./hihat.mp3",
  "./909.mp3",
  "./909.mp3",
];



const INTERVAL_IN_MILISECONDS = 10;

function App() {
  // Create 16 buttons in a circle

  const [time, setTime] = useState(0);
  const [referenceTime, setReferenceTime] = useState(Date.now());
  const [isClockRunning, setIsClockRunning] = useState(false);

  const [recording] = useState<[number, number][]>(new Array<[number, number]>())
  const [animatedPegs, setAnimatedPegs] = useState<Array<{ id: string, color: string }>>([])


  useEffect(() => {
    if (!isClockRunning) return;

    const cuntUp = () => {
      setTime(prevTime => {
        const now = Date.now();
        const interval = now - referenceTime;
        setReferenceTime(now);
        let tempTime = prevTime + interval;
        return tempTime
      });
    }

    const timerId = setTimeout(cuntUp, INTERVAL_IN_MILISECONDS);
    return () => clearTimeout(timerId);

  }, [time, isClockRunning, referenceTime]);

  function appendToRecording(buttonID: number) {
    if (!isClockRunning) return
    recording.push([time, buttonID])
    const id = uuidv4();
    let color = buttonColors[buttonID];
    setAnimatedPegs(prev => [...prev, { id, color }]);
  }


  return <div>
    <FullScreenOverlay show={!isClockRunning && recording.length != 0} >
      <RecordingSummary recordingTimeEnd={time} recording={recording} />
    </FullScreenOverlay>

    <Column style={{ position: "absolute", top: "50%", left: "50%" }}>
      <TimerDisplay currentTime={time} />

      <button

        onClick={() => {
          setReferenceTime(Date.now()),
            setTime(0);
        }
        }>Reset time</button>

      <TwoStateButton
        onToggle={(recording) => {
          setIsClockRunning(recording);
          if (recording) {
            setTime(0);
            setReferenceTime(Date.now());
          }
        }}
      />
    </Column>

    <Playback animatedPegs={
      animatedPegs.map(p => (
        <Peg key={p.id} color={p.color} runAnimation={true} removeSelf={() => {
          // remove peg from state when animation ends
          setAnimatedPegs(prev => prev.filter(x => x.id !== p.id))
        }} />
      ))
    } />

    <ButtonsOverlay appendToRecording={appendToRecording} />
  </div>

}

export default App


export interface RecordingSummaryProps {
  recordingTimeEnd: number,
  recording: [number, number][]
}

export const RecordingSummary: React.FC<RecordingSummaryProps> = (props: RecordingSummaryProps) => {
  return <div style={{ transform: 'rotate(90deg)' }}>
    Duration: <TimerDisplay currentTime={props.recordingTimeEnd} />
  </div>
}



