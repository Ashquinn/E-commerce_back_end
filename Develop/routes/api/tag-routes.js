const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//Finds all tags and includes the associtated products through ProductTag table
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(
      {
        include: [{model: Product, through: ProductTag}]
      }
    )
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Finds a single tag and includes the associtated products through ProductTag table
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id,
      {
        include: [{model: Product, through: ProductTag}]
      })
      if(!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
      return;
      }
    res.status(200).json(tagData);  
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
