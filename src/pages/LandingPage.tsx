import { useNavigate } from "react-router-dom";
import { Column } from "../components/coulmn"

export const LandingPage: React.FC<{}> = () => {
    let navigate = useNavigate();

    return <Column>
        <button onClick={() => navigate("/recording")} > Go to Recording Page</button>
        <button onClick={() => navigate("/replay")} > Go to Replay Page</button>

    </Column >

}




