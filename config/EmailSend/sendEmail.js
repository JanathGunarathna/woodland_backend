import nodemailer from 'nodemailer';

const sendEmail = async ( email ,message) => {

    try {
        // Logic to send the email using the provided email address
        // Example using nodemailer to send the email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {     
              user: process.env.USER_EMAIL,
              pass: process.env.USER_PASS,
            },
          });
          const htmlMessage = `
          <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 5px; padding: 20px;">
              <img src="https://firebasestorage.googleapis.com/v0/b/iresueimage.appspot.com/o/WhatsApp%20Image%202024-04-09%20at%2020.58.49_16f316d9.jpg?alt=media&token=09281b0b-b269-402d-b6e5-c8fc5e1e697e" alt="IRescue" style="display: block; margin: 0 auto; max-width: 100%; height: 300px;">
              <div style="text-align: center; margin-top: 20px;">
                  <h2 style="color: #333; font-size: 24px;">Welcome to IRescue</h2>
                  <p style="font-size: 16px;">Thank you for joining us!</p>
                  <p style="font-size: 16px;">Please click the button below to verify your email address.</p>
                  <a href="${message}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Verify Email</a>
              </div>
              <p style="text-align: center; font-size: 14px; color: #666; margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
      `;
      
          const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'IRescue Email Vertification ',
            html:htmlMessage
          };
    
          await transporter.sendMail(mailOptions);
          if(mailOptions){
            console.log("Email send successfully");     
        }else{
            console.log("Email not send successfully");     

        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send email');
    }
};

export default sendEmail;
