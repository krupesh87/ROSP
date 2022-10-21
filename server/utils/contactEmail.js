import nodemailer from 'nodemailer'

export const contactEmail = async(name, email, Message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "Gmail",
            port: 587,
            secure: true,
            auth: {
                user: "internshipkonnect@gmail.com",
                pass: "prryipfxbdwiefmq",
            },
        });

        await transporter.sendMail({
            from: email,
            to: "internshipkonnect@gmail.com",
            subject: `User Query, User Email is ${email}`,

            html: `
            <h3>User Query</h3>
            <b>Name:</b> <span>${name}</span> <br>
            <b>Message:</b> <span>${Message}</span> <br>
        
          
           
            `
        });

        console.log("email sent successfully")
    } catch (error) {
        console.log(error, "email not sent");
    }

}