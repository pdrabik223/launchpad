import type { JSX } from 'react';
import { Peg } from './Peg';

export interface PlaybackProps {
    animatedPegs: JSX.Element[]
}


export const Playback: React.FC<PlaybackProps> = (props: PlaybackProps) => {

    return <>
        <div style={{ width: '4%', backgroundColor: 'gray', height: '80%', top: '10%', position: "absolute", left: '5%' }}>
            <Peg color='orange' runAnimation={false} removeSelf={() => { }} offsetTop={49.75} />
            {props.animatedPegs}
        </div>

    </>;
};
