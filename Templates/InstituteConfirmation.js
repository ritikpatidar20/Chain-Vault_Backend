const InstituteConfirmationTemplate = (name, AccountNumber) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #0f1011;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: white;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.containt {
				font-size: 35px;
				font-family: 'Ubuntu', sans-serif; 
			}

			.containt p span{
				font-size: 35px;
				color: aqua;
			 }

			.head-short{
				padding: 0 0;
                font-size: 40px;
                font-weight: bolder;
			 }

			.support {
				font-size: 28px;
				color: #999999;
				margin-top: 40px;
			}

		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://imgbb.com/"><img src="https://i.ibb.co/nbr2BmG/Chain-Vault-removebg-preview.png" alt="Chain-Vault-removebg-preview" border="0"></a>

			<div class="containt" style="text-align: left;">
			<p>Dear, <span>${name}</span></p>
            <p>You have Successfully apply for your <span style="font-size: 40px;font-weight: bold;">Registration</span></p>
			</div>

			<div class="head-short">
			<p>ACCOUNT DETAILS</p>
			</div>

			<div style="font-size: large;text-align: left;">
			<p style="font-size: 30px;">Institute Name: <span style="color: #ef5b5b;">${name}</span></p>
			<span style="display: inline-block; vertical-align: middle;font-size: 30px;">Acc: <span style="color: #ef5b5b;font-size: 20px;">${AccountNumber}</span></span>
            </div>

            <div style="text-align: center; font-size: large;">
            </div>


            <div style=" width: 100%; height: 0px; margin-top: 50px;margin-bottom: 50px; background-color: white;">----------------------------------------------------------------------------------</div>

			<div style=" font-size: 25px;text-align: left;">
            <p>-> You have successfully apply for the registration of your institute and it will be approved by the goverment.</p>
            <p>-> After the approval from the goverment your institute will be registered to the blockchain, then your institute can add cources, generate certificates and can manage the students and their certificates</p>
           </div>

		   <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
		   href="mailto:chainvaultpro@gmail.com">chainvaultpro@gmail.com</a>. We are here to help!</div>
           <div><img height="30px" src="https://i.ibb.co/nbr2BmG/Chain-Vault-removebg-preview.png" alt="chainvault"></div>

	</body>
	
	</html>`;
};
module.exports = InstituteConfirmationTemplate;