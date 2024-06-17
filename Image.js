const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-button");
const accessKey = "tzreZuoNYcBhQrMu9nUJ_lUUE1bFQsAYlsWMkX0awOA";

let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page==1) {
            searchResult.innerHTML=" ";
        }


        console.log("API Response:", data); // Log the API response for inspection

        if (data.results && data.results.length > 0) {
            data.results.forEach((result) => {
                const image = document.createElement("img");
                if (result.cover_photo && result.cover_photo.urls && result.cover_photo.urls.regular) {
                    image.src = result.cover_photo.urls.regular;
                    console.log("Image URL:", result.cover_photo.urls.regular); // Log image URL
                    // Set width and height attributes to resize the image
                    image.width = 300; // Set the desired width (e.g., 300 pixels)
                    image.height = 200; // Set the desired height (e.g., 200 pixels)
                    const imageLink = document.createElement("a");
                    imageLink.href = result.links.html;
                    imageLink.target = "_blank";
                    imageLink.appendChild(image);
                    searchResult.appendChild(imageLink);
                } else {
                    console.warn("Regular URL not found in result:", result);
                }
            });
        } else {
            console.error("No results found for the given query.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    showMoreBtn.style.display = "block";

}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchResult.innerHTML = ""; // Clear previous search results
    searchImage();
});

showMoreBtn.addEventListener("click",()=>{
    page++;
    searchImage();

})
