const pets = [
  { name: "Buddy", type: "Dog", age: 3, img: "img/dogs/dog01.jpg" },
  { name: "Buddy", type: "Dog", age: 3, img: "img/dogs/dog02.jpg" },
  { name: "Charlie", type: "Dog", age: 4, img: "img/dogs/dog03.jpg" },
  { name: "Whiskers", type: "Cat", age: 2, img: "img/cats/cat01.jpg" },
  { name: "Mittens", type: "Cat", age: 2, img: "img/cats/cat02.jpg" },
  { name: "Shadow", type: "Cat", age: 5, img: "img/cats/cat03.jpg" },
  { name: "Coco", type: "Capybara", age: 1, img: "img/capybaras/capybara01.jpg" },
  { name: "Nibbles", type: "Capybara", age: 2, img: "img/capybaras/capybara02.jpg" },
  { name: "Bubbles", type: "Bird", age: 3, img: "img/birds/bird01.jpg" },
  { name: "Tweety", type: "Bird", age: 1, img: "img/birds/bird02.jpg" },
];

function loadPets() {
  console.log("Loading pets...");
  const petList = $("#pet-list");
  pets.forEach((pet) => {
    const petItem = $("<div>").addClass("pet").html(`
      <img src="${pet.img}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age} years</p>
      <button class="adopt-btn">Adopt Now</button>
    `);
    petList.append(petItem);
  });

  // Attach click handler using event delegation
  petList.on("click", ".adopt-btn", adoptPet);

  // install event handler for pet type
  $('input[name="pet-type"]').on("change", function () {
    const selectedType = $(this).val();
    filterPets();

  });
}

function filterPets() {

  console.log("Selected pet type:", $('input[name="pet-type"]:checked'));
  const types = $('input[name="pet-type"]:checked')
    .map(function () {
      return $(this).val();
    })
    .get();

  console.log(types);

  const filteredPets = pets.filter((pet) => types.includes(pet.type));
  console.log(filteredPets);

  const petList = $("#pet-list");
  petList.empty(); // Clear the existing pets
  filteredPets.forEach((pet) => {
    const petItem = $("<div>").addClass("pet").html(`
      <img src="${pet.img}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age} years</p>
      <button class="adopt-btn">Adopt Now</button>
    `);
    petList.append(petItem);
  });
}

$(document).ready(loadPets);