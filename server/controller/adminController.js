const {prisma} = require('../utils/dbConnector');
const bcrypt = require('bcryptjs'); // <-- 1. IMPORT ADDED

exports.getAllUsers = async(req,res) =>{
    try{
        const Data = await prisma.User.findMany({where:{role:'user'}});
        res.status(200).send({status:true,data:Data});
    }catch(err){
         
         res.status(400).send({status:false,message:err});
    }

}
exports.addGenre=async (req,res)=>{
    const {name}=req.body;
    try{
        const genreData = await prisma.Genre.create({
    data: { name }
});
        res.status(200).send({data:genreData,status:true,message:"genre created"})
    }
    catch(err){
        res.status(400).send({message:err,status:false});
    }
}
exports.addBooks = async (req, res) => {
    const { title, author, desc, year, bannerUrl, genreId } = req.body;

    try {
        const BookData = await prisma.Books.create({
            data: {
                title,
                author,
                desc,
                year: parseInt(year),
                bannerUrl,
                genreId
            }
        });

        res.status(200).send({
            data: BookData,
            status: true,
            message: "Book added Successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(400).send({
            status: false,
            message: err.message
        });
    }
};
exports.viewGenre=async(req,res)=>{
    try{
        const genreData=await prisma.Genre.findMany();
        res.status(200).send({data:genreData,status:true})
    }
    catch(err){
        res.status(400).send({status:false,message:err})
    }
}
exports.viewBooks = async (req, res) => {
    try {

        const books = await prisma.Books.findMany();

        const genres = await prisma.Genre.findMany();

        const booksWithGenre = books.map(book => ({
            ...book,
            genre: genres.find(g => g.id === book.genreId) || null
        }));

        res.status(200).json({
            status: true,
            data: booksWithGenre
        });

    } catch (err) {

        console.error("VIEWBOOKS ERROR:", err);

        res.status(500).json({
            status: false,
            message: err.message
        });
    }
};

exports.editBooks = async (req, res) => {
    const BookId = req.params.id;

    const { title, author, desc, genreId } = req.body;

    try {

        const updateBook = await prisma.Books.update({
            where: {
                id: BookId
            },
            data: {
                title,
                author,
                desc,
                genreId
            }
        });

        res.status(200).send({
            status: true,
            data: updateBook,
            message: "Book updated successfully"
        });

    } catch (err) {

        console.error("EDIT BOOK ERROR:", err);

        res.status(500).send({
            status: false,
            message: err.message
        });
    }
};

exports.deleteBook = async (req,res)=>{
    const BookId = req.params.id;
    try{
        const deleteBook = await prisma.Books.delete({where:{id:BookId}})
        res.status(201).send({status:true,message:'Deleted Successfully'});
    }
    catch(err){
        res.status(200).send({status:false,message:err});
    }
}
exports.deleteGenre = async (req,res)=>{
    console.log(req.params.id);
    const genreId = req.params.id;
    try{
        await prisma.Books.deleteMany({where:{genreId:genreId}});//one to many delete
        const deleteData = await prisma.Genre.delete({
         where:{id:genreId}
        })
         res.status(201).send({status:true,message:'Deleted Successfully'});
    }catch(err){
         res.status(200).send({status:false,message:err});
    }
}
exports.editGenre = async (req,res)=>{
    const genreId = req.params.id;
    const {name} = req.body;
    try{
        const updateData = await prisma.Genre.update({
         where:{id:genreId},
         data:{name}
        })
         res.status(201).send({data:{status:true,message:"Updated Successfully"}});
    }catch(err){
         res.status(200).send({status:false,message:err});
    }
}

// --- 2. NEW FUNCTION TO EDIT A USER ---
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, pass } = req.body;

    try {
        const dataToUpdate = {};

        if (name) dataToUpdate.name = name;
        if (email) dataToUpdate.email = email;
        
        // Only hash and update the password if a new one was provided
        if (pass) {
            dataToUpdate.pass = await bcrypt.hash(pass, 10);
        }

        const updatedUser = await prisma.User.update({
            where: { id: id },
            data: dataToUpdate,
            select: { id: true, name: true, email: true, role: true } // Don't send the hash back
        });

        res.status(200).send({ status: true, data: updatedUser, message: "User updated successfully" });

    } catch (err) {
        console.error("Edit User Error:", err.message);
        res.status(500).send({ status: false, message: "Failed to update user. Email may already be in use." });
    }
}

// --- 3. NEW FUNCTION TO DELETE A USER ---
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.User.delete({
            where: { id: id }
        });
        res.status(200).send({ status: true, message: "User deleted successfully" });
    } catch (err) {
        console.error("Delete User Error:", err.message);
        res.status(500).send({ status: false, message: "Failed to delete user." });
    }
}