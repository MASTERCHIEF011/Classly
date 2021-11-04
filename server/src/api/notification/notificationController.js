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