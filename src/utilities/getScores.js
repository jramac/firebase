const getScores = async() => {
    const assets = []
    async function fetchData(){
        const res = await fetch('http://127.0.0.1:8000/api/scores/5/?format=json')
        const data = await res.json()
        assets.push(...data)
    }    
    await fetchData();
    console.log(assets)
    return (assets)
};

export default getScores;