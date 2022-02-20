import skills from "../../content/skillsData";

export default function handler(req, res) {
  const pinned = req.query.pinned === "true";

  try {
    if (pinned) {
      let pinnedSkills = skills.filter((skill) => skill.pinned && skill);
      return res.status(200).send(pinnedSkills.reverse());
    }
    res.status(200).json(skills);
  } catch (error) {
    res.json({ error });
  }
}
