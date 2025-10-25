import { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { FullScreenOverlay } from '../components/FullScreenOverlay';
import { RecordingSummary } from '../components/RecordingSummary';
import { Column } from '../components/coulmn';
import { TimerDisplay } from '../components/TimerDisplay';
import { buttonColors, INTERVAL_IN_MILISECONDS } from '../globalConstants';
import { TwoStateButton } from '../components/TwoStateButton';
import { Playback } from '../components/Playback';
import { Peg } from '../components/Peg';
import { ButtonsOverlay } from '../components/ButtonsOverlay';



export const MainPage: React.FC<{}> = () => {

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
        <FullScreenOverlay show={!isClockRunning && recording.length != 0} opacity={0.9}>
            <RecordingSummary recordingTimeEnd={time} recording={recording} />
        </FullScreenOverlay>

        <Column style={{ position: "absolute", top: "48%", left: "45%", transform: 'rotate(90deg)' }}>
            <TimerDisplay currentTime={time} />

            <button
                style={{ margin: '12px' }}
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