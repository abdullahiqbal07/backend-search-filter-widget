import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://abdullahiqbal910238:abdullah@smartfilter.wu95kq5.mongodb.net/smartfilter?retryWrites=true&w=majority&appName=smartfilter")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Define a schema and model for your data
const DataSchema = new mongoose.Schema({
  location: String,
  propertyType: String,
  amenities: [String],
  listingType: String,
  price: Number
});

const Data = mongoose.model('Data', DataSchema);

// API endpoint to fetch data from MongoDB with filtering
app.get('/data', async (req, res) => {
  const { location, propertyType, amenities, listingType, priceRange } = req.query;

  // Build the query object based on parameters
  const query = {};
  if (location) query.location = { $regex: location, $options: 'i' };
  if (propertyType) query.propertyType = propertyType;
  if (listingType) query.listingType = listingType;
  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split(',').map(Number);
    query.price = { $gte: minPrice, $lte: maxPrice };
  }
  if (amenities) {
    const selectedAmenities = Object.keys(amenities).filter(key => amenities[key] === 'true');
    if (selectedAmenities.length) {
      query.amenities = { $all: selectedAmenities };
    }
  }

  try {
    const data = await Data.find(query); // Use the Data model to find documents matching the query
    res.json(data); // Return the filtered data as JSON
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// API endpoint to apply filter and save data to MongoDB
app.post('/apply-filter', async (req, res) => {
  try {
    const { location, propertyType, amenities, listingType, price } = req.body;
    const data = new Data({ location, propertyType, amenities, listingType, price });
    await data.save(); // Save the data to MongoDB
    res.json({ message: 'Data saved successfully' });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/', function (req, res) {
    res.send("Welcome to the Google")
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

