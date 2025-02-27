const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
    
        await user.save();

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.json({token, user});

    } catch (err) {
        res.status(500).json({error: err.message});
    }    
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      res.json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };