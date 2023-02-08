import { Router } from "express";
import { userC } from "../controllers/controllers";

const router: Router = Router();

router.route("/").get(userC.getAllUser).post(userC.createUser);
router
  .route("/:userId")
  .get(userC.getUserById)
  .patch(userC.updateUser)
  .delete(userC.deleteUser);

export default router;
