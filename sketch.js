let capture;
let whiteBtn;
let yellowBtn;

function setup() {
  console.log("早上好中国 现在我有冰淇淋 🥶🍦 我很喜欢冰淇淋 🥶🍦");
  console.log("Window Width: " + windowWidth);
  
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  capture = createCapture(VIDEO);
  capture.hide();
  sideColors = color(150);
  sideColors.setAlpha(50);
  fill(sideColors);
  rect(windowWidth - 250, 0, 250, windowHeight);
  rect(0, 0, 250, windowHeight);
  
  line(windowWidth - 250, 325, windowWidth, 325);
  line(windowWidth - 250, 500, windowWidth, 500);
  line(windowWidth - 250, 675, windowWidth, 675);

  whiteBtn = createButton("White");
  whiteBtn.size(125,50);
  whiteBtn.position(0, 800);
  yellowBtn = createButton("Yellow");
  yellowBtn.size(125,50);
  yellowBtn.position(125, 800);
  
  //weatherCall();
  //newsCall();
  calendarCall();
  mirrorTime();
}

function draw() {
  fill(255);
  textSize(40);
  textAlign(CENTER);
  fill(50);
  rect(windowWidth - 250, windowHeight - 125, 250, windowHeight);
  fill(255);
  image(capture, 250, 0, windowWidth - 500, windowHeight);
  text(currentTime(), windowWidth - 125, windowHeight - 75);
  text(currentDate(), windowWidth - 125, windowHeight - 25);
  text("Lubbock, TX", windowWidth - 125, windowHeight - 200);
  text("Today's News:", windowWidth - 250, 30, 250, 250);
  text("Class Schedule:", windowWidth - 250, 700, 250, 250);
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

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`;
      console.log("Weather API URL: " + url);
      fetch(url)
        .then((Response) => {
          return Response.json();
        })
        .then((data) => {
          text(String(data.current_weather.temperature) + "°F", windowWidth - 125, windowHeight - 150);
        })
    });
  }
}

function newsCall() {
  const newsURL = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${keys.NEWS_API_TOKEN}`
  console.log("News API: " + newsURL);
  fetch(newsURL)
    .then((Response) => {
      //console.log(Response.json());
      return Response.json();
    })
    .then((data) => {
      textSize(24);
      text(data.articles[0].title, windowWidth - 250, 150, 250, 150);
      text(data.articles[1].title, windowWidth - 250, 335, 250, 150);
      text(data.articles[2].title, windowWidth - 250, 510, 250, 150);
    })
}

function calendarCall() {
  const d = new Date();
  var weekDay = d.getDay();

  fetch('./classes.json')
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      textSize(24);
      console.log(data.WeekSchedule[weekDay].Classes);
      text(data.WeekSchedule[weekDay].Classes, windowWidth - 250, 850, 250, 125);
    })
}

function mirrorTime() {
  let yest = day() - 1;
  let twodays = day() - 2;
  let threedays = day() - 3;

  fetch('./mirrortime.json')
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      textSize(30);
      text("Mirror Time Yesterday:", 0, 30, 250, 100);
      text(`Mirror Time ${month()}/${twodays}:`, 0, 200, 250, 100);
      text(`Mirror Time ${month()}/${threedays}:`, 0, 350, 250, 100);
      text("Average Mirror Time:", 0, 500, 250, 100);
      
      textSize(26);
      text(data.MirrorTime[yest].Time_Spent + " minutes", 0, 125, 200, 150);
      text(data.MirrorTime[twodays].Time_Spent + " minutes", 0, 275, 200, 150);
      text(data.MirrorTime[threedays].Time_Spent + " minutes", 0, 425, 200, 150);
      text(((data.MirrorTime[yest].Time_Spent + data.MirrorTime[twodays].Time_Spent + data.MirrorTime[threedays].Time_Spent) / 3).toFixed(2) + " minutes", 0, 600, 250, 150);
      
      fill(color(0,100,200));
      arc(200, 135, 40, 40, (3*PI/2), (data.MirrorTime[yest].Time_Spent / 60) * TAU, PIE);
      arc(200, 285, 40, 40, (3*PI/2), (data.MirrorTime[twodays].Time_Spent / 60) * TAU, PIE);
      arc(200, 435, 40, 40, (3*PI/2), (data.MirrorTime[threedays].Time_Spent / 60) * TAU, PIE);
    }) 
}

