const { Mailchain } = require('@mailchain/sdk');
const dotenv = require("dotenv")
dotenv.config()

async function message() {
    const secretRecoveryPhrase = process.env.SECRET_RECOVERY_PHRASE; // 25 word mnemonicPhrase

    const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

    const user = await mailchain.user();

    console.log(`username: ${user.username}, address: ${user.address}`);

    const { data, error } = await mailchain.sendMail({
        from: user.address, // sender address
        to: [`0xbb56FbD7A2caC3e4C17936027102344127b7a112@ethereum.mailchain.com`], // list of recipients (blockchain or mailchain addresses)
        subject: 'My first message', // subject line
        content: {
            text: 'Hello Mailchain 👋', // plain text body
            html: '<p>Hello Mailchain 👋</p>', // html body
        },
    });
    if (error) {
        // handle error
        console.warn('Mailchain error', error);
        return;
    }
    // handle success send mail result
    console.log(data);

}

message()