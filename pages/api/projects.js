import projects from "../../content/projectData";

export default function handler(req, res) {
  const pinned = req.query.pinned === "true";

  try {
    if (pinned) {
      let pinnedProjects = projects.filter(
        (project) => project.pinned && project
      );
      return res.status(200).send(pinnedProjects.reverse());
    }
    res.status(200).json(projects.reverse());
  } catch (error) {
    res.json({ error });
  }
}
