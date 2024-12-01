const mongoose=require("mongoose");

const ApplicationSchema = new mongoose.Schema({

    instituteName:{
        type: String,
        required: true,   
    },
    StudentId: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref:"student"
    },
    StudentName: { 
        type: String,
        required: true, 
    },
    InstituteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref:"institite"
    },
	courseName: { 
        type: String,
        required: true, 
     },
    StartDate: { 
        type: Date,
        required: true, 
    },
    EndDate: { 
        type: Date,
        required: true, 
    },
    status: {
		type: String,
		enum: ["Approved", "NotApproved"],
        required: true,
	},
    AppliedAt: {
		type:Date,
		default:Date.now
	},
});

module.exports = mongoose.model("application", ApplicationSchema);
