import './App.css';
import {useState, useEffect} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [guestName, setGuestName] = useState("");
    const [homeName, setHomeName] = useState("");
    const [homePoints, setHomePoints] = useState(0);
    const [guestPoints, setGuestPoints] = useState(0);
    const [status, setStatus] = useState([])
    const [gameOver, setGameOver] = useState(false);

    const HomeThrow = () => {
        if (!gameOver) {
            const randomNumber = Math.random();

            if (randomNumber > 0.5) {
                setHomePoints(homePoints + 3)
                setStatus([homeName + " scored!", ...status])
            } else {
                setStatus([homeName + " missed!", ...status])
            }
        }
    };

    const GuestThrow = () => {
        if (!gameOver) {
            const randomNumber = Math.random();
            if (randomNumber < 0.5) {
                setGuestPoints(guestPoints + 3)
                setStatus([guestName + " scored!", ...status])
            } else {
                setStatus([guestName + " missed!", ...status])
            }
        }
    };

    const removePoints = () => {
        setHomePoints(0);
        setGuestPoints(0);
        setStatus([]);
        setGameOver(false);
    }
    const handleHome = (event) => {
        event.preventDefault();
        setHomeName(homeName);
    };

    const handleGuest = (e) => {
        e.preventDefault();
        setGuestName(guestName);
    };

    useEffect(() => {
        if (homePoints === 12){
            setStatus([homeName + " won!", ...status])
            setGameOver(true);
        }
    }, [homePoints, homeName, status]);

    useEffect(() => {
        if (guestPoints === 12){
            setStatus([guestName + " won!", ...status])
            setGameOver(true);
        }
    }, [guestPoints, guestName, status]);

    useEffect(() => {
        if (homePoints === 0 && guestPoints === 0){
            setGameOver(false);
        }
    }, [homePoints, guestPoints]);

    return (
        <div className="App">
            <div className="home">
                <h1>Home</h1>
                <button onClick={HomeThrow} disabled={gameOver}>Throw for {homeName}</button>
                <div>Home: {homePoints}</div>
                <form onSubmit={handleHome}>
                    <label>
                        Home:
                        <input
                            type="text"
                            value={homeName}
                            onChange={(e) => setHomeName(e.target.value)}
                        />
                    </label>
                </form>
            </div>
            <div className="center">
                <div className="image-container"></div>
                <button onClick={removePoints}>Restart game</button>
            </div>
            <div className="guest">
                <h1>Guest</h1>
                <button onClick={GuestThrow} disabled={gameOver}>Throw for {guestName}</button>
                <div>Guest: {guestPoints}</div>
                <form onSubmit={handleGuest}>
                    <label>
                        Guest:
                        <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                        />
                    </label>
                </form>
            </div>
            <ProgressBar animated variant={"info"} now={homePoints} label={`${homePoints}%`}/>
            <ProgressBar animated variant={"warning"} now={guestPoints} label={`${guestPoints}%`}/>
            <ul className="no-bullets">
                {status.map((statusItem, index) => (
                    <li key={index}>{statusItem}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;