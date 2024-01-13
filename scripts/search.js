

export default class Search{
    constructor(){
        this.result =[]
    }

    // apiden arama sonuclarını alan bir metot
    async fetchResults(query){
        try{
                // aratılan terime uygun tarfileri al
        const res = await fetch(`https://forkify-api.herokuapp.com/search?q=${query}`)
        // gelen cevabı işle
        const data = await res.json()
        
        // sınıf içiindeki değişkeme datauı aktar.

        this.result= data

        }catch(err){
            console.log(err);
        }
    
    }
}