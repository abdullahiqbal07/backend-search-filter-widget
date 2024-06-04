// import fs from 'fs';
// import { faker } from '@faker-js/faker';

// // Number of data entries to generate
// const dataCount = 1000;

// // Function to generate a single data entry
// const generateEntry = () => ({
//   text: faker.lorem.sentence(),
//   option: faker.helpers.arrayElement(['Option 1', 'Option 2', 'Option 3']),
//   check1: faker.helpers.arrayElement([true, false]),
//   check2: faker.helpers.arrayElement([true, false]),
//   sliderValue: faker.number.int({ min: 0, max: 100 }),
// });

// // Generate an array of data entries
// const data = Array.from({ length: dataCount }, generateEntry);

// // Write data to a JSON file
// fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

// console.log(`Generated ${dataCount} data entries and saved to data.json`);


// new project

import fs from 'fs';
import { faker } from '@faker-js/faker';

// Number of data entries to generate
const dataCount = 1000;

// Function to generate a single data entry
const generateEntry = () => ({
  location: faker.helpers.arrayElement(["Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Sukkur",
  "Bahawalpur",
  "Sargodha",
  "Mardan",]),
  propertyType: faker.helpers.arrayElement(['House', 'Apartment', 'Farm', 'Villa']),
  amenities: faker.helpers.arrayElements(['Pool', 'Gym', 'Garage'], faker.number.int({ min: 0, max: 3 })),
  listingType: faker.helpers.arrayElement(['rent', 'sale']),
  price: faker.number.int({ min: 10000, max: 1000000 }),
});

// Generate an array of data entries
const data = Array.from({ length: dataCount }, generateEntry);

// Write data to a JSON file
fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

console.log(`Generated ${dataCount} data entries and saved to data.json`);
