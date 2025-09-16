const categoryContainer = document.getElementById('category-container')
const petsContainer = document.getElementById('pets-container')

const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
        const data = await res.json();
        displayCategories(data.categories)
    }
    catch (error) {
        console.error("Error loading categories:", error);
    }

}


const displayCategories = (categories) => {
    categories.forEach(category => {
        // console.log(category)
        categoryContainer.innerHTML += `
        <div id="${category.category}"
                    class="category-btn flex items-center justify-center gap-5 hover:bg-[#0e798123] border-[#0e79811e] border-2 p-6 w-[280px] md:w-[350px] rounded-lg">
                    <img src="${category.category_icon}" alt="">
                    <p class="text-2xl font-bold">${category.category}s</p>
                </div>
        `
    });

    categoryContainer.addEventListener('click',(e)=>{
        const categoryBtn = document.querySelectorAll('.category-btn')
        categoryBtn.forEach(btn =>{
            btn.classList.remove('bg-[#0e798123]')
        })

        if(e.target.className.includes('category-btn')){
         e.target.classList.add('bg-[#0e798123]')   
        }

        loadPetsByCategories(e.target.id)
    })
}

const loadAllPets = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
        const data = await res.json();
        displayAllPets(data.pets)
    }
    catch (error) {
        console.error("Error loading pets:", error);
    }
}

const displayAllPets = (pets) => {
    // console.log(pets)
    pets.forEach(pet => {
        petsContainer.innerHTML += `
         <div class=" p-5 border-1 border-gray-200 rounded-lg space-y-2 mb-5">
                        <img class="rounded-lg w-full" src="${pet.image}" alt="">
                        <h3 class="text-lg font-bold">hello</h3>
                        <p class="text-gray-600">Breed: ${pet.breed}</p>
                        <p class="text-gray-600">Birth: ${pet.date_of_birth}</p>
                        <p class="text-gray-600">Gender: ${pet.gender}</p>
                        <p class="text-gray-600">Price : ${pet.price}$</p>
                        <div class="flex justify-between pt-5 border-t-2 border-gray-300">
                            <button class="btn px-6 text-[#0E7A81]">👍</button>
                            <button class="btn px-6 text-[#0E7A81]">Adopt</button>
                            <button class="btn px-6 text-[#0E7A81]">Details</button>
                        </div>
                    </div>

    `
    })

}

const loadPetsByCategories = async (categoryName) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
        const data = await res.json()
        displayPetsByCategories(data.data)
    }
    catch (error) {
        console.log('error', error)
    }
}

const displayPetsByCategories= (pets)=>{
    petsContainer.innerHTML='';
     pets.forEach(pet => {
        petsContainer.innerHTML += `
         <div class=" p-5 border-1 border-gray-200 rounded-lg space-y-2 mb-5">
                        <img class="rounded-lg w-full" src="${pet.image}" alt="">
                        <h3 class="text-lg font-bold">hello</h3>
                        <p class="text-gray-600">Breed: ${pet.breed}</p>
                        <p class="text-gray-600">Birth: ${pet.date_of_birth}</p>
                        <p class="text-gray-600">Gender: ${pet.gender}</p>
                        <p class="text-gray-600">Price : ${pet.price}$</p>
                        <div class="flex justify-between pt-5 border-t-2 border-gray-300">
                            <button class="btn px-6 text-[#0E7A81]">👍</button>
                            <button class="btn px-6 text-[#0E7A81]">Adopt</button>
                            <button class="btn px-6 text-[#0E7A81]">Details</button>
                        </div>
                    </div>

    `
    })
}





loadCategories()
loadAllPets()