const categoryContainer = document.getElementById('category-container')
const petsContainer = document.getElementById('pets-container')
const likedPetsContainer = document.getElementById('liked-pets-container')
const modal = document.getElementById('modal')
const modalContainer = document.getElementById('modal-container')

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

    categoryContainer.addEventListener('click', (e) => {
        const categoryBtn = document.querySelectorAll('.category-btn')
        categoryBtn.forEach(btn => {
            btn.classList.remove('bg-[#0e798123]')
        })

        if (e.target.className.includes('category-btn')) {
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
         <div id="${pet.petId}" class=" p-5 border-1 border-gray-200 rounded-lg space-y-2 mb-5">
                        <img class="rounded-lg w-full" src="${pet.image}" alt="">
                        <h3 class="text-lg font-bold">${pet.pet_name}</h3>
                        <p class="text-gray-600">Breed: ${pet.breed}</p>
                        <p class="text-gray-600">Birth: ${pet.date_of_birth}</p>
                        <p class="text-gray-600">Gender: ${pet.gender}</p>
                        <p class="text-gray-600">Price : ${pet.price}$</p>
                        <div class="flex justify-between pt-5 border-t-2 border-gray-300">
                            <button class="like-btn btn px-6 text-[#0E7A81]">👍</button>
                            <button class="btn px-6 text-[#0E7A81]">Adopt</button>
                            <button class="details-btn btn px-6 text-[#0E7A81]">Details</button>
                        </div>
                    </div>

    `
        // loadPetsDetailsById(pet.petId)
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

const displayPetsByCategories = (pets) => {
    if (pets.length === 0) {
        noDataFound()
        return;
    }
    petsContainer.innerHTML = ` <div class="col-span-3">
                        <h3 class="text-2xl font-bold">Best Deal For you</h3>
                    </div>`;
    pets.forEach(pet => {
        // console.log(pet.petId)
        petsContainer.innerHTML += `
         <div id="${pet.petId}" class=" p-5 border-1 border-gray-200 rounded-lg space-y-2 mb-5">
                        <img class="rounded-lg w-full" src="${pet.image}" alt="">
                        <h3 class="text-lg font-bold">${pet.pet_name}</h3>
                        <p class="text-gray-600">Breed: ${pet.breed}</p>
                        <p class="text-gray-600">Birth: ${pet.date_of_birth}</p>
                        <p class="text-gray-600">Gender: ${pet.gender}</p>
                        <p class="text-gray-600">Price : ${pet.price}$</p>
                        <div class="flex justify-between pt-5 border-t-2 border-gray-300">
                            <button class="like-btn btn px-6 text-[#0E7A81]">👍</button>
                            <button class="btn px-6 text-[#0E7A81]">Adopt</button>
                            <button class="details-btn btn px-6 text-[#0E7A81]">Details</button>
                        </div>
                    </div>

    `
    })
}

petsContainer.addEventListener('click', (e) => {
    const img = e.target.parentNode.parentNode.children[0].src
    if (e.target.className.includes('like-btn')) {
        likedPetsContainer.innerHTML += `
        
        <div class="mb-4 md:mb-0"><img class="rounded-lg" src="${img}" alt=""></div>
        
        `
    }
})

petsContainer.addEventListener('click', (e) => {
    // console.log(e.target.parentNode.parentNode.id)
    if (e.target.className.includes('details-btn')) {
        loadPetsDetailsById(e.target.parentNode.parentNode.id)

    }


})

const loadPetsDetailsById = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data = await res.json()
    // displayPetsDetailsById(data.petData)
    displayPetsDetailsById(data.petData)
}


const displayPetsDetailsById = (pets) => {
    modal.showModal()
    modalContainer.innerHTML = '';
    modalContainer.innerHTML = `
    <div id="${pets.petId}" class="rounded-lg space-y-2">
                        <img class="rounded-lg w-full" src="${pets.image}" alt="">
                        <h3 class="text-xl font-bold">${pets.pet_name}</h3>
                        <p class="text-gray-600">Breed: ${pets.breed}</p>
                        <p class="text-gray-600">Birth: ${pets.date_of_birth}</p>
                        <p class="text-gray-600">Gender: ${pets.gender}</p>
                        <p class="text-gray-600">Price : ${pets.price}$</p>
                        <div class="pt-2 border-t-2 border-gray-200">
                        <h3 class="font-semibold text-lg mb-2">Details Information</h3>
                        <p class="text-gray-600">${pets.pet_details}</p>
                        </div>
                    </div>
    `


}



const noDataFound = () => {
    petsContainer.innerHTML = `
    <div class="col-span-3 mx-auto text-center py-10">
    <img class="block mx-auto" src="images/error.webp">
    <h1 class="text-4xl font-bold mt-5">No Information Available</h1>
    </div>
    `
}

loadCategories()
loadAllPets()