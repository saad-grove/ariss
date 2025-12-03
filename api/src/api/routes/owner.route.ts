import { Router } from "express";
import * as businessOwnerControllers from "../controllers/business.owner.controller";

const businessOwnerRouter = Router();

businessOwnerRouter.post(
  "/register",
  businessOwnerControllers.registerOwnerController
);

businessOwnerRouter.get(
  "/all-approved",
  businessOwnerControllers.fetchAllApprovedController
);
businessOwnerRouter.get(
  "/all-nonapproved",
  businessOwnerControllers.fetchAllNonApprovedController
);

businessOwnerRouter.put(
  "/change-address/:email",
  businessOwnerControllers.updateOwnerAddressController
);

businessOwnerRouter.patch(
  "/approve/:email",
  businessOwnerControllers.approveOwnerController
);
businessOwnerRouter.patch(
  "/disapprove/:email",
  businessOwnerControllers.disapproveOwnerController
);

export default businessOwnerRouter;
