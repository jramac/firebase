const Popup = ({clickNum,popup,handleNewGame}) => {

        if(popup){
            return <div className="popup-overlay">
            <div className="popup-container">
            <div className="popup-content">
                <div className="naslov">
                    <h2>Bravo majmune</h2>
                </div>
                <h3>trebalo ti je samo: {clickNum/2} pokusaja</h3>
                <div className="naslov">
                    <button onClick={handleNewGame}>New Game</button>
                </div>
            </div>
            </div>
            </div>;
        }
        else{
            return <></>;
        }
};

export default Popup;