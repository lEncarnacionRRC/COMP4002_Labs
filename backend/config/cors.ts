import type { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:3000",
            process.env.FRONTEND_URL
        ].filter(Boolean);

        if(allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS restriction"), false);
        }
    },
    allowedHeaders:['Content-Type', 'Authorization'],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true
}

export default corsOptions;