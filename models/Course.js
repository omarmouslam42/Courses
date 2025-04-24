const {mongoose,model} = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { 
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },

    image: Object,
    
    startDate: Date,
    endDate: Date,
    price: {
      type: String,
      required: [true, "price is required"],
    },
  },
  {
    timestamps: true,
  }
);

const courseModel = model("Course", courseSchema);
module.exports = courseModel;
