const Institute = require("../models/Institute");
const Student = require("../models/Student");
const Application = require("../models/Application");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../Templates/ApprovalTemplate");

exports.signup = async (req, res) => {
    try {
        const{
            email,
            AccountNumber,
            instituteName,
            contactNumber,
        } = req.body;

        if(
            !contactNumber||
            !email ||
            !AccountNumber||
            !instituteName
        ){
            return res.status(403).send({
            success: false,
            message: "All Fields are required",
          });
        }

        const existingInstitute = await Institute.findOne({ email });
		if (existingInstitute) {
			return res.status(400).json({
				success: false,
				message: "Institute already exists. Please sign in to continue.",
			});
		}

        const institute = await Institute.create({
            instituteName,
            contactNumber,
            email,
            AccountNumber,
            Approved: "NotApproved",
		        image: `https://api.dicebear.com/5.x/initials/svg?seed=${email}`,
        });

        return res.status(200).json({
            success: true,
            institute,
            message: "Institute registered successfully",
      });

    } catch(error){
        console.error(error);
          return res.status(500).json({
            success: false,
            message: "Institute cannot be registered. Please try again.",
          });
    }
};

exports.GetAllNotApprovedApplications = async (req, res)=> {
    try{
        const institutesWithNotApprovedCertificates = await Institute.findById(req.query.id)
                          .populate({
                            path: 'CertificateRequest',
                            match: { status: 'NotApproved' }, 
                            model: 'application',
                          })
                          .exec();                     
        res.send({
            success: true,
            message: `Got All NotApproved Applications`,
            data: institutesWithNotApprovedCertificates,
          })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Could not get NotApproved Applications. Please try again.",
          });
    }
};

exports.GetAllApprovedApplications = async (req, res)=> {


    try{
        const institutesWithApprovedCertificates = await Institute.findById(req.query.id)
                          .populate({
                            path: 'CertificateRequest',
                            match: { status: 'Approved' }, 
                            model: 'application',
                          })
                          .exec();  
            
        res.send({
            success: true,
            message: `Got All Approved Applications`,
            data: institutesWithApprovedCertificates,
          })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Could not get Approved Applications. Please try again.",
          });
    }
};

exports.approveCertificate = async (req, res)=> {
    try {
    
      const application = await Application.findById(req.query.aplid);
    
      if (application) {
        application.status = "Approved";
        await application.save();

        console.log("got the id");
        console.log(application.StudentId);
        const student = await Student.findById(application.StudentId);

        try {
          const mailResponse = await mailSender(
            student.email,
            "Approval Email",
            emailTemplate(student.name)
          );
          console.log("Email sent successfully: ", mailResponse.response);
        } catch (error) {
          console.log("Error occurred while sending email: ", error);
          throw error;
        }


        res.send({
          success: true,
          message: 'done',
          data: application
        })

      } else {
        return res.status(404).json({
          success: false,
          message: 'Application not found',
        });
      } 
    } catch(error) {
      return res.status(500).json({
        success: false,
        message: "Could not get Approved Certificate. Please try again.",
      });
    }
}

exports.RegisteredInstitute = async (req, res)=> {
  try{
      const institute = await Institute.find({ Approved: "Approved" });
      res.send({
          success: true,
          message: `Got All Approved Institutes`,
          data: institute,
        })
  } catch(error){
      return res.status(500).json({
          success: false,
          message: "Could not get Approved Institutes. Please try again.",
        });
  }
};