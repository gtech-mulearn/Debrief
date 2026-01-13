"use client";

import { Header } from "@/components/layout";

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="mx-auto w-full max-w-[1000px] px-4 md:px-8 pt-32 pb-20">
                <div className="space-y-8">
                    <div className="border-b border-white/5 pb-8">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            Terms of Service
                        </h1>
                        <p className="font-sans text-lg text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="prose prose-invert prose-zinc max-w-none">
                        <p className="text-lg text-muted-foreground/80 leading-relaxed">
                            Welcome to Debrief. By accessing or using our platform, you agree to be bound by these Terms of Service.
                        </p>

                        <h3>1. Acceptance of Terms</h3>
                        <p>
                            By accessing Debrief, you confirm that you have read, understood, and agree to these terms. If you do not agree, you must not use our service.
                        </p>

                        <h3>2. Description of Service</h3>
                        <p>
                            Debrief is a platform for validating startup ideas through community feedback ("Service"). We provide tools for posting ideas, gathering votes, and analyzing feedback. Use of the Service is at your own risk.
                        </p>

                        <h3>3. User Accounts</h3>
                        <p>
                            You must provide accurate information when creating an account via Google Auth. You are responsible for maintaining the security of your account and for all activities that occur under your account.
                        </p>

                        <h3>4. Content and Conduct</h3>
                        <p>
                            You retain ownership of the ideas you post. However, by posting, you grant Debrief a license to display and distribute your content on the platform. You agree not to post illegal, abusive, or harmful content. We reserve the right to remove any content.
                        </p>

                        <h3>5. Termination</h3>
                        <p>
                            We may terminate or suspend your account at any time, without prior notice or liability, for any reason, including breach of these Terms.
                        </p>

                        <h3>6. Limitation of Liability</h3>
                        <p>
                            Debrief is provided "as is". We are not liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the Service.
                        </p>

                        <h3>7. Changes to Terms</h3>
                        <p>
                            We reserve the right to modify these terms at any time. We will notify users of significant changes. Continued use of the Service constitutes acceptance of new terms.
                        </p>

                        <h3>8. Contact</h3>
                        <p>
                            For any questions regarding these Terms, please contact us at help@mulearn.org.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
