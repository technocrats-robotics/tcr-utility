# Technocrats-Utility
This application serves as a Microservice for Official website of Team Technocrats Robotics
- Official Website: https://technocratsrobotics.in/
- Microservice: https://quiet-caverns-98688.herokuapp.com/

## Pre-requisites
- Node.js

## Dependencies
- express.js
- cors
- body-parser
- nodemailer
- axios

## Endpoints
| Method | Endpoint | Description |
| ----------- | ----------- | ----------- |
| POST | /sendMail | Send credentials to the users created on website. |
| POST | /sendFeedback | Send feedback given by users on the TCR's official email id. |
| GET | /gallery | Fetch images from the GOOGLE PHOTOS ALBUM |

## Constants
- Create a new file ```constans.js``` in root directory.
- Create a similar file with valid credentials
```js
// email credentials
const SERVICE = 'gmail'
const EMAIL = 'example@email.com'
const PASSWORD = 'yourpassword'

// for feedback
const EMAILTO = 'example2@email.com'

// google photos
const ALBUMID = 'your_googlephotos_albumid'

// token
const TOKEN = 'valid_user_token'

module.exports = { SERVICE, EMAIL, PASSWORD, EMAILTO, ALBUMID, TOKEN }
```
