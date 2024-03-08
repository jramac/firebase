import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import '../componentStyles/Score.scss'

const Score = ({name,score,scoreIndex}) => {
    return(
        <div className="score">
            <div className="row">
                {scoreIndex===0 && <LooksOneIcon/>}
                {scoreIndex===1 && <LooksTwoIcon/>}
                {scoreIndex===2 && <Looks3Icon/>}
                {scoreIndex===3 && <Looks4Icon/>}
                {scoreIndex===4 && <Looks5Icon/>}
                <h3>{name}</h3>
                <h2>{score}</h2>
            </div>

        </div>
    )
}

export default Score;