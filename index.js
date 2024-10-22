import express from "express";
import cors from "cors";
import EventListRouter from "./src/controllers/event-list-controller.js";
import AuthRouter from "./src/controllers/auth-controller.js";
import ProvinceRouter from "./src/controllers/province-controller.js";
import EventRouter from "./src/controllers/event-controller.js"
import LocationRouter from "./src/controllers/location-controller.js";
import CategoryRouter from "./src/controllers/category-controller.js";
import EventLocationRouter from "./src/controllers/event-location-controller.js";
import EventEnrollmentRouter from "./src/controllers/event-enrollment-controller.js";
import morgan from "morgan";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/event', EventListRouter);
app.use('/api/user', AuthRouter)
app.use('/api/event', EventRouter);
app.use('/api/provinces', ProvinceRouter);
app.use('/api/location', LocationRouter);  
app.use('/api/event-category', CategoryRouter);
app.use('/api/event-location', EventLocationRouter);
app.use('/api/event', EventEnrollmentRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})