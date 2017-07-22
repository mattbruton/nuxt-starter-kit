import { Router } from 'express'

var router = Router()

router.get("/401", function(req, res) {
	res.status(401).json({code: 401, message: "Unauthorized"});
});

export default router