import { ele } from "./ui.js";

export default class Recipe {
  constructor() {
    // tarif hakkındaki bilgiler
    this.info = {};

    // likelaanan tarifler
    this.likes = JSON.parse(localStorage.getItem("likes")) || [];

    this.renderLikeList();
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
          <i id="like-btn" class="bi ${
            this.isRecipeLiked() ? "bi-heart-fill" : "bi-heart"
          }"> </i>
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
              <h2>How to cook?</h2>
              <p>Lorem ipsum dolor <span>${
                r.publisher
              }</span>sit adipisicing elit. Aspernatur autem nisi corporis assumenda quisquam labore fugit nesciunt. Voluptatum possimus, tempore deserunt architecto commodi quibusdam dolorem id quo officia maxime ipsum?</p>
              <a href="${r.publisher_url}" target="_blank">More..</a>
              
              <button id="add-to-cart" class="cart CartBtn">
                 <p class="text">Add to Cart</p>
              </button>
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
      <i class="bi bi-check-circle"></i>
      <p>${i}</p>
    </li>
    
    `
      )
      .join(" ");
  }

  // eleman likelanmışsa like  kaldır yoksa likela
  controlLike() {
    const newItem = {
      id: this.info.recipe_id,
      img: this.info.image_url,
      title: this.info.title,
    };

    if (this.isRecipeLiked()) {
      // diziden kaldır

      this.likes = this.likes.filter((i) => i.id !== newItem.id);
    } else {
      // diziye ekle
      this.likes.push(newItem);
    }
    // likes dizisini local storage aktaar.
    localStorage.setItem("likes", JSON.stringify(this.likes));

    // detay arayuzunu guncellemek
    this.renderRecipe(this.info);
    // like listesinin arayuzunu guncelle
    this.renderLikeList();
  }

  // ekranda detayı goruntulenen eleman likelanmış mı kontrol eder

  isRecipeLiked() {
    // egerki elemanı bulduysa buldugu elemanı donudurecek bulamazsa undefined dondurcek
    return this.likes.find((i) => i.id === this.info.recipe_id);
  }

  // ekrana like listesi bakar
  renderLikeList() {
    ele.like_list.innerHTML = this.likes
      .map(
        (i) => `
    <a href="#${i.id}">
       <img src="${i.img}" />
      <span>${i.title}</span>
    </a>
    `
      )
      .join("");
  }
}
