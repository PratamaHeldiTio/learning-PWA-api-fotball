const webPush = require('web-push');

const vapidKeys = {
    'publicKey': 'BOFfvbOnYP31oWKtBlkDT5QhFjUGRvoVoh81ymmDcSiZZ3cZksO2QXfRYFhTL4ngmsqyztW-1z4cy5DuswePP8Q',
    'privateKey': 'd5IfdyU66SLG8tZ-Qm7YocXLe4L61Aw1i8nWuy0HzHo'
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    'endpoint': 'https://fcm.googleapis.com/fcm/send/emY4LKal6Yg:APA91bHLM8RHg5wDP_9zPGkXgtmoENpMyM8GleALKRd_jbzXJZ4FhtpK-sDZQPvPef11iSAYBVeOB4nw2m2lJk03jJZ88tLMCu0-gomn9thD_4is73jGkbJQ72_8iU0rBUF1yH3Oxm1J',
    'keys': {
        'p256dh': 'BPF7wnyxtaFVSjMhzwwNplXyqda6XGGxCUHfIRn1I2WHkvUEynXRExUFdqe9asmF7mfuZop0Y+pn1FL80LQ+aNw=',
        'auth': 'hB4LCPvpckeifhd5Gu/xkg=='
    }
};
var payload = 'Terimakasih anda telah menggunakan website liga Serie A versi Indonesia';

var options = {
    gcmAPIKey: '215508129416',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);