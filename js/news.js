const categories = () => {

    fetch(` https://openapi.programming-hero.com/api/news/categories`).then(res => res.json()).then(data => categoriesDisplay(data.data.news_category))
   .catch(error => console.log(error));
}

const categoriesDisplay = (categories) => {
    // console.log(categories)
    const categoriesDiv = document.getElementById('categories-container');

    for (let category of categories) {
        // console.log(category)

        const createDiv = document.createElement('div');
        createDiv.classList.add('sm:block', 'bg-primary', 'sm:bg-white', 'sm:text-black', 'text-white');

        createDiv.innerHTML = `
          <button onclick="singleCategory('${category.category_id}')" class="btn btn-ghost text-center active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-500">${category.category_name}
          
          </button>

        `
      categoriesDiv.appendChild(createDiv);
    }
}

categories()


const singleCategory =(id) => {
 
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(value => displaySingleData(value.data))
        .catch(error => console.log(error));
}

const displaySingleData = (singleCategory) => {
    const cardContainer = document.getElementById('Card-container');
  cardContainer.innerHTML = ``;
  document.getElementById('card-count').innerText = `${singleCategory.length} :items found `
    singleCategory.forEach(item => {
        console.log(item)
      
        const cardBody = document.createElement('div');
        cardBody.classList.add("card", "lg:card-side", "bg-base-100", "shadow-xl", "m-6")
        console.log(item.author)
       
        cardBody.innerHTML = `
       <figure><img class="w-96 h-79 " src="${item.image_url}" alt="Album" /></figure>
    <div class="card-body">
        <h2 class="card-title ">${item.title}</h2>
        <p class="font-light">${item.details.slice(1, 300) + "......"}
        </p>
         
        <div class="card-actions justify-end">
             <!-- The button to open modal -->
           <label for="my-modal-3" class="btn btn-primary modal-button">Details</label>

          <!-- Put this part before </body> tag -->
         <input type="checkbox" id="my-modal-3" class="modal-toggle" />
          <div class="modal">
        <div class="modal-box relative">
          <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 class="text-lg font-bold">${item.title}</h3>
          <p class="py-4">${item.details}</p>
        </div>
        </div>
        </div>


        <div class='flex justify-items-center'>
        <figure><img class="w-10 rounded-full  " src="${item.author.img}" alt="Album" /></figure>
        <h5 class='ms-5 mt-3'> ${item.author.name?item.author.name:'Data Not Found'}</h5>
          <p class="text-center mt-5  ">Total View: ${item.total_view?item.total_view:'Data not Found'}</p>
        
          
        </div>
        
    </div>
        `
     

        cardContainer.appendChild(cardBody);
    });

    
}

 
singleCategory('08')





