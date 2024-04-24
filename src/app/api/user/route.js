import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
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
  
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey), 
  databaseURL: "https://manage-restaurant-d6e3c-default-rtdb.firebaseio.com"
});

export async function DELETE(req) {
      const { uid } = await req.json();
      await getAuth().deleteUser(uid);
      return new Response(
        JSON.stringify({ message: "deleted successfully" }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
}