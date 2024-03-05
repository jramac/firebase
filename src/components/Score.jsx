import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import '../componentStyles/Score.scss'

const Score = ({name,score}) => {
    return(
        <div className="score">
            <div className="row">
                <LooksOneIcon/>
                <h3>{name}</h3>
                <h2>{score}</h2>
            </div>

        </div>
    )
}

export default Score;