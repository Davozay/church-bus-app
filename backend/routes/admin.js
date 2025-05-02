const express = require("express");
const router = express.Router(); // This line was missing
const Attendee = require("../models/Attendee");
const auth = require("../middleware/auth");











// Get dashboard stats
router.get("/dashboard", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Get the 5 most recent attendees
    const recentAttendees = await Attendee.find({
      churchBranch: req.user.churchBranch,
    })
      .sort({ scannedAt: -1 })
      .limit(5);

    // Get total counts
    const totalRecords = await Attendee.countDocuments({
      churchBranch: req.user.churchBranch,
    });

    const totalAttendees = await Attendee.aggregate([
      {
        $match: { churchBranch: req.user.churchBranch },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $cond: [{ $eq: ["$status", "single"] }, 1, "$familyCount"],
            },
          },
        },
      },
    ]);

    res.json({
      totalRecords,
      totalAttendees: totalAttendees[0]?.total || 0,
      recentAttendees,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// Get all registrations
router.get("/registrations", auth, async (req, res) => {
  try {
    const registrations = await Attendee.find({
      churchBranch: req.user.churchBranch,
    }).sort({ scannedAt: -1 });

    res.json(registrations);
  } catch (err) {
    console.error("Registrations error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

module.exports = router;
