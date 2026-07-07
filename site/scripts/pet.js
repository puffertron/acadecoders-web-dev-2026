
let pet;
function createPet() {
    pet = document.createElement("img")
    pet.src = "images/idlePet.png"
    pet.alt = "pet"
    pet.width=70;
    pet.height=70;
    pet.style.position = "fixed"
    pet.style.bottom = 0;
    //pet.style.transition = "left 5s ease"
    pet.style.transition = "left 0.1s ease, transform 0.4s ease"
    pet.style.left = "50%"
    pet.style.borderRadius = "10px"

    document.body.appendChild(pet)
}
createPet();

let x = 0;
document.addEventListener('mousemove', (event) => {
    const x = event.clientX-35;
    pet.style.left = `${x}px`
});
pet.addEventListener("mouseenter", () => {
    pet.style.cursor = "pointer"
})

pet.addEventListener("click", () => {
    pet.src = "images/petpet.png";
    pet.style.transform = `scale(1.1)`
    setTimeout(() => {
        pet.src = "images/idlePet.png"
        pet.style.transform = `scale(1)`
    }, (2000));
})


