import { renderResults } from "./scripts/ui.js";
import Search from "/scripts/search.js";
import { ele, notify, renderLoader } from "/scripts/ui.js";
import { categories } from "./scripts/constant.js";
import Recipe from "./scripts/recipe.js";

// classın ornegini oluşturma

const search = new Search();
const recipe = new Recipe();
console.log(recipe);

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

window.addEventListener("DOMContentLoaded", controlUrl);
// urldeki id nin değişme olayını izle

window.addEventListener("hashchange", controlUrl);

// tarif alanındaki tıklanma olaylarını izle

ele.recipe_area.addEventListener("click", handleClick);

//! fonksiyonlar
// arama sonuclarını alıp ekrana basar

async function getResults(query) {
  if (!query.trim()) {
    return notify("arama terimi giriniz");
  }
  renderLoader(ele.result_list);

  try {
    // apiden verileri al

    await search.fetchResults(query.trim());

    if (search.result.error) {
      notify("aradığığnız kriterlere uygun urun bulunamadı");
      // veriler hatalı geldiğinde loaderi kaldır
      ele.result_list.innerHTML = "";
    } else {
      renderResults(search.result.recipes);
    }

    // sonucları ekrana bas
  } catch (err) {
    // hata olursa bildirim ver
    notify("bir sorun oluştu");

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
    console.log(recipe.info.ingredients);
  }
}
