const Card = ({ image, selected, onClick}) => {


    return (
        <div className="card">
            <div className={selected && 'selected'}>
                <img src={image} alt="" className="card-face"/>
                <img
                    src={'./assets/cover.jpg'}
                    alt=""
                    className="card-back"
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default Card;