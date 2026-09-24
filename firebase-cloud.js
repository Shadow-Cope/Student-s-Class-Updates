/* Student's Class — optional Firebase cloud sync (free Spark plan is enough).
   Works as an add-on: if firebase-config.js is unfilled or offline, the app
   stays 100% local. All cross-file helpers (t, esc, toast, openModal, render,
   state, profile, bannerStyle, celebrateEvent) come from app.js. */
(function () {
  "use strict";

  /* ---------- extra translations (merged into app i18n) ---------- */
  const EXTRA = {
    en: { cloud: "Cloud", onlineClasses: "Online classes", thisDevice: "On this device", cloudOff: "Cloud sync is off. Add your Firebase keys to enable it.", signInToSync: "Sign in to sync classes across devices.", signIn: "Sign in", createAccount: "Create account", guestBtn: "Continue as guest", emailAddr: "Email", passwd: "Password", logoutBtn: "Log out", needAuth: "Sign in first.", onlineLabel: "Online class (syncs across devices)", cloudAcc: "Cloud account", signedInCloud: "Signed in", cloudCreated: "Online class created. Code: ", cloudJoined: "Joined online class ", noNet: "No connection to the cloud.", delClass: "Delete class", delClassConfirm: "Delete this online class for everyone?", classDeleted: "Online class deleted", announceHw: "Also post to announcements", hwBadge: "Homework", authTitle: "Welcome back", authSub: "Sign in to sync your classes on every device.", orWord: "or", authNote: "Your classes stay private to your account. We never sell your data.", legal: "Legal", legalSub: "Terms, privacy and cookies.", termsBtn: "Terms & conditions", privBtn: "Privacy policy", cookieBtn: "Cookie policy", closeBtn: "Close", updates: "Updates", updatesSub: "The app updates itself. Updates are required to keep using it.", checkUpdates: "Check for updates", checkingUpdates: "Checking for updates…", upToDate: "You're up to date", downloadingUpdate: "Downloading required update…", updateError: "Couldn't check for updates", tabStream: "Stream", tabClasswork: "Classwork", tabPeople: "People", emailWord: "Email", bioWord: "Bio", statusWord: "Status", guestWord: "Guest" },
    es: { cloud: "Nube", onlineClasses: "Clases en línea", thisDevice: "En este dispositivo", cloudOff: "La nube está desactivada. Añade tus claves de Firebase.", signInToSync: "Inicia sesión para sincronizar tus clases.", signIn: "Iniciar sesión", createAccount: "Crear cuenta", guestBtn: "Entrar como invitado", emailAddr: "Correo", passwd: "Contraseña", logoutBtn: "Cerrar sesión", needAuth: "Inicia sesión primero.", onlineLabel: "Clase en línea (se sincroniza)", cloudAcc: "Cuenta en la nube", signedInCloud: "Sesión iniciada", cloudCreated: "Clase en línea creada. Código: ", cloudJoined: "Te uniste a ", noNet: "Sin conexión con la nube.", delClass: "Eliminar clase", delClassConfirm: "¿Eliminar esta clase en línea para todos?", classDeleted: "Clase en línea eliminada", announceHw: "Publicar también en anuncios", hwBadge: "Tarea", authTitle: "Bienvenido de nuevo", authSub: "Inicia sesión para sincronizar tus clases en todos los dispositivos.", orWord: "o", authNote: "Tus clases son privadas. Nunca vendemos tus datos.", legal: "Legal", legalSub: "Términos, privacidad y cookies.", termsBtn: "Términos y condiciones", privBtn: "Política de privacidad", cookieBtn: "Política de cookies", closeBtn: "Cerrar", updates: "Actualizaciones", updatesSub: "La app se actualiza sola. Las actualizaciones son obligatorias para seguir usándola.", checkUpdates: "Buscar actualizaciones", checkingUpdates: "Buscando actualizaciones…", upToDate: "Tienes la última versión", downloadingUpdate: "Descargando actualización obligatoria…", updateError: "No se pudieron buscar actualizaciones", tabStream: "Tablón", tabClasswork: "Trabajo", tabPeople: "Personas", emailWord: "Correo", bioWord: "Biografía", statusWord: "Estado", guestWord: "Invitado" },
    pt: { cloud: "Nuvem", onlineClasses: "Turmas online", thisDevice: "Neste dispositivo", cloudOff: "Sincronização desligada. Adiciona as chaves do Firebase.", signInToSync: "Inicia sessão para sincronizar.", signIn: "Iniciar sessão", createAccount: "Criar conta", guestBtn: "Entrar como convidado", emailAddr: "Email", passwd: "Palavra-passe", logoutBtn: "Terminar sessão", needAuth: "Inicia sessão primeiro.", onlineLabel: "Turma online (sincroniza)", cloudAcc: "Conta na nuvem", signedInCloud: "Sessão iniciada", cloudCreated: "Turma online criada. Código: ", cloudJoined: "Entraste em ", noNet: "Sem ligação à nuvem.", delClass: "Eliminar turma", delClassConfirm: "Eliminar esta turma online para todos?", classDeleted: "Turma online eliminada", announceHw: "Publicar também nos anúncios", hwBadge: "Trabalho", authTitle: "Bem-vindo de volta", authSub: "Inicia sessão para sincronizar as tuas turmas.", orWord: "ou", authNote: "As tuas turmas são privadas. Nunca vendemos os teus dados.", legal: "Legal", legalSub: "Termos, privacidade e cookies.", termsBtn: "Termos e condições", privBtn: "Política de privacidade", cookieBtn: "Política de cookies", closeBtn: "Fechar", updates: "Atualizações", updatesSub: "A app atualiza-se sozinha. As atualizações são obrigatórias.", checkUpdates: "Procurar atualizações", checkingUpdates: "A procurar atualizações…", upToDate: "Tens a versão mais recente", downloadingUpdate: "A descarregar atualização obrigatória…", updateError: "Não foi possível procurar atualizações", tabStream: "Mural", tabClasswork: "Trabalhos", tabPeople: "Pessoas", emailWord: "Email", bioWord: "Bio", statusWord: "Estado", guestWord: "Convidado" },
    fr: { cloud: "Cloud", onlineClasses: "Cours en ligne", thisDevice: "Sur cet appareil", cloudOff: "Sync désactivée. Ajoutez vos clés Firebase.", signInToSync: "Connectez-vous pour synchroniser.", signIn: "Se connecter", createAccount: "Créer un compte", guestBtn: "Continuer en invité", emailAddr: "Email", passwd: "Mot de passe", logoutBtn: "Se déconnecter", needAuth: "Connectez-vous d'abord.", onlineLabel: "Cours en ligne (synchronisé)", cloudAcc: "Compte cloud", signedInCloud: "Connecté", cloudCreated: "Cours en ligne créé. Code : ", cloudJoined: "Cours rejoint : ", noNet: "Pas de connexion au cloud.", delClass: "Supprimer le cours", delClassConfirm: "Supprimer ce cours en ligne pour tous ?", classDeleted: "Cours en ligne supprimé", announceHw: "Publier aussi dans les annonces", hwBadge: "Devoir", authTitle: "Bon retour", authSub: "Connectez-vous pour synchroniser vos cours.", orWord: "ou", authNote: "Vos cours restent privés. Nous ne vendons jamais vos données.", legal: "Légal", legalSub: "Conditions, confidentialité et cookies.", termsBtn: "Conditions d'utilisation", privBtn: "Politique de confidentialité", cookieBtn: "Politique cookies", closeBtn: "Fermer", updates: "Mises à jour", updatesSub: "L'app se met à jour toute seule. Les mises à jour sont obligatoires.", checkUpdates: "Vérifier les mises à jour", checkingUpdates: "Vérification…", upToDate: "Vous êtes à jour", downloadingUpdate: "Téléchargement de la mise à jour…", updateError: "Impossible de vérifier les mises à jour", tabStream: "Flux", tabClasswork: "Devoirs", tabPeople: "Participants", emailWord: "E-mail", bioWord: "Bio", statusWord: "Statut", guestWord: "Invité" },
    de: { cloud: "Cloud", onlineClasses: "Online-Klassen", thisDevice: "Auf diesem Gerät", cloudOff: "Cloud-Sync ist aus. Füge deine Firebase-Schlüssel hinzu.", signInToSync: "Melde dich an, um zu synchronisieren.", signIn: "Anmelden", createAccount: "Konto erstellen", guestBtn: "Als Gast fortfahren", emailAddr: "E-Mail", passwd: "Passwort", logoutBtn: "Abmelden", needAuth: "Melde dich zuerst an.", onlineLabel: "Online-Klasse (wird synchronisiert)", cloudAcc: "Cloud-Konto", signedInCloud: "Angemeldet", cloudCreated: "Online-Klasse erstellt. Code: ", cloudJoined: "Beigetreten: ", noNet: "Keine Verbindung zur Cloud.", delClass: "Klasse löschen", delClassConfirm: "Diese Online-Klasse für alle löschen?", classDeleted: "Online-Klasse gelöscht", announceHw: "Auch in Mitteilungen posten", hwBadge: "Hausaufgabe", authTitle: "Willkommen zurück", authSub: "Melde dich an, um deine Klassen zu synchronisieren.", orWord: "oder", authNote: "Deine Klassen bleiben privat. Wir verkaufen keine Daten.", legal: "Rechtliches", legalSub: "Bedingungen, Datenschutz und Cookies.", termsBtn: "Nutzungsbedingungen", privBtn: "Datenschutzerklärung", cookieBtn: "Cookie-Richtlinie", closeBtn: "Schließen", updates: "Updates", updatesSub: "Die App aktualisiert sich selbst. Updates sind Pflicht.", checkUpdates: "Nach Updates suchen", checkingUpdates: "Suche nach Updates…", upToDate: "Du bist auf dem neuesten Stand", downloadingUpdate: "Pflicht-Update wird heruntergeladen…", updateError: "Updates konnten nicht geprüft werden", tabStream: "Stream", tabClasswork: "Aufgaben", tabPeople: "Personen", emailWord: "E-Mail", bioWord: "Bio", statusWord: "Status", guestWord: "Gast" }
  };
  function mergeExtra() {
    try {
      // NOTE: app.js declares I18N with const, which does NOT attach to window,
      // so we must test the bare identifier instead of window.I18N.
      if (typeof I18N === "undefined") return false;
      Object.keys(EXTRA).forEach(l => { if (I18N[l]) Object.assign(I18N[l], EXTRA[l]); });
      return true;
    } catch (e) { return false; }
  }
  if (!mergeExtra()) {
    // app.js not parsed yet — retry until it is (max ~5s), then give up silently
    let tries = 0;
    const timer = setInterval(() => {
      if (mergeExtra() || ++tries > 50) clearInterval(timer);
    }, 100);
  }

  const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rndCode = () => Array.from({ length: 6 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join("");
  const toDate = (v) => {
    if (!v) return null;
    if (v.toDate) { try { return v.toDate(); } catch (e) { return null; } }
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  };
  const fmtDT = (v) => {
    const d = toDate(v);
    if (!d) return (typeof t === "function" ? t("noDueDate") : "No due date");
    try { return d.toLocaleString(typeof locale === "function" ? locale() : undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch (e) { return d.toLocaleString(); }
  };

  const Cloud = {
    configured: false, ready: false, user: null,
    db: null, auth: null,
    cloudClasses: [],          // merged owned + member class docs
    detail: null,              // { cls, members, posts, assignments }
    ui: { tab: "stream" },
    _unsubs: [], _detailUnsubs: []
  };
  window.Cloud = Cloud;

  function cfg() { return window.FIREBASE_CONFIG || null; }
  function isFilled(c) {
    return c && c.apiKey && c.projectId && c.authDomain
      && !String(c.apiKey).includes("PASTE");
  }

  Cloud.init = function () {
    mergeExtra();
    const c = cfg();
    if (typeof firebase === "undefined" || !isFilled(c)) {
      Cloud.configured = false;
      updateBtn();
      return; // stay local-only
    }
    try {
      if (!firebase.apps.length) firebase.initializeApp(c);
      Cloud.auth = firebase.auth();
      Cloud.db = firebase.firestore();
      Cloud.configured = true;
      Cloud.auth.onAuthStateChanged((u) => {
        Cloud.user = u || null;
        Cloud.ready = !!u;
        if (u) startLists(); else stopLists();
        updateBtn();
        try { if (typeof render === "function") render(); } catch (e) {}
      }, () => { updateBtn(); });
    } catch (e) {
      Cloud.configured = false;
    }
    updateBtn();
  };

  function updateBtn() {
    const b = document.getElementById("cloudBtn");
    if (!b) return;
    if (!Cloud.configured) { b.textContent = "○"; b.title = "Cloud off"; b.classList.remove("on"); }
    else if (!Cloud.user) { b.textContent = "◌"; b.title = "Cloud: signed out"; b.classList.remove("on"); }
    else { b.textContent = "●"; b.title = "Cloud: online"; b.classList.add("on"); }
  }

  function stopLists() {
    Cloud._unsubs.forEach(u => { try { u(); } catch (e) {} });
    Cloud._unsubs = [];
    Cloud.cloudClasses = [];
    Cloud.closeDetail();
  }

  function startLists() {
    stopLists();
    const uid = Cloud.user.uid;
    const map = new Map();
    const merge = () => {
      Cloud.cloudClasses = [...map.values()].sort((a, b) => {
        const da = toDate(a.createdAt), db = toDate(b.createdAt);
        return (db || 0) - (da || 0);
      });
      try { if (typeof render === "function" && window.__sc_state_route !== "cloud") render(); } catch (e) {}
      updateBtn();
    };
    try {
      const q1 = Cloud.db.collection("classes").where("ownerUid", "==", uid)
        .onSnapshot(s => {
          s.docChanges().forEach(ch => {
            const d = { id: ch.doc.id, ...ch.doc.data() };
            if (ch.type === "removed") map.delete(d.id); else map.set(d.id, d);
          });
          merge();
        }, () => {});
      const q2 = Cloud.db.collection("classes").where("memberUids", "array-contains", uid)
        .onSnapshot(s => {
          s.docChanges().forEach(ch => {
            const d = { id: ch.doc.id, ...ch.doc.data() };
            if (ch.type === "removed") {
              // keep if owned (covered by q1)
              if (d.ownerUid !== uid) map.delete(d.id);
            } else map.set(d.id, d);
          });
          merge();
        }, () => {});
      Cloud._unsubs.push(q1, q2);
    } catch (e) {}
  }

  /* ---------- auth ---------- */
  function authError(msg) {
    const box = document.getElementById("clError");
    if (box) { box.textContent = msg; box.hidden = false; box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake"); }
    else toast(msg);
  }
  Cloud.openAuth = function () {
    if (!Cloud.configured) { toast(t("cloudOff")); return; }
    if (Cloud.user) { try { state.route = "settings"; render(); } catch (e) {} return; }
    openModal(`
      <div class="auth-wrap">
        <img src="logo.svg" alt="Student's Class logo" class="auth-logo" />
        <h2>${t("authTitle")}</h2>
        <p class="muted">${t("authSub")}</p>
        <p class="form-error" id="clError" hidden></p>
        <div class="auth-fields">
          <label>${t("emailAddr")}</label><input id="clEmail" type="email" placeholder="you@gmail.com" autocomplete="email" />
          <label>${t("passwd")}</label><input id="clPass" type="password" placeholder="••••••••" autocomplete="current-password" />
        </div>
        <div class="btn-row auth-main">
          <button class="btn primary" id="clLogin">${t("signIn")}</button>
          <button class="btn" id="clRegister">${t("createAccount")}</button>
        </div>
        <div class="auth-div"><span>${t("orWord")}</span></div>
        <button class="btn block" id="clGuest">${t("guestBtn")}</button>
        <button class="btn quiet" id="cancelModal">${t("cancelBtn")}</button>
        <p class="auth-note">${t("authNote")}</p>
      </div>`);
    const busy = (on) => { ["clLogin", "clRegister", "clGuest"].forEach(id => { const b = document.getElementById(id); if (b) b.disabled = !!on; }); };
    const creds = () => {
      const email = document.getElementById("clEmail").value.trim();
      const pass = document.getElementById("clPass").value;
      if (!email || !pass) { authError(t("fillAll")); return null; }
      return { email, pass };
    };
    const done = () => { busy(false); closeModal(); toast("✓ " + t("signedInCloud"), true); };
    document.getElementById("clLogin").onclick = async () => {
      const c = creds(); if (!c) return; busy(true);
      try { await Cloud.auth.signInWithEmailAndPassword(c.email, c.pass); done(); }
      catch (e) { busy(false); authError(e.message); }
    };
    document.getElementById("clRegister").onclick = async () => {
      const c = creds(); if (!c) return; busy(true);
      try { await Cloud.auth.createUserWithEmailAndPassword(c.email, c.pass); done(); }
      catch (e) { busy(false); authError(e.message); }
    };
    document.getElementById("clGuest").onclick = async () => {
      busy(true);
      try { await Cloud.auth.signInAnonymously(); done(); }
      catch (e) { busy(false); authError(e.message); }
    };
    document.getElementById("clPass").addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("clLogin").click();
    });
  };

  Cloud.logout = async function () {
    try { await Cloud.auth.signOut(); toast(t("logoutBtn")); } catch (e) { toast(e.message); }
  };

  /* ---------- classes ---------- */
  async function uniqueCode() {
    for (let i = 0; i < 6; i++) {
      const code = rndCode();
      const s = await Cloud.db.collection("classes").where("code", "==", code).limit(1).get();
      if (s.empty) return code;
    }
    return rndCode();
  }

  function memberProfile() {
    const p = (typeof profile !== "undefined" && profile) ? profile : { firstName: "?", lastName: "", email: Cloud.user.email || "guest", role: "student" };
    return { email: p.email || Cloud.user.email || t("guestWord"), firstName: p.firstName || "", lastName: p.lastName || "", role: p.role || "student", pfp: p.pfp || null };
  }
  /* Best-effort: push current local name/photo into every cloud class where you are a member */
  Cloud.syncProfile = async function () {
    if (!Cloud.configured || !Cloud.user || !Cloud.db) return;
    try {
      const mp = memberProfile();
      const snap = await Cloud.db.collection("classes").where("memberUids", "array-contains", Cloud.user.uid).get();
      const jobs = [];
      snap.forEach(d => { jobs.push(d.ref.collection("members").doc(Cloud.user.uid).set({ ...mp, joinedAt: new Date().toISOString() }, { merge: true })); });
      await Promise.all(jobs);
    } catch (e) { /* offline or rules — ignore, photo still works locally */ }
  };

  Cloud.createCloudClass = async function (d) {
    if (!Cloud.ready) { toast(t("needAuth")); return null; }
    const code = await uniqueCode();
    const mp = memberProfile();
    const ref = Cloud.db.collection("classes").doc();
    await ref.set({
      name: d.name, subject: d.subject || "", section: d.section || "", room: d.room || "",
      description: d.description || "", color: d.color || "banner-1", code,
      ownerUid: Cloud.user.uid, ownerEmail: mp.email,
      teacherName: (mp.firstName + " " + mp.lastName).trim(),
      memberUids: [Cloud.user.uid], archived: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    await ref.collection("members").doc(Cloud.user.uid).set({ ...mp, joinedAt: new Date().toISOString() });
    return { id: ref.id, code };
  };

  Cloud.joinCloudClass = async function (code) {
    if (!Cloud.ready) { toast(t("needAuth")); return null; }
    code = String(code || "").trim().toUpperCase();
    const s = await Cloud.db.collection("classes").where("code", "==", code).limit(1).get();
    if (s.empty) return null;
    const ref = s.docs[0].ref;
    const mp = memberProfile();
    await ref.collection("members").doc(Cloud.user.uid).set({ ...mp, joinedAt: new Date().toISOString() }, { merge: true });
    try {
      await ref.update({ memberUids: firebase.firestore.FieldValue.arrayUnion(Cloud.user.uid) });
    } catch (e) { /* owner-only rule path: member doc is enough */ }
    return { id: ref.id, ...(s.docs[0].data()) };
  };

  Cloud.openClass = function (id) {
    try { state.route = "cloud"; state.classId = id; } catch (e) { window.__sc_state_route = "cloud"; }
    window.__sc_state_route = "cloud";
    Cloud.ui.tab = "stream";
    subscribeDetail(id);
    try { render(); } catch (e) {}
  };

  Cloud.closeDetail = function () {
    Cloud._detailUnsubs.forEach(u => { try { u(); } catch (e) {} });
    Cloud._detailUnsubs = [];
    Cloud.detail = null;
  };

  function subscribeDetail(id) {
    Cloud.closeDetail();
    const db = Cloud.db;
    const doc = db.collection("classes").doc(id);
    Cloud._detailUnsubs.push(doc.onSnapshot(s => {
      if (!s.exists) { Cloud.detail = null; }
      else Cloud.detail = { ...(Cloud.detail || {}), cls: { id: s.id, ...s.data() } };
      if (window.__sc_state_route === "cloud") { try { render(); } catch (e) {} }
    }));
    Cloud._detailUnsubs.push(doc.collection("members").onSnapshot(s => {
      const m = []; s.forEach(d => m.push({ uid: d.id, ...d.data() }));
      Cloud.detail = { ...(Cloud.detail || {}), members: m };
      if (window.__sc_state_route === "cloud") { try { render(); } catch (e) {} }
    }));
    Cloud._detailUnsubs.push(doc.collection("posts").orderBy("createdAt", "desc").limit(60).onSnapshot(s => {
      const p = []; s.forEach(d => p.push({ id: d.id, ...d.data() }));
      Cloud.detail = { ...(Cloud.detail || {}), posts: p };
      if (window.__sc_state_route === "cloud") { try { render(); } catch (e) {} }
    }));
    Cloud._detailUnsubs.push(doc.collection("assignments").orderBy("createdAt", "desc").limit(100).onSnapshot(s => {
      const a = []; s.forEach(d => a.push({ id: d.id, ...d.data() }));
      Cloud.detail = { ...(Cloud.detail || {}), assignments: a };
      if (window.__sc_state_route === "cloud") { try { render(); } catch (e) {} }
    }));
  }

  // Called after every app render: entering/leaving the cloud view.
  Cloud.onRoute = function () {
    try { window.__sc_state_route = state.route; } catch (e) {}
    if (!window.__sc_state_route || window.__sc_state_route !== "cloud") {
      if (Cloud.detail) Cloud.closeDetail();
    } else if (window.__sc_state_route === "cloud" && state.classId && (!Cloud.detail || !Cloud.detail.cls || Cloud.detail.cls.id !== state.classId)) {
      subscribeDetail(state.classId);
    }
    updateBtn();
  };

  Cloud.isOwner = function (cls) {
    return !!(Cloud.user && cls && cls.ownerUid === Cloud.user.uid);
  };

  /* ---------- cloud home section ---------- */
  Cloud.homeHTML = function () {
    if (!Cloud.configured) return "";
    if (!Cloud.user) {
      return `<div class="card" style="margin-bottom:16px"><h3>☁ ${t("cloud")}</h3>
        <p class="muted">${t("signInToSync")}</p>
        <div class="btn-row"><button class="btn primary" id="cloudSign">${t("signIn")}</button></div></div>`;
    }
    const list = Cloud.cloudClasses.filter(c => !c.archived);
    return `<div class="page-head" style="margin-top:4px"><div><h1 style="font-size:19px">☁ ${t("onlineClasses")} (${list.length})</h1></div></div>` +
      (list.length
        ? `<div class="grid" style="margin-bottom:18px">${list.map(c => `
          <div class="class-card" data-cloud-open="${c.id}">
            <div class="class-banner" style="${bannerStyle(c.color)}"><h3>${esc(c.name)}</h3><small>${esc([c.subject, c.section].filter(Boolean).join(" · ")) || "&nbsp;"}</small></div>
            <div class="class-body"><p>☁ ${esc(c.code)} · ${esc(c.teacherName || "")}</p><span class="muted">›</span></div>
          </div>`).join("")}</div>`
        : `<div class="empty" style="margin-bottom:18px">${t("noClassesSub")}</div>`) +
      `<div class="page-head"><div><h1 style="font-size:19px">💻 ${t("thisDevice")}</h1></div></div>`;
  };

  Cloud.archivedExtra = function () {
    if (!Cloud.configured || !Cloud.user) return "";
    const list = Cloud.cloudClasses.filter(c => c.archived);
    if (!list.length) return "";
    return `<div class="page-head" style="margin-top:18px"><div><h1 style="font-size:19px">☁ ${t("onlineClasses")}</h1></div></div>
      <div class="grid">${list.map(c => `
        <div class="class-card" data-cloud-open="${c.id}">
          <div class="class-banner" style="${bannerStyle(c.color)}"><h3>${esc(c.name)}</h3><small>${esc(c.code)}</small></div>
          <div class="class-body"><p>☁ ${esc(c.teacherName || "")}</p><span class="muted">›</span></div>
        </div>`).join("")}</div>`;
  };

  /* ---------- cloud settings card ---------- */
  Cloud.accountCardHTML = function () {
    if (!Cloud.configured) {
      return `<div class="card" style="margin-bottom:16px"><h3>☁ ${t("cloudAcc")}</h3>
        <p class="muted">${t("cloudOff")}</p></div>`;
    }
    if (!Cloud.user) {
      return `<div class="card" style="margin-bottom:16px"><h3>☁ ${t("cloudAcc")}</h3>
        <p class="muted">${t("signInToSync")}</p>
        <div class="btn-row"><button class="btn primary" id="cloudSign2">${t("signIn")}</button></div></div>`;
    }
    const u = Cloud.user;
    return `<div class="card" style="margin-bottom:16px"><h3>☁ ${t("cloudAcc")}</h3>
      <dl class="kv"><dt>${t("emailWord")}</dt><dd>${esc(u.email || t("guestWord"))}</dd><dt>${t("statusWord")}</dt><dd>● ${t("signedInCloud")}</dd></dl>
      <div class="btn-row" style="margin-top:12px"><button class="btn small" id="cloudLogout">${t("logoutBtn")}</button></div></div>`;
  };

  /* ---------- cloud class detail view ---------- */
  Cloud.viewClass = function () {
    const d = Cloud.detail;
    if (!d || !d.cls) return `<div class="empty">${t("noNet")}</div>`;
    const c = d.cls;
    const owner = Cloud.isOwner(c);
    const members = d.members || [], posts = d.posts || [], assigns = d.assignments || [];
    const tab = Cloud.ui.tab || "stream";
    const pending = assigns.filter(a => !(a.doneBy || []).includes(Cloud.user.uid)).length;
    let body = "";
    if (tab === "stream") {
      body = `<div class="two-col">
        <div class="card"><h3>${t("codeTitle")}</h3><p class="muted">${t("shareCode")}</p>
          <div style="font-size:24px;font-weight:700;letter-spacing:.12em">${esc(c.code)}</div>
          <div class="btn-row" style="margin-top:10px"><button class="btn small" id="ccCopy">${t("copyCode")}</button>
          ${owner
            ? `<button class="btn small" id="ccArch">${c.archived ? t("unarchiveBtn") : t("archiveBtn")}</button><button class="btn small danger" id="ccDel">${t("delClass")}</button>`
            : `<button class="btn small" id="ccLeave">${t("leaveBtn")}</button>`}</div>
          <hr style="border:0;border-top:1px solid var(--border);margin:14px 0" />
          <h3>${t("aboutTitle")}</h3><p class="muted">${esc(c.description || t("noDesc"))}</p>
          <p class="muted">${esc(c.room || "-")} · ${members.length} ${t("membersWord")}</p></div>
        <div>
          ${owner ? `<div class="btn-row" style="margin-bottom:12px"><button class="btn primary" id="ccPost">${t("newAnnounceBtn")}</button><button class="btn" id="ccAssign">${t("newHwBtn")}</button></div>` : `<p class="muted" style="margin:0 0 12px">${t("onlyOwner")}</p>`}
          ${posts.length ? posts.map(p => {
            const m = members.find(x => (x.email || "").toLowerCase() === String(p.authorEmail || "").toLowerCase());
            const pic = (m && m.pfp) || p.authorPfp || null;
            const av = pic ? `<div class="mini-avatar"><img src="${pic}" alt="avatar"/></div>` : `<div class="mini-avatar">${esc((p.authorName || "?")[0] || "?")}</div>`;
            const hw = p.kind === "hw";
            return `<div class="post"><div class="post-head">${av}<div><strong>${esc(p.authorName || "?")}</strong><div class="muted" style="font-size:12px">${esc(fmtDT(p.createdAt))}</div></div>${hw ? `<span class="hw-badge">✏ ${t("hwBadge")}</span>` : ""}</div>${hw ? `<p style="margin:6px 0 2px"><strong>${esc(p.hwTitle || "")}</strong></p>${p.hwDue ? `<p class="muted" style="margin:0 0 4px;font-size:13px">${esc(fmtDT(p.hwDue))}</p>` : ""}` : ""}<p style="margin:6px 0 0">${esc(p.text)}</p></div>`;
          }).join("") : `<div class="empty">${t("noAnnounce")}</div>`}
        </div></div>`;
    } else if (tab === "classwork") {
      body = `${owner ? `<div class="btn-row" style="margin-bottom:12px"><button class="btn primary" id="ccAssign">${t("newHwBtn")}</button></div>` : `<p class="muted" style="margin:0 0 12px">${t("onlyOwner")}</p>`}
      ${assigns.length ? assigns.map(a => {
        const done = (a.doneBy || []).includes(Cloud.user.uid);
        return `<div class="assign ${done ? "done" : ""}">
          <div class="assign-head"><div style="flex:1"><strong>${esc(a.title)}</strong><div class="muted" style="font-size:13px">${esc(a.due ? fmtDT(a.due) : t("noDueDate"))} · ${a.points || 0} ${t("pts")}</div></div>
          <button class="btn small" data-cc-toggle="${a.id}">${done ? t("reopenBtn") : t("markDone")}</button>
          ${owner ? `<button class="btn small danger" data-cc-delassign="${a.id}">${t("deleteBtn")}</button>` : ""}</div>
          ${a.desc ? `<p style="margin:6px 0 0">${esc(a.desc)}</p>` : ""}</div>`;
      }).join("") : `<div class="empty">${t("noHw")}</div>`}`;
    } else {
      const mAv = (m, fb) => m.pfp ? `<div class="mini-avatar"><img src="${m.pfp}" alt="avatar"/></div>` : `<div class="mini-avatar">${esc(fb)}</div>`;
      body = `<div class="card"><h3>${t("teacherWord")}</h3>
        <div class="person-row">${mAv(members.find(x => (x.email || "").toLowerCase() === String(c.ownerEmail || "").toLowerCase()) || {}, (c.teacherName || "?")[0])}<div><strong>${esc(c.teacherName || "")}</strong><div class="muted">${esc(c.ownerEmail || "")}</div></div></div>
        <h3 style="margin-top:16px">${t("membersTitle")} (${members.length})</h3>
        ${members.map(m => `<div class="person-row">${mAv(m, ((m.firstName || "")[0] || "?"))}<div><strong>${esc((m.firstName || "") + " " + (m.lastName || ""))}</strong><div class="muted">${esc(m.email || "")}</div></div></div>`).join("")}
        </div>`;
    }
    return `<button class="btn small" id="ccBack">‹ ${t("backAll")}</button>
    <div class="banner-hero" style="${bannerStyle(c.color)};margin-top:12px"><h1>☁ ${esc(c.name)}</h1><p>${esc([c.subject, c.section, c.room].filter(Boolean).join(" · "))}</p>
      <div class="class-meta"><span class="chip">${esc(c.code)}</span><span class="chip">${members.length} ${t("membersWord")}</span><span class="chip">${pending} ${t("pendingWord")}</span></div></div>
    <div class="tabs"><button class="tab ${tab === "stream" ? "active" : ""}" data-cc-tab="stream">${t("tabStream")}</button><button class="tab ${tab === "classwork" ? "active" : ""}" data-cc-tab="classwork">${t("tabClasswork")}</button><button class="tab ${tab === "people" ? "active" : ""}" data-cc-tab="people">${t("tabPeople")}</button></div>
    ${body}`;
  };

  /* ---------- cloud event bindings (called from app bindCommon) ---------- */
  Cloud.bindCommon = function () {
    const on = (sel, fn) => { const el = $(sel); if (el) el.addEventListener("click", fn); };
    on("#cloudBtn", () => Cloud.openAuth());
    on("#cloudSign", () => Cloud.openAuth());
    on("#cloudSign2", () => Cloud.openAuth());
    on("#cloudLogout", () => Cloud.logout());
    $$("#view [data-cloud-open]").forEach(el => el.onclick = () => Cloud.openClass(el.dataset.cloudOpen));
    $$("#sideClassList [data-cloud-open]").forEach(el => el.onclick = () => { document.body.classList.remove("nav-open"); Cloud.openClass(el.dataset.cloudOpen); });
    if (!Cloud.detail || !Cloud.detail.cls) return;
    const id = Cloud.detail.cls.id;
    const doc = () => Cloud.db.collection("classes").doc(id);
    on("#ccBack", () => { try { state.route = "home"; state.classId = null; render(); } catch (e) {} });
    $$("[data-cc-tab]").forEach(b => b.onclick = () => { Cloud.ui.tab = b.dataset.ccTab; try { render(); } catch (e) {} });
    on("#ccCopy", (e) => { try { navigator.clipboard?.writeText(Cloud.detail.cls.code); } catch (err) {} toast(t("codeCopied") + Cloud.detail.cls.code); celebrateEvent(e, 8); });
    on("#ccPost", () => {
      if (!Cloud.isOwner(Cloud.detail.cls)) { toast(t("onlyOwner")); return; }
      openModal(`<h2>${t("newAnnounce")}</h2><p class="muted">${t("announceSub")}</p>
        <label>${t("messageLbl")}</label><textarea id="ccText"></textarea>
        <div class="btn-row" style="margin-top:14px"><button class="btn primary" id="ccDoPost">${t("postBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
      document.getElementById("ccDoPost").onclick = async (e) => {
        const text = document.getElementById("ccText").value.trim();
        if (!text) { toast(t("writeSomething")); return; }
        const mp = memberProfile();
        await doc().collection("posts").add({ authorUid: Cloud.user.uid, authorName: (mp.firstName + " " + mp.lastName).trim() || mp.email, authorEmail: mp.email, text, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        closeModal(); celebrateEvent(e, 14); toast(t("postedMsg"), true);
      };
    });
    on("#ccAssign", () => {
      if (!Cloud.isOwner(Cloud.detail.cls)) { toast(t("onlyOwner")); return; }
      openModal(`<h2>${t("newHw")}</h2><p class="muted">${t("hwSub")}</p>
        <label>${t("titleLbl")}</label><input id="ccTitle" type="text" />
        <label>${t("instrLbl")}</label><textarea id="ccDesc"></textarea>
        <div class="form-row"><div><label>${t("dueLbl")}</label><input id="ccDue" type="datetime-local" /></div>
        <div><label>${t("pointsLbl")}</label><input id="ccPoints" type="text" value="10" /></div></div>
        <label class="checkline"><input type="checkbox" id="ccAnnounce" checked /> ${t("announceHw")}</label>
        <div class="btn-row" style="margin-top:14px"><button class="btn primary" id="ccDoAssign">${t("saveBtn")}</button><button class="btn" id="cancelModal">${t("cancelBtn")}</button></div>`);
      document.getElementById("ccDoAssign").onclick = async (e) => {
        const title = document.getElementById("ccTitle").value.trim();
        if (!title) { toast(t("needTitle")); return; }
        const desc = document.getElementById("ccDesc").value.trim();
        const due = document.getElementById("ccDue").value || "";
        const aref = await doc().collection("assignments").add({
          title, desc, due,
          points: Number(document.getElementById("ccPoints").value) || 0,
          createdBy: Cloud.user.uid, doneBy: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        if (document.getElementById("ccAnnounce")?.checked) {
          const mp = memberProfile();
          await doc().collection("posts").add({
            authorUid: Cloud.user.uid, authorName: (mp.firstName + " " + mp.lastName).trim() || mp.email,
            authorEmail: mp.email, authorPfp: mp.pfp || null, text: desc,
            kind: "hw", hwTitle: title, hwDue: due, assignmentId: aref.id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
        closeModal(); celebrateEvent(e, 14); toast(t("hwSaved"), true);
      };
    });
    $$("[data-cc-toggle]").forEach(b => b.onclick = async (e) => {
      const aref = doc().collection("assignments").doc(b.dataset.ccToggle);
      const s = await aref.get();
      const doneBy = (s.data() && s.data().doneBy) || [];
      const done = !doneBy.includes(Cloud.user.uid);
      await aref.update({ doneBy: done
        ? firebase.firestore.FieldValue.arrayUnion(Cloud.user.uid)
        : firebase.firestore.FieldValue.arrayRemove(Cloud.user.uid) });
      celebrateEvent(e, done ? 12 : 5); toast(done ? t("markedDone") : t("reopenedMsg"), done);
    });
    $$("[data-cc-delassign]").forEach(b => b.onclick = async () => {
      if (!Cloud.isOwner(Cloud.detail.cls)) { toast(t("onlyOwner")); return; }
      if (!confirm(t("delConfirm"))) return;
      await doc().collection("assignments").doc(b.dataset.ccDelassign).delete();
    });
    on("#ccLeave", async () => {
      await doc().collection("members").doc(Cloud.user.uid).delete().catch(() => {});
      try { await doc().update({ memberUids: firebase.firestore.FieldValue.arrayRemove(Cloud.user.uid) }); } catch (e) {}
      try { state.route = "home"; state.classId = null; render(); } catch (err) {}
      toast(t("leftMsg"));
    });
    on("#ccArch", async (e) => {
      if (!Cloud.isOwner(Cloud.detail.cls)) { toast(t("onlyOwner")); return; }
      await doc().update({ archived: !(Cloud.detail.cls.archived) });
      celebrateEvent(e, 8); toast(Cloud.detail.cls.archived ? t("restoredToast") : t("archivedToast"));
    });
    on("#ccDel", async () => {
      if (!Cloud.isOwner(Cloud.detail.cls)) { toast(t("onlyOwner")); return; }
      if (!confirm(t("delClassConfirm"))) return;
      const cid = Cloud.detail.cls.id;
      Cloud.closeDetail();
      await Cloud.db.collection("classes").doc(cid).delete().catch(() => {});
      try { state.route = "home"; state.classId = null; render(); } catch (e) {}
      toast(t("classDeleted"));
    });
  };

  // Sidebar cloud list (under local classes)
  Cloud.sideHTML = function () {
    if (!Cloud.configured || !Cloud.user || !Cloud.cloudClasses.length) return "";
    return Cloud.cloudClasses.filter(c => !c.archived).slice(0, 10).map(c =>
      `<button class="side-class-item" data-cloud-open="${c.id}"><span class="dot" style="${bannerStyle(c.color)}"></span><span>☁ ${esc(c.name)}</span></button>`
    ).join("");
  };

  document.addEventListener("DOMContentLoaded", () => Cloud.init());
  if (document.readyState !== "loading") Cloud.init();
})();
