

export default async function createTextMagicContactApiCall(req, res) {

    const textmagicClient = require('textmagic-client');
    const { method } = req

    const phoneNumber = req.body

    const client = textmagicClient.ApiClient.instance;
    const auth = client.authentications['BasicAuth'];
    const api = new textmagicClient.TextMagicApi();

    auth.username = 'jacobtrebil';
    auth.password = 'TvNyFDQlFOf2VOulfuUNlrfRemouwy';

    const input = {
        phone: {phoneNumber},
        brand: "TextMagic",
        codeLength: 4,
        workflowId: "6",
        language: "en-gb",
        senderId: "TextMagic",
        country: "US",
    }

    switch (method) {
        case 'POST':
            try {
                await api.sendPhoneVerificationCodeTFA(input).then(function (data) {
                    res.status(200).json(data)
                    console.log(data);
                    console.log(phoneNumber)
                }).catch(function(err){
                    console.error(err);
                });
                return;
            } catch (error) {
                console.log(error)
                res.status(400).json()
                return;
            }
            default:
            res.status(400).json()
            break
    }
}

// It's not detecting phoneNumber because it's not a function that I'm passing
// Req, res through. I have no req.body to get the phoneNumber from 