function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  weatherCall();
}


function draw() {
  fill(255);
  textSize(40);
  textAlign(CENTER);
  fill(150);
  rect(windowWidth - 240, windowHeight - 125, 250, 125);
  fill(255);
  text(currentTime(), windowWidth - 125, windowHeight - 75);
  text(currentDate(), windowWidth - 125, windowHeight - 25);
}

function currentTime() {
  var hr = hour();
  var min = ((minute() < 10) ? "0" + minute() : minute());
  var sec = ((second() < 10) ? "0" + second() : second());
  if (hr < 12) {
    return String(hr % 12 + ":" + min + ":" + sec + " AM");
  } else {
    return String(hr % 12 + ":" + min + ":" + sec + " PM");
  }
}

function currentDate() {
  var mm = month();
  var dd = day();
  var y = year();
  return String(mm + "/" + dd + "/" + y);
}

function weatherCall() {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;
      console.log("Longitude: " + long);
      console.log("Latitude: " + lat);
      const curHr = String(hour());

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`;
      console.log("API URL: " + url);
      fetch(url)
        .then((Response) => {
          //console.log(Response.json());
          return Response.json();
        })
        .then((data) => {
          //console.log(data);
          //console.log(data.hourly.temperature_2m[curHr]);
          text("Lubbock, TX", (windowWidth/2), (windowHeight/2) - 75);
          text(String(data.hourly.temperature_2m[curHr]) + " °F", windowWidth / 2, windowHeight / 2);
        })
    });
  }
}
