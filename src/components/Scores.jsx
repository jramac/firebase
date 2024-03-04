import axios from 'axios';
import React, { useState,useEffect} from 'react';
import getScores from '../utilities/getScores';
import LoopIcon from '@mui/icons-material/Loop';
import Score from './Score';
const Scores = ({clickNum,handleNewGame}) => {

    const[scores,setScores] = useState([]);
    const[loading,setLoading] = useState(false);

    useEffect(()=>{
        const fetchScores = async () => {  
            try {
              const result = await getScores();
              setScores(result);
            } finally {
              setLoading(false);
            }
          };
          fetchScores();
    },[])
  
    return 
    {loading && <div className="loadingAnimation">
        <LoopIcon className='MuiSvgIcon-fontSizeLarge'/>
    </div>
    }
    <div className='box'>
        {!loading && <div className="grid">
            <div className="score-overlay">
                <div className="score-container">
                    <div className="score-content">
                        <div className="naslov">
                            <h2>Scoreboard</h2>
                        </div>
                        <div className='box'>
                            {!loading && <div className="gridScore">
                                {scores.map((score) => {
                                    const { name, id, score_value } = score;
                                    return(
                                    <Score
                                        key = {id}
                                        name = {name}
                                        score = {score_value}         
                                    />
                                    );
                                })}
                                </div>
                            }
                        <div className="naslov">
                            <button onClick={handleNewGame}>New Game</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        }
    </div>
            
};

export default Scores;