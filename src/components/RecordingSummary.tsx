
import { TimerDisplay } from './TimerDisplay';

export interface RecordingSummaryProps {
    recordingTimeEnd: number,
    recording: [number, number][]
}

export const RecordingSummary: React.FC<RecordingSummaryProps> = (props: RecordingSummaryProps) => {
    const downloadRecording = () => {
        // Create the JSON content with recording data and metadata
        const recordingData = {
            recording: props.recording,
            duration: props.recordingTimeEnd,
            created: new Date().toISOString(),
        };

        const jsonString = JSON.stringify(recordingData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return <div style={{
        position: "absolute",
        top: "48%",
        left: "45%",
        transform: 'rotate(90deg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    }}>
        <div>Duration: <TimerDisplay currentTime={props.recordingTimeEnd} /></div>
        <button
            onClick={downloadRecording}
            style={{
                padding: '0.5rem 1rem',
            }}
        >
            Download Recording
        </button>
    </div>;
};
