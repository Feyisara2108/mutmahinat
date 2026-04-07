import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // DEBUG LOGS - Check your VS Code terminal for these!
    console.log("--- EmailJS Debug ---");
    console.log("Service ID:", process.env.EMAILJS_SERVICE_ID);
    console.log("Template ID:", process.env.EMAILJS_TEMPLATE_ID);
    console.log("Public Key (user_id):", process.env.EMAILJS_PUBLIC_KEY);
    console.log("Private Key (accessToken):", process.env.EMAILJS_PRIVATE_KEY ? "EXISTS" : "MISSING");

    const emailJsData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY, 
      template_params: {
        name,
        email,
        subject,
        message,
      },
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailJsData),
    });

    const result = await response.text();

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.error("EmailJS Rejected Request:", result); // THIS TELLS YOU WHY
      return NextResponse.json({ error: result }, { status: 400 });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}