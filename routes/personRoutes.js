const express = require('express');
const router = express.Router();

const person = require('./../Models/Person');  // path name of the person



    router.post('/person', async (req, res) => {
    try {
      const data = req.body // Assuming the request body contains the person data
      const newPerson = new person(data); // Create a new Person document with using the mongoose model
      const saveResponse = await newPerson.save();   // Save the new Person document to the database
      console.log('data saved');
      res.status(200).json(saveResponse);
  
    }catch (err) {
      console.log(err)
      res.status(500).json({err: 'Internal Server Error'});
    }
  
    })


    // GET Methods to get the person
    router.get('/', async (req, res) => {
        try {
          const data = await person.find();
          console.log('data fetched');
          res.status(200).json(data);
        }catch (err) {
          console.log(err)
          res.status(500).json({err: 'Internal Server Error'});
        }
    
    })
    
    
    router.get('/:workType', async (req, res) => {
        try {
          const workType = req.params.workType; // exact work type from the person
          if (workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
          }else{
            res.status(404).json({err: 'Invalid work type'});
          }
        }catch (err) {
          console.log(err)
          res.status(500).json({err: 'Internal Server Error'});
        }
    })
    

    router.put('/:id', async (req, res) => {
        try {
            const personId = req.params.id;
            const updatedPersonData = req.body;

            const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
                new: true, // return the updated document
                runValidators: true, // Run Mongoose vvalidators
            })
            if (!response) {
                res.status(404).json({err: 'Person not found'});
            }
            console.log('data updated');
            res.status(200).json(response);
        }catch (err) {
            console.log(err)
            res.status(500).json({err: 'Internal Server Error'});
        }
    })

    router.delete('/:id', async (req, res) => {
        try {
            const personIdentity = req.params.id; // Get the person

            // Assuming you have a person model
            const response = await person.findByIdAndDelete(personIdentity);
            if (!response) {
                return res.status(404).json({err: 'Person not found'});
            }
            console.log('data deleted');
            res.status(200).json({message: 'Person Deleted success'});
        }catch (err) {
            console.log(err)
            res.status(500).json({err: 'Internal Server Error'});
        }
    })


module.exports = router;