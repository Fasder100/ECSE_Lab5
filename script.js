function createTankCard(tank) {
    var tankCardDiv = document.createElement("DIV");
    tankCardDiv.classList.add("tank-card");

    var tankImgDiv = document.createElement("DIV");
    tankImgDiv.classList.add("tank-img");

    var tankImgImg = document.createElement("IMG");
    tankImgImg.setAttribute("id", "tank-img");
    tankImgImg.src = "assets/del.png";

    tankImgDiv.appendChild(tankImgImg);
    tankCardDiv.appendChild(tankImgDiv);

    var tankInfoDiv = document.createElement("DIV");
    tankInfoDiv.classList.add("tank-info");

    // var tankEditDiv = document.createElement("DIV");
    // tankEditDiv.classList.add("tank-edit");
    // tankInfoDiv.appendChild(tankEditDiv);

    var tankInfoLocationDiv = document.createElement("DIV");
    tankInfoNameDiv.classList.add("tank-info-location");

    var tankLocationDiv = document.createElement("SPAN");
    tankLocationDiv.classList.add("tank-location");
    tankLocationDiv.innerHTML = tank.location;
    tankInfoLocationDiv.appendChild(tankLocationDiv);

    var tankLatitudeDiv = document.createElement("DIV");
    tankLatitudeDiv.classList.add("tank-latitude-div");
    
    var tankLatitude = document.createElement("SPAN");
    tankLatitude.classList.add("tank-latitude");
    tankLatitude.innerHTML = tank.lat;
    tankLatitudeDiv.appendChild(tankLatitude);

    var tankLongitudeDiv = document.createElement("DIV");
    tankLongitudeDiv.classList.add("tank-longitude-div");
    
    var tankLongitude = document.createElement("SPAN");
    tankLongitude.classList.add("tank-longitude");
    tankLongitude.innerHTML = tank.long;
    tankLongitudeDiv.appendChild(tankLongitude);


    var tankPFullDiv = document.createElement("DIV");
    tankPFullDiv.classList.add("tank-pfull-div");

    var tankPFull = document.createElement("SPAN");
    tankPFull.classList.add("tank-pfull");
    tankPFull.innerHTML = tank.percentage_full;
    tankPFullDiv.appendChild(tankLongitude);
    
    tankInfoDiv.appendChild(tankInfoLocationDiv);
    tankInfoDiv.appendChild(tankLatitudeDiv);
    tankInfoDiv.appendChild(tankLongitudeDiv);
    tankInfoDiv.appendChild(tankPFullDiv);

    tankCardDiv.append(tankInfoDiv);

    return dishCardDiv;
  }

  function getTanks() {
    return fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((json) => json);
  }

  document.getElementById("new-tank-submit").addEventListener("click", function(event){
    event.preventDefault();
    let tankLocation = document.getElementById("new-tank-location").value;
    let tankLat = document.getElementById("new-tank-lat").value;
    let tankLong = document.getElementById("new-tank-long").value;
    let tankpful = document.getElementById("new-tank-pfull").value;

    let postbody = {
        location: tankLocation,
        lat: tankLat,
        long: tankLong,
        percentage_full: tankpful,
    }

    fetch("http://localhost:3000/data", {
        method: "POST",
        body: JSON.stringify(postbody),
        headers: {
            "Content-type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((json) => console.log(json));
  });

  async function draw() {
    let tanks = await getTanks();
    console.log(tanks);
    tanks.forEach((tank) => {
      var container = document.querySelector(".container");
      container.appendChild(createTankCard(tank));
    });

    // document.querySelector(".dish-detail-del").addEventListener("click", function (event) {
    //   console.log(event.target);
    // });
  }

  var container = document.querySelector(".container");

  window.onload = function () {
    draw();
  };