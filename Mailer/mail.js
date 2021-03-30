async function sendEmail (transporter, mailOptions, next) {

    let response = new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error)
            } else {
                resolve(true)
            }
        })
    });

    return response.then((message)=>{
        return message
    }).catch((err)=>{
        next(err)
    })

}

module.exports = sendEmail