const adminController = require("../controllers/adminController");
const paymentsController = require("../controllers/paymentsController");
const caseController = require("../controllers/caseController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/getAll", adminController.getAll);

router.get(
  "/userLawyers/:id",
  passport.authenticate("loggedIn", { session: false }),
  adminController.getUserLawyers
);

router.get(
  "/",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.get
);

router.get(
  "/getAdminCalendarAdmin/:id",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getById
);

router.get(
  "/events",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getEvents
);
router.post(
  "/events",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.addEvent
);
router.put(
  "/",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.update
);
router.put(
  "/client/:userID",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.updateClientById
);

router.get(
  "/files/:userID",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getClientFilesById
);

router.post("/", adminController.create); //add some sort of key admins need to create a new admin account so users cannot
router.delete(
  "/",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.delete
);

router.get(
  "/clients",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getAllClients
);

router.get(
  "/otherClients",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getAllOtherClients
);

router.get(
  "/:clientId",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.getClient
);

router.put(
  "/remove/:clientId",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.removeClient
);

router.post(
  "/client",
  passport.authenticate("adminLoggedIn", { session: false }),
  paymentsController.createCustomer,
  adminController.addClient
);

router.post(
  "/add/:clientId",
  passport.authenticate("adminLoggedIn", { session: false }),
  adminController.addExistingClient
);

router.get(
  "/case/:id",
  passport.authenticate("adminLoggedIn", { session: false }),
  caseController.get
);
//route for admin information to be loaded into user calendar
router.get(
  "/getAdminCalendarUser/:id",
  passport.authenticate("loggedIn", { session: false }),
  adminController.getById
);
module.exports = router;
