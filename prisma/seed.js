const prisma = require("../prisma");

const seed = async () => {
    const createCustomers = async () => {
        const customers = [
        {name: "Bromfield"},
        {name: "Harrington"},
        {name: "Vu"},
        {name: "Goff"},
        ];
        await prisma.customer.createMany({ data: customers });
    };
        
    const createRestaurants = async () => {
        const restaurants = [
            {name: "Waffle House"},
            {name: "IHOP"},
            {name: "Jojo's Chicken and Waffles"},
        ];
        await prisma.restaurant.createMany({ data: restaurants });
    };
    
    const createReservations = async () => {
        const reservations = [
            {customerId: 1, restaurantId: 1, partyCount: 5, dinnerDate: new Date("2024-10-01")},
            {customerId: 2, restaurantId: 2, partyCount: 4, dinnerDate: new Date("2024-10-02")},
            {customerId: 3, restaurantId: 3, partyCount: 6, dinnerDate: new Date("2024-10-03")},
        ];
        await prisma.reservation.createMany({ data: reservations });
    };
    
    await createCustomers();
    await createRestaurants();
    await createReservations();

};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });