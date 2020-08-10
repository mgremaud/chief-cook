export default (): object => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  auth: {
    clientID    : process.env.CLIENT_ID,     // <- Replace this with your client id
    clientSecret: process.env.CLIENT_SECRET, // <- Replace this with your client secret
    callbackURL : process.env.CALLBACK_URL,
  }
});