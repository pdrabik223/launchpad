import { useState, useEffect } from 'react';
import './App.css'
import { Column } from './coulmn';
import { Row } from './row';
import { MainGameButton } from './MainGameButton';
import { v4 as uuidv4 } from 'uuid';


const INTERVAL_IN_MILISECONDS = 10;

function App() {
  // Create 16 buttons in a circle
  const buttonSize = 12; // Size in vw units

  const [time, setTime] = useState(0);
  const [referenceTime, setReferenceTime] = useState(Date.now());
  const [recording] = useState<[number, number][]>(new Array<[number, number]>())
  const [pegDisplayIndexes, setPegDisplayIndexes] = useState<[number, number]>([0, 0])
  const [displayedPegs, setDisplayedPegs] = useState<[number, number][]>(new Array<[number, number]>())

  useEffect(() => {
    const countDownUntilZero = () => {
      setTime(prevTime => {
        const now = Date.now();
        const interval = now - referenceTime;
        setReferenceTime(now);
        let tempTime = prevTime + interval;
        calculatePegPositions(prevTime, interval)
        return tempTime
      });
    }

    setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
  }, [time]);

  function appendToRecording(id: number) {
    // if (recording.get(time + 100) === undefined) recording.set(time + 100, [id])
    recording.push([time, id])
  }

  function calculatePegPositions(prevTime: number, interval: number) {
    // yellow peg describes current time and it's width is 0.5 %, whole timeline is 80% of viewport let's say 8s 
    // so peg takes 4 seconds to move from the edge to center
    if (recording.length == 0 || pegDisplayIndexes[0] > recording.length) {
      return
    }

    // recalculate PegIndexes 
    let newStartIndex = 0;
    let newEndIndex = recording.length;

    for (let i = pegDisplayIndexes[0]; i < recording.length; i++) {
      if (recording[i][0] < (time - 4000)) { newStartIndex = i + 1; continue }
      if (recording[i][0] > (time + 4000)) { newEndIndex = i; break }
    }

    displayedPegs.splice(0, newStartIndex - pegDisplayIndexes[0])

    for (let i = newStartIndex; i < newEndIndex; i++) {
      displayedPegs.push(recording[i])
    }
  }

  function getPegs() {

    let positions = []
    for (let peg of displayedPegs) {
      let position = (((time - peg[0]) / 4000) * 100)
      positions.push(<Peg color='red' offsetTop={position} />)

    }

    return positions

  }

  return (

    <div style={{
    }}>
      {time}
      <button onClick={() => {
        setReferenceTime(Date.now()),
          setTime(0);
      }
      }>Reset time</button>

      <div style={{ width: '4%', backgroundColor: 'gray', height: '80%', top: '10%', position: "absolute", left: '5%' }}>
        {getPegs()}

        <Peg color='orange' offsetTop={49.75} />

      </div>

      <Column>
        <Row>
          <MainGameButton
            recordPress={() => appendToRecording(0)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(1)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(2)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(3)}
            diameter={buttonSize}
          />
        </Row>
        <Row>
          <MainGameButton
            recordPress={() => appendToRecording(4)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(5)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(6)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(7)}
            diameter={buttonSize}
          />
        </Row>
        <Row>
          <MainGameButton
            recordPress={() => appendToRecording(8)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(9)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(10)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(11)}
            diameter={buttonSize}
          />
        </Row>
        <Row>
          <MainGameButton
            recordPress={() => appendToRecording(12)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(13)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(14)}
            diameter={buttonSize}
          />
          <MainGameButton
            recordPress={() => appendToRecording(15)}
            diameter={buttonSize}
          />
        </Row>
      </Column>
    </div>
  )
}

export default App



export interface PegProps {
  color: string
  offsetTop: number
}

export const Peg: React.FC<PegProps> = (props: PegProps) => {
  return <div key={uuidv4()} style={{ width: '100%', backgroundColor: props.color, height: '0.5%', position: "absolute", top: `${props.offsetTop}%`, margin: 'auto' }}>
  </div>
}