import { useState } from 'react';
export interface TwoStateButtonProps {
    onToggle: (recording: boolean) => void;
}



export const TwoStateButton: React.FC<TwoStateButtonProps> = (props: TwoStateButtonProps) => {

    const [isRecording, setIsRecording] = useState(false);

    return (
        <button

            onClick={() => { props.onToggle(!isRecording); setIsRecording(!isRecording); }}
        >
            {isRecording ? "Stop Recording" : "Start recording"}
        </button>
    );
};
