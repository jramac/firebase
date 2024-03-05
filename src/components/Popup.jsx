import axios from 'axios';
import React, { useState} from 'react';
const Popup = ({clickNum,handleNewGame,closePopup}) => {

    const [name, setName] = useState(undefined);
    const score = clickNum/2;
    const handleInputChange = (event) => {
        setName(event.target.value);
      };
    
      const handleClickSend = () => {
        closePopup();
        axios.post('http://127.0.0.1:8000/api/score-create/', {name:{nadimak:name}, score_value: score})
            .then(response => {
                console.log('Score added successfully:', response.data);
            })  
            .catch(error => {
                console.error('Error adding score:', error);
            });

        // Log the state variables as JSON
        console.log('State Variables:', JSON.stringify({ name, clickNum }));
        };
  
            return <div className="popup-overlay">
            <div className="popup-container">
            <div className="popup-content">
                <div className="naslov">
                    <h2>Bravo majmune</h2>
                </div>
                <h3>trebalo ti je samo: {score} pokusaja</h3>
                <h3>Upisi ime</h3>
                <input type="text" value={name} onChange={handleInputChange} />
                <button onClick={handleClickSend}>Predaj</button>
                <div className="naslov">
                    <button onClick={handleNewGame}>New Game</button>
                </div>
            </div>
            </div>
            </div>;
};

export default Popup;