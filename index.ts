import express from "express";
import cors from "cors";
import { housesData, resdientsData } from "./data";

let houses = housesData;
let residents = resdientsData;
const app = express();
app.use(cors());
app.use(express.json());

const port = 5666;

app.get("/", (req, res) => {
  res.send(`
    <h1>Home & Residents API </h1>
    <ul>
    <li> <a href='/houses'> Houses  </a> </li>
    <li> <a href='/residents'> Residents </a> </li>
    </ul>`);
});

app.get("/houses", (req, res) => {
  let housesToSend = houses.map((house) => {
    let resident = residents.find(
      (resident) => resident.id === house.residentId
    );
    return { ...house, resident };
  });

  res.send(housesToSend);
});

app.post("/houses", (req, res) => {
  let errors: string[] = [];

  if (typeof req.body.address !== "string") {
    errors.push("It's not a string!!!");
  }

  if (typeof req.body.type !== "string") {
    errors.push(" Type It's not a string!!!");
  }

  if (typeof req.body.residentId !== "number") {
    errors.push("OOOppss tha't not a number !!!");
  }
  let resident = residents.find(
    (resident) => resident.id === req.body.residentId
  );

  if (!resident) {
    errors.push("You don't own a House!");
  }
  if (errors.length === 0) {
    const newHouse = {
      id: houses.length === 0 ? 1 : houses[houses.length - 1].id + 1,
      address: req.body.address,
      type: req.body.type,
      residentId: req.body.residentId,
    };

    houses.push(newHouse);
    res.send(newHouse);
  } else {
    res.status(400).send({ errors });
  }
});

app.delete("/houses/:id", (req, res) => {
  const id = Number(req.params.id);
  const indexToDelete = houses.findIndex((house) => house.id === id);

  if (indexToDelete > -1) {
    houses = houses.filter((house) => house.id !== id);

    res.send({ message: "House Deleted!" });
  } else {
    res.status(404).send({ error: "House not found!" });
  }
});
app.patch("/houses/:id", (req, res) => {
  let id = Number(req.params.id);
  let match = houses.find((house) => house.id === id);

  if (match) {
    if (req.body.type) {
      match.type = req.body.type;
    }

    if (req.body.address) {
      match.address = req.body.address;
    }

    if (req.body.residentId) {
      match.residentId = req.body.residentId;
    }
    res.send(match);
  } else {
    res.status(404).send({ error: "House Not Found!" });
  }
});

app.get("/residents", (req, res) => {
  let residentsToSend = residents.map((resident) => {
    const foundHouses = houses.filter(
      (house) => house.residentId === resident.id
    );
    return { ...resident, houses: foundHouses };
  });

  res.send(residentsToSend);
});

app.post("/residents", (req, res) => {
  let errors: string[] = [];

  if (typeof req.body.name !== "string") {
    errors.push("Name it's not a string!");
  }
  if (typeof req.body.age !== "number") {
    errors.push("Age it's not a number!");
  }
  if (typeof req.body.gender !== "string") {
    errors.push("Gender it's not a string!");
  }
  if (errors.length === 0) {
    const newResident = {
      id: residents.length === 0 ? 1 : residents[residents.length - 1].id + 1,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
    };
    residents.push(newResident);
    res.send(newResident);
  } else {
    res.status(400).send({ errors });
  }
});

app.delete("/residents/:id", (req, res) => {
  const id = Number(req.params.id);
  const indexTodelete = residents.findIndex((resident) => resident.id === id);

  if (indexTodelete > -1) {
    residents = residents.filter((resident) => resident.id !== id);
    res.send({ message: "Resident Deleted" });
  } else {
    res.status(404).send({ erros: "resident not Found!" });
  }
});

app.patch("/residents/:id", (req, res) => {
  let id = Number(req.params.id);
  let match = residents.find((resident) => resident.id === id);

  if (match) {
    if (req.body.name) {
      match.name = req.body.name;
    }
    if (req.body.age) {
      match.age = req.body.age;
    }
    if (req.body.gender) {
      match.gender = req.body.gender;
    }
    res.send(match);
  } else {
    res.status(404).send({ error: "Resident not Found!" });
  }
});
app.listen(port, () => {
  console.log(`Yayy: http://localhost:${port}`);
});
