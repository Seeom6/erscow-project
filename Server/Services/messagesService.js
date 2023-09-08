const Messages = require("../models/Messages");

exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        messagesID: msg._id,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};


exports.DeleteMassages = async (req , res , next) =>{
  try {
    const {from , to } = req.body;
    console.log(req.params);
    const msg = await Messages.deleteMany({
      users: {
        $all: [from, to],
      },
      
    })
    console.log(msg)
    res.status(200).send()
  } catch (error) {
    next(error)
  }
}