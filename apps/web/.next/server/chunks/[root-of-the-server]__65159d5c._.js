module.exports=[93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},23502,(e,t,r)=>{},13212,e=>{"use strict";e.i(23502),e.s(["publicEnv",0,{get NEXT_PUBLIC_SUPABASE_URL(){return"https://dgejklzxhjvnehbawadb.supabase.co"},get NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY(){return"sb_publishable_lARX_z11Ly0MR_Zh_Ik4Ig_m3SVIgh0"},get NEXT_PUBLIC_APP_URL(){return"http://localhost:3000"}},"serverEnv",0,{get SUPABASE_SECRET_KEY(){let e=process.env.SUPABASE_SECRET_KEY;if(!e)throw Error("Missing SUPABASE_SECRET_KEY in environment");return e},get REDIS_URL(){return process.env.REDIS_URL||null},get EMAIL_HOST(){return process.env.EMAIL_HOST||null},get EMAIL_HOST_USER(){return process.env.EMAIL_HOST_USER||null},get EMAIL_HOST_PASSWORD(){return process.env.EMAIL_HOST_PASSWORD||null},get EMAIL_PORT(){return parseInt(process.env.EMAIL_PORT||"587",10)},get FROM_MAIL(){return process.env.FROM_MAIL||"noreply@mulearn.org"},get isEmailConfigured(){return!!(process.env.EMAIL_HOST&&process.env.EMAIL_HOST_USER&&process.env.EMAIL_HOST_PASSWORD)}}])},44787,e=>{"use strict";var t=e.i(13212);let r={bgPrimary:"#0052FF",bgCard:"#0041CC",bgDark:"#001A4D",textPrimary:"#ffffff",textSecondary:"rgba(255, 255, 255, 0.85)",textMuted:"rgba(255, 255, 255, 0.6)",accent:"#ffffff",accentDark:"rgba(255, 255, 255, 0.1)",border:"rgba(255, 255, 255, 0.15)",borderLight:"rgba(255, 255, 255, 0.08)"};function n(e){let t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,e=>t[e]||e)}function i(e,t){return`
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
`.trim()}e.s(["COLORS",0,r,"escapeHtml",()=>n,"generateEmailBase",()=>i,"generateFooter",()=>a])},62807,e=>{"use strict";var t=e.i(13212),r=e.i(44787);let n={viewer:"Viewer",editor:"Editor",admin:"Admin"},i={viewer:"View the idea and track progress",editor:"Edit the idea and provide feedback",admin:"Full access including team management"};function a(e){return`${t.publicEnv.NEXT_PUBLIC_APP_URL}/invites/${e}/accept`}function o(e){let t=a(e.inviteToken),o=n[e.role]||e.role,s=i[e.role]||"",l=`
<!-- Main Container -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px;">
  <tr>
    <td style="padding: 20px;">
      <!-- Header Text -->
      <p style="margin: 0 0 8px 0; color: ${r.COLORS.textPrimary}; font-size: 14px; font-weight: 400; line-height: 1.4;">
        HEY,
      </p>
      <p style="margin: 0 0 32px 0; color: ${r.COLORS.textPrimary}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.5;">
        ${(0,r.escapeHtml)(e.inviterName.toUpperCase())} HAS INVITED YOU TO COLLABORATE ON AN IDEA:
      </p>

      <!-- Idea Card -->
      <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; background-color: ${r.COLORS.bgCard}; border-radius: 16px; margin-bottom: 32px;">
        <tr>
          <td style="padding: 32px;">
            <!-- Idea Number/Indicator -->
            <p style="margin: 0 0 8px 0; color: ${r.COLORS.textMuted}; font-size: 32px; font-weight: 300; font-family: monospace;">
              //01
            </p>
            <!-- Idea Title -->
            <h1 style="margin: 0 0 16px 0; color: ${r.COLORS.textPrimary}; font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.2;">
              ${(0,r.escapeHtml)(e.ideaTitle)}
            </h1>
            <!-- Role Info -->
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding-right: 24px;">
                  <p style="margin: 0 0 4px 0; color: ${r.COLORS.textMuted}; font-size: 10px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.1em;">
                    YOUR ROLE
                  </p>
                  <p style="margin: 0; color: ${r.COLORS.textPrimary}; font-size: 13px; font-weight: 600;">
                    ${o}
                  </p>
                </td>
                <td>
                  <p style="margin: 0 0 4px 0; color: ${r.COLORS.textMuted}; font-size: 10px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.1em;">
                    ACCESS
                  </p>
                  <p style="margin: 0; color: ${r.COLORS.textPrimary}; font-size: 13px; font-weight: 600;">
                    ${s}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Description Text -->
      <p style="margin: 0 0 24px 0; color: ${r.COLORS.textPrimary}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.6;">
        CLICK THE BUTTON BELOW TO JOIN THE TEAM AND START COLLABORATING. YOU'LL GET ACCESS TO ALL THE DETAILS INSTANTLY.
      </p>

      <!-- CTA Button -->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding: 8px 0 32px 0;">
            <a href="${t}" style="display: inline-block; background-color: ${r.COLORS.textPrimary}; color: ${r.COLORS.bgPrimary}; text-decoration: none; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 16px 40px; border-radius: 6px;">
              Accept Invitation
            </a>
          </td>
        </tr>
      </table>

      <!-- Expiry Notice -->
      <p style="margin: 0 0 16px 0; color: ${r.COLORS.textSecondary}; font-size: 12px; line-height: 1.5;">
        This invitation expires in 7 days. If you didn't expect this, just ignore it.
      </p>

      <!-- Divider -->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top: 1px solid ${r.COLORS.border}; margin-top: 24px;">
        <tr>
          <td style="padding-top: 24px;">
            <p style="margin: 0 0 8px 0; color: ${r.COLORS.textMuted}; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">
              CAN'T CLICK THE BUTTON?
            </p>
            <p style="margin: 0; color: ${r.COLORS.textSecondary}; font-size: 12px; line-height: 1.5; word-break: break-all;">
              ${t}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

${(0,r.generateFooter)("You received this because someone invited you to collaborate on Debrief.")}
`;return(0,r.generateEmailBase)(l,"You're invited to collaborate")}function s(e){let t=a(e.inviteToken),r=n[e.role]||e.role,o=i[e.role]||"";return`
HEY,

${e.inviterName.toUpperCase()} HAS INVITED YOU TO COLLABORATE ON AN IDEA:

"${e.ideaTitle}"

Your Role: ${r}
Access: ${o}

Click here to accept: ${t}

This invitation expires in 7 days.

---
You received this because someone invited you to collaborate on Debrief.
`.trim()}e.s(["generateInviteEmailHtml",()=>o,"generateInviteEmailText",()=>s])},16882,e=>{"use strict";var t=e.i(47909),r=e.i(74017),n=e.i(96250),i=e.i(59756),a=e.i(61916),o=e.i(74677),s=e.i(69741),l=e.i(16795),p=e.i(87718),d=e.i(95169),c=e.i(47587),u=e.i(66012),g=e.i(70101),x=e.i(26937),m=e.i(10372),h=e.i(93695);e.i(52474);var f=e.i(5232),E=e.i(89171),v=e.i(62807);async function R(){let e=(0,v.generateInviteEmailHtml)({recipientEmail:"invitee@example.com",inviterName:"Jane Smith",ideaTitle:"Revolutionary AI Health Assistant",role:"editor",inviteToken:"demo-token-123"});return new E.NextResponse(e,{headers:{"Content-Type":"text/html"}})}e.s(["GET",()=>R],80015);var y=e.i(80015);let O=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/preview/invite-email/route",pathname:"/api/preview/invite-email",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/apps/web/src/app/api/preview/invite-email/route.ts",nextConfigOutput:"",userland:y}),{workAsyncStorage:b,workUnitAsyncStorage:A,serverHooks:S}=O;function C(){return(0,n.patchFetch)({workAsyncStorage:b,workUnitAsyncStorage:A})}async function T(e,t,n){O.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let E="/api/preview/invite-email/route";E=E.replace(/\/index$/,"")||"/";let v=await O.prepare(e,t,{srcPage:E,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:R,params:y,nextConfig:b,parsedUrl:A,isDraftMode:S,prerenderManifest:C,routerServerContext:T,isOnDemandRevalidate:w,revalidateOnlyGenerated:_,resolvedPathname:I,clientReferenceManifest:L,serverActionsManifest:P}=v,N=(0,s.normalizeAppPath)(E),U=!!(C.dynamicRoutes[N]||C.routes[I]),$=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,A,!1):t.end("This page could not be found"),null);if(U&&!S){let e=!!C.routes[I],t=C.dynamicRoutes[N];if(t&&!1===t.fallback&&!e){if(b.experimental.adapterPath)return await $();throw new h.NoFallbackError}}let H=null;!U||O.isDev||S||(H="/index"===(H=I)?"/":H);let k=!0===O.isDev||!U,M=U&&!k;P&&L&&(0,o.setManifestsSingleton)({page:E,clientReferenceManifest:L,serverActionsManifest:P});let D=e.method||"GET",B=(0,a.getTracer)(),q=B.getActiveScopeSpan(),j={params:y,prerenderManifest:C,renderOpts:{experimental:{authInterrupts:!!b.experimental.authInterrupts},cacheComponents:!!b.cacheComponents,supportsDynamicResponse:k,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:b.cacheLife,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,i)=>O.onRequestError(e,t,n,i,T)},sharedContext:{buildId:R}},z=new l.NodeNextRequest(e),F=new l.NodeNextResponse(t),Y=p.NextRequestAdapter.fromNodeNextRequest(z,(0,p.signalFromNodeResponse)(t));try{let o=async e=>O.handle(Y,j).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=B.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${D} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${D} ${E}`)}),s=!!(0,i.getRequestMeta)(e,"minimalMode"),l=async i=>{var a,l;let p=async({previousCacheEntry:r})=>{try{if(!s&&w&&_&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await o(i);e.fetchMetrics=j.renderOpts.fetchMetrics;let l=j.renderOpts.pendingWaitUntil;l&&n.waitUntil&&(n.waitUntil(l),l=void 0);let p=j.renderOpts.collectedTags;if(!U)return await (0,u.sendResponse)(z,F,a,j.renderOpts.pendingWaitUntil),null;{let e=await a.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(a.headers);p&&(t[m.NEXT_CACHE_TAGS_HEADER]=p),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==j.renderOpts.collectedRevalidate&&!(j.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&j.renderOpts.collectedRevalidate,n=void 0===j.renderOpts.collectedExpire||j.renderOpts.collectedExpire>=m.INFINITE_CACHE?void 0:j.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==r?void 0:r.isStale)&&await O.onRequestError(e,t,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:w})},!1,T),t}},d=await O.handleResponse({req:e,nextConfig:b,cacheKey:H,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:w,revalidateOnlyGenerated:_,responseGenerator:p,waitUntil:n.waitUntil,isMinimalMode:s});if(!U)return null;if((null==d||null==(a=d.value)?void 0:a.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",w?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let h=(0,g.fromNodeOutgoingHttpHeaders)(d.value.headers);return s&&U||h.delete(m.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||h.get("Cache-Control")||h.set("Cache-Control",(0,x.getCacheControlHeader)(d.cacheControl)),await (0,u.sendResponse)(z,F,new Response(d.value.body,{headers:h,status:d.value.status||200})),null};q?await l(q):await B.withPropagatedContext(e.headers,()=>B.trace(d.BaseServerSpan.handleRequest,{spanName:`${D} ${E}`,kind:a.SpanKind.SERVER,attributes:{"http.method":D,"http.target":e.url}},l))}catch(t){if(t instanceof h.NoFallbackError||await O.onRequestError(e,t,{routerKind:"App Router",routePath:N,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:w})},!1,T),U)throw t;return await (0,u.sendResponse)(z,F,new Response(null,{status:500})),null}}e.s(["handler",()=>T,"patchFetch",()=>C,"routeModule",()=>O,"serverHooks",()=>S,"workAsyncStorage",()=>b,"workUnitAsyncStorage",()=>A],16882)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__65159d5c._.js.map