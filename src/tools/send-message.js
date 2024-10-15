import axios from "axios";

export async function sendSMS({ text }) {
    const x = await axios({
        method: "post",
        url: "https://mmlyk6.api.infobip.com/sms/2/text/advanced",
        headers: { Authorization: process.env.INFOBIPTOKEN, "Content-Type": "application/json", Accept: "application/json" },
        data: { messages: [{ destinations: [{ to: process.env.INFOBIPNUMBER }], from: "Xabarnoma", text }] },
    });
    console.log(x.data);
    return 0;
}
