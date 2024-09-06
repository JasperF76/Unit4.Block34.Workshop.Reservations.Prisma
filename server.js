const express = require("express");
const app = express();
const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/customers", async (req, res, next) => {
    try {
        const customers = await prisma.customer.findMany();
        res.json(customers);
    } catch (error) {
        next(err);
    }
});

app.get("/api/restaurants", async (req, res, next) => {
    try {
        const restaurants = await prisma.restaurant.findMany();
        res.json(restaurants);
    } catch (error) {
        next(error);
    }
});

app.get("/api/reservations", async (req, res, next) => {
    try {
        const reservations = await prisma.reservation.findMany();
        res.json(reservations);
    } catch (error) {
        next(error);
    }
});

app.post("/api/customers/:id/reservations", async (req, res, next) => {
    try {
        const customerId = +req.params.id;
        const { restaurantId, dinnerDate, partyCount } = req.body;
        const reservation = await prisma.reservation.create({
            data: {
                customerId,
                restaurantId,
                dinnerDate,
                partyCount,
            },

        });
        // res.sendStatus(201);
        res.json(reservation);
    } catch (error) {
        next(error);
    }
});

app.delete("/api/customers/:customerId/reservations/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const reservationExists = await prisma.reservation.findFirst({
            where: {id},
        });

        if (!reservationExists) {
            return next({
                status: 404,
                message: `Sorry, we couldn't find a reservation with id # ${id}.`,
            });
        }
        await prisma.reservation.delete({where: {id} });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({ error: error });
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });