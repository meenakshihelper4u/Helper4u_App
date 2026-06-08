const {
  db,
} = require("../../models/db.model");

async function LoginCheck(req, res, next) {
   try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const user = await db("personal_details")
      .select(
        "personal_id",
        "mobile_no",
        "action_performed",
        "fullname"
      )
      .where("mobile_no", phone)
      .first();

    // Number not found
    if (!user) {
      return res.status(200).json({
        success: false,
        allowLogin: false,
        popup: true,
        message:
          "Please message on 0000000000 number",
      });
    }

    const allowedStatuses = ["Registered", "Hired"];

    if (allowedStatuses.includes(user.action_performed)) {
      return res.status(200).json({
        success: true,
        allowLogin: true,
        user: {
          id: user.personal_id,
          name: user.fullname,
          phone: user.mobile_no,
        },
      });
    }

    return res.status(200).json({
      success: false,
      allowLogin: false,
      popup: true,
      status: user.action_performed,
      message:
        "Please message on 0000000000 number",
    });
  } catch (error) {
    console.error("Seeker Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

module.exports = {
  LoginCheck,
};