module.exports=[93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},23502,(e,t,r)=>{},13212,e=>{"use strict";e.i(23502),e.s(["publicEnv",0,{get NEXT_PUBLIC_SUPABASE_URL(){return"https://dgejklzxhjvnehbawadb.supabase.co"},get NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY(){return"sb_publishable_lARX_z11Ly0MR_Zh_Ik4Ig_m3SVIgh0"},get NEXT_PUBLIC_APP_URL(){return"http://localhost:3000"}},"serverEnv",0,{get SUPABASE_SECRET_KEY(){let e=process.env.SUPABASE_SECRET_KEY;if(!e)throw Error("Missing SUPABASE_SECRET_KEY in environment");return e},get REDIS_URL(){return process.env.REDIS_URL||null},get EMAIL_HOST(){return process.env.EMAIL_HOST||null},get EMAIL_HOST_USER(){return process.env.EMAIL_HOST_USER||null},get EMAIL_HOST_PASSWORD(){return process.env.EMAIL_HOST_PASSWORD||null},get EMAIL_PORT(){return parseInt(process.env.EMAIL_PORT||"587",10)},get FROM_MAIL(){return process.env.FROM_MAIL||"noreply@mulearn.org"},get isEmailConfigured(){return!!(process.env.EMAIL_HOST&&process.env.EMAIL_HOST_USER&&process.env.EMAIL_HOST_PASSWORD)}}])},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},27699,(e,t,r)=>{t.exports=e.x("events",()=>require("events"))},92509,(e,t,r)=>{t.exports=e.x("url",()=>require("url"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},88947,(e,t,r)=>{t.exports=e.x("stream",()=>require("stream"))},4446,(e,t,r)=>{t.exports=e.x("net",()=>require("net"))},79594,(e,t,r)=>{t.exports=e.x("dns",()=>require("dns"))},46786,(e,t,r)=>{t.exports=e.x("os",()=>require("os"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},55004,(e,t,r)=>{t.exports=e.x("tls",()=>require("tls"))},44787,e=>{"use strict";var t=e.i(13212);let r={bgPrimary:"#0052FF",bgCard:"#0041CC",bgDark:"#001A4D",textPrimary:"#ffffff",textSecondary:"rgba(255, 255, 255, 0.85)",textMuted:"rgba(255, 255, 255, 0.6)",accent:"#ffffff",accentDark:"rgba(255, 255, 255, 0.1)",border:"rgba(255, 255, 255, 0.15)",borderLight:"rgba(255, 255, 255, 0.08)"};function i(e){let t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,e=>t[e]||e)}function a(e,t){return`
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
`.trim()}function n(e){return`
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
`.trim()}e.s(["COLORS",0,r,"escapeHtml",()=>i,"generateEmailBase",()=>a,"generateFooter",()=>n])},62807,e=>{"use strict";var t=e.i(13212),r=e.i(44787);let i={viewer:"Viewer",editor:"Editor",admin:"Admin"},a={viewer:"View the idea and track progress",editor:"Edit the idea and provide feedback",admin:"Full access including team management"};function n(e){return`${t.publicEnv.NEXT_PUBLIC_APP_URL}/invites/${e}/accept`}function o(e){let t=n(e.inviteToken),o=i[e.role]||e.role,s=a[e.role]||"",l=`
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
`;return(0,r.generateEmailBase)(l,"You're invited to collaborate")}function s(e){let t=n(e.inviteToken),r=i[e.role]||e.role,o=a[e.role]||"";return`
HEY,

${e.inviterName.toUpperCase()} HAS INVITED YOU TO COLLABORATE ON AN IDEA:

"${e.ideaTitle}"

Your Role: ${r}
Access: ${o}

Click here to accept: ${t}

This invitation expires in 7 days.

---
You received this because someone invited you to collaborate on Debrief.
`.trim()}e.s(["generateInviteEmailHtml",()=>o,"generateInviteEmailText",()=>s])},49956,e=>{"use strict";var t=e.i(47909),r=e.i(74017),i=e.i(96250),a=e.i(59756),n=e.i(61916),o=e.i(74677),s=e.i(69741),l=e.i(16795),d=e.i(87718),p=e.i(95169),c=e.i(47587),u=e.i(66012),g=e.i(70101),m=e.i(26937),x=e.i(10372),h=e.i(93695);e.i(52474);var f=e.i(5232),E=e.i(33780),v=e.i(58799),b=e.i(69719);let w=["viewer","editor","admin"],R=b.z.object({email:b.z.string().min(1,"Email is required").email("Invalid email address").max(255,"Email must be less than 255 characters").toLowerCase().trim(),role:b.z.enum(w,{message:"Role must be viewer, editor, or admin"})});b.z.object({token:b.z.string().min(1,"Invite token is required").max(100,"Invalid invite token")}),b.z.object({role:b.z.enum(w,{message:"Role must be viewer, editor, or admin"})}),b.z.object({collaboratorId:b.z.string().uuid("Invalid collaborator ID")});var y=e.i(50494),O=e.i(62807),S=e.i(15874);let C=(0,v.withErrorHandling)(async(e,t)=>{let r,{id:i}=await t.params,a=await (0,E.getUser)();if(!a)throw new v.UnauthorizedError;let n=await e.json();try{r=R.parse(n)}catch(e){if(e instanceof S.ZodError){let t={};throw e.issues.forEach(e=>{let r=e.path.join(".");t[r]||(t[r]=[]),t[r].push(e.message)}),new v.ValidationError(t)}throw e}let{email:o,role:s}=r,l=await (0,E.createServerClient)(),{data:d,error:p}=await l.from("ideas").select("id, user_id, title").eq("id",i).single();if(p||!d)throw new v.NotFoundError("Idea not found");if(d.user_id!==a.id){let{data:e}=await l.from("idea_collaborators").select("role, status").eq("idea_id",i).eq("user_id",a.id).eq("status","accepted").eq("role","admin").single();if(!e)throw new v.ForbiddenError("Only idea owners and admins can invite collaborators")}let{data:c}=await l.from("profiles").select("id").eq("email",o).single();if(c&&c.id===d.user_id)throw new v.ConflictError("Cannot invite the idea owner as a collaborator");let{data:u}=await l.from("idea_collaborators").select("id, status, role, expires_at").eq("idea_id",i).eq("email",o).single();if(u){if("accepted"===u.status)throw new v.ConflictError(`${o} is already a ${u.role} on this idea`);if("pending"===u.status){let e=new Date(u.expires_at);if(e>new Date)throw new v.ConflictError(`An invitation to ${o} is already pending (expires ${e.toLocaleDateString()})`);await l.from("idea_collaborators").delete().eq("id",u.id)}"declined"===u.status&&await l.from("idea_collaborators").delete().eq("id",u.id)}let{data:g,error:m}=await l.rpc("generate_invite_token");if(m||!g)throw Error("Failed to generate invite token");let x=new Date;x.setDate(x.getDate()+7);let{data:h,error:f}=await l.from("idea_collaborators").insert({idea_id:i,email:o,role:s,status:"pending",invited_by:a.id,invite_token:g,expires_at:x.toISOString()}).select().single();if(f||!h)throw Error(`Failed to create invitation: ${f?.message||"Unknown error"}`);try{let{data:e}=await l.from("profiles").select("full_name").eq("id",a.id).single(),t=e?.full_name||"A team member",r=d.title||"an idea",i=await (0,y.sendEmail)({to:o,subject:`${t} invited you to collaborate on "${r}"`,html:(0,O.generateInviteEmailHtml)({recipientEmail:o,inviterName:t,ideaTitle:r,role:s,inviteToken:g}),text:(0,O.generateInviteEmailText)({recipientEmail:o,inviterName:t,ideaTitle:r,role:s,inviteToken:g})});i.success||console.warn(`[Invite] Email sending failed for ${o}: ${i.error}`)}catch(e){console.error("[Invite] Email sending error:",e)}return(0,v.successResponse)({data:h})});e.s(["POST",0,C],57557);var A=e.i(57557);let _=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/ideas/[id]/invite/route",pathname:"/api/ideas/[id]/invite",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/apps/web/src/app/api/ideas/[id]/invite/route.ts",nextConfigOutput:"",userland:A}),{workAsyncStorage:T,workUnitAsyncStorage:I,serverHooks:L}=_;function P(){return(0,i.patchFetch)({workAsyncStorage:T,workUnitAsyncStorage:I})}async function $(e,t,i){_.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let E="/api/ideas/[id]/invite/route";E=E.replace(/\/index$/,"")||"/";let v=await _.prepare(e,t,{srcPage:E,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==i.waitUntil||i.waitUntil.call(i,Promise.resolve()),null;let{buildId:b,params:w,nextConfig:R,parsedUrl:y,isDraftMode:O,prerenderManifest:S,routerServerContext:C,isOnDemandRevalidate:A,revalidateOnlyGenerated:T,resolvedPathname:I,clientReferenceManifest:L,serverActionsManifest:P}=v,$=(0,s.normalizeAppPath)(E),U=!!(S.dynamicRoutes[$]||S.routes[I]),N=async()=>((null==C?void 0:C.render404)?await C.render404(e,t,y,!1):t.end("This page could not be found"),null);if(U&&!O){let e=!!S.routes[I],t=S.dynamicRoutes[$];if(t&&!1===t.fallback&&!e){if(R.experimental.adapterPath)return await N();throw new h.NoFallbackError}}let k=null;!U||_.isDev||O||(k="/index"===(k=I)?"/":k);let q=!0===_.isDev||!U,H=U&&!q;P&&L&&(0,o.setManifestsSingleton)({page:E,clientReferenceManifest:L,serverActionsManifest:P});let D=e.method||"GET",M=(0,n.getTracer)(),j=M.getActiveScopeSpan(),z={params:w,prerenderManifest:S,renderOpts:{experimental:{authInterrupts:!!R.experimental.authInterrupts},cacheComponents:!!R.cacheComponents,supportsDynamicResponse:q,incrementalCache:(0,a.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:R.cacheLife,waitUntil:i.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,i,a)=>_.onRequestError(e,t,i,a,C)},sharedContext:{buildId:b}},B=new l.NodeNextRequest(e),F=new l.NodeNextResponse(t),Y=d.NextRequestAdapter.fromNodeNextRequest(B,(0,d.signalFromNodeResponse)(t));try{let o=async e=>_.handle(Y,z).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let i=r.get("next.route");if(i){let t=`${D} ${i}`;e.setAttributes({"next.route":i,"http.route":i,"next.span_name":t}),e.updateName(t)}else e.updateName(`${D} ${E}`)}),s=!!(0,a.getRequestMeta)(e,"minimalMode"),l=async a=>{var n,l;let d=async({previousCacheEntry:r})=>{try{if(!s&&A&&T&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await o(a);e.fetchMetrics=z.renderOpts.fetchMetrics;let l=z.renderOpts.pendingWaitUntil;l&&i.waitUntil&&(i.waitUntil(l),l=void 0);let d=z.renderOpts.collectedTags;if(!U)return await (0,u.sendResponse)(B,F,n,z.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(n.headers);d&&(t[x.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==z.renderOpts.collectedRevalidate&&!(z.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&z.renderOpts.collectedRevalidate,i=void 0===z.renderOpts.collectedExpire||z.renderOpts.collectedExpire>=x.INFINITE_CACHE?void 0:z.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:i}}}}catch(t){throw(null==r?void 0:r.isStale)&&await _.onRequestError(e,t,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:A})},!1,C),t}},p=await _.handleResponse({req:e,nextConfig:R,cacheKey:k,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:A,revalidateOnlyGenerated:T,responseGenerator:d,waitUntil:i.waitUntil,isMinimalMode:s});if(!U)return null;if((null==p||null==(n=p.value)?void 0:n.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",A?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),O&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let h=(0,g.fromNodeOutgoingHttpHeaders)(p.value.headers);return s&&U||h.delete(x.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||h.get("Cache-Control")||h.set("Cache-Control",(0,m.getCacheControlHeader)(p.cacheControl)),await (0,u.sendResponse)(B,F,new Response(p.value.body,{headers:h,status:p.value.status||200})),null};j?await l(j):await M.withPropagatedContext(e.headers,()=>M.trace(p.BaseServerSpan.handleRequest,{spanName:`${D} ${E}`,kind:n.SpanKind.SERVER,attributes:{"http.method":D,"http.target":e.url}},l))}catch(t){if(t instanceof h.NoFallbackError||await _.onRequestError(e,t,{routerKind:"App Router",routePath:$,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:A})},!1,C),U)throw t;return await (0,u.sendResponse)(B,F,new Response(null,{status:500})),null}}e.s(["handler",()=>$,"patchFetch",()=>P,"routeModule",()=>_,"serverHooks",()=>L,"workAsyncStorage",()=>T,"workUnitAsyncStorage",()=>I],49956)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__abbcc9e4._.js.map