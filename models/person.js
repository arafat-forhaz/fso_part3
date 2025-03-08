const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => {console.log('connected to MongoDB')})
  .catch((error) => {console.log('error connecting to MongoDB:', error.message)})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(num) {
        return /^\d{2,3}-\d{7,}/
          .test(num)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
// node modules are different from es6 modules