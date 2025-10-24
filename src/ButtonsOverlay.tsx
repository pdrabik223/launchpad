import { buttonSamples, buttonColors } from './App';
import { Column } from './coulmn';
import { MainGameButton } from './MainGameButton';
import { Row } from './row';






export interface ButtonsOverlayProps {
    appendToRecording: (bunId: number) => void

}



export const ButtonsOverlay: React.FC<ButtonsOverlayProps> = (props: ButtonsOverlayProps) => {
    const buttonSize = 18; // Size in vw units
    return <>
        <Column expanded={true} style={{ justifyContent: "space-between" }}>
            <Row>
                <MainGameButton
                    samplePath={buttonSamples[0]}
                    color={buttonColors[0]}
                    recordPress={() => props.appendToRecording(0)}
                    diameter={buttonSize} />
                <MainGameButton
                    style={{ marginTop: `${buttonSize / 2}vw`, marginRight: `${buttonSize / 8}vw` }}
                    samplePath={buttonSamples[1]}
                    color={buttonColors[1]}
                    recordPress={() => props.appendToRecording(1)}
                    diameter={buttonSize} />
                <MainGameButton
                    style={{ marginTop: `${buttonSize / 2}vw`, marginLeft: `${buttonSize / 8}vw` }}
                    samplePath={buttonSamples[2]}
                    color={buttonColors[2]}
                    recordPress={() => props.appendToRecording(2)}
                    diameter={buttonSize} />
                <MainGameButton
                    samplePath={buttonSamples[3]}
                    color={buttonColors[3]}
                    recordPress={() => props.appendToRecording(3)}
                    diameter={buttonSize} />
            </Row>
            <Row>
                <MainGameButton
                    samplePath={buttonSamples[4]}
                    color={buttonColors[4]}
                    recordPress={() => props.appendToRecording(4)}
                    diameter={buttonSize} />
                <MainGameButton
                    style={{ marginTop: `${buttonSize / 2}vw`, marginRight: `${buttonSize / 8}vw` }}
                    samplePath={buttonSamples[5]}
                    color={buttonColors[5]}
                    recordPress={() => props.appendToRecording(5)}
                    diameter={buttonSize} />
                <MainGameButton
                    style={{ marginTop: `${buttonSize / 2}vw`, marginLeft: `${buttonSize / 8}vw` }}
                    samplePath={buttonSamples[6]}
                    color={buttonColors[6]}
                    recordPress={() => props.appendToRecording(6)}
                    diameter={buttonSize} />
                <MainGameButton
                    samplePath={buttonSamples[7]}
                    color={buttonColors[7]}
                    recordPress={() => props.appendToRecording(7)}
                    diameter={buttonSize} />
            </Row>

            <div
                style={{
                    height: `${buttonSize}vw`
                }}
            ></div>

            <Row>
                <MainGameButton
                    samplePath={buttonSamples[8]}
                    color={buttonColors[8]}
                    recordPress={() => props.appendToRecording(8)}
                    diameter={buttonSize} />
                <MainGameButton
                    style={{ marginTop: `-${buttonSize / 2}vw` }}
                    samplePath={buttonSamples[9]}
                    color={buttonColors[9]}
                    recordPress={() => props.appendToRecording(9)}
                    diameter={buttonSize} />
                <MainGameButton
                    style={{ marginTop: `-${buttonSize / 2}vw` }}
                    samplePath={buttonSamples[10]}
                    color={buttonColors[10]}
                    recordPress={() => props.appendToRecording(10)}
                    diameter={buttonSize} />
                <MainGameButton
                    samplePath={buttonSamples[11]}
                    color={buttonColors[11]}
                    recordPress={() => props.appendToRecording(11)}
                    diameter={buttonSize} />
            </Row>
            <Row>
                <MainGameButton
                    samplePath={buttonSamples[12]}
                    color={buttonColors[12]}
                    recordPress={() => props.appendToRecording(12)}
                    diameter={buttonSize} />
                <MainGameButton
                    style={{ marginTop: `-${buttonSize / 2}vw` }}
                    samplePath={buttonSamples[13]}
                    color={buttonColors[13]}
                    recordPress={() => props.appendToRecording(13)}
                    diameter={buttonSize} />
                <MainGameButton
                    style={{ marginTop: `-${buttonSize / 2}vw` }}
                    samplePath={buttonSamples[14]}
                    color={buttonColors[14]}
                    recordPress={() => props.appendToRecording(14)}
                    diameter={buttonSize} />
                <MainGameButton
                    samplePath={buttonSamples[15]}
                    color={buttonColors[15]}
                    recordPress={() => props.appendToRecording(15)}
                    diameter={buttonSize} />
            </Row>
        </Column>
    </>;
};
