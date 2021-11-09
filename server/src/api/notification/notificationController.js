import * as NotificationService from './notificationService.js'

export const addUserToSMTP = (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'https://rapidemail.rmlconnect.net/v1.0/settings/addSmtp',
        'headers': {
        },
        body: `{\r\n    "owner_id": ${process.env.OWNER_ID},\r\n    "token":${process.env.TOKEN},\r\n    "total_limit":1000,\r\n    "hourly_limit":100\r\n}\r\n`

    };

    NotificationService.addUserToSMTP(options).then((data) => {
        res.status(200).json(data)
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
}
export const sendEmail = (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'https://rapidemail.rmlconnect.net/v1.0/messages/sendMail',
        'headers': {
            'Reply-To': 'message.reply@example.com',
            'X-Unique-Id': 'id'
        },
        body: '{\n    "owner_id": "example id",\n    "token": "example token",\n    "smtp_user_name":"smtp12345",\n    "message": {\n        "html": "Example HTML content",\n        "text": "Example text content",\n        "subject": "example subject",\n        "from_email": "noreply@rapidemail.rmlconnect.net",\n        "from_name": "Example Name",\n        "to": [\n            {\n                "email": "recipient.email@example.com",\n                "name": "Recipient Name",\n                "type": "to"\n            }\n        ],\n        "headers": {\n            "Reply-To": "noreply@rapidemail.rmlconnect.net",\n            "X-Unique-Id": "id "\n        },\n        "attachments": [\n            {\n                "type": "text/plain",\n                "name": "myfile.txt",\n                "content": "Please use Base64 encryption code here"\n            }\n        ],\n        "images": [\n            {\n                "type": "image/png",\n                "name": "IMAGECID",\n                "content": "ZXhhbXBsZSBmaWxl"\n            }\n        ]\n    }\n}\n'

    };

    NotificationService.sendEmail(options).then((data) => {
        res.status(200).json(data)
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Something went wrong!" })
        })
}