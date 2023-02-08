import { Request, Response, Router } from "express";
import path from "path";

const router = Router();

router.get("^/$|/index(.html)?", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "public", "views", "index.html")
  );
});

export default router;
