import { Router } from "express";
import { makeShortUrlController } from "./factories/short-url.factory";

const router = Router()

const shortnerController = makeShortUrlController()

router.use('/api', shortnerController.router)

export default router;