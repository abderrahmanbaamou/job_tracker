const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters",
      });
    }
     
    const selectedRole =
            role === "professional"
                ? "professional"
                : "candidate";

    const user = await authService.registerUser(
      name,
      email,
      password,
      selectedRole
    );

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const result = await authService.loginUser(
            email,
            password
        );

        res.json(result);

    } catch (error) {
        console.error(error);

        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
  register,
  login,
};