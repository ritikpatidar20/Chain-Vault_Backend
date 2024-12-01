const ApprovalTemplate = (instituteName) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>You are now Registered!!</title>
		<style>
			body {
				background-color: #0f1011;
				font-family: Arial, sans-serif;
				font-size: 8px;
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
				font-size: 18px;
				font-family: 'Ubuntu', sans-serif; 
			}

			.containt p span{
				font-size: 18px;
				color: aqua;
			 }

			.head-short{
				padding: 0 0;
                font-size: 20px;
                font-weight: bolder;
			 }

			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}

		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://imgbb.com/"><img src="https://i.ibb.co/nbr2BmG/Chain-Vault-removebg-preview.png" alt="Chain-Vault-removebg-preview" border="0"></a>

			<div class="containt" style="text-align: left;">
			<p>Dear, <span>${instituteName}</span></p>
            <p>Congratulations your application has been approved and your institute is now <span style="font-size: 20px;font-weight: bold;">Registered</span></p>
			</div>

            <div style=" width: 100%; height: 0px; margin-top: 50px;margin-bottom: 50px; background-color: white">--------------------------------------------------------</div>

			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:chainvaultpro@gmail.com">chainvaultpro@gmail.com</a>. We are here to help!</div>
			<div><img height="15px" src="https://i.ibb.co/nbr2BmG/Chain-Vault-removebg-preview.png" alt="chainvault"></div>
	</body>
	
	</html>`;
};
module.exports = ApprovalTemplate;