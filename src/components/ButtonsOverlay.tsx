
import { buttonColors, buttonSamples } from '../globalConstants';
import { MainGameButton } from './MainGameButton';


export interface ButtonsOverlayProps {
    appendToRecording: (bunId: number) => void

}

export const ButtonsOverlay: React.FC<ButtonsOverlayProps> = (props: ButtonsOverlayProps) => {
    const buttonSize = 18; // Size in vw units


    const buttonsYOffsets: number[] = [20 - 5, 40 - 5, 60 - 5, 80 - 5]
    const buttonsXOffsets: number[] = [6, 20, 70, 84]
    const middleButtonsOffset: number = 10

    function getButtons() {
        let result: [number, number][] = []

        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                if (y == 1 || y == 2)
                    if (x < 2)
                        result.push([buttonsXOffsets[x] + middleButtonsOffset, buttonsYOffsets[y]])
                    else
                        result.push([buttonsXOffsets[x] - middleButtonsOffset, buttonsYOffsets[y]])
                else result.push([buttonsXOffsets[x], buttonsYOffsets[y]])

            }
        }
        return result;
    }

    return <>
        {getButtons().map((position, index) => (
            <MainGameButton
                key={index}
                positionOffset={position}
                samplePath={buttonSamples[index]}
                color={buttonColors[index]}
                recordPress={() => props.appendToRecording(index)}
                diameter={buttonSize}
            />
        ))}

    </>;
};
