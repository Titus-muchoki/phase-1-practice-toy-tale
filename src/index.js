let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  //addtoy
  let add_toy = document.querySelector("#add-toy-form");
  add_toy.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.querySelector(".input-text")[0].value;
    let image = document.querySelector(".input-text")[1].value;

    if(name === "" || image === ""){
      alert("fill the field");
      return;
    }
    post(name, image);
  })

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//let id
function addToy(){
  fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  .then((data) => console.log(data))
  for(let i = 0; i < data.length; i++){
    const toyCollection = document.getElementById("#new-toy-btn")
    const card = document.createElement("div");
    card.className = "card";

    const h2 = document.createElement("h2");
    h2.innerText = data[i].name;

     const img= document.createElement("img")
     img.className = "toy-avatar";
     img.src = data[i].img;

     const p = document.createElement("p");
     p.innerText = data[i].likes + "likes";

     const buttonLike = document.createElement("button");
     buttonLike.classList = "like-btn";
     buttonLike.id = "btnLike";
     buttonLike.innerText = "like";

     card.appendChild(h2);
     card.appendChild(img);
        card.appendChild(p);
        card.appendChild(buttonLike);
        toy_collection.appendChild(card);

        buttonLike.addEventListener("click", (e) =>{
          e.preventDefault();
          let id = data[i].id;
          let likes = data[i].likes;
          let new_likes = likes + 1;
          p.innerText = new_likes + "likes";
          
          updateLikes(new_likes, id)
        })
  }
}
function updateLikes(new_like, id){
  fetch("http://localhost:3000/toys/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: id,
        likes: new_like,
      })
})
.then((res) => res.json())
.then(function (data) {});

  location.reload();
}

function post(name, image){
  fetch("http://localhost:3000/toys/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0,
    }),
  });
}
