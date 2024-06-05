const express = require('express');
const router = express.Router();
const menuItems = require('./../Models/MenuItem');




  //POST Methods to Order the Menus
  router.post('/OrderMenu', async (req, res) => {
    try {
      const data = req.body
      const newMenuItem = new menuItems(data);
      const saveResponse = await newMenuItem.save();
      console.log('menu item saved');
      res.status(200).json(saveResponse);
    }catch (err) {
      console.log(err)
      res.status(500).json({err: 'Internal Server Error'});
    }
  })
  
  router.get('/getOrderedMenuItem', async (req, res) => {
    try {
      const data = await menuItems.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch{
      console.log(err)
      res.status(500).json({err: 'Internal Server Error'});
    }
  })


  router.get('/:taste', async (req, res) => {
    try {
      const taste = req.params.taste;
     if (taste == 'spicy' || taste == 'sweet' || taste == 'sour') {
        const response = await person.find({taste: taste});
        console.log('response fetched');
        res.status(200).json(response);
     }else{
        res.status(404).json({err: 'Invalid taste'});   
     }

    }catch (err) {
        console.log(err)
        res.status(500).json({err: 'Internal Server Error'});
    }
  })



  module.exports = router;