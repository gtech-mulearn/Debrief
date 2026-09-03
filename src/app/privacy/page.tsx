"use client";

import { Header } from "@/components/layout";

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className="mx-auto w-full max-w-[1000px] px-4 md:px-8 pt-32 pb-20">
                <div className="space-y-8">
                    <div className="border-b border-white/5 pb-8">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            Privacy Policy
                        </h1>
                        <p className="font-sans text-lg text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="prose prose-invert prose-zinc max-w-none">
                        <p className="text-lg text-muted-foreground/80 leading-relaxed">
                            Your privacy is important to us. It is Debrief's policy to respect your privacy regarding any information we may collect from you across our website.
                        </p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
                        </p>
                        <ul>
                            <li><strong>Account Info:</strong> When you log in via Google, we collect your name, email address, and profile picture to identify you and display your profile.</li>
                            <li><strong>Usage Data:</strong> We may collect anonymous data about how you use our site to improve the service.</li>
                        </ul>

                        <h3>2. Use of Information</h3>
                        <p>
                            We use the collected information to:
                        </p>
                        <ul>
                            <li>Provide, operate, and maintain our website.</li>
                            <li>Improve, personalize, and expand our website.</li>
                            <li>Understand and analyze how you use our website.</li>
                            <li>Prevent fraud.</li>
                        </ul>

                        <h3>3. Data Sharing</h3>
                        <p>
                            We do not share any personally identifying information publicly or with third-parties, except when required to by law.
                        </p>

                        <h3>4. Your Rights</h3>
                        <p>
                            You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services. You may delete your account at any time.
                        </p>

                        <h3>5. Cookies</h3>
                        <p>
                            We use cookies to maintain your session and authentication state. By using Debrief, you consent to our use of cookies.
                        </p>

                        <h3>6. Contact Us</h3>
                        <p>
                            If you have any questions about our privacy policy or user data, please contact us at help@mulearn.org.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
