const HelloWorld = (req, res) => {
  console.log(req.user);
  res.send(`User is :${req.user}`);
};
export default HelloWorld;
