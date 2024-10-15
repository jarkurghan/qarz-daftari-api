export default function generate_password() {
    let x = "";
    const a = ["!", "-", "#", "$", "&", "+", "=", "."];
    for (let i = 0; i < 8; i++) {
        let r = ((Math.floor(Math.random() * 1000) % 16) % 7) % 4;
        switch (r) {
            case 0:
                x += String.fromCharCode((Math.floor(Math.random() * 1000) % 26) + 65);
                break;
            case 1:
                x += String.fromCharCode((Math.floor(Math.random() * 1000) % 26) + 97);
                break;
            case 2:
                x += String.fromCharCode((Math.floor(Math.random() * 1000) % 10) + 48);
                break;
            case 3:
                x += a[Math.floor(Math.random() * 1000) % 8];
                break;
        }
    }
    return x;
}
