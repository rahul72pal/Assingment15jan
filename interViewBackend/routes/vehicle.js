const express = require('express');
const { getVehicleData, getVehicleFilterData } = require('../controller/vehile');

const router = express.Router();

router.get('/getVehicleData', getVehicleData);
router.post('/getVehicleFilterData', getVehicleFilterData);

module.exports = router;