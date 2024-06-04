// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const fs = require('fs');
import fs from 'fs';
import express from 'express';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://abdullahiqbal910238:abdullah@smartfilter.wu95kq5.mongodb.net/smartfilter?retryWrites=true&w=majority&appName=smartfilter').then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(express.json());

// Define a schema and model for your data
const DataSchema = new mongoose.Schema({
    location: String,
    propertyType: String,
    amenities: [String],
    listingType: String,
    price: Number
});

const Data = mongoose.model('Data', DataSchema);

// Load data from a JSON file
// const loadData = async () => {
//   const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

//   try {
//     await Data.insertMany(data);
//     console.log('Data inserted successfully');
//     mongoose.connection.close();
//   } catch (err) {
//     console.error('Error inserting data:', err);
//   }
// };
const loadData = async () => {
    try {
      const data = fs.readFileSync('data.json', 'utf-8');
      const jsonData = JSON.parse(data);
      await Data.insertMany(jsonData);
      console.log('Data inserted successfully');
      mongoose.connection.close();
    } catch (err) {
      console.error('Error reading or parsing JSON file:', err);
    }
  };
loadData();
