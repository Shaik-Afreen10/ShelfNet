    // server/router/compilerRoute.js
const express = require('express');
const router = express.Router();

// This handles the POST request your script is trying to send
router.post('/checkCodingAnswer', async (req, res) => {
  try {
    const { type, id, language, code, inputs } = req.body;

    // Log the incoming load-test data to your backend console
    console.log(`Executing code execution request for language ID: ${language}`);

    // Mocking a successful code execution response for your load test
    return res.status(200).json({
      success: true,
      message: "Code executed successfully",
      data: {
        output: "Test Output",
        executionTime: "12ms"
      }
    });
  } catch (error) {
    console.error("Compiler error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;