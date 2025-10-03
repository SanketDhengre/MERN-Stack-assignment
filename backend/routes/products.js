const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const limiter = require("../middleware/rateLimit");
const products = require("../data/products.json");

const router = express.Router();

router.use(limiter);
router.use(authenticateToken);

router.get("/", (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;

    let filteredProducts = products;

    if (category) {
        filteredProducts = filteredProducts.filter(
            (product) =>
                product.category.toLowerCase() === category.toLowerCase()
        );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
        data: paginatedProducts,
        total: filteredProducts.length,
        page: parseInt(page),
        limit: parseInt(limit),
    });
});

router.get("/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
});

module.exports = router;
