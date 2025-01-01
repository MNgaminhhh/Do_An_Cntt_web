import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import fetch from "node-fetch";

// Đọc giá trị của 'Server_key' từ biến môi trường
const serverKey = process.env.FIREBASE_SERVER_KEY;
const serviceAccountKey = {
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
};

// Kiểm tra xem ứng dụng Firebase đã tồn tại chưa
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://manage-restaurant-d6e3c-default-rtdb.firebaseio.com"
});

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { uid, title, body } = requestBody;

        // Lấy token từ Realtime Database
        const userTokenRef = admin.database().ref(`userTokens/${uid}`);
        const snapshot = await userTokenRef.once("value");
        const token = snapshot.val();

        if (!token) {
            throw new Error("User token not found or invalid");
        }

        // Gửi thông báo đến FCM
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${serverKey}` // Sử dụng biến môi trường ở đây
            },
            body: JSON.stringify({
                to: token,
                notification: {
                    title: title,
                    body: body,
                    mutable_content: true,
                    sound: 'Tri-tone'
                },
                data: {
                    url: 'https://firebasestorage.googleapis.com/v0/b/manage-restaurant-d6e3c.appspot.com/o/3213123123123.png?alt=media&token=ae2023f3-49f7-4b1a-8075-4b61dccb7510',
                    dl: '<deeplink action on tap of notification>'
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send notification');
        }

        return new Response(
            JSON.stringify({ message: "Notification sent successfully" }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Failed to send notification", error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
