//Pokemon API
fetchData();
async function fetchData() {
  try {
    const pokeName = document.getElementById("pokeName").value.toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

    if (!res.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await res.json();
    const pokeImg = data.sprites.front_default;
    const imgElement = document.getElementById("pokeImg");
    const typesElement = document.getElementById("pokeTypes");

    imgElement.src = pokeImg;
    imgElement.style.display = "block";

    const types = data.types.map((typeInfo) => typeInfo.type.name);
    typesElement.innerHTML = "";

    if (types.length > 0) {
      const typesTitle = document.createElement("h3");
      typesTitle.textContent = "Types:";
      typesElement.appendChild(typesTitle);

      const typesList = document.createElement("ul");
      types.forEach((type) => {
        const typeItem = document.createElement("li");
        typeItem.textContent = type;
        typesList.appendChild(typeItem);
      });
      typesElement.appendChild(typesList);
    }
  } catch (error) {
    console.log(error);
  }
}

// Dog API

async function fetchData2() {
  try {
    const dogBreed = document
      .getElementById("dogBreed")
      .value.trim()
      .toLowerCase();

    if (!dogBreed) {
      throw new Error("Please enter a dog breed");
    }

    const breedSearchRes = await fetch(
      `https://api.thedogapi.com/v1/breeds/search?q=${dogBreed}`,
      {
        headers: {
          "X-Api-Key":
            "live_eyLGJisPayZa40bSrG87o2PPMxUeXi1x2AZ4rzOz1Fg3YIwUalZdKoqs8BchdHWP",
        },
      }
    );

    if (!breedSearchRes.ok) {
      throw new Error("Could not search for breed");
    }

    const breedData = await breedSearchRes.json();

    if (breedData.length === 0) {
      throw new Error("Breed not found");
    }

    const breedInfo = breedData[0];
    const breedId = breedData[0].id;

    const imgRes = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=1`,
      {
        headers: {
          "X-Api-Key":
            "live_eyLGJisPayZa40bSrG87o2PPMxUeXi1x2AZ4rzOz1Fg3YIwUalZdKoqs8BchdHWP",
        },
      }
    );

    if (!imgRes.ok) {
      throw new Error("Could not fetch dog image");
    }

    const imgData = await imgRes.json();

    if (imgData.length === 0) {
      throw new Error("No images found for this breed");
    }

    const dogImg = imgData[0].url;
    const imgElement = document.getElementById("dogImg");
    imgElement.src = dogImg;
    imgElement.style.display = "block";
    imgElement.style.maxWidth = "100%";
    imgElement.style.height = "auto";

    const originElement = document.getElementById("dogOrigin");
    originElement.innerHTML = "";

    const originTitle = document.createElement("h3");
    originTitle.textContent = "Breed Information:";
    originElement.appendChild(originTitle);

    const infoList = document.createElement("ul");

    if (breedInfo.origin) {
      const originItem = document.createElement("li");
      originItem.textContent = `Origin: ${breedInfo.origin}`;
      infoList.appendChild(originItem);
    } else if (breedInfo.country_code) {
      const originItem = document.createElement("li");
      originItem.textContent = `Country: ${breedInfo.country_code}`;
      infoList.appendChild(originItem);
    }
    if (infoList.children.length === 0) {
      const noInfoItem = document.createElement("li");
      noInfoItem.textContent =
        "No detailed information available for this breed";
      infoList.appendChild(noInfoItem);
    }

    originElement.appendChild(infoList);
  } catch (error) {
    console.error(error);
    const errorElement =
      document.getElementById("dogOrigin") || document.getElementById("dogImg");
    errorElement.textContent =
      error.message ||
      "Failed to fetch dog information. Please check the breed name and try again.";
    errorElement.style.display = "block";
  }
}

fetchData2();
