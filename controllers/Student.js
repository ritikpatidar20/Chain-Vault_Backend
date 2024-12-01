const Student=require("../models/Student");
const Application=require("../models/Application");
const Institute = require("../models/Institute");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../Templates/ApplicationTemplate");

exports.signupStudent = async (req, res) => {
    try {
        const{
            name,
            tel,
            date,
            email,
            AccountNumber
        } = req.body;

        if(
            !name||
            !tel||
            !date||
            !email ||
            !AccountNumber
        ){
            return res.status(403).send({
				success: false,
				message: "All Fields are required",
			  });
        }

        const existingStudent = await Student.findOne({ email });
		if (existingStudent) {
			return res.status(400).json({
				success: false,
				message: "Student already exists. Please sign in to continue.",
			});
		}

        const student = await Student.create({
            name,
            tel,
            date,
            email,
            AccountNumber,
			      image: `https://api.dicebear.com/5.x/initials/svg?seed=${email}`,
        });

        return res.status(200).json({
            success: true,
            student,
            message: "Student registered successfully",
      });

    } catch(error){
        console.error(error);
          return res.status(500).json({
            success: false,
            message: "Student cannot be registered. Please try again.",
          });
    }
};

exports.CertificateApplication = async(req, res)=> {
  try{
    const StudentId=req.query.id;

    const {
      StudentName,
      InstituteId,
      courseName,
      StartDate,
      EndDate,
    } = req.body;

    if(
      !StudentId ||
      !StudentName ||
      !InstituteId ||
      !courseName ||
      !StartDate ||
      !EndDate 
  ){
      return res.status(400).send({
        success: false,
        message: "All Fields are required",
  });
  } 

  const conditions = {
      StudentId:StudentId,
      InstituteId:InstituteId,
      courseName:courseName
  };

  const existingApplication = await Application.findOne(conditions);
		if (existingApplication) {
			return res.status(400).json({
				success: false,
				message: "This application has already been submited",
			});
		}

  const tempinstitute = await Institute.findById(InstituteId);  

  const application = await Application.create({
    instituteName: tempinstitute.instituteName,
    StudentId,
    StudentName,
    InstituteId,
    courseName,
    StartDate,
    EndDate,
    status:"NotApproved"
  }); 

  const student = await Student.findById(StudentId);
    if (student) {
      student.Applications.push(application._id);
      await student.save();
    } else {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    const institute = await Institute.findById(InstituteId);
    if (institute) {
      institute.CertificateRequest.push(application._id);
      await institute.save();
    } else {
      return res.status(404).json({
        success: false,
        message: 'Institute not found',
      });
    } 
    
    try {
      console.log(student.email);
      const mailResponse = await mailSender(
        student.email,
        "Approval Email",
        emailTemplate(tempinstitute.instituteName,
          StudentName,
          courseName,
          StartDate,
          EndDate)
      );
      console.log("Email sent successfully: ", mailResponse.response);
    } catch (error) {
      console.log("Error occurred while sending email: ", error);
      throw error;
    }
  
  return res.status(200).json({
    success: true,
    application,
    message: "Applied for certificate successfully",
  });

  } catch(error){
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot Applied successfully. Please try again.",
    });
  }
};

exports.GetAllCertificates = async (req, res)=> {
  try{
		const id = req.query.id;
    const student = await Student.findById(id)
      .populate({
        path: "Applications",
        match: { status: "NotApproved" },
      })
      .exec();
    res.send({
        success: true,
        message: `Got All Applications`,
        data: student,
      })
} catch(error){
    return res.status(500).json({
        success: false,
        message: "Could not get all Applications. Please try again.",
      });
}
};

exports.getStudentInfo = async (req, res) => {
  try{
    const id = req.query.id;
    const student = await Student.findById(id);
    res.send({
      success: true,
      message: `Got student data`,
      data: student,
    })
  } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Could not get student data. Please try again.",
      });
  }
}