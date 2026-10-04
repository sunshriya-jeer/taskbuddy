const supabase = require("../config/supabase");

/**
 * Express middleware to authenticate requests via Supabase JWT.
 * Expects header: Authorization: Bearer <access_token>
 * Attaches the authenticated Supabase user object to req.user.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing or invalid token format"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing or invalid token format"
      });
    }

    const {
      data: { user },
      error
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token"
      });
    }

    // Attach authenticated user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication"
    });
  }
};

module.exports = authMiddleware;
