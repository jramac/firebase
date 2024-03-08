import React, { useState, useEffect} from 'react';

import shuffle from './utilities/shuffle';
import Card from './components/Card';
import Header from './components/Header';
import Popup from './components/Popup';
import LoopIcon from '@mui/icons-material/Loop';
import calculateStreak from './utilities/calculateStreak';


function App() {

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [popup, setPopup] = useState(false); //prepravi u false 
  const [showScores,setShowScores] = useState(false);
  const [finalScore,setFinalScore] = useState(0);
  const [streak,setStreak] = useState(0);

  const handleSetShowScores = () => {
    setShowScores(!showScores);
  }

  const handleSetStreak = (streakToSet) => {
    setStreak(streakToSet);
  }

  const handleSetFinalScore = (streakToAdd) => {
    setFinalScore(finalScore + streakToAdd)
  }

  useEffect(() => {
    const fetchData = async () => {  
      try {
        const result = await shuffle();
        setCards(result);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePopup = () => {
    setShowScores(true);
    setPopup(false);
  }

  const handleClick = (card) => {
    
    if(!disabled){
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  }

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  const handleNewGame = () => {
    handleTurn();
    setLoading(true)
    setShowScores(false)
    setStreak(0)
    setFinalScore(0)
    ////
    const fetchData = async () => {  
      try {
        const result = await shuffle();
        setCards(result);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    ////
    setPopup(false);
  };

  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards the same
      if (pickOne.image === pickTwo.image) {
        handleSetStreak(calculateStreak(streak))
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {     
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        handleSetStreak(0)
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
      handleSetFinalScore(streak);
    }

      return () => {

        clearTimeout(pickTimer);
      };
    }, [cards, pickOne, pickTwo]);

    // If player has found all matches, handle accordingly
    useEffect(() => {
      // Check for any remaining card matches
      const checkWin = cards.filter((card) => !card.matched);
  
      // All matches made, handle win/badge counters
      if (cards.length && checkWin.length < 1) {
        handleSetFinalScore(streak);
        setPopup(true);
      }
    }, [cards]);

  return (
    <>
    {popup && <Popup finalScore={finalScore} handleNewGame={handleNewGame} closePopup={handlePopup}></Popup>}
    <div className='headerFlex'>
      <Header handleNewGame = {handleNewGame} finalScore={finalScore} handleSetShowScores={handleSetShowScores} showScores={showScores}/>
    </div>
    {loading && <div className="loadingAnimation"><LoopIcon className='MuiSvgIcon-fontSizeLarge'/></div>}
    <div className='box'>{!loading && <div className="grid">
      {cards.map((card) => {
        const { image, id, matched } = card;
        return(
          <Card
            key = {id}
            image = {image}
            selected = {card === pickOne || card === pickTwo || matched}
            onClick = {() => handleClick(card)}          
          />
        );
      })}
      </div>
      }
    </div>
    </>
  );
}

export default App;
