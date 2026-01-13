module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},23502,(e,t,r)=>{},95879,e=>{"use strict";e.i(23502),e.s(["publicEnv",0,{get NEXT_PUBLIC_SUPABASE_URL(){return"https://dgejklzxhjvnehbawadb.supabase.co"},get NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY(){return"sb_publishable_lARX_z11Ly0MR_Zh_Ik4Ig_m3SVIgh0"},get NEXT_PUBLIC_APP_URL(){return"http://localhost:3000"}},"serverEnv",0,{get SUPABASE_SECRET_KEY(){let e=process.env.SUPABASE_SECRET_KEY;if(!e)throw Error("Missing SUPABASE_SECRET_KEY in environment");return e},get REDIS_URL(){return process.env.REDIS_URL||null},get EMAIL_HOST(){return process.env.EMAIL_HOST||null},get EMAIL_HOST_USER(){return process.env.EMAIL_HOST_USER||null},get EMAIL_HOST_PASSWORD(){return process.env.EMAIL_HOST_PASSWORD||null},get EMAIL_PORT(){return parseInt(process.env.EMAIL_PORT||"587",10)},get FROM_MAIL(){return process.env.FROM_MAIL||"noreply@mulearn.org"},get isEmailConfigured(){return!!(process.env.EMAIL_HOST&&process.env.EMAIL_HOST_USER&&process.env.EMAIL_HOST_PASSWORD)}}])},92729,e=>{"use strict";var t=e.i(95879);let r={bgPrimary:"#0052FF",bgCard:"#0041CC",bgDark:"#001A4D",textPrimary:"#ffffff",textSecondary:"rgba(255, 255, 255, 0.85)",textMuted:"rgba(255, 255, 255, 0.6)",accent:"#ffffff",accentDark:"rgba(255, 255, 255, 0.1)",border:"rgba(255, 255, 255, 0.15)",borderLight:"rgba(255, 255, 255, 0.08)"};function i(e){let t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,e=>t[e]||e)}function n(e,t){return`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${i(t)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${r.bgPrimary}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${r.bgPrimary};">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        ${e}
      </td>
    </tr>
  </table>
</body>
</html>
`.trim()}function a(e){return`
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px;">
  <tr>
    <td style="padding: 32px 20px;">
      <p style="margin: 0; color: ${r.textMuted}; font-size: 12px; line-height: 1.5; text-align: center;">
        ${e||"You received this email from Debrief."}<br>
        <a href="${t.publicEnv.NEXT_PUBLIC_APP_URL}" style="color: ${r.textSecondary}; text-decoration: none;">debrief.app</a>
      </p>
    </td>
  </tr>
</table>
`.trim()}e.s(["COLORS",0,r,"escapeHtml",()=>i,"generateEmailBase",()=>n,"generateFooter",()=>a])},25868,e=>{"use strict";var t=e.i(95879),r=e.i(92729);function i(e){t.publicEnv.NEXT_PUBLIC_APP_URL;let i=`${t.publicEnv.NEXT_PUBLIC_APP_URL}/ideas/new`,n=e.userName.split(" ")[0]||"there",a=`
<!-- Main Container -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px;">
  <tr>
    <td style="padding: 20px;">
      <!-- Header Text -->
      <p style="margin: 0 0 8px 0; color: ${r.COLORS.textPrimary}; font-size: 14px; font-weight: 400; line-height: 1.4;">
        HEY ${(0,r.escapeHtml)(n.toUpperCase())},
      </p>
      <p style="margin: 0 0 32px 0; color: ${r.COLORS.textPrimary}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.5;">
        WELCOME TO DEBRIEF — YOUR IDEAS JUST GOT A NEW HOME.
      </p>

      <!-- Welcome Card -->
      <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; background-color: ${r.COLORS.bgCard}; border-radius: 16px; margin-bottom: 32px;">
        <tr>
          <td style="padding: 32px;">
            <!-- Indicator -->
            <p style="margin: 0 0 8px 0; color: ${r.COLORS.textMuted}; font-size: 32px; font-weight: 300; font-family: monospace;">
              //00
            </p>
            <!-- Title -->
            <h1 style="margin: 0 0 16px 0; color: ${r.COLORS.textPrimary}; font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.2;">
              THE FORGE
            </h1>
            <!-- Info -->
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding-right: 24px;">
                  <p style="margin: 0 0 4px 0; color: ${r.COLORS.textMuted}; font-size: 10px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.1em;">
                    STATUS
                  </p>
                  <p style="margin: 0; color: ${r.COLORS.textPrimary}; font-size: 13px; font-weight: 600;">
                    Ready to build
                  </p>
                </td>
                <td>
                  <p style="margin: 0 0 4px 0; color: ${r.COLORS.textMuted}; font-size: 10px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.1em;">
                    ACCESS
                  </p>
                  <p style="margin: 0; color: ${r.COLORS.textPrimary}; font-size: 13px; font-weight: 600;">
                    Full platform access
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Description Text -->
      <p style="margin: 0 0 24px 0; color: ${r.COLORS.textPrimary}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.6;">
        DEBRIEF IS WHERE YOUR IDEAS GET VALIDATED, REFINED, AND PROVEN BEFORE YOU BUILD. THINK OF IT AS YOUR IDEA'S GYM — WE'LL HELP YOU STRESS-TEST IT.
      </p>

      <!-- What's Next -->
      <p style="margin: 0 0 16px 0; color: ${r.COLORS.textSecondary}; font-size: 13px; line-height: 1.6;">
        Here's what you can do:
      </p>
      <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0;">
            <p style="margin: 0; color: ${r.COLORS.textPrimary}; font-size: 13px; font-weight: 600;">
              → Submit your first idea and get community feedback
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0;">
            <p style="margin: 0; color: ${r.COLORS.textPrimary}; font-size: 13px; font-weight: 600;">
              → Level up through the forge to refine your concept
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0;">
            <p style="margin: 0; color: ${r.COLORS.textPrimary}; font-size: 13px; font-weight: 600;">
              → Invite collaborators to help shape your vision
            </p>
          </td>
        </tr>
      </table>

      <!-- CTA Button -->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding: 8px 0 32px 0;">
            <a href="${i}" style="display: inline-block; background-color: ${r.COLORS.textPrimary}; color: ${r.COLORS.bgPrimary}; text-decoration: none; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 40px; border-radius: 6px;">
              Create Your First Idea
            </a>
          </td>
        </tr>
      </table>

      <!-- Closing -->
      <p style="margin: 0 0 8px 0; color: ${r.COLORS.textPrimary}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.6;">
        LET'S MAKE SOMETHING GREAT.
      </p>
      <p style="margin: 0; color: ${r.COLORS.textSecondary}; font-size: 13px; line-height: 1.5;">
        — The Debrief Team
      </p>
    </td>
  </tr>
</table>

${(0,r.generateFooter)("You received this because you signed up for Debrief.")}
`;return(0,r.generateEmailBase)(a,"Welcome to Debrief")}function n(e){let r=`${t.publicEnv.NEXT_PUBLIC_APP_URL}/ideas/new`,i=e.userName.split(" ")[0]||"there";return`
HEY ${i.toUpperCase()},

WELCOME TO DEBRIEF — YOUR IDEAS JUST GOT A NEW HOME.

Debrief is where your ideas get validated, refined, and proven before you build. Think of it as your idea's gym — we'll help you stress-test it.

Here's what you can do:
→ Submit your first idea and get community feedback
→ Level up through the forge to refine your concept
→ Invite collaborators to help shape your vision

Create your first idea: ${r}

LET'S MAKE SOMETHING GREAT.

— The Debrief Team

---
You received this because you signed up for Debrief.
`.trim()}e.s(["generateWelcomeEmailHtml",()=>i,"generateWelcomeEmailText",()=>n])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__39b037b0._.js.map