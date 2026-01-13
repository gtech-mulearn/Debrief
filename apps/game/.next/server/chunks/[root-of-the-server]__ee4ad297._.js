module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},23502,(e,t,r)=>{},95879,e=>{"use strict";e.i(23502),e.s(["publicEnv",0,{get NEXT_PUBLIC_SUPABASE_URL(){return"https://dgejklzxhjvnehbawadb.supabase.co"},get NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY(){return"sb_publishable_lARX_z11Ly0MR_Zh_Ik4Ig_m3SVIgh0"},get NEXT_PUBLIC_APP_URL(){return"http://localhost:3000"}},"serverEnv",0,{get SUPABASE_SECRET_KEY(){let e=process.env.SUPABASE_SECRET_KEY;if(!e)throw Error("Missing SUPABASE_SECRET_KEY in environment");return e},get REDIS_URL(){return process.env.REDIS_URL||null},get EMAIL_HOST(){return process.env.EMAIL_HOST||null},get EMAIL_HOST_USER(){return process.env.EMAIL_HOST_USER||null},get EMAIL_HOST_PASSWORD(){return process.env.EMAIL_HOST_PASSWORD||null},get EMAIL_PORT(){return parseInt(process.env.EMAIL_PORT||"587",10)},get FROM_MAIL(){return process.env.FROM_MAIL||"noreply@mulearn.org"},get isEmailConfigured(){return!!(process.env.EMAIL_HOST&&process.env.EMAIL_HOST_USER&&process.env.EMAIL_HOST_PASSWORD)}}])},92729,e=>{"use strict";var t=e.i(95879);let r={bgPrimary:"#0052FF",bgCard:"#0041CC",bgDark:"#001A4D",textPrimary:"#ffffff",textSecondary:"rgba(255, 255, 255, 0.85)",textMuted:"rgba(255, 255, 255, 0.6)",accent:"#ffffff",accentDark:"rgba(255, 255, 255, 0.1)",border:"rgba(255, 255, 255, 0.15)",borderLight:"rgba(255, 255, 255, 0.08)"};function n(e){let t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,e=>t[e]||e)}function a(e,t){return`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${n(t)}</title>
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
`.trim()}e.s(["COLORS",0,r,"escapeHtml",()=>n,"generateEmailBase",()=>a,"generateFooter",()=>i])},25868,e=>{"use strict";var t=e.i(95879),r=e.i(92729);function n(e){t.publicEnv.NEXT_PUBLIC_APP_URL;let n=`${t.publicEnv.NEXT_PUBLIC_APP_URL}/ideas/new`,a=e.userName.split(" ")[0]||"there",i=`
<!-- Main Container -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px;">
  <tr>
    <td style="padding: 20px;">
      <!-- Header Text -->
      <p style="margin: 0 0 8px 0; color: ${r.COLORS.textPrimary}; font-size: 14px; font-weight: 400; line-height: 1.4;">
        HEY ${(0,r.escapeHtml)(a.toUpperCase())},
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
            <a href="${n}" style="display: inline-block; background-color: ${r.COLORS.textPrimary}; color: ${r.COLORS.bgPrimary}; text-decoration: none; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 40px; border-radius: 6px;">
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
`;return(0,r.generateEmailBase)(i,"Welcome to Debrief")}function a(e){let r=`${t.publicEnv.NEXT_PUBLIC_APP_URL}/ideas/new`,n=e.userName.split(" ")[0]||"there";return`
HEY ${n.toUpperCase()},

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
`.trim()}e.s(["generateWelcomeEmailHtml",()=>n,"generateWelcomeEmailText",()=>a])},70998,e=>{"use strict";var t=e.i(47909),r=e.i(74017),n=e.i(96250),a=e.i(59756),i=e.i(61916),o=e.i(74677),s=e.i(69741),l=e.i(16795),p=e.i(87718),d=e.i(95169),c=e.i(47587),u=e.i(66012),g=e.i(70101),m=e.i(26937),x=e.i(10372),h=e.i(93695);e.i(52474);var E=e.i(5232),f=e.i(89171),R=e.i(25868);async function y(){let e=(0,R.generateWelcomeEmailHtml)({userName:"John Doe",userEmail:"john@example.com"});return new f.NextResponse(e,{headers:{"Content-Type":"text/html"}})}e.s(["GET",()=>y],61028);var S=e.i(61028);let b=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/preview/welcome-email/route",pathname:"/api/preview/welcome-email",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/apps/game/src/app/api/preview/welcome-email/route.ts",nextConfigOutput:"",userland:S}),{workAsyncStorage:O,workUnitAsyncStorage:v,serverHooks:C}=b;function A(){return(0,n.patchFetch)({workAsyncStorage:O,workUnitAsyncStorage:v})}async function T(e,t,n){b.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let f="/api/preview/welcome-email/route";f=f.replace(/\/index$/,"")||"/";let R=await b.prepare(e,t,{srcPage:f,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:y,params:S,nextConfig:O,parsedUrl:v,isDraftMode:C,prerenderManifest:A,routerServerContext:T,isOnDemandRevalidate:w,revalidateOnlyGenerated:_,resolvedPathname:P,clientReferenceManifest:I,serverActionsManifest:L}=R,U=(0,s.normalizeAppPath)(f),D=!!(A.dynamicRoutes[U]||A.routes[P]),H=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,v,!1):t.end("This page could not be found"),null);if(D&&!C){let e=!!A.routes[P],t=A.dynamicRoutes[U];if(t&&!1===t.fallback&&!e){if(O.experimental.adapterPath)return await H();throw new h.NoFallbackError}}let M=null;!D||b.isDev||C||(M="/index"===(M=P)?"/":M);let N=!0===b.isDev||!D,$=D&&!N;L&&I&&(0,o.setManifestsSingleton)({page:f,clientReferenceManifest:I,serverActionsManifest:L});let k=e.method||"GET",B=(0,i.getTracer)(),F=B.getActiveScopeSpan(),q={params:S,prerenderManifest:A,renderOpts:{experimental:{authInterrupts:!!O.experimental.authInterrupts},cacheComponents:!!O.cacheComponents,supportsDynamicResponse:N,incrementalCache:(0,a.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:O.cacheLife,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,a)=>b.onRequestError(e,t,n,a,T)},sharedContext:{buildId:y}},j=new l.NodeNextRequest(e),z=new l.NodeNextResponse(t),Y=p.NextRequestAdapter.fromNodeNextRequest(j,(0,p.signalFromNodeResponse)(t));try{let o=async e=>b.handle(Y,q).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=B.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${k} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${k} ${f}`)}),s=!!(0,a.getRequestMeta)(e,"minimalMode"),l=async a=>{var i,l;let p=async({previousCacheEntry:r})=>{try{if(!s&&w&&_&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await o(a);e.fetchMetrics=q.renderOpts.fetchMetrics;let l=q.renderOpts.pendingWaitUntil;l&&n.waitUntil&&(n.waitUntil(l),l=void 0);let p=q.renderOpts.collectedTags;if(!D)return await (0,u.sendResponse)(j,z,i,q.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(i.headers);p&&(t[x.NEXT_CACHE_TAGS_HEADER]=p),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==q.renderOpts.collectedRevalidate&&!(q.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&q.renderOpts.collectedRevalidate,n=void 0===q.renderOpts.collectedExpire||q.renderOpts.collectedExpire>=x.INFINITE_CACHE?void 0:q.renderOpts.collectedExpire;return{value:{kind:E.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==r?void 0:r.isStale)&&await b.onRequestError(e,t,{routerKind:"App Router",routePath:f,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:$,isOnDemandRevalidate:w})},!1,T),t}},d=await b.handleResponse({req:e,nextConfig:O,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:A,isRoutePPREnabled:!1,isOnDemandRevalidate:w,revalidateOnlyGenerated:_,responseGenerator:p,waitUntil:n.waitUntil,isMinimalMode:s});if(!D)return null;if((null==d||null==(i=d.value)?void 0:i.kind)!==E.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",w?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let h=(0,g.fromNodeOutgoingHttpHeaders)(d.value.headers);return s&&D||h.delete(x.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||h.get("Cache-Control")||h.set("Cache-Control",(0,m.getCacheControlHeader)(d.cacheControl)),await (0,u.sendResponse)(j,z,new Response(d.value.body,{headers:h,status:d.value.status||200})),null};F?await l(F):await B.withPropagatedContext(e.headers,()=>B.trace(d.BaseServerSpan.handleRequest,{spanName:`${k} ${f}`,kind:i.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},l))}catch(t){if(t instanceof h.NoFallbackError||await b.onRequestError(e,t,{routerKind:"App Router",routePath:U,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:$,isOnDemandRevalidate:w})},!1,T),D)throw t;return await (0,u.sendResponse)(j,z,new Response(null,{status:500})),null}}e.s(["handler",()=>T,"patchFetch",()=>A,"routeModule",()=>b,"serverHooks",()=>C,"workAsyncStorage",()=>O,"workUnitAsyncStorage",()=>v],70998)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__ee4ad297._.js.map