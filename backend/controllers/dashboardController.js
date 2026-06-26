import pool from "../config/db.js";
import catchAsync from "../utils/catchAsync.js";

export const getDashboardData = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  //1.Get all active roadmaps with their progress
  const roadmapsResult = await pool.query(
    `SELECT r.id, r.skill_name, r.status, r.total_weeks,
            COALESCE(p.percentage, 0) as percentage
     FROM roadmaps r
     LEFT JOIN progress p ON p.roadmap_id = r.id AND p.user_id = r.user_id
     WHERE r.user_id = $1 AND r.status = 'active'
     ORDER BY r.created_at DESC
     LIMIT 3`,
    [userId],
  );
  //2. Get Overall stats
  const statsResult = await pool.query(
    `SELECT
       (SELECT COUNT(*) FROM topics t
        JOIN weeks w ON w.id = t.week_id
        JOIN roadmaps r ON r.id = w.roadmap_id
        WHERE r.user_id = $1 AND t.is_completed = true) as skills_completed,
       (SELECT COUNT(*) FROM roadmaps WHERE user_id = $1 AND status = 'completed') as roadmaps_finished,
       (SELECT streak FROM users WHERE id = $1) as streak`,
    [userId],
  );
  res.status(200).json({
    status: "success",
    data: {
      roadmaps: roadmapsResult.rows,
      stats: statsResult.rows[0],
    },
  });
});
