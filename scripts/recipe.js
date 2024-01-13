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
              <h2>Nasıl Pişirilir</h2>
              <p>Lorem ipsum dolor <span>${
                r.publisher
              }</span>sit adipisicing elit. Aspernatur autem nisi corporis assumenda quisquam labore fugit nesciunt. Voluptatum possimus, tempore deserunt architecto commodi quibusdam dolorem id quo officia maxime ipsum?</p>
              <a href="/adsd" target="_blank">Yönerge</a>
              <button class=" cart CartBtn">
          <span class="IconContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
              fill="rgb(17, 17, 17)"
              class="cart"
            >
              <path
                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
              ></path>
            </svg>
          </span>
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
      <i class=""></i>
      <p>${i}</p>
    </li>
    
    `
      )
      .join("");
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
