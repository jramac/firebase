const shuffle = async() => {
    //const assets = [
    //    {image: '/assets/cigara.jpeg' },
    //    {image: '/assets/espreso.jpg' },
    //    {image: '/assets/jaje.jpg' },
    //    {image: '/assets/kava.jpg' },
    //    {image: '/assets/pelin.jpg' },
    //    {image: '/assets/sranje.jpg' },
    //    {image: '/assets/upaljac.jpg' },
    //    {image: "https://picsum.photos/id/16/400" }
    //];
    const assets = []
    async function fetchData(){
        const res = await fetch('https://picsum.photos/300')
        const imgUrl = res.url
        assets.push({image:imgUrl})
    }    
    await fetchData();
    await fetchData();
    await fetchData();
    await fetchData();
    await fetchData();
    await fetchData();
    await fetchData();
    await fetchData();

    console.log(assets)

    return [...assets,...assets]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id:Math.random()}))
};

export default shuffle;