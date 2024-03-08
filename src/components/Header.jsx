import Scores from "./Scores";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
function Header({handleNewGame,finalScore,handleSetShowScores,showScores}){

    return (<>
        {showScores && <Scores handleNewGame={handleNewGame} handleSetShowScores={handleSetShowScores}></Scores>}
        <header className="header">
            <div className='showScores'>
                <SportsScoreIcon className='MuiSvgIcon-fontSizeLarge' onClick={handleSetShowScores}/>
            </div>
            <h3>Score: {finalScore}</h3>
            <button onClick={handleNewGame}>New Game</button>
        </header>
        </>);
};

export default Header;