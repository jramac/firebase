function Header({handleNewGame,clickNum}){


    return (
        <header className="header">
            <h3>Memory game</h3>
            <h3>Click num: {clickNum}</h3>
            <button onClick={handleNewGame}>New Game</button>
        </header>
    );
};

export default Header;