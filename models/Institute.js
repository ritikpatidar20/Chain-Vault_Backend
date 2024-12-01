const mongoose=require("mongoose");
const emailTemplate = require("../Templates/InstituteConfirmation");
const mailSender = require("../utils/mailSender");

const InstituteSchema = new mongoose.Schema({
    
    instituteName: {
        type: String,
        required: true,
        trim: true,
    },

    contactNumber: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },
    AccountNumber: {
        type: String,
        required: true,
        trim: true
    },
    Approved: {
        type: String,
		enum: ["Approved", "NotApproved"],
		required: true,
    },
    image: {
        type: String,
        required: true,
    },
    CertificateRequest: [
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: "application",
		},
    ],
});

async function sendConfirmationEmail(email, instituteName, AccountNumber) {
	try {
		const mailResponse = await mailSender(
			email,
			"Confirmation Email",
			emailTemplate(instituteName, AccountNumber)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

InstituteSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	if (this.isNew) {
		await sendConfirmationEmail(this.email, this.instituteName, this.AccountNumber);
	}
	next();
});


module.exports = mongoose.model("institute", InstituteSchema);
