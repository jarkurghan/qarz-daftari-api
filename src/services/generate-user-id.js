export default function generateUserID() {
    let x = "";
    for (let i = 0; i < 32; i++) {
        x += String.fromCharCode((Math.floor(Math.random() * 1000) % 10) + 48);
    }
    return x;
}
