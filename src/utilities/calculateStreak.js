const calculateStreak = (streak) => {

    if(streak===0){
        streak = 1;
    }
    else{
        streak *= 2;
    }
    
    return streak;
};

export default calculateStreak;