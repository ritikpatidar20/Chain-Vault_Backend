const mongoose=require("mongoose");

const GovermentSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true
    },
    AccountNumber: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    RegistrationRequest: [
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: "institute",
		},
    ],
});

module.exports = mongoose.model("goverment", GovermentSchema);
