const { prisma } = require('../utils/dbConnector');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.adminRegister = async (req, res) => {
    const { name, email, pass } = req.body; // 'role' is hardcoded
    const hashPassword = await bcrypt.hash(pass, 10);
    try {
        const existingAdmin = await prisma.User.findFirst({
            where: { email: email, role: 'admin' }
        });

        if (existingAdmin) {
            return res.status(400).send({ status: false, message: "Admin with this email already exists." });
        }

        const UserData = await prisma.User.create({
            data: {
                name,
                email,
                pass: hashPassword,
                role: 'admin'
            }
        });
        res.status(201).send({ message: 'Created admin', status: true, data: UserData });
    } catch (err) {
        console.error("ADMIN REGISTER ERROR:", err.message);
        res.status(500).send({ message: err.message, status: false });
    }
}


exports.adminLogin = async (req, res) => {
    const { email, pass } = req.body;
    try {
        const validUser = await prisma.User.findFirst({ where: { email: email, role: 'admin' } });
        
        // 1. FIX: Send 401 (Unauthorized) for security
        if (!validUser) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const validPass = await bcrypt.compare(pass, validUser.pass);
        
        // 2. FIX: Send 401 (Unauthorized)
        if (!validPass) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign(
            { id: validUser.id, email: email, role: 'admin' },
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: '6h' }
        );
        
        res.status(200).send({ message: `Login Successful`, token: token });
    
    } catch (err) {
        // 3. FIX: Send 500 (Server Error)
        console.error("ADMIN LOGIN ERROR:", err.message);
        res.status(500).send({ message: "Server error during login." });
    }
}

exports.userLogin = async (req, res) => {
    // --- 1. LOGIN ATTEMPT LOG ---
    console.log("\n--- USER LOGIN ATTEMPT ---");
    console.log("Request body:", req.body);

    const { email, pass } = req.body;
    try {
        const validUser = await prisma.User.findFirst({ where: { email: email, role: 'user' } });
        
        // --- 2. USER FOUND LOG ---
        if (!validUser) {
            console.log("LOGIN FAILED: No user found with email:", email);
            return res.status(401).send({ message: `Invalid email or password` });
        }
        console.log("LOGIN SUCCESS: Found user:", validUser.email);

        const validPass = await bcrypt.compare(pass, validUser.pass);
        
        // --- 3. PASSWORD MATCH LOG ---
        if (!validPass) {
            console.log("LOGIN FAILED: Password comparison failed.");
            return res.status(401).send({ message: `Invalid email or password` });
        }
        console.log("LOGIN SUCCESS: Password comparison passed.");

        // Generate token
        const token = jwt.sign(
            { id: validUser.id, email: email, role: validUser.role }, // Fixed JWT role
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: '6h' }
        );
        
        res.status(200).send({ message: `Login Successful`, token: token });

    } catch (err) {
        console.error("USER LOGIN CATCH ERROR:", err.message);
        res.status(500).send({ message: "Server error during login." });
    }
}

exports.userRegister = async (req, res) => {
    const { name, email, pass } = req.body;
    
    try {
        // 1. Check if user already exists
        const existingUser = await prisma.User.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(400).send({ status: false, message: "Email already in use." });
        }

        // 2. Hash the password
        const hashPassword = await bcrypt.hash(pass, 10);

        // 3. Create user with the HASHED password
        const userdata = await prisma.User.create({
            data: {
                name,
                email,
                pass: hashPassword, // Fixed: Use the hashed password
                role: 'user'
            }
        });

        res.status(201).send({ status: true, message: "User created successfully" });

    } catch (err) {
        console.error("USER REGISTER ERROR:", err.message);
        res.status(500).send({ status: false, message: err.message });
    }
}

exports.adminChangePass = async (req, res) => {
    const adminId = req.params.id;
    const { newPass } = req.body;

    if (!newPass) {
        return res.status(400).send({ status: false, message: "New password is required." });
    }

    try {
        // 1. Hash the new password
        const hashPassword = await bcrypt.hash(newPass, 10);

        // 2. Update the user with the HASHED password
        await prisma.User.update({
            where: { id: adminId },
            data: { pass: hashPassword } // Fixed: Use the hash
        });
        
        res.status(200).send({ status: true, message: "Password updated successfully." });
    } catch (err) {
        console.error("CHANGE PASS ERROR:", err.message);
        res.status(400).send({ status: false, message: "Could not update password. User may not exist." });
    }
}
exports.verifyUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'A token is required for authentication' });
    }

    try {
        // This just verifies the token is valid, regardless of role
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = decoded; // This adds the user's ID and email to the request
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
};