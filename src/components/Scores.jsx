import React, { useState,useEffect} from 'react';
import getScores from '../utilities/getScores';
import Score from './Score';
const Scores = ({handleNewGame}) => {

    const[scores,setScores] = useState(null);
    const[loading,setLoading] = useState(true);

    const fetchScores = async () => {  
        try {
            const result = await getScores();
            setScores(result);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchScores();
    },[])
  
    return(
            <div className="popup-overlay">
                <div className="popup-container">
                    <div className="popup-content">
                        <div className="naslov">
                            <h2>Scoreboard</h2>
                        </div>
                        <div className='box'>
                            {!loading && <div className="gridScore">
                                {scores.map((sincleScore) => {
                                    return(<Score key = {sincleScore.id} name = {sincleScore.name.nadimak} score = {sincleScore.score_value}/>);
                                })}
                                </div>
                            }
                        </div>
                        <div className="buttonNewGame">
                            <button onClick={handleNewGame}>New Game</button>
                        </div>
                    </div>
                </div>
            </div>
    )
        
         
};

export default Scores;