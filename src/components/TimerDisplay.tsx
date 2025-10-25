
export interface TimerProps {
    currentTime: number
}


export const TimerDisplay: React.FC<TimerProps> = (props: TimerProps) => {

    let minutes = Math.floor(props.currentTime / (1000 * 60));
    let seconds = Math.floor((props.currentTime - (minutes * (1000 * 60))) / (1000));
    let miliSeconds = Math.floor((props.currentTime - (minutes * (1000 * 60)) - (seconds * 1000)) / (10));

    function getDoubleDigits(value: number) {
        if (value < 10) return `0${value}`;
        else return `${value}`;
    }

    return <div >
        {getDoubleDigits(minutes)}:{getDoubleDigits(seconds)}.{getDoubleDigits(miliSeconds)}
    </div>;
};
