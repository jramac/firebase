import axios from 'axios';
import React, { useState} from 'react';
const Popup = ({finalScore,handleNewGame,closePopup}) => {

    const [name, setName] = useState(undefined);
    const handleInputChange = (event) => {
        setName(event.target.value);
    };
    
      const handleClickSend = () => {
        closePopup();
        axios.post('http://127.0.0.1:8000/api/score-create/', {name:{nadimak:name}, score_value: finalScore})
            .then(response => {
                console.log('Score added successfully:', response.data);
            })  
            .catch(error => {
                console.error('Error adding score:', error);
            });
        
        // Log the state variables as JSON
        console.log('State Variables:', JSON.stringify({ name, finalScore }));
        };
  
            return (<>
            <div className="popup-overlay">
            <div className="popup-container">
            <div className="popup-content">
                <div className="naslov">
                    <h2>Bravooo!</h2>
                </div>
                <h3>Score : {finalScore} </h3>
                <h3>Upisi ime</h3>
                <input type="text" value={name} onChange={handleInputChange} />
                <button onClick={handleClickSend}>Predaj</button>
                <div className="naslov">
                    <button onClick={handleNewGame}>New Game</button>
                </div>
            </div>
            </div>
            </div>
            </>);
};

export default Popup;