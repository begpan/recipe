import { ele } from "./ui.js";

export default class Recipe {
  constructor() {
    // tarif hakkındaki bilgiler
    this.info = {};
  }

  // apiden tarif bilgilerni alan metot

  async getRecipe(id) {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );

    const data = await res.json();
    // bilgileri class a tanımlama
    this.info = data.recipe;
  }

  // tarif bilgilerini ekrana basan method
  renderRecipe(r) {
    // tarif bilgilerini ekrana basan method

    ele.recipe_area.innerHTML = `
    <!-- resim alanı -->

    <figure>
        <img src="${r.image_url}" />
        <h1>${r.title}</h1>
        <div class="like-area">
          <i id="like-btn" class="bi bi-heart"> </i>
        </div>
    </figure>
            <!-- tarif alanı -->
  
           <div class="ingredients">
              <ul>
             ${this.createIngredient()}
              </ul>
            </div>
  
            <!-- nasıl pişirilir -->
            <div class="directions">
              <h2>Nasıl Pişirilir</h2>
              <p>Lorem ipsum dolor <span>${
                r.publisher
              }</span>sit adipisicing elit. Aspernatur autem nisi corporis assumenda quisquam labore fugit nesciunt. Voluptatum possimus, tempore deserunt architecto commodi quibusdam dolorem id quo officia maxime ipsum?</p>
              <a href="/adsd" target="_blank">Yönerge</a>
            </div>
  
    
  `;
    // gerekli olay izleyicisi ekle
    document
      .querySelector("#like-btn")
      .addEventListener("click", () => this.controlLike());
  }

  // her bir malszeme için li elemanı oluşturur

  createIngredient() {
    return this.info.ingredients
      .map(
        (i) => `
    <li>
      <i class=""></i>
      <p>${i}</p>
    </li>
    
    `
      )
      .join("");
  }

  // eleman likelanmışsa like  kaldır yoksa likela
  controlLike() {
    console.log("tıklandı", this.info);
  }
}
