
export const ele = {
    form: document.querySelector('form'), 
    result_list: document.querySelector('#results'),
    recipe_area: document.querySelector('#recipe'),
}


// bildirim gönderir

export const notify = (text) => {
    Toastify({
        text,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #fbda61, #ff5acd)",
        },
      }).showToast();
}

// yükleniyor gifini ekrana basar

export const renderLoader = (outlet)=>{
    outlet.innerHTML = `
    <div class="loader"></div>
  
    `;

}


export const renderResults =(result)=>{
  console.log(result);
  ele.result_list.innerHTML = result.map((recipe)=>`
 
  <a href="#${recipe.recipe_id}">
  <div class="img-wrapper">
  <img src="${recipe.image_url}" >
  </div>
  <div class="info">
      <h4>${recipe.title}</h4>
      <p>${recipe.publisher}</p>
  </div>
</a> 
  
  `
  )
  .join('')

}