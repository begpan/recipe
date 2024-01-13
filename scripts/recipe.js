import { ele } from "./ui.js"

export default class Recipe {
    constructor(){
        // tarif hakkındaki bilgiler
        this.info = {}
    }

    // apiden tarif bilgilerni alan metot
    
    async getRecipe(id){
      const res =  await fetch (
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
        )

        const data = await res.json()
        // bilgileri class a tanımlama
        this.info = data.recipe

    }
}

// tarif bilgilerini ekrana basan method
renderRecipe(r) {
    ele.recipe_area.innerHTML =
`
<!-- resim alanı -->
          <!-- <figure>
            <img src="images/download.png" alt="">
            <h1>Chicken title</h1>
            <div class="like-area">
              <i class="bi bi-heart"> </i>
            </div>
          </figure> -->
          <!-- tarif alanı -->

          <!-- <div class="ingredients">
            <ul>
              <li>
                <i class=""></i>
                <p>Salt and Pepdfafafafaffsfadfaper</p>
              </li>
              <li>
                <i class=""></i>
                <p>Salt and Peppesdadaardsfsdfsfsfdfdfsdfdsfdfdfdffsdsf</p>
              </li>
              <button id="add-to-cart" class="CartBtn">
                <span class="IconContainer"> 
                  <i class="cart bi bi-cart-fill"></i>
                </span>
                <p class="text">Add to Cart</p>
              </button>
            </ul>
          </div> -->

          <!-- nasıl pişirilir -->
          <!-- <div class="directions">
            <h2>Nasıl Pişirilir</h2>
            <p>Lorem ipsum dolor <span>amet consectetur </span>sit adipisicing elit. Aspernatur autem nisi corporis assumenda quisquam labore fugit nesciunt. Voluptatum possimus, tempore deserunt architecto commodi quibusdam dolorem id quo officia maxime ipsum?</p>
            <a href="/adsd" target="_blank">Yönerge</a>
          </div> -->

`}