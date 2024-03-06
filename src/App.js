import React, { useState, useEffect} from 'react';

import shuffle from './utilities/shuffle';
import Card from './components/Card';
import Header from './components/Header';
import Popup from './components/Popup';
import LoopIcon from '@mui/icons-material/Loop';
import Scores from './components/Scores';


function App() {

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [popup, setPopup] = useState(false); //prepravi u false 
  const [clickNum, setClickNum] = useState(0); //prepravi u 0
  const [showScores,setShowScores] = useState(false);

  const handleSetShowScores = () => {
    setShowScores(!showScores);
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

  const handleSetClickNum = () => {
    setClickNum(0);
  };

  const handleClick = (card) => {
    
    if(!disabled){
      setClickNum((currentNum) => currentNum + 1);
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
    handleSetClickNum();
  };

  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards the same
      if (pickOne.image === pickTwo.image) {
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
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
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
        setPopup(true);
      }
    }, [cards]);

  return (
    <>
    {popup && <Popup clickNum={clickNum} handleNewGame={handleNewGame} closePopup={handlePopup}></Popup>}
    <div className='headerFlex'>
      <Header handleNewGame = {handleNewGame} clickNum={clickNum} handleSetShowScores={handleSetShowScores} showScores={showScores}/>
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
