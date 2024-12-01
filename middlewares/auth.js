const Passage = require("@passageidentity/passage-node");
const Student = require("../models/Student");
const Institute = require("../models/Institute");
const Goverment = require("../models/Goverment");

exports.auth = async (req, res) => {
  try {
    const passage = new Passage({
      appID: process.env.PASSAGE_APP_ID,
      apiKey: process.env.PASSAGE_API_KEY,
      authStrategy: "HEADER",
    });
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      // user is authenticated
      const { email, phone } = await passage.user.get(userID);
      const identifierEmail = email ? email : phone;

      if (!identifierEmail) {
        return res.json({
          authStatus: "failure",
        });
      }

      const goverment = await Goverment.findOne({ email: identifierEmail });
      const institute = await Institute.findOne({ email: identifierEmail });
      const student = await Student.findOne({ email: identifierEmail });

      let identifier = "";
      let id = "";
      let ac = "";
      let status = "";

      if (goverment) {
        identifier = "goverment";
        id = goverment.id;
        ac = goverment.AccountNumber;
        status = goverment.Approved;
      } else if (institute) {
        identifier = "institute";
        id = institute.id;
        ac = institute.AccountNumber;
        status = institute.Approved;
      } else if (student) {
        identifier = "student";
        id = student.id;
        ac = student.AccountNumber;
        status = student.Approved;
      } else {
        return res.json({
          authStatus: "failure",
        });
      }

      return res.json({
        authStatus: "success",
        identifier,
        identifierEmail,
        id,
        ac,
        status
      });
    }
  } catch (error) {
    // authentication failed
    console.log(error);
    return res.json({
      authStatus: "failure",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try{
         const student = await Student.findById(req.query.id);
         if(!student) {
             return res.status(401).json({
                 success:false,
                 message:'This is a protected route for Students only',
             });
         }
         next();
  }
  catch(error) {
     return res.status(500).json({
         success:false,
         message:'Student cannot be verified, please try again'
     });
  }
 }

 exports.isInstitute = async (req, res, next) => {
  try{
         const institute = await Institute.findById(req.query.id);
         if(!institute) {
             return res.status(401).json({
                 success:false,
                 message:'This is a protected route for Institute only',
             });
         }
         next();
  }
  catch(error) {
     return res.status(500).json({
         success:false,
         message:'Institute cannot be verified, please try again'
     });
  }
 }

 exports.isGoverment = async (req, res, next) => {
  try{
         const goverment = await Goverment.findById(req.query.id);
         if(!goverment) {
             return res.status(401).json({
                 success:false,
                 message:'This is a protected route for Goverment only',
             });
         }
         next();
  }
  catch(error) {
     return res.status(500).json({
         success:false,
         message:'Goverment cannot be verified, please try again'
     });
  }
 }


