'use strict';

import logger from "../utils/logger.js";
import employee from "../models/employee.js";

const about = {
createView(request, response) {
logger.info("About page loading!");

const employees = employee.getAppInfo();

const viewData = {
title: "About the Playlist App",
employees: employees
};

logger.info(viewData.employees);
response.render("about", viewData);
},
};

export default about;