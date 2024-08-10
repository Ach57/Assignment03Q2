const express = require('express');       // Import the express module
const cookieParser = require('cookie-parser');  // Import the cookie-parser middleware

const app = express();   // Create an Express application
const port = process.env.PORT||3000;       // Define the port number for the server

app.use(cookieParser()); // Use the cookie-parser middleware to parse cookies

app.get('/', (req, res) => {
    console.log('Cookies: ', req.cookies);  // Log the cookies to see if they are being received

    // Retrieve the number of visits and the last visit time from cookies
    let visits = req.cookies ? req.cookies['numOfVisits'] : undefined;
    let lastVisit = req.cookies ? req.cookies['lastVisit'] : undefined;

    
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();

    if (visits) {
    
        visits = parseInt(visits) + 1;
        
        res.cookie('numOfVisits', visits, { maxAge:31536000000 }); 
        res.cookie('lastVisit', formattedDateTime, { maxAge: 31536000000 }); 
        
        res.send(`Hello, this is the ${visits} time that you are visiting my webpage. Last visit: ${lastVisit}`);
    } else {
        // If the visits cookie does not exist, set it to 1 (first visit)
        res.cookie('numOfVisits', 1, { maxAge: 31536000000 }); 
        res.cookie('lastVisit', formattedDateTime, { maxAge:31536000000});  // max age 1 year
        
        res.send('Welcome to my webpage! It is your first time that you are here.');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
