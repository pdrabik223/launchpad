import { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { TimerDisplay } from '../components/TimerDisplay';
import { buttonColors, INTERVAL_IN_MILISECONDS } from '../globalConstants';
import { Playback } from '../components/Playback';
import { Peg } from '../components/Peg';
import { ButtonsOverlay } from '../components/ButtonsOverlay';
import { useNavigate } from 'react-router-dom';
import { Column } from '../components/coulmn';





export const ReplayPage: React.FC<{}> = () => {

    const [time, setTime] = useState(0);
    const [referenceTime, setReferenceTime] = useState(Date.now());
    const [isClockRunning, setIsClockRunning] = useState(false);
    const [recording] = useState<[number, number][]>(new Array<[number, number]>())

    const [animatedPegs, setAnimatedPegs] = useState<Array<{ id: string, color: string }>>([])

    let navigate = useNavigate();

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

    function appendToAnimation(buttonID: number) {
        const id = uuidv4();
        let color = buttonColors[buttonID];
        setAnimatedPegs(prev => [...prev, { id, color }]);
    }

    // function appendToRecording(buttonID: number) {
    //     if (!isClockRunning) return
    //     recording.push([time, buttonID])
    //     const id = uuidv4();
    //     let color = buttonColors[buttonID];
    //     setAnimatedPegs(prev => [...prev, { id, color }]);
    // }


    return <div>


        <Column style={{ position: "absolute", top: "48%", left: "45%", transform: 'rotate(90deg)' }}>
            <TimerDisplay currentTime={time} />

            <button
                style={{ margin: '12px' }}
                onClick={() => {
                    setReferenceTime(Date.now()),
                        setTime(0);
                }
                }>Reset recording</button>

            <button style={{ margin: '12px' }} onClick={() => navigate("/")}>Exit</button>
            <input
                style={{ display: 'none' }}
                accept="*.json"
                // className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <button> Upload </button>
        </Column>

        <Playback animatedPegs={
            animatedPegs.map(p => (
                <Peg key={p.id} color={p.color} runAnimation={true} removeSelf={() => {
                    // remove peg from state when animation ends
                    setAnimatedPegs(prev => prev.filter(x => x.id !== p.id))
                }} />
            ))
        } />

        <ButtonsOverlay appendToRecording={() => { }} />
    </div>


}