// In-memory store for contact messages
const messages = [];

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide name, email, and message' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide a valid email address' 
      });
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      date: new Date().toISOString()
    };

    // Store message in memory
    messages.push(newMessage);
    
    // Log to console
    console.log('--- New Contact Message Received ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('------------------------------------');

    return res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!', 
      data: newMessage 
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error while submitting message' 
    });
  }
};

module.exports = {
  submitContactForm
};
