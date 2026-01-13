module.exports=[93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},23502,(e,t,r)=>{},13212,e=>{"use strict";e.i(23502),e.s(["publicEnv",0,{get NEXT_PUBLIC_SUPABASE_URL(){return"https://dgejklzxhjvnehbawadb.supabase.co"},get NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY(){return"sb_publishable_lARX_z11Ly0MR_Zh_Ik4Ig_m3SVIgh0"},get NEXT_PUBLIC_APP_URL(){return"http://localhost:3000"}},"serverEnv",0,{get SUPABASE_SECRET_KEY(){let e=process.env.SUPABASE_SECRET_KEY;if(!e)throw Error("Missing SUPABASE_SECRET_KEY in environment");return e},get REDIS_URL(){return process.env.REDIS_URL||null},get EMAIL_HOST(){return process.env.EMAIL_HOST||null},get EMAIL_HOST_USER(){return process.env.EMAIL_HOST_USER||null},get EMAIL_HOST_PASSWORD(){return process.env.EMAIL_HOST_PASSWORD||null},get EMAIL_PORT(){return parseInt(process.env.EMAIL_PORT||"587",10)},get FROM_MAIL(){return process.env.FROM_MAIL||"noreply@mulearn.org"},get isEmailConfigured(){return!!(process.env.EMAIL_HOST&&process.env.EMAIL_HOST_USER&&process.env.EMAIL_HOST_PASSWORD)}}])},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},27699,(e,t,r)=>{t.exports=e.x("events",()=>require("events"))},92509,(e,t,r)=>{t.exports=e.x("url",()=>require("url"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},88947,(e,t,r)=>{t.exports=e.x("stream",()=>require("stream"))},4446,(e,t,r)=>{t.exports=e.x("net",()=>require("net"))},79594,(e,t,r)=>{t.exports=e.x("dns",()=>require("dns"))},46786,(e,t,r)=>{t.exports=e.x("os",()=>require("os"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},55004,(e,t,r)=>{t.exports=e.x("tls",()=>require("tls"))},44787,e=>{"use strict";var t=e.i(13212);let r={bgPrimary:"#0052FF",bgCard:"#0041CC",bgDark:"#001A4D",textPrimary:"#ffffff",textSecondary:"rgba(255, 255, 255, 0.85)",textMuted:"rgba(255, 255, 255, 0.6)",accent:"#ffffff",accentDark:"rgba(255, 255, 255, 0.1)",border:"rgba(255, 255, 255, 0.15)",borderLight:"rgba(255, 255, 255, 0.08)"};function a(e){let t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,e=>t[e]||e)}function n(e,t){return`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${a(t)}</title>
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
`.trim()}function i(e){return`
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
`.trim()}e.s(["COLORS",0,r,"escapeHtml",()=>a,"generateEmailBase",()=>n,"generateFooter",()=>i])},90566,e=>{"use strict";var t=e.i(13212),r=e.i(44787);function a(e){t.publicEnv.NEXT_PUBLIC_APP_URL;let a=`${t.publicEnv.NEXT_PUBLIC_APP_URL}/ideas/new`,n=e.userName.split(" ")[0]||"there",i=`
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
            <a href="${a}" style="display: inline-block; background-color: ${r.COLORS.textPrimary}; color: ${r.COLORS.bgPrimary}; text-decoration: none; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 40px; border-radius: 6px;">
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
`;return(0,r.generateEmailBase)(i,"Welcome to Debrief")}function n(e){let r=`${t.publicEnv.NEXT_PUBLIC_APP_URL}/ideas/new`,a=e.userName.split(" ")[0]||"there";return`
HEY ${a.toUpperCase()},

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
`.trim()}e.s(["generateWelcomeEmailHtml",()=>a,"generateWelcomeEmailText",()=>n])},65998,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),i=e.i(61916),o=e.i(74677),s=e.i(69741),l=e.i(16795),p=e.i(87718),d=e.i(95169),c=e.i(47587),u=e.i(66012),g=e.i(70101),m=e.i(26937),x=e.i(10372),h=e.i(93695);e.i(52474);var f=e.i(5232),E=e.i(33780),R=e.i(89171),y=e.i(50494),b=e.i(90566);async function S(e){let{searchParams:t,origin:r}=new URL(e.url),a=t.get("code");if(a){let e=await (0,E.createServerClient)(),{data:t,error:n}=await e.auth.exchangeCodeForSession(a);if(!n&&t?.user){let a=t.user,{data:n,error:i}=await e.from("profiles").select("id, created_at").eq("id",a.id).single(),o=!n||n.created_at&&Date.now()-new Date(n.created_at).getTime()<3e5;return console.log(`[Auth Callback] User ${a.email}: isNewUser=${o}, profile=${n?"exists":"none"}`),o&&a.email&&(console.log(`[Auth Callback] Sending welcome email to ${a.email}`),(0,y.sendEmail)({to:a.email,subject:"Welcome to Debrief — Let's Build Something Great",html:(0,b.generateWelcomeEmailHtml)({userName:a.user_metadata?.full_name||a.email.split("@")[0],userEmail:a.email}),text:(0,b.generateWelcomeEmailText)({userName:a.user_metadata?.full_name||a.email.split("@")[0],userEmail:a.email})}).then(()=>{console.log(`[Auth Callback] Welcome email sent successfully to ${a.email}`)}).catch(e=>{console.error("[Auth Callback] Failed to send welcome email:",e)})),R.NextResponse.redirect(`${r}/auth/redirect`)}}return R.NextResponse.redirect(`${r}/login?error=auth_callback_error`)}e.s(["GET",()=>S],30618);var O=e.i(30618);let v=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/auth/callback/route",pathname:"/auth/callback",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/apps/web/src/app/auth/callback/route.ts",nextConfigOutput:"",userland:O}),{workAsyncStorage:C,workUnitAsyncStorage:A,serverHooks:_}=v;function T(){return(0,a.patchFetch)({workAsyncStorage:C,workUnitAsyncStorage:A})}async function w(e,t,a){v.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let E="/auth/callback/route";E=E.replace(/\/index$/,"")||"/";let R=await v.prepare(e,t,{srcPage:E,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:y,params:b,nextConfig:S,parsedUrl:O,isDraftMode:C,prerenderManifest:A,routerServerContext:_,isOnDemandRevalidate:T,revalidateOnlyGenerated:w,resolvedPathname:P,clientReferenceManifest:L,serverActionsManifest:I}=R,U=(0,s.normalizeAppPath)(E),$=!!(A.dynamicRoutes[U]||A.routes[P]),D=async()=>((null==_?void 0:_.render404)?await _.render404(e,t,O,!1):t.end("This page could not be found"),null);if($&&!C){let e=!!A.routes[P],t=A.dynamicRoutes[U];if(t&&!1===t.fallback&&!e){if(S.experimental.adapterPath)return await D();throw new h.NoFallbackError}}let N=null;!$||v.isDev||C||(N="/index"===(N=P)?"/":N);let H=!0===v.isDev||!$,M=$&&!H;I&&L&&(0,o.setManifestsSingleton)({page:E,clientReferenceManifest:L,serverActionsManifest:I});let k=e.method||"GET",q=(0,i.getTracer)(),B=q.getActiveScopeSpan(),F={params:b,prerenderManifest:A,renderOpts:{experimental:{authInterrupts:!!S.experimental.authInterrupts},cacheComponents:!!S.cacheComponents,supportsDynamicResponse:H,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:S.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>v.onRequestError(e,t,a,n,_)},sharedContext:{buildId:y}},j=new l.NodeNextRequest(e),z=new l.NodeNextResponse(t),W=p.NextRequestAdapter.fromNodeNextRequest(j,(0,p.signalFromNodeResponse)(t));try{let o=async e=>v.handle(W,F).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=q.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${k} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${k} ${E}`)}),s=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var i,l;let p=async({previousCacheEntry:r})=>{try{if(!s&&T&&w&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await o(n);e.fetchMetrics=F.renderOpts.fetchMetrics;let l=F.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let p=F.renderOpts.collectedTags;if(!$)return await (0,u.sendResponse)(j,z,i,F.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(i.headers);p&&(t[x.NEXT_CACHE_TAGS_HEADER]=p),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==F.renderOpts.collectedRevalidate&&!(F.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&F.renderOpts.collectedRevalidate,a=void 0===F.renderOpts.collectedExpire||F.renderOpts.collectedExpire>=x.INFINITE_CACHE?void 0:F.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await v.onRequestError(e,t,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:T})},!1,_),t}},d=await v.handleResponse({req:e,nextConfig:S,cacheKey:N,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:A,isRoutePPREnabled:!1,isOnDemandRevalidate:T,revalidateOnlyGenerated:w,responseGenerator:p,waitUntil:a.waitUntil,isMinimalMode:s});if(!$)return null;if((null==d||null==(i=d.value)?void 0:i.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",T?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let h=(0,g.fromNodeOutgoingHttpHeaders)(d.value.headers);return s&&$||h.delete(x.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||h.get("Cache-Control")||h.set("Cache-Control",(0,m.getCacheControlHeader)(d.cacheControl)),await (0,u.sendResponse)(j,z,new Response(d.value.body,{headers:h,status:d.value.status||200})),null};B?await l(B):await q.withPropagatedContext(e.headers,()=>q.trace(d.BaseServerSpan.handleRequest,{spanName:`${k} ${E}`,kind:i.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},l))}catch(t){if(t instanceof h.NoFallbackError||await v.onRequestError(e,t,{routerKind:"App Router",routePath:U,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:T})},!1,_),$)throw t;return await (0,u.sendResponse)(j,z,new Response(null,{status:500})),null}}e.s(["handler",()=>w,"patchFetch",()=>T,"routeModule",()=>v,"serverHooks",()=>_,"workAsyncStorage",()=>C,"workUnitAsyncStorage",()=>A],65998)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__ddf1a58b._.js.map