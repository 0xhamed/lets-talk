# Let's Talk - MultiParty Calls App

![let's-talk](https://user-images.githubusercontent.com/54107871/79381486-594d9280-7f62-11ea-8659-32bf506b993e.png)

## Technologies

I developed the app using these technologies

`WebRTC, React.js, Node.js, Socket.io, Redis, HTML/CSS`

If you encounter any unexpected behaviour, feel free to send an email to mohamed@hamedd.com

## Features

- P2P Secure - Fully Encrypted Connection
- UDP Based - Blazing Fast (latency < 500ms)
- No Plugins Needed
- MultiParty - More Than 2 Can Communicate At The Same Time
- Inputs Test
- Video/Audio Call
- Screen Sharing
- Text Chatting
- Selecting Video/Audio Input Device
- Swapping Video/Audio Input Device On The Fly
- Selecting Which Screen/Window Of The Browser To Share
- Toggling Any Feature ON/OFF

## Notes

- All requests within the app must be done through a secure protocol
- Swapping input devices feature isn't available on mobile due to accessibility problems
- For low spec devices going more than 3 per room isn't recommended as multiparty is implemented using mesh methodology
- Screen sharing feature isn't available on mobile and old browsers
- I don't recommend using the structure of this project in production

## Setup

First of all you need to have nodejs installed and a connection to a redis server and SSL certificate.

### Shared

- Copy your certificate & key to "./server/certificates"
- Go to "./server/config.js" and edit the values with yours
- Run `npm i` in the root of the project
- Go to "./client" and run `npm i` too

### Development Mode

- Run `npm run client`. if you face an error, [visit this page](https://create-react-app.dev/docs/using-https-in-development/) and update the command in "package-lock.json" with your OS relevant one
- Run `npm start`
- Visit https://localhost:3000

if you changed the port in "./server/config.js" you need to change the proxy link in "./client/package-lock.json" under "proxy" accordingly.

### Production Mode

- Run `npm run build`
- Run `npm start`
- Visit https://localhost:3001

## License

MIT
