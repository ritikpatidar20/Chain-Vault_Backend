const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../Templates/StudentConfirmation");

const StudentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
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
    image: {
        type: String,
        required: true,
    },
    Applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
			ref: "application",
        }
    ]
});

async function sendConfirmationEmail(email, name, AccountNumber) {
	try {
		const mailResponse = await mailSender(
			email,
			"Confirmation Email",
			emailTemplate(name, AccountNumber)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

StudentSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	if (this.isNew) {
		await sendConfirmationEmail(this.email, this.name, this.AccountNumber);
	}
	next();
});

module.exports = mongoose.model("student", StudentSchema);

