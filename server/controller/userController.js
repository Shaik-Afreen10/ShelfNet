const { prisma } = require('../utils/dbConnector');

// Get all books, including their genre information
exports.viewAllBooks = async (req, res) => {
    try {
        const books = await prisma.Books.findMany({
            include: {
                genre: true // Include the related genre data
            }
        });
        res.status(200).send({ status: true, data: books });
    } catch (err) {
        res.status(400).send({ status: false, message: err.message });
    }
}

// Get all genres
exports.viewAllGenres = async (req, res) => {
    try {
        const genres = await prisma.Genre.findMany();
        res.status(200).send({ status: true, data: genres });
    } catch (err) {
        res.status(400).send({ status: false, message: err.message });
    }
}

// Get a single book by its ID
exports.viewBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma.Books.findUnique({
            where: { id: id },
            include: {
                genre: true // Also include genre info here
            }
        });
        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found" });
        }
        res.status(200).send({ status: true, data: book });
    } catch (err) {
        res.status(400).send({ status: false, message: err.message });
    }
}

// Get all books for a specific genre ID
exports.viewBooksByGenre = async (req, res) => {
    const { genreId } = req.params;
    try {
        const books = await prisma.Books.findMany({
            where: { genreId: genreId }
        });
        res.status(200).send({ status: true, data: books });
    } catch (err) {
        res.status(400).send({ status: false, message: err.message });
    }
}

// Search for books by title
exports.searchBooks = async (req, res) => {
    const { query } = req.query; // e.g., /api/user/search?query=Gatsby
    try {
        const books = await prisma.Books.findMany({
            where: {
                title: {
                    contains: query,
                    mode: 'insensitive' // Makes search case-insensitive
                }
            },
            include: {
                genre: true
            }
        });
        res.status(200).send({ status: true, data: books });
    } catch (err) {
        res.status(400).send({ status: false, message: err.message });
    }
}

// TODO: Add controller logic for rating a book
exports.rateBook = async (req, res) => {
    res.status(501).send({ status: false, message: "Rating not implemented yet." });
}

// --- THIS IS THE NEW FUNCTION FOR THE PROFILE PAGE ---
exports.getUserProfile = async (req, res) => {
    // 'req.user' is the decoded token, which was added by 
    // the verifyUser middleware.
    const userId = req.user.id; 

    try {
        const user = await prisma.User.findUnique({
            where: { id: userId },
            // Select only the safe and necessary fields to send back
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        if (!user) {
            return res.status(404).send({ status: false, message: "User not found." });
        }

        // Send back the user's data
        res.status(200).send({ status: true, data: user });

    } catch (err) {
        console.error("Get Profile Error:", err.message);
        res.status(500).send({ status: false, message: "Server error." });
    }
}