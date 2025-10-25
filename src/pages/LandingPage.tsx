import { useNavigate } from "react-router-dom";
import { Column } from "../components/coulmn"

export const LandingPage: React.FC<{}> = () => {
    let navigate = useNavigate();

    return <Column>
        <button onClick={() => navigate("/recording")} > Go to recording Page</button>
    </Column >

}