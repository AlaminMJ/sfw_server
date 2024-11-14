import mongoose, { Document, Schema, Types } from 'mongoose';

// Define Size Type
interface ISize {
  size_name: string;  // Size name, e.g., "Small", "Medium", "Large"
  quantity: number;   // Quantity of that size
}

// Define Item Type
interface IItem {
  color_name: string;  // Color name for the item
  sizes: ISize[];      // Array of sizes available for the item
}

// Define Carton Type
interface ICarton {
  carton_no: string;           // Unique carton number
  measurement: {
    length: number;            // Length of the carton
    width: number;             // Width of the carton
    height: number;            // Height of the carton
  };
  net_weight: number;          // Net weight of the carton
  gross_weight: number;        // Gross weight of the carton
  style: string;               // Style of the items in the carton
  items: IItem[];              // Array of items inside the carton
}

// Define Packing List Type (Parent Schema)
interface IPackingList {
  packing_no: string;         // Unique packing number
  packing_date: Date;         // Date the packing was created
  buyer_name: string;        // Destination for the packing
  available_sizes: string[];  // Available sizes for the packing list
  cartons: ICarton[];         // Array of cartons in the packing list
}

// Mongoose Schema for Size
const sizeSchema = new Schema<ISize>({
  size_name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// Mongoose Schema for Item
const itemSchema = new Schema<IItem>({
  color_name: {
    type: String,
    required: true
  },
  sizes: [sizeSchema]  // Array of sizes for each item
});

// Mongoose Schema for Carton (subdocument inside Packing List)
const cartonSchema = new Schema<ICarton>({
  carton_no: {
    type: String,
    required: true,
    unique: true  // Ensure carton numbers are unique
  },
  measurement: {
    length: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  net_weight: {
    type: Number,
    required: true
  },
  gross_weight: {
    type: Number,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  items: [itemSchema]  // Array of items in the carton
});

// Mongoose Schema for Packing List (Parent Schema)
const packingListSchema = new Schema<IPackingList>({
  packing_no: {
    type: String,
    required: true,
    unique: true  // Ensure packing numbers are unique
  },
  packing_date: {
    type: Date,
    required: true
  },
  buyer_name: {
    type: String
    
  },
  available_sizes: {
    type: [String],  // List of available sizes (e.g., ["Small", "Medium", "Large"])
    required: true
  },
  cartons: [cartonSchema]  // Array of carton objects (subdocuments)
});

// Create the model for PackingList
const PackingList = mongoose.model<IPackingList & Document>('PackingList', packingListSchema as Schema);

export default PackingList;
