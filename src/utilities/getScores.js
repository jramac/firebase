const getScores = async() => {
    const assets = []
    async function fetchData(){
        const res = await fetch('http://127.0.0.1:8000/api/scores/5/')
        assets.push({res})
    }    
    await fetchData();
    console.log(assets)

    return [...assets]
};

export default getScores;