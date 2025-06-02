const { sendErrorResponse } = require("../../helpers/send_error_response");
const jwtService = require("../../service/jwt.service");

module.exports = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const hasRole = req.user.roles.some((role) =>
        requiredRoles.includes(role.name)
      );
      if (!hasRole) {
        return sendErrorResponse(
          { message: "Sizga ruxsat berilmagan" },
          res,
          403
        );
      }
      next();
    } catch (error) {
      sendErrorResponse(error, res, 403);
    }
  };
};
