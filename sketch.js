function setup() {
  console.log("早上好中国 现在我有冰淇淋 🥶🍦 我很喜欢冰淇淋 🥶🍦");
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(150);
  rect(windowWidth - 250, 0, 250, windowHeight);
  weatherCall();
  newsCall();
}

function draw() {
  fill(255);
  textSize(40);
  textAlign(CENTER);
  fill(150);
  rect(windowWidth - 250, windowHeight - 125, 250, windowHeight);
  fill(255);
  text(currentTime(), windowWidth - 125, windowHeight - 75);
  text(currentDate(), windowWidth - 125, windowHeight - 25);
  text("Lubbock, TX", windowWidth - 125, windowHeight - 200);
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
      console.log("Weather API URL: " + url);
      fetch(url)
        .then((Response) => {
          return Response.json();
        })
        .then((data) => {
          text(String(data.hourly.temperature_2m[curHr]) + " °F", windowWidth - 125, windowHeight - 150);
        })
    });
  }
}

function newsCall() {
  const newsURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${keys.WEATHER_API_TOKEN}`
  console.log("News API: " + newsURL);
  fetch(newsURL)
    .then((Response) => {
      //console.log(Response.json());
      return Response.json();
    })
    .then((data) => {
      textSize(12);
      text(data.articles[0].title, windowWidth/2, windowHeight/2, 250, 250);
      text(data.articles[1].title, windowWidth/2, (windowHeight/2) + 50, 250, 250);
      text(data.articles[2].title, windowWidth/2, (windowHeight/2) + 100, 250, 250);
    })
}
