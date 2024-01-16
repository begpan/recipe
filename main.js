import { renderResults } from "./scripts/ui.js";
import Search from "/scripts/search.js";
import { ele, notify, renderLoader } from "/scripts/ui.js";
import { categories } from "./scripts/constant.js";
import Recipe from "./scripts/recipe.js";

// uuid kutuphanesinden id olusturma
import { v4 } from "https://jspm.dev//uuid";

// classın ornegini oluşturma

const search = new Search();
const recipe = new Recipe();

//! olay izleyicileri

// sayfa yuklenme olayını izler
document.addEventListener("DOMContentLoaded", () => {
  // rastegele categori seç
  const index = Math.floor(Math.random() * categories.length);
  // kategorinin verilerini al ekrana bas
  getResults(categories[index]);
});

// formun gonderilme olayını izler
ele.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  getResults(query);
});

// sayfa yuklenme olayını izle

window.addEventListener("DOMContentLoaded", () => {
  controlUrl;

  renderBasketItems;
});
// urldeki id nin değişme olayını izle

window.addEventListener("hashchange", controlUrl);

// tarif alanındaki tıklanma olaylarını izle

ele.recipe_area.addEventListener("click", handleClick);

//! fonksiyonlar
// arama sonuclarını alıp ekrana basar

async function getResults(query) {
  if (!query.trim()) {
    return notify("Please enter some search keyword");
  }
  renderLoader(ele.result_list);

  try {
    // apiden verileri al

    await search.fetchResults(query.trim());

    if (search.result.error) {
      notify("Recipe not found");
      // veriler hatalı geldiğinde loaderi kaldır
      ele.result_list.innerHTML = "";
    } else {
      renderResults(search.result.recipes);
    }

    // sonucları ekrana bas
  } catch (err) {
    // hata olursa bildirim ver
    notify("Oops! Something went wrong");

    ele.result_list.innerHTML = "";
  }
}

// detay verilerini alıp ekrana basar
async function controlUrl() {
  // detayı gosterilecek ürün id sine eriş
  const id = location.hash.slice(1);

  if (id) {
    // yğkleniyor bas
    renderLoader(ele.recipe_area);

    // tarif bilgilerini al

    await recipe.getRecipe(id);

    recipe.renderRecipe(recipe.info);
  }
}

// sepet alanı
let basket = [];
// tarif alanındaki tıklamalarda calısır

function handleClick(e) {
  if (e.target.id === "add-to-cart") {
    // butun malzemeleri sepete ekle

    recipe.info.ingredients.forEach((title) => {
      // her bir trarif için obkje oluştur ve id ekle

      const newItem = {
        id: v4(),
        title,
      };

      basket.push(newItem);
    });

    // locali guncelle

    localStorage.setItem("basket", JSON.stringify(basket));

    // sepet arayuzunu guncelle

    renderBasketItems();
  }
}

// tarif verilerini ekrana basar

function renderBasketItems() {
  ele.basket_list.innerHTML = basket
    .map(
      (i) => `
  
  <li id="${i.id}">
   <i id="delete-item" class="bi bi-x"></i>
   <span>${i.title}</span>
  </li>
  `
    )
    .join(" ");
}

// silme butonuna tıklanma olayı

ele.clear_btn.addEventListener("click", () => {
  const res = confirm("Want to clear?");

  if (res) {
    // sepet dizisini sıfırla
    basket = [];

    // locali temizle
    localStorage.removeItem("basket");

    // arayuzu temizle

    ele.basket_list.innerHTML = " ";
  }
});

// tek tek silme

ele.basket_list.addEventListener("click", (e) => {
  if (e.target.id == "delete-item") {
    // tıklanılan elemanın  id erişmeg

    const parent = e.target.parentElement;
    const id = parent.id;
    console.log(id);
    // idsine göre diziden kaldırma

    basket = basket.filter((i) => i.id !== id);

    // locale güncel diziyi
    localStorage.setItem("basket", JSON.stringify(basket));

    // arayuzden ilgili elemanı kaldırma
    parent.remove();
  }
});
