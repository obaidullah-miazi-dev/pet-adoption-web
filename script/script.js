const categoryContainer = document.getElementById('category-container')

const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
        const data = await res.json();
        displayCategories(data.categories)
    }
    catch(error){
        console.error("Error loading categories:", error);
    }
    
}

const displayCategories= (categories) => {
    categories.forEach(category => {
        categoryContainer.innerHTML+=`
        <div
                    class="flex items-center justify-center gap-3 border-[#0e79811e] border-2 p-6 w-[280px] rounded-lg">
                    <img src="${category.category_icon}" alt="">
                    <p class="text-2xl font-bold">${category.category}s</p>
                </div>
        `
    });
}

loadCategories()