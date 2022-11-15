# P2.Colby.Killian
This project was created by Colby Killian for CS 3366 Human Computer Interaction at Texas Tech University. The purpose of this project is to create a Personal Mirror that displays certain information to the user as well as be a simple mirror.

# Links
[Working Mirror](https://killianbeast.github.io/P2.Colby.Killian/)

[Project Report Page](https://github.com/Killianbeast/P2.Colby.Killian/blob/master/README.md)

# Sketch and Design
![Picture of design sketch](https://cdn.discordapp.com/attachments/749867033516179476/1042180074633429052/20221115_145005.jpg)

For this project, I wanted to take a very simple and minimilistic desgin. For the mirror aspect, the actual mirror takes up most of the space. To the side are the elements that the user would see while using the mirror. 

**On the right side from top to bottom, we have:**
- A news feed that displays the headlines of three articles
- A class schedule that shows what classes the user has that day
- The location of the user and the current weather
- The current time

**The left side includes:**
- Yesterday's mirror time
- Mirror times for two and three days ago
- Average mirror time
- Buttons for a light source
- Light

I chose to include the elements on a dark gray background as I felt as though it looked the most aesthetically pleasing to the viewer. I thought about making it to where the information is displayed on the glass itself, but problems could arise with contrast and the glass being dirty and not displaying the information correctly. I also chose to contian the elements in a grid-like block style so they are easy to spot and read from top to bottom.

# Implentation of General and Health Information
Implementation for both the general and health information was very easy and straight forward. 

For the news feed, I wanted to pull current news articles from an API and display their information. I was able to [use a certain API](https://newsapi.org/) for this purpose, however I found that the API could not be called from a deployed page, only from the localhost. I decided to use a JSON file with pre-made articles instead, and they are pulled from the file and displayed to the user. 

For the Class Schedule, the same is done as with the News Feed. A JSON file is contained within the root directory and the sketch file pulls a class schedule and displays it to the user. The sketch determines what day of the week it is and displays the right schedule for that day.

For the weather, I used the free [Open-Meteo API](https://open-meteo.com/en). The mirror grabs the users coordinates (for this purpose the site grabs the users location) and calls the API with the coordinates. The sketch then grabs the current weather variable from the API and displays it.

For the clock, the sketch grabs the current day, month, year, as well as the current hour, minute, and second based on the user's computer clock and displays it.

Finally, there are two buttons on the left side that activate a small light that the user can use to illuminate either white or yellow. This simply creates a square with the desired color at the bottom left. 

For the Mirror Time, the same thing as before is true. There is a JSON file with days of the entire month and how much mirror time was used. The sketch grabs the current day, displays yesterday's, two days, and three days ago, and then averages them out over a three day interval. Pie charts are shown next to the times to show how much out of an hour per day the user used the mirror.
