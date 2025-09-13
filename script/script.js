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

const loadAllPets = async () => {
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
        const data = await res.json();
        displayAllPets(data.pets)
    }
    catch(error){
        console.error("Error loading pets:", error);
    }
}

const displayAllPets = (pets) =>{
    console.log(pets)
    pets.forEach(pet =>{
        petsContainer.innerHTML+= `
         <div class=" p-5 border-1 border-gray-200 rounded-lg space-y-2">
                        <img class="rounded-lg w-full" src="${pet.image}" alt="">
                        <h3 class="text-lg font-bold">${pet.pet_name}</h3>
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

const displayCategories = (categories) => {
    categories.forEach(category => {
        categoryContainer.innerHTML += `
        <div
                    class="flex items-center justify-center gap-5 hover:bg-[#0e798123] border-[#0e79811e] border-2 p-6 w-[280px] md:w-[350px] rounded-lg">
                    <img src="${category.category_icon}" alt="">
                    <p class="text-2xl font-bold">${category.category}s</p>
                </div>
        `
    });
}

loadCategories()
loadAllPets()